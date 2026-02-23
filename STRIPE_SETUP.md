# Stripe Setup Guide for The 33rd House

## Overview

The 33rd House uses Stripe for subscription billing and one-time product purchases. This guide will help you set up your Stripe products and prices.

## Step 1: Claim Your Stripe Sandbox

Your Stripe test sandbox has been created. You need to claim it before **2026-02-04** at:
https://dashboard.stripe.com/claim_sandbox/YWNjdF8xU1p3aGpEdmd1UmpEdkJpLDE3NjU2Mjc3NzEv100vdd9JrFH

## Step 2: Create Subscription Products

Log in to your Stripe Dashboard → Products → Create Product

### Product 1: Seeker Tier
- **Name**: The 33rd House - Seeker
- **Description**: Access to Gates 1-4 (48 realms) with AI-powered insights and guided meditation
- **Pricing**: $27/month recurring
- **After creating**, copy the Price ID (starts with `price_`) and add to Settings → Payment in Manus

### Product 2: Adept Tier
- **Name**: The 33rd House - Adept
- **Description**: Access to Gates 1-9 (108 realms) with Inner Circle curriculum and unlimited AI chatbot
- **Pricing**: $97/month recurring
- **After creating**, copy the Price ID and add to Settings → Payment

### Product 3: Master Tier
- **Name**: The 33rd House - Master
- **Description**: Full access to all 144 realms with 1-on-1 guidance and premium AI features
- **Pricing**: $297/month recurring
- **After creating**, copy the Price ID and add to Settings → Payment

## Step 3: Create One-Time Products (Optional)

### Product 4: Complete Guide
- **Name**: The Complete Guide to The 33rd House
- **Description**: Comprehensive 500-page guide covering all 12 Gates and 144 Realms
- **Pricing**: $97 one-time payment
- **Copy Price ID** after creating

### Product 5: Meditation Audio Pack
- **Name**: 144 Realms Meditation Audio Pack
- **Description**: Complete collection of guided meditation audio for all 144 realms
- **Pricing**: $197 one-time payment
- **Copy Price ID** after creating

### Product 6: Inner Circle Curriculum
- **Name**: Inner Circle 12-Month Curriculum
- **Description**: Complete 48-week curriculum with video lessons and practices
- **Pricing**: $497 one-time payment
- **Copy Price ID** after creating

### Product 7: Glyph Oracle Deck
- **Name**: The 144 Glyph Oracle Deck (Digital)
- **Description**: Digital oracle deck featuring all 144 realm glyphs with interpretations
- **Pricing**: $47 one-time payment
- **Copy Price ID** after creating

## Step 4: Configure Environment Variables

In Manus Management UI → Settings → Payment, add these Price IDs:

```
STRIPE_PRICE_SEEKER=price_xxxxxxxxxxxxx
STRIPE_PRICE_ADEPT=price_xxxxxxxxxxxxx
STRIPE_PRICE_MASTER=price_xxxxxxxxxxxxx
STRIPE_PRICE_COMPLETE_GUIDE=price_xxxxxxxxxxxxx
STRIPE_PRICE_MEDITATION_PACK=price_xxxxxxxxxxxxx
STRIPE_PRICE_INNER_CIRCLE=price_xxxxxxxxxxxxx
STRIPE_PRICE_GLYPH_DECK=price_xxxxxxxxxxxxx
```

## Step 5: Set Up Webhooks

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "+ Add endpoint"
3. Enter your webhook URL: `https://33rdhouse.com/api/stripe/webhook`
4. Select these events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
5. Copy the Webhook Signing Secret (starts with `whsec_`)
6. Add it to Settings → Payment as `STRIPE_WEBHOOK_SECRET`

## Step 6: Test Payments

Use these test card numbers in test mode:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

Any future expiration date and any 3-digit CVC will work.

## Step 7: Go Live

1. Complete Stripe KYC verification
2. Get your live API keys from Stripe Dashboard
3. Replace test keys with live keys in Settings → Payment
4. Test with the 99% discount promo code (minimum $0.50 USD)
5. Launch! 🚀

## Subscription Tier Access Levels

| Tier | Price | Realms Access | Features |
|------|-------|---------------|----------|
| Free | $0 | 12 (Gate 1) | Basic tracking, community |
| Seeker | $27/mo | 48 (Gates 1-4) | AI insights, audio, summaries |
| Adept | $97/mo | 108 (Gates 1-9) | Inner Circle, unlimited AI |
| Master | $297/mo | 144 (All gates) | 1-on-1 guidance, premium AI |

## Support

If you encounter any issues:
1. Check Settings → Payment in Manus Management UI
2. Review Stripe Dashboard → Developers → Webhooks for event delivery
3. Contact Manus support at https://help.manus.im
