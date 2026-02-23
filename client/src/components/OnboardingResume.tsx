import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";

export default function OnboardingResume() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  // Don't show if onboarding is completed
  if (!user || user.onboardingCompleted) {
    return null;
  }

  // Determine which step to resume from
  const getResumeStep = () => {
    if (!user.onboardingStep || user.onboardingStep === "welcome") {
      return "/onboarding/welcome";
    }
    if (user.onboardingStep === "profile") {
      return "/onboarding/profile";
    }
    return "/onboarding/subscription";
  };

  const getProgressText = () => {
    if (!user.onboardingStep || user.onboardingStep === "welcome") {
      return "Get started with your journey";
    }
    if (user.onboardingStep === "profile") {
      return "Complete your profile setup";
    }
    return "Choose your subscription tier";
  };

  return (
    <Card className="border-purple-900/30 bg-gradient-to-br from-purple-900/20 to-black/40">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-600/20 rounded-lg">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <CardTitle className="text-purple-200">Complete Your Onboarding</CardTitle>
            <CardDescription className="text-gray-400">
              {getProgressText()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Unlock the full experience of The 33rd House
          </p>
          <Button
            onClick={() => setLocation(getResumeStep())}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
