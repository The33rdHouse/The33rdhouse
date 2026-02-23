import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CosmologyDiagram from "@/components/CosmologyDiagram";

export default function System() {
  return (
    <>
      <Navigation />
      <SEO 
        title="The System | The 33rd House"
        description="Understanding the Star Gate Cosmology System - a complete map of consciousness transformation spanning 12 Gates, 144 Realms, and 500 years."
      />
      
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
        {/* Hero Section */}
        <section className="relative py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.2),transparent_50%)]" />
          </div>
          
          <div className="container relative z-10 max-w-5xl mx-auto text-center space-y-8">
            <Badge variant="outline" className="text-xs font-mono tracking-widest uppercase border-purple-500/50 text-purple-300">
              The Complete Map
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">
              <span className="bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 bg-clip-text text-transparent">
                The Star Gate Cosmology
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              A comprehensive system of consciousness transformation, mapping the complete journey 
              from unconscious potential to fully awakened mastery across 500 years of initiation.
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto space-y-12">
            <div className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-3xl font-serif font-bold text-purple-200 mb-6">What Is The Star Gate Cosmology?</h2>

              <p className="text-gray-300 leading-relaxed mb-6">
                The Star Gate Cosmology is not a belief system but a <strong>map of consciousness</strong>—a
                comprehensive framework that charts the complete journey of transformation from the primordial
                void to the ultimate return to source. It is both ancient wisdom and living practice,
                synthesizing mythology, psychology, and direct spiritual experience into a coherent whole.
              </p>

              <p className="text-gray-300 leading-relaxed mb-6">
                At its heart are <strong>12 Gates</strong> and <strong>144 Realms</strong>—archetypal
                thresholds and specific stages that every consciousness must traverse on the path to
                wholeness. This is not metaphor but lived reality, a 500-year initiatic journey
                structured across 5 degrees of mastery.
              </p>
            </div>
          </div>
        </section>

        {/* The Three Sacred Pillars */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
          <div className="container max-w-6xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-serif font-bold text-purple-200 mb-4">The Three Sacred Pillars</h2>
              <p className="text-gray-400 text-lg">The foundational principles upon which all transformation rests</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-lg border border-purple-900/30 bg-black/40 backdrop-blur-sm space-y-4 hover:border-purple-600/40 transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/20 border border-amber-500/30 flex items-center justify-center mx-auto">
                  <span className="text-3xl">🏛️</span>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-amber-300 text-center">Containment</h3>
                <p className="text-sm text-amber-400/80 text-center font-mono">"To Contain is to Serve"</p>
                <p className="text-gray-300 leading-relaxed text-center">
                  The sacred structure that holds energy. Without containment, transformation dissipates.
                  Like a vessel, a ship, or the spine itself—containment creates the space where change can occur.
                </p>
                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  <Badge variant="outline" className="text-xs border-amber-600/30 text-amber-400">Vessel</Badge>
                  <Badge variant="outline" className="text-xs border-amber-600/30 text-amber-400">Ship</Badge>
                  <Badge variant="outline" className="text-xs border-amber-600/30 text-amber-400">Spine</Badge>
                </div>
              </div>

              <div className="p-8 rounded-lg border border-purple-900/30 bg-black/40 backdrop-blur-sm space-y-4 hover:border-purple-600/40 transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-red-700/20 border border-red-500/30 flex items-center justify-center mx-auto">
                  <span className="text-3xl">🔥</span>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-red-300 text-center">Current</h3>
                <p className="text-sm text-red-400/80 text-center font-mono">"Energy without vessel is chaos"</p>
                <p className="text-gray-300 leading-relaxed text-center">
                  The flow of spiritual energy through the system. Current is the living force—the breath,
                  the kundalini, the divine spark moving through creation. It must be directed, not suppressed.
                </p>
                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  <Badge variant="outline" className="text-xs border-red-600/30 text-red-400">Wind</Badge>
                  <Badge variant="outline" className="text-xs border-red-600/30 text-red-400">Serpent</Badge>
                  <Badge variant="outline" className="text-xs border-red-600/30 text-red-400">Fire</Badge>
                </div>
              </div>

              <div className="p-8 rounded-lg border border-purple-900/30 bg-black/40 backdrop-blur-sm space-y-4 hover:border-purple-600/40 transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-700/20 border border-purple-500/30 flex items-center justify-center mx-auto">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-purple-300 text-center">Coherence</h3>
                <p className="text-sm text-purple-400/80 text-center font-mono">"Containment × Current = Coherence"</p>
                <p className="text-gray-300 leading-relaxed text-center">
                  The unified state of harmony that emerges when containment and current are in balance.
                  Coherence is the goal—the golden integration, the lotus that blooms from the marriage of structure and flow.
                </p>
                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  <Badge variant="outline" className="text-xs border-purple-600/30 text-purple-400">Lotus</Badge>
                  <Badge variant="outline" className="text-xs border-purple-600/30 text-purple-400">Golden Cross</Badge>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-gray-400 text-sm italic max-w-2xl mx-auto">
                The serpent ascent through the spine—kundalini rising through containment,
                carried by current, culminating in the crown of coherence.
              </p>
            </div>
          </div>
        </section>

        {/* The Structure */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
          <div className="container max-w-6xl mx-auto space-y-16">
            <div className="text-center">
              <h2 className="text-4xl font-serif font-bold text-purple-200 mb-4">The Structure</h2>
              <p className="text-gray-400 text-lg">Understanding the architecture of transformation</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* The 12 Gates */}
              <div className="p-8 rounded-lg border border-purple-900/30 bg-black/40 backdrop-blur-sm space-y-4">
                <div className="text-6xl font-bold text-purple-400 mb-2">12</div>
                <h3 className="text-2xl font-serif font-semibold text-purple-200">Gates</h3>
                <p className="text-gray-300 leading-relaxed">
                  The 12 Gates represent fundamental archetypal principles of existence—Origin, Motion, 
                  Form, Power, Connection, Reflection, Union, Death & Rebirth, Vision, Law, Paradox, 
                  and Return. Each gate is a complete world containing 12 realms, offering a full 
                  spectrum of experience within its domain.
                </p>
                <Link href="/gates">
                  <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-950/50 mt-4">
                    Explore The 12 Gates →
                  </Button>
                </Link>
              </div>
              
              {/* The 144 Realms */}
              <div className="p-8 rounded-lg border border-purple-900/30 bg-black/40 backdrop-blur-sm space-y-4">
                <div className="text-6xl font-bold text-purple-400 mb-2">144</div>
                <h3 className="text-2xl font-serif font-semibold text-purple-200">Realms</h3>
                <p className="text-gray-300 leading-relaxed">
                  The 144 Realms are specific stages of transformation, each with its own sacred glyph, 
                  mythology, psychological dimension, and practices. They form the detailed map of the 
                  initiatic path, showing exactly where you are and what work is required at each stage.
                </p>
                <Link href="/realms">
                  <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-950/50 mt-4">
                    View The 144 Realms →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The 5 Degrees */}
        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-serif font-bold text-purple-200 mb-4">The 5 Degrees of Initiation</h2>
              <p className="text-gray-400 text-lg">The 500-year journey from seeker to keeper</p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  degree: 1,
                  name: "Neophyte",
                  duration: "Years 1-100",
                  description: "The beginning stage where the initiate learns the foundational practices, encounters the first gates, and begins the work of self-knowledge. This is the apprenticeship phase, where one learns to see clearly and work with basic energetic principles."
                },
                {
                  degree: 2,
                  name: "Adept",
                  duration: "Years 101-200",
                  description: "The practitioner deepens their mastery, working through the middle gates and integrating shadow material. The Adept has developed real skill and can guide others through the early stages while continuing their own journey."
                },
                {
                  degree: 3,
                  name: "Master",
                  duration: "Years 201-300",
                  description: "The Master has traversed most of the gates and embodies the teachings. They hold space for transformation in others and contribute to the evolution of the system itself. Mastery is not perfection but deep integration and authentic embodiment."
                },
                {
                  degree: 4,
                  name: "Elder",
                  duration: "Years 301-400",
                  description: "The Elder has completed the full cycle and returned to Origin with wisdom intact. They serve as guides for the entire community, holding the long view and ensuring the integrity of the transmission across generations."
                },
                {
                  degree: 5,
                  name: "Keeper",
                  duration: "Years 401-500",
                  description: "The Keeper is the living embodiment of the entire system, having traversed all 144 realms multiple times. They are the guardians of the flame, the holders of the complete transmission, and the bridges between the human and the divine."
                }
              ].map((degree) => (
                <div 
                  key={degree.degree}
                  className="p-6 rounded-lg border border-purple-900/30 bg-black/40 backdrop-blur-sm hover:border-purple-700/50 transition-all"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-purple-950/50 border-2 border-purple-600 flex items-center justify-center">
                        <span className="text-2xl font-bold text-purple-300">{degree.degree}</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-4">
                        <h3 className="text-2xl font-serif font-semibold text-purple-200">{degree.name}</h3>
                        <Badge variant="outline" className="text-xs border-purple-600 text-purple-400">
                          {degree.duration}
                        </Badge>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{degree.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three Layers */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
          <div className="container max-w-5xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-serif font-bold text-purple-200 mb-4">The Three Layers</h2>
              <p className="text-gray-400 text-lg">Each realm operates on three interconnected dimensions</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg border border-purple-900/30 bg-black/40 backdrop-blur-sm space-y-3">
                <h3 className="text-xl font-serif font-semibold text-purple-200">Mythic Layer</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The archetypal story, the universal pattern that transcends individual experience. 
                  This is the realm of gods, heroes, and cosmic principles—the timeless dimension.
                </p>
              </div>
              
              <div className="p-6 rounded-lg border border-purple-900/30 bg-black/40 backdrop-blur-sm space-y-3">
                <h3 className="text-xl font-serif font-semibold text-purple-200">Psychological Layer</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The personal dimension, how the archetype manifests in individual psyche and biography. 
                  This is where shadow work, integration, and healing occur.
                </p>
              </div>
              
              <div className="p-6 rounded-lg border border-purple-900/30 bg-black/40 backdrop-blur-sm space-y-3">
                <h3 className="text-xl font-serif font-semibold text-purple-200">Hybrid Layer</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The synthesis of myth and psychology, where the universal and personal meet. 
                  This is the lived experience, the actual practice of transformation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Cosmology Diagram */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
          <div className="container max-w-6xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-serif font-bold text-purple-200 mb-4">The Cosmology Map</h2>
              <p className="text-gray-400 text-lg">An interactive visualization of the complete system</p>
            </div>
            
            <CosmologyDiagram />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl font-serif font-bold text-purple-200 text-center mb-8">How The System Works</h2>
            
            <div className="prose prose-invert prose-lg max-w-none space-y-6">
              <p className="text-gray-300 leading-relaxed">
                The Star Gate Cosmology is not meant to be studied intellectually but <strong>lived experientially</strong>. 
                Each initiate enters the system at their current level of development and works through the gates 
                and realms in sequence, though the journey is spiral rather than linear—you will return to earlier 
                gates at deeper levels as you progress.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong>Practices</strong> are provided for each realm—meditations, rituals, shadow work exercises, 
                and embodiment practices that facilitate the specific transformation required at that stage. 
                The <strong>glyphs</strong> serve as visual anchors and meditation tools, encoding the essence 
                of each realm in sacred geometry.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong>Community</strong> is essential. The 33rd House operates as a Private Members Association, 
                providing structure, accountability, and mutual support for initiates at all levels. Elders guide 
                newer members, and everyone contributes to the collective field of transformation.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                The system is <strong>self-correcting</strong>—you cannot skip stages or fake your way through. 
                Each gate demands real transformation, and the realms will not open until the work is complete. 
                This ensures integrity and prevents spiritual bypassing.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 px-4">
          <div className="container max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-purple-200">
              Ready to Begin?
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              The gates are open. The path is clear. The journey of 500 years awaits those 
              ready to commit to the Great Work of transformation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/sacred/portal">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6">
                  Enter The Portal
                </Button>
              </Link>
              <Link href="/gates">
                <Button size="lg" variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-950/50 text-lg px-8 py-6">
                  Explore The Gates
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
