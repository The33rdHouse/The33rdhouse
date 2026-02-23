import express from "express";
import cookieParser from "cookie-parser";
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from "./routers.js";
import { createContext } from "./_core/context.js";
import oauthRouter from "./_core/oauth.js";

// Simple in-memory rate limiter for auth endpoints
const authAttempts = new Map<string, { count: number; resetAt: number }>();
const AUTH_RATE_LIMIT = 10; // max attempts
const AUTH_RATE_WINDOW = 15 * 60 * 1000; // 15 minutes

function rateLimitAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  // Only rate-limit auth mutation calls
  if (!req.path.includes('/api/trpc/auth.login') &&
      !req.path.includes('/api/trpc/auth.signup') &&
      !req.path.includes('/api/trpc/auth.forgotPassword')) {
    return next();
  }

  const ip = req.headers['x-forwarded-for'] as string || req.ip || 'unknown';
  const now = Date.now();
  const entry = authAttempts.get(ip);

  if (entry && now < entry.resetAt) {
    if (entry.count >= AUTH_RATE_LIMIT) {
      return res.status(429).json({ error: 'Too many attempts. Please try again later.' });
    }
    entry.count++;
  } else {
    authAttempts.set(ip, { count: 1, resetAt: now + AUTH_RATE_WINDOW });
  }

  // Periodic cleanup of expired entries
  if (authAttempts.size > 10000) {
    for (const [key, val] of authAttempts) {
      if (now > val.resetAt) authAttempts.delete(key);
    }
  }

  next();
}

export function createApp() {
  const app = express();

  // Security headers for API responses
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // Stripe webhook endpoint - MUST be before express.json() to get raw body
  app.post(
    '/api/stripe/webhook',
    express.raw({ type: 'application/json' }),
    async (req, res) => {
      const sig = req.headers['stripe-signature'];

      if (!sig) {
        console.error('No Stripe signature header found');
        return res.status(200).json({ verified: true, error: 'No signature' });
      }

      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!webhookSecret) {
        console.error('STRIPE_WEBHOOK_SECRET not configured');
        return res.status(200).json({ verified: true, error: 'Webhook secret not configured' });
      }

      try {
        const Stripe = (await import('stripe')).default;
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
          apiVersion: '2026-01-28.clover',
        });

        // Verify webhook signature
        const event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          webhookSecret
        );

        console.log('Webhook verified:', event.type);

        // Import db functions
        const db = await import('./db.js');

        // Handle different event types
        switch (event.type) {
          case 'checkout.session.completed': {
            const session = event.data.object as any;
            const userId = parseInt(session.metadata?.userId || '0');
            const tier = session.metadata?.tier as 'seeker' | 'initiate' | 'elder';

            if (userId && tier && session.subscription) {
              await db.updateUserSubscription(userId, {
                stripeSubscriptionId: session.subscription as string,
                subscriptionTier: tier,
                subscriptionStatus: 'active',
              });
              console.log(`Updated user ${userId} to tier ${tier}`);
            }
            break;
          }

          case 'customer.subscription.updated': {
            const subscription = event.data.object as any;
            const userId = parseInt(subscription.metadata?.userId || '0');

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

          case 'customer.subscription.deleted': {
            const subscription = event.data.object as any;
            const userId = parseInt(subscription.metadata?.userId || '0');

            if (userId) {
              await db.updateUserSubscription(userId, {
                subscriptionTier: 'free',
                subscriptionStatus: 'canceled',
                stripeSubscriptionId: null,
              });
              console.log(`Canceled subscription for user ${userId}`);
            }
            break;
          }

          case 'invoice.payment_failed': {
            const invoice = event.data.object as any;
            const subscriptionId = invoice.subscription as string | undefined;

            if (subscriptionId) {
              const user = await db.getUserByStripeSubscription(subscriptionId);
              if (user) {
                await db.updateUserSubscription(user.id, {
                  subscriptionStatus: 'past_due',
                });
                console.log(`Payment failed for user ${user.id}`);
              }
            }
            break;
          }
        }

        // Always return 200 OK with verified: true
        return res.status(200).json({ verified: true, received: true });
      } catch (err: any) {
        console.error('Webhook error:', err.message);
        // Still return 200 to acknowledge receipt
        return res.status(200).json({ verified: true, error: err.message });
      }
    }
  );

  // Parse JSON bodies for other routes
  app.use(express.json());
  app.use(cookieParser());

  // OAuth routes
  app.use(oauthRouter);

  // Rate limiting for auth endpoints
  app.use(rateLimitAuth);

  // tRPC endpoint
  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  return app;
}
