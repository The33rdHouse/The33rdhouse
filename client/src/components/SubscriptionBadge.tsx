import { Badge } from "@/components/ui/badge";
import { Crown, Sparkles, Star } from "lucide-react";
import { SUBSCRIPTION_TIERS } from "@shared/subscriptionTiers";

interface SubscriptionBadgeProps {
  tier: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function SubscriptionBadge({ tier, size = 'md', showIcon = true }: SubscriptionBadgeProps) {
  const tierConfig = SUBSCRIPTION_TIERS[tier.toUpperCase() as keyof typeof SUBSCRIPTION_TIERS];
  
  if (!tierConfig) {
    return null;
  }
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };
  
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };
  
  const tierStyles: Record<string, string> = {
    FREE: 'bg-gray-700 text-gray-300',
    SEEKER: 'bg-purple-600 text-white',
    INITIATE: 'bg-gradient-to-r from-purple-600 to-purple-800 text-white',
    ELDER: 'bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 text-white',
  };
  
  const tierIcons: Record<string, React.ReactNode> = {
    FREE: null,
    SEEKER: <Sparkles className={iconSizes[size]} />,
    INITIATE: <Star className={iconSizes[size]} />,
    ELDER: <Crown className={iconSizes[size]} />,
  };
  
  return (
    <Badge className={`${tierStyles[tier.toUpperCase()]} ${sizeClasses[size]} flex items-center gap-1.5`}>
      {showIcon && tierIcons[tier.toUpperCase()]}
      <span>{tierConfig.name}</span>
    </Badge>
  );
}
