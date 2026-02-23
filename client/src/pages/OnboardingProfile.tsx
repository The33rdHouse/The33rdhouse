import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, ArrowRight, SkipForward } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { APP_TITLE } from "@/const";

export default function OnboardingProfile() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthLocation, setBirthLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    setLocation("/login");
    return null;
  }

  const updateStepMutation = trpc.auth.updateOnboardingStep.useMutation();

  const saveBirthInfoMutation = trpc.auth.saveBirthInfo.useMutation({
    onSuccess: async () => {
      // Update onboarding step
      await updateStepMutation.mutateAsync({ step: "subscription" });
      toast.success("Profile saved successfully!");
      setLocation("/onboarding/subscription");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to save profile");
      setIsLoading(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    saveBirthInfoMutation.mutate({
      birthDate: birthDate || undefined,
      birthTime: birthTime || undefined,
      birthLocation: birthLocation || undefined,
    });
  };

  const handleSkip = () => {
    toast.info("You can add this information later in your profile");
    setLocation("/onboarding/subscription");
  };

  return (
    <>
      <SEO 
        title={`Profile Setup - ${APP_TITLE}`}
        description="Complete your profile to unlock personalized chartography"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412] text-[#f0e6d2] flex items-center justify-center px-4 py-12">
        <Card className="max-w-2xl w-full bg-gradient-to-br from-[#9333ea]/10 to-[#1a0a2e] border-2 border-[#9333ea]">
          <CardHeader>
            <div className="text-center mb-4">
              <div className="inline-block px-4 py-1 bg-[#9333ea]/20 rounded-full text-sm text-[#d4af37] mb-4">
                Step 2 of 3
              </div>
            </div>
            <CardTitle className="text-3xl text-center text-[#d4af37]">
              Create Your Cosmic Chart
            </CardTitle>
            <CardDescription className="text-center text-[#c4b5a0] text-base">
              Provide your birth details to generate your personalized chartography through The 33rd House system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Birth Date */}
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-[#c4b5a0] flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Birth Date (Optional)
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="bg-[#0a0412] border-[#d4af37] text-[#f0e6d2]"
                />
                <p className="text-xs text-[#c4b5a0]">
                  Used to calculate your unique position in the 500-year cycle
                </p>
              </div>

              {/* Birth Time */}
              <div className="space-y-2">
                <Label htmlFor="birthTime" className="text-[#c4b5a0] flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Birth Time (Optional)
                </Label>
                <Input
                  id="birthTime"
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="bg-[#0a0412] border-[#d4af37] text-[#f0e6d2]"
                />
                <p className="text-xs text-[#c4b5a0]">
                  Precise time enhances the accuracy of your chart
                </p>
              </div>

              {/* Birth Location */}
              <div className="space-y-2">
                <Label htmlFor="birthLocation" className="text-[#c4b5a0] flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Birth Location (Optional)
                </Label>
                <Input
                  id="birthLocation"
                  type="text"
                  placeholder="City, Country"
                  value={birthLocation}
                  onChange={(e) => setBirthLocation(e.target.value)}
                  className="bg-[#0a0412] border-[#d4af37] text-[#f0e6d2] placeholder:text-[#c4b5a0]/50"
                />
                <p className="text-xs text-[#c4b5a0]">
                  Geographic coordinates influence your chartography calculations
                </p>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-[#9333ea]/10 border border-[#9333ea]/30 rounded-lg">
                <p className="text-sm text-[#c4b5a0]">
                  <strong className="text-[#d4af37]">Privacy Note:</strong> Your birth information is encrypted and used solely for generating your personalized chartography. You can update or remove this information at any time.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSkip}
                  className="flex-1 border-[#9333ea] text-[#9333ea] hover:bg-[#9333ea]/10"
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  Skip for Now
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-[#9333ea] to-[#7c2dc7] hover:from-[#7c2dc7] hover:to-[#9333ea] text-white font-semibold"
                >
                  {isLoading ? "Saving..." : "Continue"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
