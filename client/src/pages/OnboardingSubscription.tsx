import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles, Crown, Flame } from "lucide-react";
import { APP_TITLE } from "@/const";

export default function OnboardingSubscription() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  if (!user) {
    setLocation("/login");
    return null;
  }

  const tiers = [
    {
      id: "seeker",
      name: "Seeker",
      price: "$33",
      period: "/month",
      icon: Sparkles,
      description: "Begin your journey through the first gates",
      features: [
        "Access to Gates 1-4 (48 Realms)",
        "12 weeks of structured curriculum",
        "Essential library (20+ books)",
        "Community forum access",
        "Basic chartography tools"
      ],
      popular: false
    },
    {
      id: "initiate",
      name: "Initiate",
      price: "$77",
      period: "/month",
      icon: Crown,
      description: "Deepen your practice with expanded access",
      features: [
        "Access to Gates 1-8 (96 Realms)",
        "24 weeks of structured curriculum",
        "Full library (60+ books)",
        "Priority community access",
        "Advanced chartography tools",
        "Monthly live sessions",
        "Personal progress tracking"
      ],
      popular: true
    },
    {
      id: "adept",
      name: "Adept",
      price: "$144",
      period: "/month",
      icon: Flame,
      description: "Complete mastery of the 500-year path",
      features: [
        "Access to all 12 Gates (144 Realms)",
        "48 weeks of structured curriculum",
        "Complete library & exclusive content",
        "Inner Circle membership",
        "Master chartography suite",
        "Weekly live sessions",
        "1-on-1 guidance sessions",
        "Lifetime access guarantee"
      ],
      popular: false
    }
  ];

  const createCheckoutMutation = trpc.stripe.createSubscriptionCheckout.useMutation({
    onSuccess: (data) => {
      // Redirect to Stripe checkout
      window.location.href = data.url;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create checkout session");
    },
  });

  const handleSelectTier = (tierId: string) => {
    setSelectedTier(tierId);
  };

  const handleContinue = async () => {
    if (selectedTier) {
      // Get Stripe price ID based on tier
      const priceIds = {
        seeker: process.env.VITE_STRIPE_SEEKER_PRICE_ID || "price_seeker",
        initiate: process.env.VITE_STRIPE_INITIATE_PRICE_ID || "price_initiate",
        adept: process.env.VITE_STRIPE_ADEPT_PRICE_ID || "price_adept",
      };

      await createCheckoutMutation.mutateAsync({
        priceId: priceIds[selectedTier as keyof typeof priceIds],
        tier: selectedTier as "seeker" | "initiate" | "elder",
      });
    } else {
      await completeOnboardingMutation.mutateAsync();
      setLocation("/dashboard");
    }
  };

  const completeOnboardingMutation = trpc.auth.completeOnboarding.useMutation();

  const handleSkip = async () => {
    await completeOnboardingMutation.mutateAsync();
    setLocation("/dashboard");
  };

  return (
    <>
      <SEO 
        title={`Choose Your Path - ${APP_TITLE}`}
        description="Select your subscription tier and begin your journey"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412] text-[#f0e6d2] px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-[#9333ea]/20 rounded-full text-sm text-[#d4af37] mb-4">
              Step 3 of 3
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#d4af37] mb-4">
              Choose Your Path
            </h1>
            <p className="text-xl text-[#c4b5a0] max-w-2xl mx-auto">
              Select the tier that aligns with your commitment to consciousness transformation
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              const isSelected = selectedTier === tier.id;
              
              return (
                <Card 
                  key={tier.id}
                  className={`relative cursor-pointer transition-all ${
                    tier.popular 
                      ? 'border-4 border-[#d4af37] shadow-2xl shadow-[#d4af37]/20 scale-105' 
                      : isSelected
                      ? 'border-2 border-[#9333ea] bg-gradient-to-br from-[#9333ea]/20 to-[#1a0a2e]'
                      : 'border-2 border-[#9333ea]/30 bg-gradient-to-br from-[#9333ea]/10 to-[#1a0a2e] hover:border-[#9333ea]'
                  }`}
                  onClick={() => handleSelectTier(tier.id)}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a0412] px-4 py-1 rounded-full text-sm font-bold">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <Icon className="w-10 h-10 text-[#d4af37]" />
                      {isSelected && (
                        <div className="p-1 bg-[#9333ea] rounded-full">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-2xl text-[#d4af37]">{tier.name}</CardTitle>
                    <CardDescription className="text-[#c4b5a0]">
                      {tier.description}
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-[#f0e6d2]">{tier.price}</span>
                      <span className="text-[#c4b5a0]">{tier.period}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-[#c4b5a0]">
                          <Check className="w-4 h-4 text-[#9333ea] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1 border-[#9333ea] text-[#9333ea] hover:bg-[#9333ea]/10"
            >
              Skip for Now
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedTier}
              className="flex-1 bg-gradient-to-r from-[#9333ea] to-[#7c2dc7] hover:from-[#7c2dc7] hover:to-[#9333ea] text-white font-semibold disabled:opacity-50"
            >
              {selectedTier ? "Continue to Payment" : "Select a Tier"}
            </Button>
          </div>

          <p className="text-center text-sm text-[#c4b5a0] mt-6">
            You can change or cancel your subscription at any time
          </p>
        </div>
      </div>
    </>
  );
}
