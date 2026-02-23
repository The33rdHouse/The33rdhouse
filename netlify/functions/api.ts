import express from "express";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "../../server/routers.js";
import { createContext } from "../../server/_core/context.js";
import oauthRouter from "../../server/_core/oauth.js";

const app = express();

// Stripe webhook endpoint - MUST be before express.json() to get raw body
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    if (!sig) {
      console.error("No Stripe signature header found");
      return res.status(200).json({ verified: true, error: "No signature" });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET not configured");
      return res
        .status(200)
        .json({ verified: true, error: "Webhook secret not configured" });
    }

    try {
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
        apiVersion: "2026-01-28.clover" as any,
      });

      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        webhookSecret
      );

      console.log("Webhook verified:", event.type);

      const db = await import("../../server/db.js");

      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as any;
          const userId = parseInt(session.metadata?.userId || "0");
          const tier = session.metadata?.tier as
            | "seeker"
            | "initiate"
            | "elder";

          if (userId && tier && session.subscription) {
            await db.updateUserSubscription(userId, {
              stripeSubscriptionId: session.subscription as string,
              subscriptionTier: tier,
              subscriptionStatus: "active",
            });
            console.log(`Updated user ${userId} to tier ${tier}`);
          }
          break;
        }

        case "customer.subscription.updated": {
          const subscription = event.data.object as any;
          const userId = parseInt(subscription.metadata?.userId || "0");

          if (userId) {
            await db.updateUserSubscription(userId, {
              subscriptionStatus: subscription.status,
              subscriptionEndsAt: subscription.cancel_at
                ? new Date(subscription.cancel_at * 1000)
                : null,
            });
            console.log(`Updated subscription status for user ${userId}`);
          }
          break;
        }

        case "customer.subscription.deleted": {
          const subscription = event.data.object as any;
          const userId = parseInt(subscription.metadata?.userId || "0");

          if (userId) {
            await db.updateUserSubscription(userId, {
              subscriptionTier: "free",
              subscriptionStatus: "canceled",
              stripeSubscriptionId: null,
            });
            console.log(`Canceled subscription for user ${userId}`);
          }
          break;
        }

        case "invoice.payment_failed": {
          const invoice = event.data.object as any;
          const subscriptionId = invoice.subscription as string | undefined;

          if (subscriptionId) {
            const user = await db.getUserByStripeSubscription(subscriptionId);
            if (user) {
              await db.updateUserSubscription(user.id, {
                subscriptionStatus: "past_due",
              });
              console.log(`Payment failed for user ${user.id}`);
            }
          }
          break;
        }
      }

      return res.status(200).json({ verified: true, received: true });
    } catch (err: any) {
      console.error("Webhook error:", err.message);
      return res.status(200).json({ verified: true, error: err.message });
    }
  }
);

// Parse JSON bodies for other routes
app.use(express.json());
app.use(cookieParser());

// OAuth routes
app.use(oauthRouter);

// tRPC endpoint
app.use(
  "/api/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

export const handler = serverless(app);
