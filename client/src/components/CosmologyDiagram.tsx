import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { getGateColor } from "@/lib/gateColors";
import { Loader2 } from "lucide-react";

export default function CosmologyDiagram() {
  const [hoveredGate, setHoveredGate] = useState<number | null>(null);
  const [hoveredRealm, setHoveredRealm] = useState<number | null>(null);

  // Fetch gates and realms from database
  const { data: gates, isLoading: gatesLoading } = trpc.gates.getAll.useQuery();
  const { data: realms, isLoading: realmsLoading } = trpc.realms.getAll.useQuery();

  const centerX = 400;
  const centerY = 400;
  const gateRadius = 280;
  const realmRadius = 180;

  if (gatesLoading || realmsLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
      </div>
    );
  }

  if (!gates || !realms) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center py-20">
        <p className="text-gray-400">Unable to load cosmology diagram</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <svg 
        viewBox="0 0 800 800" 
        className="w-full h-auto"
        style={{ filter: "drop-shadow(0 0 20px rgba(147, 51, 234, 0.3))" }}
      >
        {/* Background circles */}
        <circle 
          cx={centerX} 
          cy={centerY} 
          r={gateRadius + 40} 
          fill="none" 
          stroke="rgba(147, 51, 234, 0.1)" 
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <circle 
          cx={centerX} 
          cy={centerY} 
          r={realmRadius + 40} 
          fill="none" 
          stroke="rgba(147, 51, 234, 0.1)" 
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Center point */}
        <circle 
          cx={centerX} 
          cy={centerY} 
          r="8" 
          fill="url(#centerGradient)"
          className="animate-pulse"
        />
        <text
          x={centerX}
          y={centerY + 40}
          textAnchor="middle"
          fill="#d4af37"
          fontSize="12"
          fontFamily="serif"
          fontWeight="bold"
        >
          THE SOURCE
        </text>

        {/* Realm dots (inner circle) */}
        {realms.slice(0, 144).map((realm, index) => {
          const angle = (index / 144) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + realmRadius * Math.cos(angle);
          const y = centerY + realmRadius * Math.sin(angle);
          const gateNumber = realm.gateNumber;
          const color = getGateColor(gateNumber);
          const isHovered = hoveredRealm === realm.number;
          const isGateHovered = hoveredGate === gateNumber;

          return (
            <Link key={realm.number} href={`/realms/${realm.number}`}>
              <g className="cursor-pointer transition-all">
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? "6" : "3"}
                  fill={color}
                  opacity={isGateHovered || isHovered ? 1 : 0.5}
                  onMouseEnter={() => setHoveredRealm(realm.number)}
                  onMouseLeave={() => setHoveredRealm(null)}
                  className="transition-all duration-200"
                />
                {isHovered && (
                  <>
                    <circle
                      cx={x}
                      cy={y}
                      r="12"
                      fill="none"
                      stroke={color}
                      strokeWidth="1"
                      opacity="0.5"
                      className="animate-pulse"
                    />
                    <text
                      x={x}
                      y={y - 20}
                      textAnchor="middle"
                      fill={color}
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {realm.number}
                    </text>
                    <text
                      x={x}
                      y={y - 8}
                      textAnchor="middle"
                      fill="#f0e6d2"
                      fontSize="8"
                    >
                      {realm.mythicName}
                    </text>
                  </>
                )}
              </g>
            </Link>
          );
        })}

        {/* Gate nodes (outer circle) */}
        {gates.map((gate, index) => {
          const angle = (index / 12) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + gateRadius * Math.cos(angle);
          const y = centerY + gateRadius * Math.sin(angle);
          const isHovered = hoveredGate === gate.number;
          const color = getGateColor(gate.number);

          // Line from center to gate
          return (
            <g key={gate.number}>
              <line
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke={color}
                strokeWidth={isHovered ? "2" : "1"}
                opacity={isHovered ? 0.6 : 0.2}
                className="transition-all duration-200"
              />

              <Link href={`/gates/${gate.number}`}>
                <g 
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredGate(gate.number)}
                  onMouseLeave={() => setHoveredGate(null)}
                >
                  {/* Gate node */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? "20" : "16"}
                    fill={color}
                    opacity="0.9"
                    className="transition-all duration-200"
                  />
                  {isHovered && (
                    <circle
                      cx={x}
                      cy={y}
                      r="28"
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      opacity="0.4"
                      className="animate-pulse"
                    />
                  )}
                  
                  {/* Gate number */}
                  <text
                    x={x}
                    y={y + 5}
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {gate.number}
                  </text>

                  {/* Gate name */}
                  <text
                    x={x}
                    y={y + (y > centerY ? 45 : -30)}
                    textAnchor="middle"
                    fill={color}
                    fontSize={isHovered ? "14" : "12"}
                    fontWeight="bold"
                    fontFamily="serif"
                    className="transition-all duration-200"
                  >
                    {gate.name.toUpperCase()}
                  </text>
                </g>
              </Link>
            </g>
          );
        })}

        {/* Gradients */}
        <defs>
          <radialGradient id="centerGradient">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#9333ea" />
          </radialGradient>
        </defs>
      </svg>

      {/* Legend */}
      <div className="mt-8 p-6 rounded-lg border border-purple-900/30 bg-black/40 backdrop-blur-sm">
        <h3 className="text-lg font-serif font-semibold text-purple-200 mb-4 text-center">
          Interactive Cosmology Map
        </h3>
        <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-300">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-yellow-600" />
            <span>Center: The Source</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-purple-600" />
            <span>Outer: 12 Gates</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span>Inner: 144 Realms</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center italic">
          Hover over gates and realms to explore. Click to view details.
        </p>
      </div>
    </div>
  );
}
