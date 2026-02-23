import { useState } from "react";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, MapPin, Calendar, Clock, Sparkles, Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useSubscriptionAccess } from "@/hooks/useSubscriptionAccess";
import { UpgradeModal } from "@/components/UpgradeModal";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

export default function Chartography() {
  const { isAuthenticated, user } = useAuth();
  const { hasPaidSubscription, userTier } = useSubscriptionAccess();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Form state
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthLocation, setBirthLocation] = useState("");
  const [primaryQuestion, setPrimaryQuestion] = useState("");
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");

  const createBooking = trpc.chartography.createBooking.useMutation({
    onSuccess: (data) => {
      toast.success("Booking created! Redirecting to payment...");
      // Redirect to Stripe checkout would happen here
      console.log("Payment intent:", data.clientSecret);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create booking");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!birthDate || !birthTime || !birthLocation) {
      toast.error("Please fill in all required fields");
      return;
    }

    createBooking.mutate({
      birthDate,
      birthTime,
      birthLocation,
      primaryQuestion: primaryQuestion || undefined,
      focusAreas: focusAreas.length > 0 ? focusAreas : undefined,
      additionalNotes: additionalNotes || undefined,
    });
  };

  const toggleFocusArea = (area: string) => {
    setFocusAreas(prev => 
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const focusAreaOptions = [
    "Life Purpose & Direction",
    "Relationships & Partnerships",
    "Career & Vocation",
    "Spiritual Awakening",
    "Shadow Work & Integration",
    "Health & Vitality",
    "Creativity & Expression",
    "Financial Abundance",
  ];

  return (
    <>
      <Navigation />
      <SEO 
        title="Chartography Readings | The 33rd House"
        description="Personalized Chartography readings that map your unique path through the 144 realms based on your birth chart and life stage."
      />

      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-black to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),transparent_70%)]" />
          
          <div className="container relative z-10 max-w-5xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-8 h-8 text-purple-400" />
              <Badge variant="outline" className="text-xs font-mono tracking-widest uppercase border-purple-500/50 text-purple-300">
                Personalized Guidance
              </Badge>
              <Star className="w-8 h-8 text-purple-400" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold leading-tight">
              <span className="block bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 bg-clip-text text-transparent">
                Chartography Readings
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A comprehensive natal chart analysis mapping your cosmic blueprint through the 144 realms. 
              Like astrology meets sacred cartography—revealing your soul's journey through gates, houses, and consciousness portals.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400">$197</div>
                <div className="text-sm text-gray-400">One-time payment</div>
              </div>
              <div className="h-12 w-px bg-purple-900/50" />
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400">60-90</div>
                <div className="text-sm text-gray-400">Minutes reading</div>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Receive */}
        <section className="py-24 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-purple-200 text-center mb-8 sm:mb-12">
              What You'll Receive
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <Card className="bg-black/60 border-purple-900/30">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-serif text-purple-200">
                    Your Personal Map
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>
                    Your complete natal chart mapped through The 33rd House system—showing planetary placements, 
                    gate activations, realm transits, and your unique consciousness blueprint from birth.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-purple-900/30">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-serif text-purple-200">
                    Personalized Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>
                    Personalized guidance based on your chart—specific practices, shadow work, and somatic exercises 
                    aligned with your planetary patterns, gate activations, and current life transits.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-purple-900/30">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-serif text-purple-200">
                    Timing & Cycles
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>
                    Detailed transit forecasts showing when planetary movements activate specific gates in your chart, 
                    plus timing guidance for major initiations, shadow work periods, and consciousness expansions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-4">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-purple-200 text-center mb-8 sm:mb-12">
              How It Works
            </h2>

            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "Submit Your Information",
                  description: "Provide your birth date, time, location, and the questions you're currently holding. The more specific, the more personalized your reading."
                },
                {
                  step: 2,
                  title: "Daniel Creates Your Chart",
                  description: "Using Chartography (a synthesis of astrology, Human Design, and the 144 realms), Daniel maps your unique path and prepares your personalized reading."
                },
                {
                  step: 3,
                  title: "Receive Your Reading",
                  description: "Within 7-10 days, you'll receive a comprehensive PDF document (15-25 pages) with your chart, interpretations, and personalized guidance."
                },
                {
                  step: 4,
                  title: "Optional Follow-Up",
                  description: "Schedule an optional 30-minute video call with Daniel to discuss your reading and ask questions (available for Elder tier members or $97 add-on)."
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-purple-200 mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form or CTA */}
        <section className="py-24 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black">
          <div className="container max-w-3xl mx-auto">
            {!isAuthenticated ? (
              <Card className="bg-black/60 border-purple-900/30 text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-serif text-purple-200">
                    Ready to Begin?
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    Create a free account to book your Chartography reading
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => window.location.href = getLoginUrl()}
                  >
                    Sign Up to Book Reading
                  </Button>
                </CardContent>
              </Card>
            ) : !hasPaidSubscription ? (
              <Card className="bg-black/60 border-purple-900/30 text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-serif text-purple-200">
                    Upgrade to Book
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    Chartography readings are available to paid members
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => setShowUpgradeModal(true)}
                  >
                    View Membership Options
                  </Button>
                </CardContent>
              </Card>
            ) : !showBookingForm ? (
              <Card className="bg-black/60 border-purple-900/30 text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-serif text-purple-200">
                    Book Your Reading
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    Begin your personalized Chartography journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => setShowBookingForm(true)}
                  >
                    Start Booking Form
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-black/60 border-purple-900/30">
                <CardHeader>
                  <CardTitle className="text-3xl font-serif text-purple-200">
                    Booking Form
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Please provide your birth information and questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Birth Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-purple-200 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Birth Information
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="birthDate" className="text-gray-300">
                            Birth Date <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="birthDate"
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            required
                            className="bg-black/40 border-purple-900/50 text-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="birthTime" className="text-gray-300">
                            Birth Time <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="birthTime"
                            type="time"
                            value={birthTime}
                            onChange={(e) => setBirthTime(e.target.value)}
                            required
                            className="bg-black/40 border-purple-900/50 text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="birthLocation" className="text-gray-300">
                          Birth Location (City, Country) <span className="text-red-400">*</span>
                        </Label>
                        <Input
                          id="birthLocation"
                          type="text"
                          placeholder="e.g., Sydney, Australia"
                          value={birthLocation}
                          onChange={(e) => setBirthLocation(e.target.value)}
                          required
                          className="bg-black/40 border-purple-900/50 text-white"
                        />
                      </div>
                    </div>

                    {/* Questions & Focus */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-purple-200 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Your Questions & Focus
                      </h3>

                      <div className="space-y-2">
                        <Label htmlFor="primaryQuestion" className="text-gray-300">
                          Primary Question (optional)
                        </Label>
                        <Textarea
                          id="primaryQuestion"
                          placeholder="What is the most important question you're holding right now?"
                          value={primaryQuestion}
                          onChange={(e) => setPrimaryQuestion(e.target.value)}
                          rows={3}
                          className="bg-black/40 border-purple-900/50 text-white"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-gray-300">Focus Areas (select all that apply)</Label>
                        <div className="grid md:grid-cols-2 gap-3">
                          {focusAreaOptions.map((area) => (
                            <div key={area} className="flex items-center space-x-2">
                              <Checkbox
                                id={area}
                                checked={focusAreas.includes(area)}
                                onCheckedChange={() => toggleFocusArea(area)}
                                className="border-purple-600"
                              />
                              <label
                                htmlFor={area}
                                className="text-sm text-gray-300 cursor-pointer"
                              >
                                {area}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additionalNotes" className="text-gray-300">
                          Additional Notes (optional)
                        </Label>
                        <Textarea
                          id="additionalNotes"
                          placeholder="Any additional context or information you'd like to share..."
                          value={additionalNotes}
                          onChange={(e) => setAdditionalNotes(e.target.value)}
                          rows={4}
                          className="bg-black/40 border-purple-900/50 text-white"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4 space-y-4">
                      <div className="bg-purple-950/30 border border-purple-900/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-gray-300">
                            <p className="font-semibold text-purple-200 mb-1">Investment: $197</p>
                            <p>You'll be redirected to secure payment after submitting this form. 
                            Your reading will be delivered within 7-10 business days.</p>
                          </div>
                        </div>
                      </div>

                      <Button 
                        type="submit"
                        size="lg"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        disabled={createBooking.isLoading}
                      >
                        {createBooking.isLoading ? "Processing..." : "Proceed to Payment ($197)"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <UpgradeModal 
          open={showUpgradeModal}
          onOpenChange={setShowUpgradeModal}
          feature="chartography"
          requiredTier="seeker"
          currentTier={userTier}
        />
      </div>
    </>
  );
}
