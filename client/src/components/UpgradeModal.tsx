import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Sparkles, Star } from "lucide-react";
import { Link } from "wouter";
import { SUBSCRIPTION_TIERS } from "@shared/subscriptionTiers";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: string;
  requiredTier: 'seeker' | 'initiate' | 'elder';
  currentTier?: string;
}

export function UpgradeModal({ open, onOpenChange, feature, requiredTier, currentTier = 'free' }: UpgradeModalProps) {
  const tierConfig = SUBSCRIPTION_TIERS[requiredTier.toUpperCase() as keyof typeof SUBSCRIPTION_TIERS];
  
  const featureDescriptions: Record<string, string> = {
    innerCircle: "Access the complete 48-week Inner Circle curriculum with guided teachings, somatic practices, and shadow work for all 12 Gates.",
    aiChatbot: "Get personalized spiritual guidance with our AI-powered chatbot that understands The 33rd House teachings and can answer your questions 24/7.",
    chartography: "Book personalized Chartography readings that map your unique path through the 144 realms based on your birth chart and life stage.",
    fullBooks: "Access the complete library of 71 books covering energy systems, sacred principles, and deep teachings for each gate and realm.",
    audioMeditations: "Listen to guided audio meditations for all 144 realms, helping you integrate the teachings through somatic practice.",
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-gradient-to-b from-purple-950/95 to-black border-purple-600/50">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
              {requiredTier === 'elder' && <Crown className="w-5 h-5 text-white" />}
              {requiredTier === 'initiate' && <Star className="w-5 h-5 text-white" />}
              {requiredTier === 'seeker' && <Sparkles className="w-5 h-5 text-white" />}
            </div>
            <Badge className="bg-purple-600 text-white">
              {tierConfig.name} Required
            </Badge>
          </div>
          <DialogTitle className="text-2xl font-serif text-purple-200">
            Upgrade to Access {feature}
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-base">
            {featureDescriptions[feature] || "This feature requires a higher subscription tier to access."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Recommended Tier */}
          <Card className="bg-gradient-to-br from-purple-900/40 to-black border-purple-600/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-serif text-purple-200">
                  {tierConfig.name}
                </CardTitle>
                <div className="text-2xl font-bold text-white">
                  ${tierConfig.price}<span className="text-sm text-gray-400">/mo</span>
                </div>
              </div>
              <CardDescription className="text-gray-400">
                Unlock this feature and more
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-gray-300">
                {tierConfig.features.slice(0, 5).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                {tierConfig.features.length > 5 && (
                  <li className="text-xs text-gray-500">
                    + {tierConfig.features.length - 5} more features
                  </li>
                )}
              </ul>
              
              <div className="flex gap-3 pt-2">
                <Link href="/bigger-picture" className="flex-1">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => onOpenChange(false)}
                  >
                    Upgrade Now
                  </Button>
                </Link>
                <Link href="/bigger-picture" className="flex-1">
                  <Button 
                    variant="outline" 
                    className="w-full border-purple-600 text-purple-300 hover:bg-purple-950/50"
                    onClick={() => onOpenChange(false)}
                  >
                    Compare All Tiers
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Current Tier Info */}
          <div className="text-center text-sm text-gray-400">
            <p>
              Your current tier: <span className="text-purple-300 font-medium">
                {SUBSCRIPTION_TIERS[currentTier.toUpperCase() as keyof typeof SUBSCRIPTION_TIERS]?.name || 'Seeker (Free)'}
              </span>
            </p>
            <p className="mt-1">
              Upgrade anytime • Cancel anytime • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
