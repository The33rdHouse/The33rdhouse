import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, BookOpen, Map, Users } from "lucide-react";
import { APP_TITLE, APP_LOGO } from "@/const";

export default function OnboardingWelcome() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  if (!user) {
    setLocation("/login");
    return null;
  }

  const features = [
    {
      icon: BookOpen,
      title: "Sacred Library",
      description: "Access 60+ books on consciousness transformation and esoteric wisdom"
    },
    {
      icon: Map,
      title: "12 Gates & 144 Realms",
      description: "Navigate the complete 500-year initiatic journey through structured teachings"
    },
    {
      icon: Users,
      title: "Inner Circle",
      description: "Join a community of seekers on the path of consciousness evolution"
    },
    {
      icon: Sparkles,
      title: "Personal Chartography",
      description: "Discover your unique cosmic blueprint through The 33rd House system"
    }
  ];

  return (
    <>
      <SEO 
        title={`Welcome - ${APP_TITLE}`}
        description="Welcome to The 33rd House"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412] text-[#f0e6d2] flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img src={APP_LOGO} alt={APP_TITLE} className="h-20 w-20" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#d4af37] mb-4">
              Welcome, {user.name}!
            </h1>
            <p className="text-xl text-[#c4b5a0] max-w-2xl mx-auto">
              You've taken the first step on a 500-year initiatic journey through consciousness transformation
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-[#9333ea]/10 to-[#1a0a2e] border-2 border-[#9333ea]/30">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#9333ea]/20 rounded-lg">
                        <Icon className="w-6 h-6 text-[#d4af37]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#d4af37] mb-2">{feature.title}</h3>
                        <p className="text-sm text-[#c4b5a0]">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center space-y-4">
            <Button
              onClick={() => setLocation("/onboarding/profile")}
              className="bg-gradient-to-r from-[#9333ea] to-[#7c2dc7] hover:from-[#7c2dc7] hover:to-[#9333ea] text-white font-semibold px-12 py-6 text-lg"
            >
              Continue to Profile Setup
            </Button>
            <p className="text-sm text-[#c4b5a0]">
              Step 1 of 3 • Takes about 2 minutes
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
