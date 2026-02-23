import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AudioPlayer } from "@/components/AudioPlayer";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Lock, Music, Clock, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { getLoginUrl } from "@/const";
import meditationsData from "@/data/meditations.json";

// Map eraId to gate info
const eraToGate: Record<number, { name: string; theme: string }> = {
  1: { name: "Awakening", theme: "Primordial Wisdom" },
  2: { name: "Clarity", theme: "Axial Age Philosophy" },
  3: { name: "Perspective", theme: "Hermetic Mysteries" },
  4: { name: "Power", theme: "Desert Mysticism" },
  5: { name: "Heart", theme: "Alchemical Transformation" },
  6: { name: "Shadow", theme: "Renaissance Illumination" },
  7: { name: "Union", theme: "The Invisible College" },
  8: { name: "Death & Rebirth", theme: "Enlightenment Wisdom" },
  9: { name: "Vision", theme: "Masters of Wisdom" },
  10: { name: "Law", theme: "Depth Psychology" },
  11: { name: "Paradox", theme: "Cosmic Consciousness" },
  12: { name: "Return", theme: "Synthesis of All Paths" },
};

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  return `${mins} min`;
}

function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "beginner": return "bg-green-600/20 text-green-400 border-green-600/30";
    case "intermediate": return "bg-amber-600/20 text-amber-400 border-amber-600/30";
    case "advanced": return "bg-red-600/20 text-red-400 border-red-600/30";
    default: return "bg-purple-600/20 text-purple-400 border-purple-600/30";
  }
}

function getTypeLabel(type: string): string {
  switch (type) {
    case "guided_visualization": return "Guided Visualization";
    case "breathwork": return "Breathwork";
    case "contemplation": return "Contemplation";
    default: return type;
  }
}

function MeditationCard({ meditation }: { meditation: typeof meditationsData[0] }) {
  const [showScript, setShowScript] = useState(false);
  const gate = eraToGate[meditation.eraId] || { name: "Unknown", theme: "" };

  return (
    <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm hover:border-purple-600/40 transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs border-purple-600 text-purple-400">
              Gate {meditation.eraId}: {gate.name}
            </Badge>
            <Badge variant="outline" className={`text-xs ${getDifficultyColor(meditation.difficulty)}`}>
              {meditation.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs border-blue-600/30 text-blue-400">
              {getTypeLabel(meditation.type)}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <Clock className="w-3.5 h-3.5" />
            {formatDuration(meditation.durationSeconds)}
          </div>
        </div>
        <CardTitle className="text-xl font-serif text-purple-200">
          {meditation.title}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {meditation.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Audio Player (placeholder since no audio URL) */}
        {meditation.durationSeconds > 0 && (
          <AudioPlayer
            title={meditation.title}
            description={meditation.description}
            audioUrl={`/meditations/${meditation.slug}.mp3`}
            duration={meditation.durationSeconds}
          />
        )}

        {/* Script Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowScript(!showScript)}
          className="w-full border-purple-900/30 text-purple-300 hover:bg-purple-950/30"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          {showScript ? "Hide" : "Read"} Meditation Script
          {showScript ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
        </Button>

        {showScript && (
          <div className="p-4 rounded-lg bg-purple-950/20 border border-purple-900/20 max-h-96 overflow-y-auto">
            <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-serif">
              {meditation.script}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Meditations() {
  const { user, isAuthenticated, loading } = useAuth();
  const [selectedGate, setSelectedGate] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <SEO
          title="Guided Meditations | The 33rd House"
          description="12 guided meditations spanning ancient Mesopotamian temple journeys to cosmic consciousness awakening. Each practice corresponds to one of the 12 Gates."
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
                Access our complete library of {meditationsData.length} guided meditation practices spanning ancient wisdom traditions to modern consciousness studies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-purple-300">Meditation Library Includes:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <Music className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>{meditationsData.length} guided meditations, one for each gate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Music className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Practices ranging from 12-22 minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Music className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Guided visualizations, breathwork, and contemplation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Music className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Full meditation scripts for self-guided practice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Music className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Organized by gate and spiritual tradition</span>
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
                  Members-only area
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const filteredMeditations = meditationsData.filter(m => {
    if (selectedGate !== null && m.eraId !== selectedGate) return false;
    if (filterType !== null && m.type !== filterType) return false;
    return true;
  });

  const types = [...new Set(meditationsData.map(m => m.type))];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <SEO
        title="Guided Meditations | The 33rd House"
        description="12 guided meditations spanning ancient Mesopotamian temple journeys to cosmic consciousness awakening."
      />
      <Navigation />

      <main className="flex-1 container max-w-5xl mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-serif text-purple-200 mb-2">
            Guided Meditations
          </h1>
          <p className="text-xl text-gray-300">
            {meditationsData.length} practices spanning 12 wisdom traditions
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Gate Filter */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Filter by Gate</label>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={selectedGate === null ? "default" : "outline"}
                onClick={() => setSelectedGate(null)}
                className="text-xs"
              >
                All Gates
              </Button>
              {Object.entries(eraToGate).map(([eraId, gate]) => (
                <Button
                  key={eraId}
                  size="sm"
                  variant={selectedGate === Number(eraId) ? "default" : "outline"}
                  onClick={() => setSelectedGate(Number(eraId))}
                  className="text-xs"
                >
                  {gate.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Filter by Type</label>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={filterType === null ? "default" : "outline"}
                onClick={() => setFilterType(null)}
                className="text-xs"
              >
                All Types
              </Button>
              {types.map(type => (
                <Button
                  key={type}
                  size="sm"
                  variant={filterType === type ? "default" : "outline"}
                  onClick={() => setFilterType(type)}
                  className="text-xs"
                >
                  {getTypeLabel(type)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-400 mb-6">
          Showing {filteredMeditations.length} of {meditationsData.length} meditations
        </p>

        {/* Meditation Cards */}
        <div className="space-y-6">
          {filteredMeditations.map((meditation) => (
            <MeditationCard key={meditation.id} meditation={meditation} />
          ))}
        </div>

        {filteredMeditations.length === 0 && (
          <div className="text-center py-20">
            <Music className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No meditations match your filters</p>
          </div>
        )}
      </main>
    </div>
  );
}
