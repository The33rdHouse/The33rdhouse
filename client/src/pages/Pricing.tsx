import { useState } from "react";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Crown, Sparkles, Star, X } from "lucide-react";
import { Link } from "wouter";
import { SUBSCRIPTION_TIERS } from "@shared/subscriptionTiers";
import { useAuth } from "@/hooks/useAuth";
import { useSubscriptionAccess } from "@/hooks/useSubscriptionAccess";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

export default function Pricing() {
  const { isAuthenticated, user } = useAuth();
  const { userTier } = useSubscriptionAccess();
  const [loading, setLoading] = useState<string | null>(null);

  const createCheckout = trpc.stripe.createSubscriptionCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create checkout session");
      setLoading(null);
    },
  });

  const handleSubscribe = (tier: 'seeker' | 'initiate' | 'elder', priceId: string) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    setLoading(tier);
    createCheckout.mutate({ tier, priceId });
  };

  const tiers = [
    {
      key: 'FREE',
      name: SUBSCRIPTION_TIERS.FREE.name,
      price: 0,
      description: "Start your journey with foundational teachings",
      features: SUBSCRIPTION_TIERS.FREE.features,
      cta: "Get Started Free",
      highlighted: false,
      icon: null,
    },
    {
      key: 'SEEKER',
      name: SUBSCRIPTION_TIERS.SEEKER.name,
      price: SUBSCRIPTION_TIERS.SEEKER.price,
      description: "Unlock the complete Inner Circle curriculum",
      features: SUBSCRIPTION_TIERS.SEEKER.features,
      cta: "Start Inner Circle",
      highlighted: true,
      icon: <Sparkles className="w-5 h-5" />,
      priceId: "price_1ScIGcR3n7wkcKKB9UXRKcI2", // Seeker $27/month
      tierKey: 'seeker' as const,
    },
    {
      key: 'INITIATE',
      name: SUBSCRIPTION_TIERS.INITIATE.name,
      price: SUBSCRIPTION_TIERS.INITIATE.price,
      description: "Advanced teachings with AI-powered guidance",
      features: SUBSCRIPTION_TIERS.INITIATE.features,
      cta: "Unlock AI Guidance",
      highlighted: false,
      icon: <Star className="w-5 h-5" />,
      priceId: "price_1ScIGvR3n7wkcKKBPeyVrIUd", // Adept $97/month
      tierKey: 'initiate' as const,
    },
    {
      key: 'ELDER',
      name: SUBSCRIPTION_TIERS.ELDER.name,
      price: SUBSCRIPTION_TIERS.ELDER.price,
      description: "Complete access with personal mentorship",
      features: SUBSCRIPTION_TIERS.ELDER.features,
      cta: "Join Elite Circle",
      highlighted: false,
      icon: <Crown className="w-5 h-5" />,
      priceId: "price_1ScIHER3n7wkcKKBWYEI9yjN", // Elder $297/month
      tierKey: 'elder' as const,
    },
  ];

  return (
    <>
      <Navigation />
      <SEO 
        title="Pricing | The 33rd House"
        description="Choose your path through The 33rd House. Four tiers designed to meet you wherever you are on your journey."
      />

      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-black to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),transparent_70%)]" />
          
          <div className="container relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="text-xs font-mono tracking-widest uppercase border-purple-500/50 text-purple-300">
              Flexible Pricing
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight">
              <span className="block bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 bg-clip-text text-transparent">
                Choose Your Path
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Four tiers designed to meet you wherever you are on the journey. 
              Upgrade or cancel anytime.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 px-4">
          <div className="container max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiers.map((tier) => (
                <Card 
                  key={tier.key}
                  className={`flex flex-col ${
                    tier.highlighted 
                      ? 'bg-gradient-to-b from-purple-950/60 to-black border-purple-600/50 shadow-2xl shadow-purple-900/20 scale-105' 
                      : 'bg-black/60 border-purple-900/30'
                  } backdrop-blur-sm`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-purple-600 text-white">Most Popular</Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {tier.icon && (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white">
                          {tier.icon}
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-2xl font-serif text-purple-200">
                      {tier.name}
                    </CardTitle>
                    <div className="text-4xl font-bold text-white mt-3">
                      ${tier.price}
                      {tier.price > 0 && <span className="text-lg text-gray-400">/mo</span>}
                    </div>
                    <CardDescription className="text-gray-400 mt-2">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-6 flex-1">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {tier.key === 'FREE' ? (
                      <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
                        <Button 
                          variant="outline" 
                          className="w-full border-purple-600 text-purple-300 hover:bg-purple-950/50"
                        >
                          {tier.cta}
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        className={`w-full ${
                          tier.highlighted 
                            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                            : 'bg-purple-900/50 hover:bg-purple-800/50 text-purple-200'
                        }`}
                        onClick={() => tier.tierKey && tier.priceId && handleSubscribe(tier.tierKey, tier.priceId)}
                        disabled={loading === tier.tierKey || userTier === tier.key.toLowerCase()}
                      >
                        {loading === tier.tierKey ? "Loading..." : 
                         userTier === tier.key.toLowerCase() ? "Current Plan" : 
                         tier.cta}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-24 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-purple-200 text-center mb-12">
              Feature Comparison
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-purple-900/30">
                    <th className="text-left py-4 px-4 text-purple-200 font-serif">Feature</th>
                    <th className="text-center py-4 px-4 text-purple-200">Free</th>
                    <th className="text-center py-4 px-4 text-purple-200">Initiate</th>
                    <th className="text-center py-4 px-4 text-purple-200">Adept</th>
                    <th className="text-center py-4 px-4 text-purple-200">Elder</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {[
                    { feature: "12 Gates Overview", free: true, seeker: true, initiate: true, elder: true },
                    { feature: "144 Realms Access", free: "Limited", seeker: true, initiate: true, elder: true },
                    { feature: "Inner Circle Curriculum", free: false, seeker: true, initiate: true, elder: true },
                    { feature: "Book Library", free: "5 books", seeker: "30 books", initiate: "All 71 books", elder: "All 71 books" },
                    { feature: "Audio Meditations", free: false, seeker: true, initiate: true, elder: true },
                    { feature: "AI Spiritual Guidance", free: false, seeker: false, initiate: true, elder: true },
                    { feature: "Community Forum", free: "Read-only", seeker: true, initiate: true, elder: true },
                    { feature: "Chartography Readings", free: false, seeker: "20% off", initiate: "30% off", elder: "50% off" },
                    { feature: "Live Q&A Sessions", free: false, seeker: false, initiate: "Monthly", elder: "Weekly" },
                    { feature: "1-on-1 Mentorship", free: false, seeker: false, initiate: false, elder: "Quarterly" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-purple-900/20">
                      <td className="py-4 px-4">{row.feature}</td>
                      <td className="text-center py-4 px-4">
                        {typeof row.free === 'boolean' ? (
                          row.free ? <Check className="w-5 h-5 text-purple-400 mx-auto" /> : <X className="w-5 h-5 text-gray-600 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-400">{row.free}</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {typeof row.seeker === 'boolean' ? (
                          row.seeker ? <Check className="w-5 h-5 text-purple-400 mx-auto" /> : <X className="w-5 h-5 text-gray-600 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-400">{row.seeker}</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {typeof row.initiate === 'boolean' ? (
                          row.initiate ? <Check className="w-5 h-5 text-purple-400 mx-auto" /> : <X className="w-5 h-5 text-gray-600 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-400">{row.initiate}</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {typeof row.elder === 'boolean' ? (
                          row.elder ? <Check className="w-5 h-5 text-purple-400 mx-auto" /> : <X className="w-5 h-5 text-gray-600 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-400">{row.elder}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-4">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-purple-200 text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="cancel" className="border-purple-900/30 bg-black/40 px-6 rounded-lg">
                <AccordionTrigger className="text-purple-200 hover:text-purple-300">
                  Can I cancel anytime?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Yes, absolutely. You can cancel your subscription at any time from your account settings. 
                  You'll continue to have access until the end of your current billing period.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="upgrade" className="border-purple-900/30 bg-black/40 px-6 rounded-lg">
                <AccordionTrigger className="text-purple-200 hover:text-purple-300">
                  Can I upgrade or downgrade my plan?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Yes! You can upgrade or downgrade at any time. When upgrading, you'll be charged a prorated amount 
                  for the remainder of your billing cycle. When downgrading, the change takes effect at the end of your current billing period.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="refund" className="border-purple-900/30 bg-black/40 px-6 rounded-lg">
                <AccordionTrigger className="text-purple-200 hover:text-purple-300">
                  Do you offer refunds?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  We offer a 30-day money-back guarantee for all paid subscriptions. If you're not satisfied within 
                  the first 30 days, contact us for a full refund, no questions asked.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="payment" className="border-purple-900/30 bg-black/40 px-6 rounded-lg">
                <AccordionTrigger className="text-purple-200 hover:text-purple-300">
                  What payment methods do you accept?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  We accept all major credit cards (Visa, Mastercard, American Express) through our secure payment 
                  processor, Stripe. All payments are encrypted and secure.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="access" className="border-purple-900/30 bg-black/40 px-6 rounded-lg">
                <AccordionTrigger className="text-purple-200 hover:text-purple-300">
                  What happens to my progress if I cancel?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Your progress is always saved in your account. If you cancel and later resubscribe, you'll pick up 
                  right where you left off. However, you won't be able to access premium content while your subscription is inactive.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-black via-purple-950/20 to-black">
          <div className="container max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-purple-200">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of seekers transforming their consciousness through The 33rd House.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/signup">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6">
                  Start Free Today
                </Button>
              </Link>
              <Link href="/bigger-picture">
                <Button size="lg" variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-950/50 text-lg px-8 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
