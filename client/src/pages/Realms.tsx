import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import glyphMapping from "@/data/glyphMapping.json";
import { trpc } from "@/lib/trpc";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { gateColors } from "@/lib/gateColors";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Get glyph image path for a realm number
const getGlyphPath = (realmNumber: number): string => {
  return glyphMapping[realmNumber.toString() as keyof typeof glyphMapping] || "/glyphs/realm-001.webp";
};

export default function Realms() {
  const [viewMode, setViewMode] = useState<'grid' | 'accordion'>('accordion');

  // Fetch gates and realms from database using tRPC
  const { data: gates, isLoading: gatesLoading } = trpc.gates.getAll.useQuery();
  const { data: realms, isLoading: realmsLoading } = trpc.realms.getAll.useQuery();

  const isLoading = gatesLoading || realmsLoading;

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-indigo-950/10 to-black">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
        </div>
      </>
    );
  }

  // Group realms by gate
  const realmsByGate = gates?.map(gate => ({
    gate,
    realms: realms?.filter(r => r.gateNumber === gate.number) || []
  })) || [];

  return (
    <>
      <Navigation />
      <SEO 
        title="The 144 Realms | The 33rd House"
        description="Explore all 144 Realm Glyphs - sacred geometry symbols representing each stage of the 500-year initiatic journey."
      />
      
      <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950/10 to-black">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.2),transparent_50%)]" />
          </div>
          
          <div className="container relative z-10 max-w-6xl mx-auto text-center space-y-6">
            <div className="inline-block">
              <span className="text-sm font-mono text-indigo-400 tracking-widest uppercase">
                Sacred Geometry Collection
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-200 via-purple-400 to-indigo-200 bg-clip-text text-transparent">
                The 144 Realms
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Each realm is represented by a unique glyph—a sacred geometry symbol encoding the 
              essence of that particular threshold. These glyphs serve as meditation tools, 
              visual anchors, and keys to unlock the mysteries of each realm.
            </p>
          </div>
        </section>

        {/* View Mode Toggle */}
        <section className="py-4 px-4 border-y border-purple-900/20">
          <div className="container max-w-7xl mx-auto flex justify-end">
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'accordion' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('accordion')}
                className="text-xs"
              >
                By Gate
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="text-xs"
              >
                All Glyphs
              </Button>
            </div>
          </div>
        </section>

        {/* Accordion View (Mobile-Friendly) */}
        {viewMode === 'accordion' && (
          <section className="py-8 px-4">
            <div className="container max-w-5xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {realmsByGate.map(({ gate, realms: gateRealms }) => (
                  <AccordionItem 
                    key={gate.id} 
                    value={`gate-${gate.number}`}
                    className="border border-purple-900/30 rounded-lg bg-black/40 backdrop-blur-sm overflow-hidden"
                  >
                    <AccordionTrigger 
                      className="px-6 py-4 hover:no-underline hover:bg-purple-950/20 transition-colors"
                      style={{
                        borderLeftWidth: '4px',
                        borderLeftColor: gateColors[gate.number],
                      }}
                    >
                      <div className="flex items-center gap-4 text-left">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg"
                          style={{ backgroundColor: gateColors[gate.number] }}
                        >
                          {gate.number}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-purple-200">
                            Gate {gate.number}: {gate.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {gateRealms.length} Realms
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {gateRealms.map((realm) => {
                          const glyphPath = getGlyphPath(realm.number);
                          
                          return (
                            <div
                              key={realm.id}
                              className="group relative aspect-square rounded-lg overflow-hidden border border-purple-900/30 bg-black/40 backdrop-blur-sm hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer"
                            >
                              <img
                                src={glyphPath}
                                alt={`Realm ${realm.number}: ${realm.mythicName}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                              
                              {/* Overlay on hover */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-3">
                                <Badge 
                                  variant="outline" 
                                  className="text-xs mb-2"
                                  style={{ borderColor: gateColors[gate.number], color: gateColors[gate.number] }}
                                >
                                  Realm {realm.number}
                                </Badge>
                                <p className="text-xs text-gray-300 text-center font-semibold line-clamp-2">
                                  {realm.mythicName}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        {/* Grid View (All Glyphs) */}
        {viewMode === 'grid' && (
          <section className="py-16 px-4">
            <div className="container max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {realms?.map((realm) => {
                  const gate = gates?.find(g => g.number === realm.gateNumber);
                  const glyphPath = getGlyphPath(realm.number);
                  
                  return (
                    <div
                      key={realm.id}
                      className="group relative aspect-square rounded-lg overflow-hidden border border-purple-900/30 bg-black/40 backdrop-blur-sm hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer"
                    >
                      <img
                        src={glyphPath}
                        alt={`Realm ${realm.number}: ${realm.mythicName}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4">
                        <Badge 
                          variant="outline" 
                          className="text-xs mb-2"
                          style={{ borderColor: gate ? gateColors[gate.number] : undefined, color: gate ? gateColors[gate.number] : undefined }}
                        >
                          Realm {realm.number}
                        </Badge>
                        <p className="text-xs text-gray-300 text-center font-semibold">
                          {realm.mythicName}
                        </p>
                        <p className="text-xs text-gray-400 text-center mt-1">
                          {gate?.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Bottom Info */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-serif font-bold text-indigo-200">
              Sacred Geometry as Spiritual Technology
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              These glyphs are not mere decorations but functional tools for consciousness transformation. 
              Each geometry encodes specific frequencies, patterns, and teachings. Meditate upon them, 
              contemplate their meanings, and allow them to unlock the mysteries they guard.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a 
                href="/gates"
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                Explore The 12 Gates
              </a>
              <a 
                href="/system"
                className="px-8 py-3 border border-indigo-600 hover:bg-indigo-950/50 text-indigo-300 rounded-lg font-medium transition-colors"
              >
                Learn The System
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
