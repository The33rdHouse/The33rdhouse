import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import * as db from "../db";
import Stripe from "stripe";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-01-28.clover" as any,
});

export const stripeRouter = router({
  /**
   * Create a checkout session for product purchases (books, etc.)
   */
  createCheckoutSession: protectedProcedure
    .input(z.object({
      lineItems: z.array(z.object({
        productId: z.number(),
        quantity: z.number(),
      })),
    }))
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      
      // Get products from database to get Stripe price IDs
      const productIds = input.lineItems.map(item => item.productId);
      const dbProducts = await db.getProductsByIds(productIds);
      
      // Create line items with Stripe price IDs
      const stripeLineItems = input.lineItems.map(item => {
        const product = dbProducts.find(p => p.id === item.productId);
        if (!product || !product.stripePriceId) {
          throw new Error(`Product ${item.productId} not found or missing Stripe price ID`);
        }
        return {
          price: product.stripePriceId,
          quantity: item.quantity,
        };
      });
      
      // Create or retrieve Stripe customer
      let customerId = user.stripeCustomerId;
      
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email || undefined,
          name: user.name || undefined,
          metadata: {
            userId: user.id.toString(),
          },
        });
        customerId = customer.id;
        
        // Update user with Stripe customer ID
        await db.updateUserStripeCustomer(user.id, customerId);
      }
      
      // Create checkout session for one-time payment
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "payment",
        payment_method_types: ["card"],
        line_items: stripeLineItems,
        success_url: `${process.env.VITE_FRONTEND_FORGE_API_URL || "http://localhost:3000"}/shop?success=true`,
        cancel_url: `${process.env.VITE_FRONTEND_FORGE_API_URL || "http://localhost:3000"}/cart`,
        metadata: {
          userId: user.id.toString(),
          orderType: "products",
        },
      });
      
      return { sessionId: session.id, url: session.url };
    }),

  /**
   * Create a checkout session for subscription signup
   */
  createSubscriptionCheckout: protectedProcedure
    .input(z.object({
      priceId: z.string(),
      tier: z.enum(["seeker", "initiate", "elder"]),
    }))
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      
      // Create or retrieve Stripe customer
      let customerId = user.stripeCustomerId;
      
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email || undefined,
          name: user.name || undefined,
          metadata: {
            userId: user.id.toString(),
          },
        });
        customerId = customer.id;
        
        // Update user with Stripe customer ID
        await db.updateUserStripeCustomer(user.id, customerId);
      }
      
      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: input.priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.VITE_FRONTEND_FORGE_API_URL || "http://localhost:3000"}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.VITE_FRONTEND_FORGE_API_URL || "http://localhost:3000"}/pricing`,
        metadata: {
          userId: user.id.toString(),
          tier: input.tier,
        },
      });
      
      return { sessionId: session.id, url: session.url };
    }),

  /**
   * Create a portal session for subscription management
   */
  createPortalSession: protectedProcedure
    .mutation(async ({ ctx }) => {
      const user = ctx.user;
      
      if (!user.stripeCustomerId) {
        throw new Error("No Stripe customer found");
      }
      
      const session = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${process.env.VITE_FRONTEND_FORGE_API_URL || "http://localhost:3000"}/dashboard`,
      });
      
      return { url: session.url };
    }),

  /**
   * Get subscription status
   */
  getSubscription: protectedProcedure
    .query(async ({ ctx }) => {
      const user = ctx.user;
      
      if (!user.stripeSubscriptionId) {
        return {
          tier: user.subscriptionTier,
          status: "none",
          currentPeriodEnd: null,
        };
      }
      
      const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
      const subData = subscription as any;
      
      return {
        tier: user.subscriptionTier,
        status: subscription.status,
        currentPeriodEnd: subData.current_period_end ? new Date(subData.current_period_end * 1000) : null,
        cancelAtPeriodEnd: subData.cancel_at_period_end || false,
      };
    }),

  /**
   * Webhook handler for Stripe events
   * This should be called from a separate webhook endpoint
   */
  handleWebhook: publicProcedure
    .input(z.object({
      signature: z.string(),
      body: z.string(),
    }))
    .mutation(async ({ input }) => {
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      
      if (!webhookSecret) {
        throw new Error("Webhook secret not configured");
      }
      
      let event: Stripe.Event;
      
      try {
        event = stripe.webhooks.constructEvent(
          input.body,
          input.signature,
          webhookSecret
        );
      } catch (err) {
        throw new Error(`Webhook signature verification failed: ${err}`);
      }
      
      // Handle different event types
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          const userId = parseInt(session.metadata?.userId || "0");
          const tier = session.metadata?.tier as "seeker" | "initiate" | "elder";
          
          if (userId && tier && session.subscription) {
            await db.updateUserSubscription(userId, {
              stripeSubscriptionId: session.subscription as string,
              subscriptionTier: tier,
              subscriptionStatus: "active",
            });
          }
          break;
        }
        
        case "customer.subscription.updated": {
          const subscription = event.data.object as Stripe.Subscription;
          const userId = parseInt(subscription.metadata?.userId || "0");
          
          if (userId) {
            await db.updateUserSubscription(userId, {
              subscriptionStatus: subscription.status as any,
              subscriptionEndsAt: subscription.cancel_at 
                ? new Date(subscription.cancel_at * 1000) 
                : null,
            });
          }
          break;
        }
        
        case "customer.subscription.deleted": {
          const subscription = event.data.object as Stripe.Subscription;
          const userId = parseInt(subscription.metadata?.userId || "0");
          
          if (userId) {
            await db.updateUserSubscription(userId, {
              subscriptionTier: "free",
              subscriptionStatus: "canceled",
              stripeSubscriptionId: null,
            });
          }
          break;
        }
        
        case "invoice.payment_failed": {
          const invoice = event.data.object as Stripe.Invoice;
          const subscriptionId = (invoice as any).subscription as string | undefined;
          
          if (!subscriptionId) break;
          
          // Find user by subscription ID and update status
          const user = await db.getUserByStripeSubscription(subscriptionId);
          if (user) {
            await db.updateUserSubscription(user.id, {
              subscriptionStatus: "past_due",
            });
          }
          break;
        }
      }
      
      return { received: true };
    }),
});
