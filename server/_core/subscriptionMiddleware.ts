import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "./trpc";

/**
 * Subscription tier levels (higher number = higher tier)
 */
const TIER_LEVELS = {
  free: 0,
  seeker: 1,
  initiate: 2,
  elder: 3,
} as const;

type SubscriptionTier = keyof typeof TIER_LEVELS;

/**
 * Check if user has required subscription tier
 */
export function hasRequiredTier(
  userTier: string | null | undefined,
  requiredTier: SubscriptionTier
): boolean {
  const userLevel = TIER_LEVELS[(userTier as SubscriptionTier) || 'free'];
  const requiredLevel = TIER_LEVELS[requiredTier];
  return userLevel >= requiredLevel;
}

/**
 * Get tier display name
 */
export function getTierDisplayName(tier: string | null | undefined): string {
  const tierMap: Record<string, string> = {
    free: 'Seeker (Free)',
    seeker: 'Initiate',
    initiate: 'Adept',
    elder: 'Elder',
  };
  return tierMap[tier || 'free'] || 'Seeker (Free)';
}

/**
 * Middleware to require specific subscription tier
 */
export function requiresTier(tier: SubscriptionTier) {
  return protectedProcedure.use(({ ctx, next }) => {
    if (!hasRequiredTier(ctx.user.subscriptionTier, tier)) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `This feature requires ${getTierDisplayName(tier)} tier or higher. Your current tier: ${getTierDisplayName(ctx.user.subscriptionTier)}`,
      });
    }
    return next({ ctx });
  });
}

/**
 * Pre-configured procedures for each tier
 */
export const seekerProcedure = requiresTier('seeker');
export const initiateProcedure = requiresTier('initiate');
export const elderProcedure = requiresTier('elder');

/**
 * Require any paid tier (not free)
 */
export const paidProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.subscriptionTier === 'free' || !ctx.user.subscriptionTier) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'This feature requires a paid subscription. Please upgrade to access this content.',
    });
  }
  return next({ ctx });
});
