import SwipeableGateCard from "@/components/SwipeableGateCard";
import { SEO } from "@/components/SEO";
import Navigation from "@/components/Navigation";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function Gates() {
  // Fetch gates from database using tRPC
  const { data: gates, isLoading, error } = trpc.gates.getAll.useQuery();

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-purple-950/20 to-black">
          <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-purple-950/20 to-black">
          <div className="text-center space-y-4">
            <p className="text-red-400">Error loading gates</p>
            <p className="text-gray-400 text-sm">{error.message}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <SEO 
        title="The 12 Gates | The 33rd House"
        description="Explore the 12 Gates of the Star Gate Cosmology System - a 500-year initiatic journey through the mysteries of consciousness and transformation."
      />
      
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(126,34,206,0.1),transparent_50%)]" />
          </div>
          
          <div className="container relative z-10 max-w-6xl mx-auto text-center space-y-6">
            <div className="inline-block">
              <span className="text-sm font-mono text-purple-400 tracking-widest uppercase">
                The Star Gate Cosmology
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold tracking-tight">
              <span className="bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 bg-clip-text text-transparent">
                The 12 Gates
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Each gate represents a fundamental principle of existence, a threshold of consciousness, 
              and a stage in the great journey of transformation. Together, they form a complete map 
              of the initiatic path from Origin to Return.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-400 pt-4">
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
                <span>500 Years</span>
              </div>
            </div>
          </div>
        </section>

        {/* Gates Grid */}
        <section className="py-16 px-4">
          <div className="container max-w-7xl mx-auto">
            <SwipeableGateCard gates={gates || []} />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-serif font-bold text-purple-200">
              Begin Your Journey
            </h2>
            <p className="text-gray-400 text-lg">
              Each gate contains 12 realms, each realm a unique threshold of transformation. 
              Explore the complete cosmology and discover where you are on the path.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a 
                href="/realms"
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                View All 144 Realms
              </a>
              <a 
                href="/system"
                className="px-8 py-3 border border-purple-600 hover:bg-purple-950/50 text-purple-300 rounded-lg font-medium transition-colors"
              >
                Learn About The System
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
