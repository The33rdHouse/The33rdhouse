/**
 * Subscription Tier Definitions
 * 
 * Central source of truth for subscription tiers across the application.
 * Used by frontend components and backend validation.
 */

export const SUBSCRIPTION_TIERS = {
  FREE: {
    name: "Seeker (Free)",
    price: 0,
    priceId: null,
    features: [
      "Access to Gate 1: The Root",
      "Introduction to the 12 Gates",
      "Basic meditation practices",
      "Community forum access",
      "Monthly newsletter",
    ],
    limits: {
      gates: 1,
      realms: 12, // All 12 traditions for Gate 1
      books: 0,
      aiInsights: 0,
    },
  },
  SEEKER: {
    name: "Seeker",
    price: 27,
    priceId: "price_1ScIGcR3n7wkcKKB9UXRKcI2",
    features: [
      "Access to all 12 Gates",
      "144 Realms across all traditions",
      "Complete Inner Circle curriculum (48 weeks)",
      "Guided meditations and practices",
      "Sacred library access",
      "Community discussions",
      "Progress tracking dashboard",
    ],
    limits: {
      gates: 12,
      realms: 144,
      books: 100,
      aiInsights: 0,
    },
  },
  INITIATE: {
    name: "Initiate",
    price: 97,
    priceId: "price_1ScIGvR3n7wkcKKBPeyVrIUd",
    features: [
      "Everything in Seeker",
      "AI-powered insights and guidance",
      "Personalized learning pathways",
      "Advanced practices and rituals",
      "Exclusive webinars and workshops",
      "Direct messaging with facilitators",
      "Early access to new content",
    ],
    limits: {
      gates: 12,
      realms: 144,
      books: 100,
      aiInsights: 100, // 100 AI insights per month
    },
  },
  ELDER: {
    name: "Elder",
    price: 297,
    priceId: "price_1ScIHER3n7wkcKKBWYEI9yjN",
    features: [
      "Everything in Initiate",
      "Unlimited AI insights",
      "Personal 1-on-1 mentorship sessions",
      "Access to Inner Temple (advanced content)",
      "Facilitator training program",
      "Revenue sharing opportunities",
      "Lifetime access guarantee",
      "VIP community events",
    ],
    limits: {
      gates: 12,
      realms: 144,
      books: 100,
      aiInsights: -1, // Unlimited
    },
  },
} as const;

/**
 * Type definitions for subscription tiers
 */
export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;
export type SubscriptionTierConfig = typeof SUBSCRIPTION_TIERS[SubscriptionTier];

/**
 * Helper function to get tier config by key
 */
export function getTierConfig(tier: string): SubscriptionTierConfig | null {
  const upperTier = tier.toUpperCase() as SubscriptionTier;
  return SUBSCRIPTION_TIERS[upperTier] || null;
}

/**
 * Helper function to check if user has access to a feature
 */
export function hasAccess(userTier: string, requiredTier: string): boolean {
  const tierOrder: SubscriptionTier[] = ['FREE', 'SEEKER', 'INITIATE', 'ELDER'];
  const userIndex = tierOrder.indexOf(userTier.toUpperCase() as SubscriptionTier);
  const requiredIndex = tierOrder.indexOf(requiredTier.toUpperCase() as SubscriptionTier);
  
  if (userIndex === -1 || requiredIndex === -1) return false;
  return userIndex >= requiredIndex;
}

/**
 * Stripe price IDs for reference
 * 
 * These are configured in Stripe dashboard and match the priceId fields above.
 * 
 * Seeker: price_1ScIGcR3n7wkcKKB9UXRKcI2 ($27/month)
 * Initiate: price_1ScIGvR3n7wkcKKBPeyVrIUd ($97/month)
 * Elder: price_1ScIHER3n7wkcKKBWYEI9yjN ($297/month)
 */

/**
 * Get numeric tier level for comparison
 * FREE: 0, SEEKER: 1, INITIATE: 2, ELDER: 3
 */
export function getTierLevel(tier: string): number {
  const tierLevels: Record<string, number> = {
    'free': 0,
    'seeker': 1,
    'initiate': 2,
    'elder': 3,
  };
  return tierLevels[tier.toLowerCase()] ?? 0;
}

/**
 * Check if user can access a specific feature based on their tier
 */
export function canAccessFeature(userTier: string, feature: string): boolean {
  const featureTiers: Record<string, string> = {
    'innerCircle': 'seeker',
    'aiChatbot': 'initiate',
    'chartography': 'seeker',
    'fullBooks': 'seeker',
    'audioMeditations': 'seeker',
  };
  
  const requiredTier = featureTiers[feature];
  if (!requiredTier) return true; // Unknown features are accessible by default
  
  return getTierLevel(userTier) >= getTierLevel(requiredTier);
}
