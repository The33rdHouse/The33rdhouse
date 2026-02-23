import { useState } from 'react'
import { Moon, Sun, Star, Flame, Crown } from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'

const stages = [
  {
    id: 1,
    name: "NIGREDO",
    title: "The Blackening",
    subtitle: "Death & Dissolution",
    icon: Moon,
    color: "#1a0a2e",
    textColor: "#c4b5a0",
    description: "The first stage is the darkest. It is the death of the old self, the dissolution of everything you thought you knew. In the prison of your own making, you face the shadow. This is where the alchemical work begins—in the depths of despair, in the moment of complete surrender.",
    teaching: "Daniel's journey began in a literal prison—seven years of darkness, isolation, and confrontation with the shadow. The Nigredo is not metaphorical suffering; it is the real death of the false self.",
    symbol: "🌑"
  },
  {
    id: 2,
    name: "ALBEDO",
    title: "The Whitening",
    subtitle: "Purification & Clarity",
    icon: Sun,
    color: "#f0e6d2",
    textColor: "#1a0a2e",
    description: "After the darkness comes the light. The Albedo is the stage of purification, where the dross is burned away and only the essence remains. You begin to see clearly for the first time. The illusions fall away. You discover what is real.",
    teaching: "Upon release, Daniel faced the world with new eyes. The purification was not gentle—it was the stripping away of every false identity, every borrowed belief. What remained was the raw truth of being.",
    symbol: "🌕"
  },
  {
    id: 3,
    name: "CITRINITAS",
    title: "The Yellowing",
    subtitle: "Solar Awakening",
    icon: Star,
    color: "#d4af37",
    textColor: "#0a0412",
    description: "The dawn breaks. The Citrinitas is the awakening of the solar consciousness, the birth of the true self. You step into your power. You claim your sovereignty. The inner sun begins to shine.",
    teaching: "Daniel built his empire—not from greed, but from the solar principle of creation. The businesses, the wealth, the influence—all expressions of the awakened masculine principle, the fire that builds and protects.",
    symbol: "☀️"
  },
  {
    id: 4,
    name: "RUBEDO",
    title: "The Reddening",
    subtitle: "The Sacred Marriage",
    icon: Flame,
    color: "#9333ea",
    textColor: "#f0e6d2",
    description: "The fire turns red. The Rubedo is the sacred marriage of opposites—masculine and feminine, solar and lunar, fire and water. This is the union that creates the Philosopher's Stone. You become whole.",
    teaching: "Daniel met his beloved—the one who would become his sacred mirror, his alchemical partner. The Rubedo is not romance; it is the fusion of polarities that creates the divine child, the perfected being.",
    symbol: "🔥"
  },
  {
    id: 5,
    name: "CORONATION",
    title: "The Crowning",
    subtitle: "The Philosopher's Stone",
    icon: Crown,
    color: "#d4af37",
    textColor: "#0a0412",
    description: "The Great Work is complete. The Coronation is the final stage, where the adept becomes the master. You have transmuted the lead of suffering into the gold of wisdom. You are crowned as a sovereign being, a keeper of the flame.",
    teaching: "Daniel stands today as the living embodiment of the teaching. The Founder of The 33rd House, the one who has walked the entire path and now holds the door open for others. The Coronation is not an ending—it is a new beginning.",
    symbol: "👑"
  }
]

export default function Path() {
  const [selectedStage, setSelectedStage] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412] text-[#f0e6d2]">
      
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            THE PATH
          </h1>
          <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-6" />
          <p className="text-xl text-[#d4af37] italic">
            The Five Stages of Alchemical Ascent
          </p>
        </div>

        {/* Introduction */}
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <p className="text-lg leading-relaxed text-[#c4b5a0] mb-6">
            The alchemical path is not a metaphor. It is the actual process of transformation that every soul must undergo 
            to achieve sovereignty. These five stages are not linear—they spiral, they repeat, they deepen. 
            But they are the map.
          </p>
          <p className="text-lg leading-relaxed text-[#c4b5a0]">
            Daniel Cruze has walked this path. His life is the living map. 
            Study his journey, and you will understand the teaching.
          </p>
        </div>

        {/* The Five Stages */}
        <div className="max-w-5xl mx-auto space-y-8 mb-20">
          {stages.map((stage, index) => {
            const Icon = stage.icon
            const isSelected = selectedStage === stage.id
            
            return (
              <div 
                key={stage.id}
                className="border-2 rounded-lg overflow-hidden transition-all duration-500 cursor-pointer"
                style={{
                  borderColor: stage.color === "#f0e6d2" ? "#d4af37" : stage.color,
                  backgroundColor: isSelected ? stage.color : 'transparent'
                }}
                onClick={() => setSelectedStage(isSelected ? null : stage.id)}
              >
                {/* Stage Header */}
                <div className="p-6 flex items-center gap-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: stage.color,
                      border: `2px solid ${stage.color === "#f0e6d2" ? "#d4af37" : stage.color}`
                    }}
                  >
                    <Icon 
                      className="w-8 h-8" 
                      style={{ color: stage.textColor }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-3xl">{stage.symbol}</span>
                      <h2 
                        className="text-2xl md:text-3xl font-serif tracking-wider"
                        style={{ color: isSelected ? stage.textColor : stage.color }}
                      >
                        {stage.name}
                      </h2>
                    </div>
                    <h3 
                      className="text-lg italic"
                      style={{ color: isSelected ? stage.textColor : '#c4b5a0' }}
                    >
                      {stage.title} — {stage.subtitle}
                    </h3>
                  </div>
                </div>

                {/* Stage Content (Expandable) */}
                {isSelected && (
                  <div 
                    className="px-6 pb-6 space-y-4"
                    style={{ color: stage.textColor }}
                  >
                    <div className="h-px w-full bg-current opacity-30 mb-4" />
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-2">The Teaching</h4>
                      <p className="leading-relaxed">{stage.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Daniel's Journey</h4>
                      <p className="leading-relaxed italic">{stage.teaching}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* The Living Map */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-8" />
          <h2 className="text-3xl font-serif mb-6 text-[#d4af37]">The Living Map</h2>
          <p className="text-lg leading-relaxed text-[#c4b5a0] mb-8">
            The path is not theoretical. It is lived. Daniel Cruze has walked through all five stages, 
            and his life is the proof that transformation is possible. He is the Founder of The 33rd House, 
            the one who holds the door open for those who are ready to walk the path themselves.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link href="/keeper">
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-6 text-lg border-2 border-[#d4af37] bg-transparent text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0412] transition-all duration-500"
              >
                <Crown className="mr-2" />
                Meet the Keeper
              </Button>
            </Link>
            
            <Link href="/portal">
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-6 text-lg border-2 border-[#9333ea] bg-transparent text-[#9333ea] hover:bg-[#9333ea] hover:text-[#0a0412] transition-all duration-500"
              >
                <Flame className="mr-2" />
                Enter the Portal
              </Button>
            </Link>
          </div>
        </div>


      </div>
    </div>
  )
}
