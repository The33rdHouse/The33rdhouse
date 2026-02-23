import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getGateColor } from "@/lib/gateColors";

// Gate type from database schema
interface Gate {
  id: number;
  number: number;
  name: string;
  theme: string;
  shadow: string;
  gift: string;
  somaticShift: string;
  praxis: string;
  realmCluster: string;
  description: string;
  level: string;
  keyword: string;
  orderIndex: number;
}

interface GateCardProps {
  gate: Gate;
}

export default function GateCard({ gate }: GateCardProps) {
  const color = getGateColor(gate.number);
  const realmStart = (gate.number - 1) * 12 + 1;
  const realmEnd = gate.number * 12;
  
  return (
    <Link href={`/gates/${gate.number}`}>
      <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 border-purple-900/30 bg-black/40 backdrop-blur-sm">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between">
            <Badge 
              variant="outline" 
              className="text-xs font-mono"
              style={{ borderColor: color, color: color }}
            >
              GATE {gate.number.toString().padStart(2, '0')}
            </Badge>
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: color }}
            />
          </div>
          
          <CardTitle className="text-2xl font-serif tracking-wide group-hover:text-purple-300 transition-colors">
            {gate.name}
          </CardTitle>
          
          <CardDescription className="text-sm text-gray-400 line-clamp-2">
            {gate.theme}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            <span 
              className="text-xs px-2 py-1 rounded-full bg-purple-950/50 text-purple-300 border border-purple-900/30"
            >
              {gate.keyword}
            </span>
            <span 
              className="text-xs px-2 py-1 rounded-full bg-purple-950/50 text-purple-300 border border-purple-900/30"
            >
              {gate.level}
            </span>
            <span 
              className="text-xs px-2 py-1 rounded-full bg-purple-950/50 text-purple-300 border border-purple-900/30"
            >
              {gate.realmCluster}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-purple-900/20">
            <span>Realms {realmStart}-{realmEnd}</span>
            <span className="text-purple-400 group-hover:translate-x-1 transition-transform">
              Explore →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
