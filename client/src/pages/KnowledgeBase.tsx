import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Globe, Sparkles, Crown, Shield, BookOpen, ChevronDown, ChevronUp, ScrollText } from "lucide-react";
import deitiesData from "@/data/deities.json";

// Parse domains/symbols from "[x, y]" string format
function parseList(str: string): string[] {
  if (!str) return [];
  return str.replace(/[\[\]"]/g, '').split(',').map(s => s.trim()).filter(Boolean);
}

const traditions = [...new Set(deitiesData.map(d => d.tradition))];

function getTypeIcon(type: string) {
  switch (type) {
    case "god": return <Crown className="w-4 h-4" />;
    case "goddess": return <Sparkles className="w-4 h-4" />;
    default: return <Shield className="w-4 h-4" />;
  }
}

function getTraditionColor(tradition: string): string {
  switch (tradition) {
    case "Babylonian": return "#c77dff";
    case "Sumerian": return "#7b2cbf";
    case "Assyrian": return "#9d4edd";
    case "Egyptian": return "#e0aaff";
    case "Greek": return "#5a189a";
    default: return "#9333ea";
  }
}

type EntityResearchEntry = {
  id: number;
  subject: string;
  researchTopic: string;
  historicalOrigins: string;
  spiritualSignificance: string;
  keyTeachings: string;
  connections: string;
  relevance: string;
  modernInterpretations: string;
};

function ResearchCard({ entry }: { entry: EntityResearchEntry }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm hover:border-purple-600/40 transition-all">
      <CardHeader className="pb-2 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-lg font-serif text-purple-200 leading-tight">
              {entry.subject.split(' - ')[0]}
            </CardTitle>
            {entry.subject.includes(' - ') && (
              <CardDescription className="text-gray-400 mt-1 text-sm">
                {entry.subject.split(' - ').slice(1).join(' - ')}
              </CardDescription>
            )}
          </div>
          <Button variant="ghost" size="sm" className="flex-shrink-0 text-purple-400">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="space-y-4 pt-2">
          {entry.historicalOrigins && (
            <div>
              <h4 className="text-sm font-semibold text-purple-300 mb-1">Historical Origins</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{entry.historicalOrigins}</p>
            </div>
          )}
          {entry.spiritualSignificance && (
            <div>
              <h4 className="text-sm font-semibold text-purple-300 mb-1">Spiritual Significance</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{entry.spiritualSignificance}</p>
            </div>
          )}
          {entry.keyTeachings && (
            <div>
              <h4 className="text-sm font-semibold text-purple-300 mb-1">Key Teachings</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{entry.keyTeachings}</p>
            </div>
          )}
          {entry.connections && (
            <div>
              <h4 className="text-sm font-semibold text-purple-300 mb-1">Connections to Other Traditions</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{entry.connections}</p>
            </div>
          )}
          {entry.relevance && (
            <div>
              <h4 className="text-sm font-semibold text-purple-300 mb-1">Relevance to Transformation</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{entry.relevance}</p>
            </div>
          )}
          {entry.modernInterpretations && (
            <div>
              <h4 className="text-sm font-semibold text-purple-300 mb-1">Modern Interpretations</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{entry.modernInterpretations}</p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTradition, setSelectedTradition] = useState<string | null>(null);
  const [entityResearch, setEntityResearch] = useState<EntityResearchEntry[]>([]);

  useEffect(() => {
    fetch("/data/entityResearch.json")
      .then(res => res.json())
      .then(setEntityResearch)
      .catch(() => setEntityResearch([]));
  }, []);

  const filteredDeities = deitiesData.filter(d => {
    if (selectedTradition && d.tradition !== selectedTradition) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tradition.toLowerCase().includes(q) ||
        d.domains.toLowerCase().includes(q);
    }
    return true;
  });

  const filteredResearch = entityResearch.filter(e => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return e.subject.toLowerCase().includes(q) ||
      e.researchTopic.toLowerCase().includes(q) ||
      e.historicalOrigins.toLowerCase().includes(q) ||
      e.keyTeachings.toLowerCase().includes(q);
  });

  return (
    <>
      <Navigation />
      <SEO
        title="Knowledge Base - Deities, Archetypes & Sacred Research | The 33rd House"
        description="Explore 14 sacred deities and 100 deeply researched spiritual topics spanning Mesopotamian, Egyptian, Greek, Hermetic, Kabbalistic, and esoteric traditions."
      />

      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.2),transparent_50%)]" />
          </div>

          <div className="container relative z-10 max-w-6xl mx-auto text-center space-y-6">
            <div className="inline-block">
              <span className="text-sm font-mono text-purple-400 tracking-widest uppercase">
                Sacred Knowledge
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold tracking-tight">
              <span className="bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 bg-clip-text text-transparent">
                Knowledge Base
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A comprehensive research library of sacred traditions, cosmic archetypes, and esoteric
              wisdom drawn from the world's great spiritual lineages.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-400 pt-4">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-purple-500" />
                <span>{deitiesData.length} Deities</span>
              </div>
              <div className="flex items-center gap-2">
                <ScrollText className="w-4 h-4 text-purple-500" />
                <span>{entityResearch.length} Research Topics</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-500" />
                <span>{traditions.length}+ Traditions</span>
              </div>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="py-4 px-4 border-y border-purple-900/20">
          <div className="container max-w-6xl mx-auto">
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                placeholder="Search deities, traditions, symbols, teachings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-purple-950/30 border-purple-900/30 text-purple-200 placeholder:text-gray-500"
              />
            </div>
          </div>
        </section>

        {/* Tabbed Content */}
        <section className="py-8 px-4">
          <div className="container max-w-6xl mx-auto">
            <Tabs defaultValue="deities" className="space-y-6">
              <TabsList className="bg-purple-950/30 border border-purple-900/30">
                <TabsTrigger value="deities" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  <Crown className="w-4 h-4 mr-2" />
                  Deities ({filteredDeities.length})
                </TabsTrigger>
                <TabsTrigger value="research" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  <ScrollText className="w-4 h-4 mr-2" />
                  Research ({filteredResearch.length})
                </TabsTrigger>
              </TabsList>

              {/* Deities Tab */}
              <TabsContent value="deities" className="space-y-6">
                {/* Tradition Filter */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={selectedTradition === null ? "default" : "outline"}
                    onClick={() => setSelectedTradition(null)}
                    className="text-xs"
                  >
                    All Traditions
                  </Button>
                  {traditions.map(tradition => (
                    <Button
                      key={tradition}
                      size="sm"
                      variant={selectedTradition === tradition ? "default" : "outline"}
                      onClick={() => setSelectedTradition(tradition)}
                      className="text-xs"
                    >
                      {tradition}
                    </Button>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDeities.map(deity => {
                    const domains = parseList(deity.domains);
                    const symbols = parseList(deity.symbols);
                    const color = getTraditionColor(deity.tradition);

                    return (
                      <Card
                        key={deity.id}
                        className="border-purple-900/30 bg-black/40 backdrop-blur-sm hover:border-purple-600/40 transition-all group"
                        style={{ borderLeftWidth: '4px', borderLeftColor: color }}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between mb-2">
                            <Badge
                              variant="outline"
                              className="text-xs"
                              style={{ borderColor: `${color}80`, color: color }}
                            >
                              {deity.tradition}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs capitalize" style={{ color }}>
                              {getTypeIcon(deity.type)}
                              <span>{deity.type}</span>
                            </div>
                          </div>
                          <CardTitle className="text-2xl font-serif text-purple-200 group-hover:text-purple-100 transition-colors">
                            {deity.name}
                          </CardTitle>
                          <CardDescription className="text-gray-300 leading-relaxed">
                            {deity.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {domains.length > 0 && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Domains</p>
                              <div className="flex flex-wrap gap-1">
                                {domains.map(d => (
                                  <Badge key={d} variant="outline" className="text-xs border-purple-600/30 text-purple-400">
                                    {d}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {symbols.length > 0 && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Symbols</p>
                              <div className="flex flex-wrap gap-1">
                                {symbols.map(s => (
                                  <Badge key={s} variant="outline" className="text-xs border-amber-600/30 text-amber-400">
                                    {s}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {filteredDeities.length === 0 && (
                  <div className="text-center py-20">
                    <Globe className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No deities match your search</p>
                  </div>
                )}
              </TabsContent>

              {/* Research Tab */}
              <TabsContent value="research" className="space-y-4">
                <p className="text-sm text-gray-400">
                  {filteredResearch.length} research topics. Click any entry to expand.
                </p>
                {filteredResearch.map(entry => (
                  <ResearchCard key={entry.id} entry={entry} />
                ))}
                {filteredResearch.length === 0 && (
                  <div className="text-center py-20">
                    <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No research topics match your search</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Connection to System */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-serif font-bold text-purple-200">
              Archetypes & The Star Gate Cosmology
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              These deities and sacred teachings are not merely historical—they are living archetypes
              encoded within the 12 Gates. Each tradition contributes wisdom to the complete map of
              consciousness, from Babylonian creation myths to modern depth psychology.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="/system"
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                Learn The System
              </a>
              <a
                href="/gates"
                className="px-8 py-3 border border-purple-600 hover:bg-purple-950/50 text-purple-300 rounded-lg font-medium transition-colors"
              >
                Explore The 12 Gates
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
