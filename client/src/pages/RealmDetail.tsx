import { useRoute, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/useAuth";
import { SEO } from "@/components/SEO";
import Navigation from "@/components/Navigation";
import MeditationTimer from "@/components/MeditationTimer";
import AIRealmInsight from "@/components/AIRealmInsight";
import SocialShare from "@/components/SocialShare";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Sparkles, Book, FileText, Download, CheckCircle2, Loader2, Brain } from "lucide-react";
import { toast } from "sonner";

export default function RealmDetail() {
  const [, params] = useRoute("/realms/:id");
  const realmId = params?.id;
  const { user } = useAuth();
  
  const { data: realm, isLoading: realmLoading } = trpc.realms.getByNumber.useQuery(
    { number: Number(realmId) },
    { enabled: !!realmId }
  );
  
  const { data: gate, isLoading: gateLoading } = trpc.gates.getByNumber.useQuery(
    { number: Math.ceil(Number(realmId) / 12) },
    { enabled: !!realmId }
  );

  const { data: progress } = trpc.progress.getRealm.useQuery(
    { realmNumber: Number(realmId) },
    { enabled: !!user && !!realmId }
  );

  const completeMutation = trpc.progress.complete.useMutation({
    onSuccess: () => {
      toast.success("Realm marked as complete!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to mark realm as complete");
    },
  });

  const handleMarkComplete = async () => {
    if (!user) {
      toast.error("Please sign in to track your progress");
      return;
    }

    completeMutation.mutate({ realmNumber: Number(realmId) });
  };
  
  if (realmLoading || gateLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
        </div>
      </>
    );
  }
  
  if (!realm || !gate) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-serif text-purple-200">Realm Not Found</h1>
            <Link href="/realms">
              <Button variant="outline" className="border-purple-600 text-purple-300">
                ← Back to Realms
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const prevRealm = realm.number > 1 ? realm.number - 1 : null;
  const nextRealm = realm.number < 144 ? realm.number + 1 : null;
  const isCompleted = progress?.completed || false;

  return (
    <>
      <Navigation />
      <SEO 
        title={`Realm ${realm.number}: ${realm.title} | The 33rd House`}
        description={realm.description}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 50%, #9333ea33, transparent 70%)`
              }}
            />
          </div>
          
          <div className="container relative z-10 max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/realms" className="hover:text-purple-400 transition-colors">
                All Realms
              </Link>
              <span>/</span>
              <Link href={`/gates/${gate.number}`} className="hover:text-purple-400 transition-colors">
                Gate {gate.number}: {gate.title}
              </Link>
              <span>/</span>
              <span className="text-purple-300">Realm {realm.number}</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left: Info */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge 
                      variant="outline" 
                      className="text-sm font-mono border-purple-600 text-purple-400"
                    >
                      REALM {realm.number.toString().padStart(3, '0')}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-purple-600 text-purple-400">
                      Gate {gate.number}: {gate.title}
                    </Badge>
                    {isCompleted && (
                      <Badge className="bg-green-600 text-white">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight bg-gradient-to-r from-purple-400 to-gold-400 bg-clip-text text-transparent">
                    {realm.title}
                  </h1>
                  
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {realm.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 flex-wrap">
                  {user && !isCompleted && (
                    <Button
                      onClick={handleMarkComplete}
                      disabled={completeMutation.isPending}
                      className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
                    >
                      {completeMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Marking Complete...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Mark as Complete
                        </>
                      )}
                    </Button>
                  )}
                  <SocialShare
                    title={`Realm ${realm.number}: ${realm.title}`}
                    description={realm.description}
                  />
                </div>
              </div>

              {/* Right: Resources */}
              <div className="space-y-4">
                {/* Curriculum Resources */}
                <Card className="border-gold-900/30 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-gold-400 flex items-center gap-2">
                      <Book className="w-5 h-5" />
                      Curriculum Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <a
                      href="https://github.com/legacy-sketch/the33rdhouse-inner-circle-curriculum"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button variant="outline" className="w-full justify-start border-gold-500/50 hover:bg-gold-500/10">
                        <FileText className="w-4 h-4 mr-2" />
                        View Full Curriculum
                      </Button>
                    </a>
                    <a
                      href={`https://github.com/legacy-sketch/the33rdhouse-inner-circle-curriculum/tree/main/Month-${Math.ceil(realm.number / 12).toString().padStart(2, '0')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button variant="outline" className="w-full justify-start border-gold-500/50 hover:bg-gold-500/10">
                        <FileText className="w-4 h-4 mr-2" />
                        This Month's Content
                      </Button>
                    </a>
                    <a
                      href="https://github.com/legacy-sketch/the33rdhouse-inner-circle-curriculum/blob/main/COMPLETE-CURRICULUM.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button variant="outline" className="w-full justify-start border-gold-500/50 hover:bg-gold-500/10">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </a>
                  </CardContent>
                </Card>

                {/* Purchase Books */}
                <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-purple-400">Get the Books</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-400 mb-4">
                      Deepen your journey with the complete written teachings
                    </p>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
                      onClick={() => window.open("https://33rdhouse.com/books", "_blank")}
                    >
                      <Book className="w-4 h-4 mr-2" />
                      Purchase Books
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* The Three Layers */}
        <section className="py-16 px-4">
          <div className="container max-w-6xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-serif font-bold text-purple-200 mb-4">The Three Layers</h2>
              <p className="text-gray-400 text-lg">Understanding this realm through myth, psychology, and practice</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-200">Mythic Layer</CardTitle>
                  <CardDescription>The Universal Story</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {realm.mythicLayer}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-200">Psychological Layer</CardTitle>
                  <CardDescription>The Personal Dimension</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {realm.psychologicalLayer}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-200">Hybrid Layer</CardTitle>
                  <CardDescription>The Lived Experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {realm.hybridLayer}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* AI-Generated Insights */}
        {user && (
          <section className="py-16 px-4">
            <div className="container max-w-6xl mx-auto">
              <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-200 flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI-Powered Spiritual Insight
                  </CardTitle>
                  <CardDescription>Personalized guidance for your journey through this realm</CardDescription>
                </CardHeader>
                <CardContent>
                  <AIRealmInsight
                    realmNumber={realm.number}
                    realmName={realm.title}
                    theme={realm.theme}
                    userProgress={progress?.completed ? 100 : 0}
                  />
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Practices & Meditation */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
          <div className="container max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Practices */}
              <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-200">Practices for This Realm</CardTitle>
                  <CardDescription>Tools for transformation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {realm.practices}
                  </p>
                  
                  <div className="pt-4 border-t border-purple-900/30">
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">Shadow Work</h4>
                    <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                      {realm.shadowWork}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Meditation Timer */}
              <MeditationTimer realmName={realm.title} color="#9333ea" />
            </div>
          </div>
        </section>

        {/* Navigation to Adjacent Realms */}
        <section className="py-16 px-4 border-t border-purple-900/20">
          <div className="container max-w-6xl mx-auto space-y-8">
            <div className="text-center">
              <Link href={`/gates/${gate.number}`}>
                <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-950/50">
                  View All Realms in Gate {gate.number}: {gate.title}
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-between">
              {prevRealm ? (
                <Link href={`/realms/${prevRealm}`}>
                  <Button 
                    variant="outline" 
                    className="border-purple-600 text-purple-300 hover:bg-purple-950/50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    <div className="text-left">
                      <div className="text-xs text-gray-500">Previous</div>
                      <div>Realm {prevRealm}</div>
                    </div>
                  </Button>
                </Link>
              ) : (
                <div />
              )}
              
              {nextRealm ? (
                <Link href={`/realms/${nextRealm}`}>
                  <Button 
                    variant="outline" 
                    className="border-purple-600 text-purple-300 hover:bg-purple-950/50"
                  >
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Next</div>
                      <div>Realm {nextRealm}</div>
                    </div>
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
