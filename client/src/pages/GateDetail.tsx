import { useRoute, Link } from "wouter";
import SocialShare from "@/components/SocialShare";
import { SEO } from "@/components/SEO";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import SwipeableRealmGrid from "@/components/SwipeableRealmGrid";
import { trpc } from "@/lib/trpc";
import { getGateColor } from "@/lib/gateColors";
import { ShoppingCart, BookOpen } from "lucide-react";
import glyphMapping from "@/data/glyphMapping.json";

// Get glyph image path for a realm number
const getGlyphPath = (realmNumber: number): string => {
  return glyphMapping[realmNumber.toString() as keyof typeof glyphMapping] || "/glyphs/realm-001.webp";
};

export default function GateDetail() {
  const [, params] = useRoute("/gates/:id");
  const gateNumber = Number(params?.id);
  
  // Fetch gate and its realms from database
  const { data: gate, isLoading: gateLoading } = trpc.gates.getByNumber.useQuery(
    { number: gateNumber },
    { enabled: !isNaN(gateNumber) }
  );
  const { data: realms, isLoading: realmsLoading } = trpc.realms.getByGate.useQuery(
    { gateNumber },
    { enabled: !isNaN(gateNumber) }
  );
  
  // Fetch books for this gate
  const { data: allProducts } = trpc.products.getAll.useQuery({ category: "book", gateNumber });
  const gateBooks = allProducts || [];
  
  const isLoading = gateLoading || realmsLoading;
  
  if (isNaN(gateNumber)) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-serif text-purple-200">Invalid Gate Number</h1>
            <Link href="/gates">
              <Button variant="outline" className="border-purple-600 text-purple-300">
                ← Back to Gates
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }
  
  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
        </div>
      </>
    );
  }
  
  if (!gate) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-serif text-purple-200">Gate Not Found</h1>
            <Link href="/gates">
              <Button variant="outline" className="border-purple-600 text-purple-300">
                ← Back to Gates
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const color = getGateColor(gate.number);
  const prevGate = gate.number > 1 ? gate.number - 1 : null;
  const nextGate = gate.number < 12 ? gate.number + 1 : null;

  return (
    <>
      <Navigation />
      <SEO 
        title={`Gate ${gate.number}: ${gate.name} | The 33rd House`}
        description={gate.description}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${color}33, transparent 70%)`
              }}
            />
          </div>
          
          <div className="container relative z-10 max-w-5xl mx-auto space-y-8">
            {/* Back button and Share */}
            <div className="flex items-center justify-between">
              <Link href="/gates">
              <Button variant="ghost" className="text-purple-400 hover:text-purple-300 mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Gates
              </Button>
            </Link>
              <SocialShare
                title={`Gate ${gate.number}: ${gate.name}`}
                description={gate.description}
              />
            </div>
            
            <div className="text-center space-y-6">
              <Badge 
                variant="outline" 
                className="text-sm font-mono tracking-widest uppercase"
                style={{ borderColor: color, color: color }}
              >
                GATE {gate.number.toString().padStart(2, '0')}
              </Badge>
              
              <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight">
                <span 
                  className="bg-gradient-to-r bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${color}cc, ${color}, ${color}cc)`
                  }}
                >
                  {gate.name}
                </span>
              </h1>
              
              <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {gate.theme}
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                <span 
                  className="text-sm px-3 py-1 rounded-full border"
                  style={{ 
                    borderColor: `${color}50`,
                    backgroundColor: `${color}10`,
                    color: color
                  }}
                >
                  {gate.keyword}
                </span>
                <span 
                  className="text-sm px-3 py-1 rounded-full border"
                  style={{ 
                    borderColor: `${color}50`,
                    backgroundColor: `${color}10`,
                    color: color
                  }}
                >
                  {gate.level}
                </span>
                <span 
                  className="text-sm px-3 py-1 rounded-full border"
                  style={{ 
                    borderColor: `${color}50`,
                    backgroundColor: `${color}10`,
                    color: color
                  }}
                >
                  {gate.realmCluster}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="container max-w-4xl mx-auto space-y-16">
            {/* Description */}
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-gray-300 leading-relaxed">
                {gate.description}
              </p>
            </div>

            {/* The Three Dimensions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-200">Shadow</CardTitle>
                  <CardDescription>The Challenge</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {gate.shadow}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-200">Gift</CardTitle>
                  <CardDescription>The Potential</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {gate.gift}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-200">Somatic Shift</CardTitle>
                  <CardDescription>The Embodiment</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {gate.somaticShift}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Praxis */}
            <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-200">Praxis</CardTitle>
                <CardDescription>Practices for Integration</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {gate.praxis}
                </p>
              </CardContent>
            </Card>

            {/* Gate Books Section */}
            {gateBooks.length > 0 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-4xl font-serif font-bold text-purple-200 mb-4">
                    <BookOpen className="inline w-8 h-8 mr-3" style={{ color }} />
                    Gate {gate.number} Books
                  </h2>
                  <p className="text-gray-400 text-lg">
                    Deep dive teachings for this gate
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gateBooks.map((book: any) => (
                    <Card key={book.id} className="border-purple-900/30 bg-black/40 backdrop-blur-sm hover:border-purple-600 transition-all">
                      <CardHeader className="p-0">
                        <Link href={`/product/${book.slug}`}>
                          {book.coverImage ? (
                            <img 
                              src={book.coverImage} 
                              alt={book.title}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                          ) : (
                            <div className="w-full h-48 bg-gradient-to-br from-purple-950 to-black rounded-t-lg flex items-center justify-center">
                              <BookOpen className="w-12 h-12 text-purple-400/50" />
                            </div>
                          )}
                        </Link>
                      </CardHeader>
                      <CardContent className="p-4">
                        <Link href={`/product/${book.slug}`}>
                          <CardTitle className="text-lg text-purple-200 hover:text-purple-100 transition-colors line-clamp-2">
                            {book.title}
                          </CardTitle>
                        </Link>
                        <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                          {book.description}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-amber-400 font-bold">
                            ${(book.price / 100).toFixed(2)}
                          </span>
                          <Button 
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* The 12 Realms */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-serif font-bold text-purple-200 mb-4">
                  The 12 Realms of {gate.name}
                </h2>
                <p className="text-gray-400 text-lg">
                  Each realm is a specific threshold within this gate
                </p>
              </div>
              
              <SwipeableRealmGrid realms={realms || []} gateColor={color} />
            </div>
          </div>
        </section>

        {/* Navigation to Adjacent Gates */}
        <section className="py-16 px-4 border-t border-purple-900/20">
          <div className="container max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              {prevGate ? (
                <Link href={`/gates/${prevGate}`}>
                  <Button 
                    variant="outline" 
                    className="border-purple-600 text-purple-300 hover:bg-purple-950/50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Gate {prevGate}
                  </Button>
                </Link>
              ) : (
                <div />
              )}
              
              {nextGate ? (
                <Link href={`/gates/${nextGate}`}>
                  <Button 
                    variant="outline" 
                    className="border-purple-600 text-purple-300 hover:bg-purple-950/50"
                  >
                    Gate {nextGate}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
