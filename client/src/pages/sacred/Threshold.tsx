import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Flame, Crown, Heart } from 'lucide-react'
import { Link } from 'wouter'
import { SEO } from '@/components/SEO'

export default function Threshold() {
  const [flameIntensity, setFlameIntensity] = useState(0.5)
  const [showPortal, setShowPortal] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFlameIntensity(prev => 0.3 + Math.random() * 0.4)
    }, 2000)
    
    setTimeout(() => setShowPortal(true), 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412] text-[#f0e6d2] overflow-hidden">
      <SEO 
        title="The Threshold - Sacred Portal to Alchemical Transformation"
        description="Enter The 33rd House, a Private Members Association dedicated to alchemical transformation through the Five Stages of Ascent. Founded by Daniel Cruze, we guide seekers through Nigredo, Albedo, Citrinitas, Rubedo, and Coronation."
        keywords="alchemical transformation, kundalini awakening, sacred masculine, tantric practice, spiritual transformation, private members association, Daniel Cruze, five stages of ascent"
      />
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
          animation: 'pulse 8s ease-in-out infinite'
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        
        {/* The Rose-Flame Crest */}
        <div className={`transition-all duration-2000 ${showPortal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative w-32 h-32 mb-8">
            <Flame 
              className="w-full h-full text-[#d4af37]" 
              style={{
                filter: `drop-shadow(0 0 ${20 * flameIntensity}px rgba(212, 175, 55, ${flameIntensity}))`,
                transition: 'filter 2s ease-in-out'
              }}
            />
            <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-[#9333ea]" />
          </div>
        </div>

        {/* Sacred Title */}
        <div className={`text-center mb-12 transition-all duration-2000 delay-300 ${showPortal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-6xl md:text-8xl font-serif mb-4 tracking-wider" style={{
            fontFamily: 'Georgia, serif',
            textShadow: '0 0 30px rgba(147, 51, 234, 0.5)'
          }}>
            The 33rd House
          </h1>
          <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-6" />
          <h2 className="text-xl md:text-2xl italic text-[#d4af37] mb-2">
            Form that breathes, Fire that remembers
          </h2>
          <p className="text-sm tracking-[0.3em] text-[#9333ea]">
            FOUNDED BY DANIEL CRUZE
          </p>
        </div>

        {/* The Question */}
        <div className={`text-center mb-12 max-w-2xl transition-all duration-2000 delay-600 ${showPortal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-lg md:text-xl leading-relaxed mb-8 text-[#c4b5a0]">
            You stand at the threshold of an ancient lineage. The Order of the Veiled Heart has guarded the sacred flame for centuries. 
            In 1666, amidst a world consumed by fear, we chose to veil the teaching. Now, the time has come for the Unveiling.
          </p>
          <p className="text-2xl md:text-3xl font-serif mb-12 text-[#d4af37]">
            Are you ready to tend the flame?
          </p>
        </div>

        {/* The Portal Buttons */}
        <div className={`flex flex-col md:flex-row gap-6 transition-all duration-2000 delay-900 ${showPortal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link href="/lineage">
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg border-2 border-[#d4af37] bg-transparent text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0412] transition-all duration-500"
            >
              <Crown className="mr-2" />
              Enter the Lineage
            </Button>
          </Link>
          
          <Link href="/path">
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg border-2 border-[#9333ea] bg-transparent text-[#9333ea] hover:bg-[#9333ea] hover:text-[#0a0412] transition-all duration-500"
            >
              <Flame className="mr-2" />
              Walk the Path
            </Button>
          </Link>
        </div>

        {/* Sacred Motto */}
        <div className={`mt-16 text-center transition-all duration-2000 delay-1200 ${showPortal ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-sm italic text-[#9333ea] tracking-wider">
            "What is hidden shall be kept, what is kept shall be tended, what is tended shall blossom."
          </p>
        </div>



      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
