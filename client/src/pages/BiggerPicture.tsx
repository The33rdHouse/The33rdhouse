import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Sparkles, Crown, Flame } from "lucide-react";
import { SEO } from "@/components/SEO";
import Navigation from "@/components/Navigation";
import { SUBSCRIPTION_TIERS } from "@shared/subscriptionTiers";

export default function BiggerPicture() {
  return (
    <>
      <Navigation />
      <SEO 
        title="The Bigger Picture | The 33rd House"
        description="Understand the complete 500-year journey through 12 Gates, 144 Realms, and 5 Degrees of Initiation. A comprehensive map of consciousness transformation created by Daniel Cruze."
      />
      
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-black to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),transparent_70%)]" />
          
          <div className="container relative z-10 max-w-5xl mx-auto text-center space-y-8">
            <Badge variant="outline" className="text-xs font-mono tracking-widest uppercase border-purple-500/50 text-purple-300">
              The Complete System
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
              <span className="block bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 bg-clip-text text-transparent">
                The Bigger Picture
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A complete map of the 500-year initiatic journey through consciousness transformation—
              from the first awakening to the final return.
            </p>
          </div>
        </section>

        {/* The Journey Overview */}
        <section className="py-24 px-4 bg-gradient-to-b from-black via-indigo-950/10 to-black">
          <div className="container max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-purple-200">
                The 500-Year Journey
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The 33rd House is not a place but a state of consciousness—the threshold where 
                the seeker becomes the finder. This is the complete architecture of transformation.
              </p>
            </div>

            {/* Three Pillars */}
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-black/60 border-purple-900/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="text-5xl font-bold text-purple-400 mb-2">12</div>
                  <CardTitle className="text-2xl font-serif text-purple-200">Star Gates</CardTitle>
                  <CardDescription className="text-gray-400">
                    Archetypal Thresholds
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-2">
                  <p>
                    Twelve fundamental principles of existence—from Origin to Return. 
                    Each gate represents a complete world of transformation.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• Gate 1: Origin (Realms 1-12)</li>
                    <li>• Gate 2: Awakening (Realms 13-24)</li>
                    <li>• Gate 3: Descent (Realms 25-36)</li>
                    <li>• ... through to Gate 12: Return</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-purple-900/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="text-5xl font-bold text-purple-400 mb-2">144</div>
                  <CardTitle className="text-2xl font-serif text-purple-200">Realms</CardTitle>
                  <CardDescription className="text-gray-400">
                    Stages of Transformation
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-2">
                  <p>
                    Specific stages of consciousness evolution, each with its own glyph, 
                    mythology, psychology, and practices.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• Mythic layer (archetypal stories)</li>
                    <li>• Psychological layer (shadow work)</li>
                    <li>• Hybrid layer (integration)</li>
                    <li>• Somatic practices & meditations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-purple-900/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="text-5xl font-bold text-purple-400 mb-2">5</div>
                  <CardTitle className="text-2xl font-serif text-purple-200">Degrees</CardTitle>
                  <CardDescription className="text-gray-400">
                    Levels of Initiation
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-2">
                  <p>
                    Five degrees of mastery spanning 500 years of conscious evolution—
                    from Neophyte to Keeper.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• Neophyte (Years 1-100)</li>
                    <li>• Adept (Years 101-200)</li>
                    <li>• Master (Years 201-300)</li>
                    <li>• Elder (Years 301-400)</li>
                    <li>• Keeper (Years 401-500)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It All Connects */}
        <section className="py-24 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black">
          <div className="container max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-purple-200">
                How It All Connects
              </h2>
              <p className="text-xl text-gray-300">
                The Inner Circle curriculum, book library, and Chartography readings 
                all serve the same journey through the 144 realms.
              </p>
            </div>

            <div className="space-y-8">
              <Card className="bg-gradient-to-r from-purple-950/30 to-black border-purple-900/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-purple-200 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    Inner Circle (48-Week Curriculum)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-3">
                  <p>
                    A guided 12-month journey through the first 12 gates (one gate per month). 
                    Each month includes 4 weeks of video teachings, somatic practices, shadow work, 
                    and integration exercises.
                  </p>
                  <p className="text-sm text-gray-400">
                    Perfect for: New initiates who want structured guidance through their first year
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-950/30 to-black border-purple-900/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-purple-200 flex items-center gap-2">
                    <Flame className="w-6 h-6 text-purple-400" />
                    Book Library (71 Books)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-3">
                  <p>
                    Complete teachings on the energy body (Kundalini, Nadis, Chakras), the 12 Sacred Principles, 
                    the Order of the Vessel & Flame, and deep dives into each gate and realm.
                  </p>
                  <p className="text-sm text-gray-400">
                    Perfect for: Self-directed study and deep exploration of specific teachings
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-950/30 to-black border-purple-900/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-purple-200 flex items-center gap-2">
                    <Star className="w-6 h-6 text-purple-400" />
                    Chartography Readings
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-3">
                  <p>
                    Personalized readings that map your unique path through the 144 realms based on 
                    your birth chart, current life stage, and specific questions. Reveals which gates 
                    and realms are most active in your journey right now.
                  </p>
                  <p className="text-sm text-gray-400">
                    Perfect for: Understanding your personal timing and focus areas
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Membership Tiers */}
        <section className="py-24 px-4 bg-gradient-to-b from-black via-indigo-950/10 to-black">
          <div className="container max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-purple-200">
                Choose Your Path
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Four tiers designed to meet you wherever you are on the journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Free Tier */}
              <Card className="bg-black/60 border-purple-900/30 backdrop-blur-sm flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">Free</Badge>
                  </div>
                  <CardTitle className="text-2xl font-serif text-purple-200">
                    {SUBSCRIPTION_TIERS.FREE.name}
                  </CardTitle>
                  <div className="text-3xl font-bold text-white mt-2">
                    $0<span className="text-lg text-gray-400">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <ul className="space-y-2 text-sm text-gray-300">
                    {SUBSCRIPTION_TIERS.FREE.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button variant="outline" className="w-full border-purple-600 text-purple-300 hover:bg-purple-950/50">
                      Start Free
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Seeker Tier */}
              <Card className="bg-black/60 border-purple-900/30 backdrop-blur-sm flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-purple-600 text-white">Most Popular</Badge>
                  </div>
                  <CardTitle className="text-2xl font-serif text-purple-200">
                    {SUBSCRIPTION_TIERS.SEEKER.name}
                  </CardTitle>
                  <div className="text-3xl font-bold text-white mt-2">
                    ${SUBSCRIPTION_TIERS.SEEKER.price}<span className="text-lg text-gray-400">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <ul className="space-y-2 text-sm text-gray-300">
                    {SUBSCRIPTION_TIERS.SEEKER.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      Start Journey
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Initiate Tier */}
              <Card className="bg-black/60 border-purple-900/30 backdrop-blur-sm flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">Advanced</Badge>
                  </div>
                  <CardTitle className="text-2xl font-serif text-purple-200">
                    {SUBSCRIPTION_TIERS.INITIATE.name}
                  </CardTitle>
                  <div className="text-3xl font-bold text-white mt-2">
                    ${SUBSCRIPTION_TIERS.INITIATE.price}<span className="text-lg text-gray-400">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <ul className="space-y-2 text-sm text-gray-300">
                    {SUBSCRIPTION_TIERS.INITIATE.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button variant="outline" className="w-full border-purple-600 text-purple-300 hover:bg-purple-950/50">
                      Upgrade
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Elder Tier */}
              <Card className="bg-gradient-to-b from-purple-950/40 to-black border-purple-600/50 backdrop-blur-sm flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      Elite
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-serif text-purple-200">
                    {SUBSCRIPTION_TIERS.ELDER.name}
                  </CardTitle>
                  <div className="text-3xl font-bold text-white mt-2">
                    ${SUBSCRIPTION_TIERS.ELDER.price}<span className="text-lg text-gray-400">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <ul className="space-y-2 text-sm text-gray-300">
                    {SUBSCRIPTION_TIERS.ELDER.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white">
                      Join Elite
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 bg-gradient-to-b from-black via-purple-950/20 to-black">
          <div className="container max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-purple-200">
              Ready to Begin?
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              The gates are open. The glyphs await. The journey of 500 years begins with a single step 
              across the threshold.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/signup">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6">
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/chartography">
                <Button size="lg" variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-950/50 text-lg px-8 py-6">
                  Book a Reading
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
