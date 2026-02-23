import { motion } from "framer-motion";
import { gateColors } from "@/lib/gateColors";
import { Link } from "wouter";
import { Lock, Unlock, Star, Map, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PortalJourneyProps {
  user: any;
}

export default function PortalJourney({ user }: PortalJourneyProps) {
  const gates = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412] text-[#f0e6d2] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 pt-8">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-[#d4af37]">
            The Path of the Initiate
          </h1>
          <p className="text-xl text-[#c4b5a0] max-w-2xl mx-auto">
            Your journey through the 12 Gates and 144 Realms begins here. 
            Navigate the Star Gate architecture to unlock the mysteries of consciousness.
          </p>
        </div>

        {/* Current Status / Dashboard */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#1a0a2e]/50 border border-[#d4af37]/20 rounded-lg p-6 flex flex-col items-center text-center backdrop-blur-sm">
            <Compass className="w-12 h-12 text-[#9333ea] mb-4" />
            <h3 className="text-lg font-serif text-[#d4af37] mb-2">Current Location</h3>
            <p className="text-[#c4b5a0]">Gate 1: The Origin</p>
            <p className="text-xs text-[#c4b5a0]/60 mt-1">Realm 1: The Void</p>
          </div>
          
          <div className="bg-[#1a0a2e]/50 border border-[#d4af37]/20 rounded-lg p-6 flex flex-col items-center text-center backdrop-blur-sm">
            <Star className="w-12 h-12 text-[#d4af37] mb-4" />
            <h3 className="text-lg font-serif text-[#d4af37] mb-2">Progress</h3>
            <p className="text-[#c4b5a0]">0 / 144 Realms Unlocked</p>
             <div className="w-full bg-[#0a0412] h-2 rounded-full mt-3 overflow-hidden">
                <div className="bg-[#d4af37] h-full w-[1%]"></div>
             </div>
          </div>

          <div className="bg-[#1a0a2e]/50 border border-[#d4af37]/20 rounded-lg p-6 flex flex-col items-center text-center backdrop-blur-sm">
            <Map className="w-12 h-12 text-[#ec4899] mb-4" />
            <h3 className="text-lg font-serif text-[#d4af37] mb-2">Map</h3>
            <Link href="/chartography">
              <Button variant="outline" className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 w-full">
                View Star Chart
              </Button>
            </Link>
          </div>
        </div>

        {/* The 12 Gates Grid */}
        <h2 className="text-3xl font-serif text-center mb-8 text-[#d4af37]">The 12 Gates</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gates.map((gateNum) => (
            <Link key={gateNum} href={`/gates/${gateNum}`}>
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                className="group relative h-64 rounded-xl overflow-hidden cursor-pointer border border-[#d4af37]/20 bg-[#0a0412]"
              >
                {/* Background Gradient */}
                <div 
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ 
                    background: `radial-gradient(circle at center, ${gateColors[gateNum]}, transparent 70%)` 
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-serif font-bold mb-4 border-2 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                    style={{ 
                      borderColor: gateColors[gateNum],
                      color: gateColors[gateNum],
                      boxShadow: `0 0 10px ${gateColors[gateNum]}40`
                    }}
                  >
                    {gateNum}
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-[#f0e6d2] mb-2 group-hover:text-white transition-colors">
                    Gate {gateNum}
                  </h3>
                  
                  <p className="text-sm text-[#c4b5a0]/80 group-hover:text-[#c4b5a0] transition-colors">
                    Click to Enter
                  </p>
                  
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4">
                    {gateNum === 1 ? (
                      <Unlock className="w-5 h-5 text-[#d4af37]" />
                    ) : (
                      <Lock className="w-5 h-5 text-[#c4b5a0]/30" />
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center pb-12">
          <Link href="/realms">
             <Button className="bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 px-8 py-6 text-lg">
                View All 144 Realms
             </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
