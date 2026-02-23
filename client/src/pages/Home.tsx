import { Link } from "wouter";
import GateCard from "@/components/GateCard";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function Home() {
  // Fetch gates from database
  const { data: gates, isLoading } = trpc.gates.getAll.useQuery();

  return (
    <>
      <Navigation />
      <SEO 
        title="The 33rd House | A 500-Year Initiatic Journey"
        description="The Star Gate Cosmology System - 12 Gates, 144 Realms, 5 Degrees of Initiation. Begin your journey through the mysteries of consciousness and transformation."
      />
      
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated cosmic background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-black to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(126,34,206,0.1),transparent_50%)]" />
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 opacity-30">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="container relative z-10 px-4 text-center space-y-8">
            <div className="inline-block">
              <Badge variant="outline" className="text-xs font-mono tracking-widest uppercase border-purple-500/50 text-purple-300">
                The Star Gate Cosmology
              </Badge>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight leading-none">
              <span className="block bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 bg-clip-text text-transparent">
                The 33rd House
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A 500-year initiatic journey through 12 Gates and 144 Realms—
              <br className="hidden md:block" />
              the complete map of consciousness transformation
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
              <Link href="/gates">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6">
                  Explore The 12 Gates
                </Button>
              </Link>
              <Link href="/realms">
                <Button size="lg" variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-950/50 text-lg px-8 py-6">
                  View The 144 Realms
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500 pt-12">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span>12 Gates</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span>144 Realms</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span>5 Degrees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span>500 Years</span>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-purple-500 rounded-full" />
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="relative py-32 px-4 bg-gradient-to-b from-black via-indigo-950/10 to-black">
          <div className="container max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-purple-200">
                The Journey Begins
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                The 33rd House is not a place but a state of consciousness—the threshold where 
                the seeker becomes the finder, where the journey reveals itself as the destination. 
                Through 12 archetypal Gates and 144 transformative Realms, initiates traverse the 
                complete spectrum of human and transpersonal experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 pt-12">
              <div className="text-center space-y-4 p-8 rounded-lg border border-purple-900/30 bg-black/40 backdrop-blur-sm">
                <div className="text-5xl font-bold text-purple-400">12</div>
                <h3 className="text-xl font-serif font-semibold text-purple-200">Gates</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Archetypal thresholds representing fundamental principles of existence—
                  from Origin to Return, each gate a complete world unto itself.
                </p>
              </div>
              
              <div className="text-center space-y-4 p-8 rounded-lg border border-purple-900/30 bg-black/40 backdrop-blur-sm">
                <div className="text-5xl font-bold text-purple-400">144</div>
                <h3 className="text-xl font-serif font-semibold text-purple-200">Realms</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Specific stages of transformation, each with its own glyph, mythology, 
                  psychology, and practices—the complete map of the initiatic path.
                </p>
              </div>
              
              <div className="text-center space-y-4 p-8 rounded-lg border border-purple-900/30 bg-black/40 backdrop-blur-sm">
                <div className="text-5xl font-bold text-purple-400">500</div>
                <h3 className="text-xl font-serif font-semibold text-purple-200">Years</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The full cycle of initiation across 5 degrees—Neophyte, Adept, Master, 
                  Elder, Keeper—a lifetime and beyond of conscious evolution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Gates */}
        <section className="py-32 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black">
          <div className="container max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-purple-200">
                The 12 Gates
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Each gate represents a fundamental principle of existence and a stage in the 
                great journey of transformation. Click any gate to explore its 12 realms.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="col-span-full flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                </div>
              ) : (
                gates?.map((gate) => (
                  <GateCard key={gate.number} gate={gate} />
                ))
              )}
            </div>
            
            <div className="text-center pt-8">
              <Link href="/gates">
                <Button size="lg" variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-950/50">
                  Explore All Gates in Detail →
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_70%)]" />
          
          <div className="container relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-purple-200">
              Begin Your Initiation
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              The gates are open. The glyphs await. The journey of 500 years begins with a single step 
              across the threshold. Will you enter?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/sacred/threshold">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6">
                  Cross The Threshold
                </Button>
              </Link>
              <Link href="/system">
                <Button size="lg" variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-950/50 text-lg px-8 py-6">
                  Learn About The System
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
