import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AudioPlayer } from "@/components/AudioPlayer";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Lock, Music } from "lucide-react";
import { getLoginUrl } from "@/const";

// Sample meditation data - in production this would come from the database
const meditationsByGate = [
  {
    gate: 1,
    title: "Gate 1: Origin",
    theme: "Breath & Presence",
    meditations: [
      {
        id: 1,
        title: "Grounding Breath Practice",
        description: "15-minute foundational breathing meditation",
        duration: 900,
        audioUrl: "/meditations/gate1-grounding.mp3",
      },
      {
        id: 2,
        title: "Body Scan for Presence",
        description: "20-minute somatic awareness practice",
        duration: 1200,
        audioUrl: "/meditations/gate1-bodyscan.mp3",
      },
    ],
  },
  {
    gate: 2,
    title: "Gate 2: Motion",
    theme: "Flow & Regulation",
    meditations: [
      {
        id: 3,
        title: "Nervous System Regulation",
        description: "12-minute calming practice",
        duration: 720,
        audioUrl: "/meditations/gate2-regulation.mp3",
      },
    ],
  },
  {
    gate: 3,
    title: "Gate 3: Form",
    theme: "Identity & Boundaries",
    meditations: [
      {
        id: 4,
        title: "Boundary Setting Meditation",
        description: "18-minute practice for clear boundaries",
        duration: 1080,
        audioUrl: "/meditations/gate3-boundaries.mp3",
      },
    ],
  },
];

export default function Meditations() {
  const { user, isAuthenticated, loading } = useAuth();
  const [selectedGate, setSelectedGate] = useState(1);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <SEO 
          title="Guided Meditations | The 33rd House"
          description="Audio meditation library for each gate and realm"
        />
        <Navigation />
        
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-2xl w-full bg-black/40 border-purple-900/30">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-serif text-purple-200">
                Guided Meditations
              </CardTitle>
              <CardDescription className="text-lg text-gray-300">
                Access our complete library of guided meditation practices aligned with the 12 Gates and 144 Realms.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-purple-300">Meditation Library Includes:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <Music className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>144+ guided meditations, one for each realm</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Music className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Practices ranging from 10-30 minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Music className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Somatic, breathwork, and visualization techniques</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Music className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Downloadable audio for offline practice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Music className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Organized by gate and realm progression</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 flex flex-col gap-4">
                <Button 
                  size="lg" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => window.location.href = getLoginUrl()}
                >
                  Login to Access Meditations
                </Button>
                <p className="text-sm text-center text-gray-500">
                  Members-only area • Requires authentication
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const currentGate = meditationsByGate.find(g => g.gate === selectedGate);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <SEO 
        title="Guided Meditations | The 33rd House"
        description="Audio meditation library for each gate and realm"
      />
      <Navigation />
      
      <main className="flex-1 container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-serif text-purple-200 mb-2">
            Guided Meditations
          </h1>
          <p className="text-xl text-gray-300">
            Audio practices for each gate and realm
          </p>
        </div>

        <Tabs defaultValue="by-gate" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="by-gate">By Gate</TabsTrigger>
            <TabsTrigger value="all">All Meditations</TabsTrigger>
          </TabsList>

          <TabsContent value="by-gate" className="space-y-8">
            {/* Gate Selector */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {meditationsByGate.map((gate) => (
                <Card
                  key={gate.gate}
                  className={`cursor-pointer transition-all ${
                    selectedGate === gate.gate
                      ? "border-purple-600 bg-purple-950/30"
                      : "border-purple-900/30 hover:border-purple-700/50 bg-black/40"
                  }`}
                  onClick={() => setSelectedGate(gate.gate)}
                >
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        Gate {gate.gate}
                      </Badge>
                      <Music className="w-4 h-4 text-purple-500" />
                    </div>
                    <CardTitle className="text-sm font-semibold text-purple-200">
                      {gate.theme}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Selected Gate Meditations */}
            {currentGate && (
              <div className="space-y-6">
                <Card className="bg-black/40 border-purple-900/30">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">Gate {currentGate.gate}</Badge>
                      <Badge className="bg-purple-600 text-white">
                        {currentGate.meditations.length} {currentGate.meditations.length === 1 ? 'Meditation' : 'Meditations'}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-serif text-purple-200">
                      {currentGate.title}
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-300">
                      {currentGate.theme}
                    </CardDescription>
                  </CardHeader>
                </Card>

                <div className="space-y-4">
                  {currentGate.meditations.map((meditation) => (
                    <AudioPlayer
                      key={meditation.id}
                      title={meditation.title}
                      description={meditation.description}
                      audioUrl={meditation.audioUrl}
                      duration={meditation.duration}
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            {meditationsByGate.map((gate) => (
              <div key={gate.gate} className="space-y-4">
                <Card className="bg-black/40 border-purple-900/30">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">Gate {gate.gate}</Badge>
                    </div>
                    <CardTitle className="text-xl font-serif text-purple-200">
                      {gate.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {gate.theme}
                    </CardDescription>
                  </CardHeader>
                </Card>

                {gate.meditations.map((meditation) => (
                  <AudioPlayer
                    key={meditation.id}
                    title={meditation.title}
                    description={meditation.description}
                    audioUrl={meditation.audioUrl}
                    duration={meditation.duration}
                  />
                ))}
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
