import { useState } from "react";
import { realms, getRealmsByGate, type Realm } from "@/data/realms";
import { gates, type Gate } from "@/data/gates";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function RealmExplorer() {
  const [selectedGate, setSelectedGate] = useState<number | null>(null);
  const [selectedRealm, setSelectedRealm] = useState<Realm | null>(null);

  const displayedRealms = selectedGate 
    ? getRealmsByGate(selectedGate)
    : realms;

  const selectedGateData = selectedGate ? gates.find(g => g.number === selectedGate) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black">
      {/* Header */}
      <div className="container py-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            The 144 Realms
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Explore the complete journey through 12 sacred gates and 144 transformative realms.
            Each realm contains a unique sacred geometry glyph and profound teachings.
          </p>
        </div>

        {/* Gate Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Filter by Gate</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={selectedGate === null ? "default" : "outline"}
              onClick={() => setSelectedGate(null)}
              className="min-w-[120px]"
            >
              All Realms
            </Button>
            {gates.map((gate) => (
              <Button
                key={gate.number}
                variant={selectedGate === gate.number ? "default" : "outline"}
                onClick={() => setSelectedGate(gate.number)}
                className="min-w-[120px]"
                style={{
                  background: selectedGate === gate.number 
                    ? gate.color
                    : undefined
                }}
              >
                Gate {gate.number}
              </Button>
            ))}
          </div>
          
          {selectedGateData && (
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedGateData.name}</h3>
              <p className="text-zinc-400 max-w-2xl mx-auto">{selectedGateData.description}</p>
            </div>
          )}
        </div>

        {/* Realm Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {displayedRealms.map((realm) => {
            const realmGate = gates.find(g => g.number === realm.gate);
            return (
              <Card
                key={realm.number}
                className="group cursor-pointer overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => setSelectedRealm(realm)}
                style={{
                  boxShadow: `0 0 20px ${realmGate?.color}20`
                }}
              >
                <div className="aspect-square relative">
                  <img
                    src={realm.glyph}
                    alt={realm.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                    <Badge 
                      className="text-xs font-bold"
                      style={{
                        background: realmGate?.color,
                        color: 'white'
                      }}
                    >
                      Realm {realm.number}
                    </Badge>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {displayedRealms.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">No realms found for this gate.</p>
          </div>
        )}
      </div>

      {/* Realm Detail Modal */}
      <Dialog open={!!selectedRealm} onOpenChange={() => setSelectedRealm(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 border-zinc-800">
          {selectedRealm && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  {selectedRealm.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Glyph Display */}
                <div className="flex justify-center">
                  <div className="w-full max-w-md aspect-square rounded-lg overflow-hidden border-2 border-zinc-800">
                    <img
                      src={selectedRealm.glyph}
                      alt={selectedRealm.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Realm Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="text-sm">
                      Realm {selectedRealm.number}
                    </Badge>
                    <Badge 
                      className="text-sm"
                      style={{
                        background: gates.find(g => g.number === selectedRealm.gate)?.color,
                        color: 'white'
                      }}
                    >
                      {gates.find(g => g.number === selectedRealm.gate)?.name}
                    </Badge>
                  </div>

                  <div className="space-y-4 text-zinc-300">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Mythic Dimension</h4>
                      <p>{selectedRealm.mythic}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Psychological Dimension</h4>
                      <p>{selectedRealm.psychological}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Hybrid Practice</h4>
                      <p>{selectedRealm.hybrid}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Practices</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedRealm.practices.map((practice, idx) => (
                          <li key={idx}>{practice}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Meditation</h4>
                      <p className="italic text-purple-300">{selectedRealm.meditation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
