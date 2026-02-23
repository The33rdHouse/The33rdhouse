import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Compass, Star, ArrowRight, Check } from "lucide-react";

export default function HomeNew() {
  const stats = [
    { value: "144", label: "Realms of Consciousness" },
    { value: "12", label: "Transformational Gates" },
    { value: "48", label: "Weeks of Curriculum" },
    { value: "60+", label: "Books & Resources" },
  ];

  const features = [
    "Complete 12-Month Inner Circle Curriculum",
    "Access to All 144 Realms & 12 Gates",
    "60+ Books by Daniel Cruze",
    "Guided Meditations & Practices",
    "AI-Powered Spiritual Guidance",
    "Private Member Community",
  ];

  const courses = [
    {
      title: "The Complete Codex",
      description: "Master reference guide to all 12 Gates and 144 Realms",
      image: "/covers/codex-cover.webp",
      href: "/library/complete-codex",
    },
    {
      title: "Inner Circle Curriculum",
      description: "48-week consciousness transformation program",
      image: "/covers/curriculum-cover.webp",
      href: "/library/complete-curriculum",
    },
    {
      title: "Star Gate Cosmology",
      description: "Foundational systems of the cosmic framework",
      image: "/covers/codex-cover.webp",
      href: "/library/book-1",
    },
  ];

  return (
    <>
      <Navigation />
      <SEO
        title="The 33rd House - Consciousness Transformation Academy"
        description="A 500-year initiatic journey through 12 Gates and 144 Realms. Learn from Daniel Cruze's complete system of consciousness transformation."
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-purple-50 to-white py-20 md:py-32">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6">
                The 33rd House
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-4">
                Consciousness Transformation at 1% of Traditional Costs
              </p>
              <p className="text-base sm:text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
                A 500-year initiatic journey through 12 Gates and 144 Realms—the complete map of consciousness transformation by Daniel Cruze
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/signup">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/library">
                  <Button size="lg" variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg">
                    Explore Library
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Learn from the Complete System
              </h2>
              <p className="text-lg text-gray-600">
                60+ comprehensive books and resources by Daniel Cruze
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {courses.map((course, i) => (
                <Link key={i} href={course.href}>
                  <Card className="border-2 border-gray-200 hover:border-purple-600 hover:shadow-xl transition-all cursor-pointer group h-full">
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={course.image}
                        alt={course.title}
                        loading="lazy"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-gray-600">{course.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/library">
                <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-purple-600 hover:text-purple-600">
                  View All 60+ Books
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 bg-purple-50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                  Everything You Need for Complete Transformation
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  The 33rd House provides a comprehensive system for consciousness evolution, combining ancient wisdom with modern practices.
                </p>
                <div className="space-y-4">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card className="border-2 border-purple-200 bg-white p-6 text-center">
                  <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Complete Library</h3>
                  <p className="text-sm text-gray-600">60+ books and resources</p>
                </Card>
                <Card className="border-2 border-purple-200 bg-white p-6 text-center">
                  <Compass className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">144 Realms</h3>
                  <p className="text-sm text-gray-600">Complete consciousness map</p>
                </Card>
                <Card className="border-2 border-purple-200 bg-white p-6 text-center">
                  <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Inner Circle</h3>
                  <p className="text-sm text-gray-600">48-week curriculum</p>
                </Card>
                <Card className="border-2 border-purple-200 bg-white p-6 text-center">
                  <Star className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">12 Gates</h3>
                  <p className="text-sm text-gray-600">Transformational portals</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* About Daniel Cruze */}
        <section className="py-20 bg-white">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              About Daniel Cruze
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Creator of The 33rd House system, Daniel Cruze has dedicated his life to mapping the complete architecture of human consciousness transformation. Through decades of research, practice, and direct experience, he has synthesized ancient wisdom traditions with modern understanding to create a comprehensive 500-year initiatic journey.
            </p>
            <p className="text-lg text-gray-600">
              His work encompasses 12 Gates, 144 Realms, and over 60 books of teachings, making the path of consciousness evolution accessible to anyone committed to the journey.
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Transforming Lives Worldwide
              </h2>
              <p className="text-lg text-gray-600">
                Hear from seekers who have walked the path
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#d4af37] text-[#d4af37]" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "The 33rd House system has completely transformed my understanding of consciousness. The 12 Gates framework gave me a clear map for my spiritual journey."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">SM</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Sarah M.</div>
                      <div className="text-sm text-gray-500">Inner Circle Member</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#d4af37] text-[#d4af37]" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "Daniel Cruze's teachings are unlike anything I've encountered. The depth and precision of the 144 Realms system is extraordinary."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">JR</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">James R.</div>
                      <div className="text-sm text-gray-500">2-Year Student</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#d4af37] text-[#d4af37]" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "I've studied with many teachers, but The 33rd House offers the most comprehensive and practical system for consciousness transformation."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">LC</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Lisa C.</div>
                      <div className="text-sm text-gray-500">Adept Tier</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-100 mb-3">
                    What is The 33rd House system?
                  </h3>
                  <p className="text-gray-300">
                    The 33rd House is a comprehensive consciousness transformation system developed by Daniel Cruze. It maps the complete journey of human consciousness evolution through 12 Gates, 144 Realms, and 5 Degrees of Initiation—a 500-year initiatic path.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-100 mb-3">
                    What's included in the Inner Circle membership?
                  </h3>
                  <p className="text-gray-300">
                    Inner Circle members receive access to the complete 48-week curriculum, all 60+ books and resources, guided meditations, AI-powered spiritual guidance, and a private member community. You'll also unlock access to all 12 Gates and 144 Realms teachings.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-100 mb-3">
                    How does the subscription work?
                  </h3>
                  <p className="text-gray-300">
                    We offer four tiers: Free (basic access), Seeker ($27/mo), Adept ($97/mo), and Elder ($297/mo). Each tier unlocks progressively more content and features. You can upgrade or cancel anytime from your account settings.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-100 mb-3">
                    What is Chartography?
                  </h3>
                  <p className="text-gray-300">
                    Chartography is our personalized consciousness mapping service. Similar to astrology but based on The 33rd House system, we create a detailed analysis of your birth chart, cosmic alignments, and consciousness evolution path. Each reading is $197 and includes a comprehensive PDF report.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-100 mb-3">
                    Can I access the content on mobile?
                  </h3>
                  <p className="text-gray-300">
                    Yes! The 33rd House platform is fully responsive and optimized for mobile devices. Access all teachings, meditations, and resources from your phone or tablet anytime, anywhere.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-b from-purple-600 to-purple-800 text-white">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Begin Your Transformation Today
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Join thousands of seekers on the path of consciousness evolution
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="container max-w-6xl mx-auto px-4 text-center">
            <p className="mb-4">© 2024 The 33rd House. All rights reserved.</p>
            <p className="text-sm">Created by Daniel Cruze</p>
          </div>
        </footer>
      </div>
    </>
  );
}
