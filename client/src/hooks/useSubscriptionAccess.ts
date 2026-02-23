import { useAuth } from "./useAuth";
import { canAccessFeature, getTierLevel } from "@shared/subscriptionTiers";

export type FeatureName = 'innerCircle' | 'aiChatbot' | 'chartography' | 'fullBooks' | 'audioMeditations';

export function useSubscriptionAccess() {
  const { user, isAuthenticated, loading } = useAuth();
  
  const userTier = user?.subscriptionTier || 'free';
  
  /**
   * Check if user can access a specific feature
   */
  const hasAccess = (feature: FeatureName): boolean => {
    if (!isAuthenticated) return false;
    return canAccessFeature(userTier, feature);
  };
  
  /**
   * Get the minimum tier required for a feature
   */
  const getRequiredTier = (feature: FeatureName): string => {
    const featureTiers: Record<FeatureName, string> = {
      innerCircle: 'seeker',
      aiChatbot: 'initiate',
      chartography: 'seeker',
      fullBooks: 'seeker',
      audioMeditations: 'seeker',
    };
    return featureTiers[feature];
  };
  
  /**
   * Check if user can upgrade to a specific tier
   */
  const canUpgradeTo = (targetTier: string): boolean => {
    return getTierLevel(targetTier) > getTierLevel(userTier);
  };
  
  /**
   * Get user's current tier level (0-3)
   */
  const currentTierLevel = getTierLevel(userTier);
  
  /**
   * Check if user has any paid subscription
   */
  const hasPaidSubscription = userTier !== 'free';
  
  return {
    userTier,
    currentTierLevel,
    hasPaidSubscription,
    hasAccess,
    getRequiredTier,
    canUpgradeTo,
    loading,
    isAuthenticated,
  };
}
