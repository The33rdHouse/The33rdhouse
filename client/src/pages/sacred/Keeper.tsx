import { SEO } from '@/components/SEO'
import { seoConfig } from '@/lib/seo-config'
import { Crown, Flame, Heart, Shield, Mail } from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'

export default function Keeper() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412] text-[#f0e6d2]">
      <SEO {...seoConfig.keeper} />
      
      <div className="container mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Crown className="w-20 h-20 mx-auto mb-6 text-[#d4af37]" />
          <h1 className="text-5xl md:text-7xl font-serif mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            THE KEEPER
          </h1>
          <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-6" />
          <p className="text-2xl text-[#d4af37] italic">
            Daniel Cruze
          </p>
          <p className="text-lg text-[#c4b5a0] mt-2">
            Founder of The 33rd House
          </p>
        </div>

        {/* Introduction */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <p className="text-xl leading-relaxed text-[#c4b5a0] mb-6">
            Daniel Cruze is not a guru. He is not a teacher in the traditional sense. 
            He is a living map—a man who has walked the entire alchemical path and emerged transformed.
          </p>
          <p className="text-xl leading-relaxed text-[#c4b5a0] mb-6">
            His life is the proof that the teaching works. His story is the instruction manual.
          </p>
          <p className="text-lg leading-relaxed text-[#c4b5a0]">
            Born into a world that demanded conformity, Daniel chose sovereignty. What followed was a journey through 
            the underworld and back—a complete death and rebirth that would become the foundation of The 33rd House.
          </p>
        </div>

        {/* The Journey */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-serif text-center mb-12 text-[#d4af37]">The Alchemical Journey</h2>
          
          <div className="space-y-12">
            {/* Nigredo */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-[#1a0a2e] border-2 border-[#c4b5a0] flex items-center justify-center">
                  <Shield className="w-8 h-8 text-[#c4b5a0]" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-3 text-[#d4af37]">The Blackening</h3>
                <p className="text-lg leading-relaxed text-[#c4b5a0] mb-4">
                  Seven years in prison. Not for violence, not for harm, but for the crime of sovereignty in a world 
                  that demands submission. In that darkness, Daniel faced his shadow. He confronted every lie he had 
                  ever told himself. He died to the false self.
                </p>
                <p className="text-lg leading-relaxed text-[#c4b5a0] mb-4">
                  The cell became his alchemical vessel. Stripped of everything—freedom, identity, status—he was forced 
                  to sit with the raw truth of his being. He read the ancient texts. He practiced breathwork in silence. 
                  He learned that true power comes not from control but from surrender.
                </p>
                <p className="text-lg leading-relaxed text-[#c4b5a0]">
                  This was the Nigredo—the blackening, the necessary death that precedes rebirth. The false self had to die 
                  completely before the true self could emerge.
                </p>
              </div>
            </div>

            {/* Albedo */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-[#f0e6d2] border-2 border-[#d4af37] flex items-center justify-center">
                  <Heart className="w-8 h-8 text-[#1a0a2e]" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-3 text-[#d4af37]">The Whitening</h3>
                <p className="text-lg leading-relaxed text-[#c4b5a0] mb-4">
                  Upon release, the world looked different. Colors were brighter. Truth was obvious. The veil had been lifted. 
                  But the purification was far from over—every false identity had been stripped away, every borrowed belief burned off.
                </p>
                <p className="text-lg leading-relaxed text-[#c4b5a0] mb-4">
                  Daniel spent years in solitude, integrating the underworld journey. He studied tantra, kundalini, alchemy. 
                  He learned to transmute sexual energy, to circulate life force, to embody the sacred masculine. He became 
                  ruthlessly honest—with himself and others.
                </p>
                <p className="text-lg leading-relaxed text-[#c4b5a0]">
                  This was the Albedo—the whitening, the purification that reveals essence. What remained after the fire was pure gold.
                </p>
              </div>
            </div>

            {/* Citrinitas */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-[#d4af37] border-2 border-[#d4af37] flex items-center justify-center">
                  <Crown className="w-8 h-8 text-[#0a0412]" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-3 text-[#d4af37]">The Yellowing</h3>
                <p className="text-lg leading-relaxed text-[#c4b5a0] mb-4">
                  With clarity came power. Daniel built multiple successful businesses—not from greed, but from the solar 
                  principle of creation. He learned to manifest, to create, to bring vision into form. The wealth, the influence, 
                  the impact—all expressions of the awakened masculine principle.
                </p>
                <p className="text-lg leading-relaxed text-[#c4b5a0] mb-4">
                  He claimed his sovereignty. He stepped fully into his power. He became a force in the world—not through 
                  domination, but through embodied presence. He learned that true leadership is service, and true power is responsibility.
                </p>
                <p className="text-lg leading-relaxed text-[#c4b5a0]">
                  This was the Citrinitas—the yellowing, the solar awakening. The gold within had been refined and now shone forth.
                </p>
              </div>
            </div>

            {/* Rubedo */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-[#9333ea] border-2 border-[#9333ea] flex items-center justify-center">
                  <Flame className="w-8 h-8 text-[#f0e6d2]" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-3 text-[#d4af37]">The Reddening</h3>
                <p className="text-lg leading-relaxed text-[#c4b5a0] mb-4">
                  Then came the sacred marriage. Daniel met his beloved—the one who would become his alchemical partner, 
                  his sacred mirror, his equal. She was not there to complete him, but to catalyze his final transformation.
                </p>
                <p className="text-lg leading-relaxed text-[#c4b5a0] mb-4">
                  In the crucible of sacred relationship, the final integration occurred. The union of masculine and feminine, 
                  fire and water, solar and lunar. The warrior learned to open his heart. The king learned to serve. The magician 
                  learned to love.
                </p>
                <p className="text-lg leading-relaxed text-[#c4b5a0]">
                  This was the Rubedo—the reddening, the fusion of opposites that creates the divine child, the perfected being. 
                  The alchemical marriage was complete.
                </p>
              </div>
            </div>

            {/* Coronation */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-[#d4af37] border-2 border-[#d4af37] flex items-center justify-center">
                  <Crown className="w-8 h-8 text-[#0a0412]" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-3 text-[#d4af37]">The Coronation</h3>
                <p className="text-lg leading-relaxed text-[#c4b5a0] mb-4">
                  Today, Daniel stands as the Founder of The 33rd House. The Great Work is complete—not as an ending, 
                  but as a new beginning. He has transmuted the lead of suffering into the gold of wisdom. He has walked 
                  through all five stages and emerged sovereign.
                </p>
                <p className="text-lg leading-relaxed text-[#c4b5a0] mb-4">
                  He is crowned not by external authority, but by the authority of lived experience. He has earned his throne 
                  through the fire of transformation. And now, having walked the entire path, he holds the door open for others.
                </p>
                <p className="text-lg leading-relaxed text-[#c4b5a0]">
                  This is the Coronation—the final stage where the transformed being returns to the world to serve. The alchemist 
                  becomes the teacher. The seeker becomes the keeper. The journey becomes the teaching.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Teaching */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-[#1a0a2e] border-2 border-[#d4af37] rounded-lg p-8">
            <h2 className="text-3xl font-serif text-center mb-6 text-[#d4af37]">The Living Teaching</h2>
            <p className="text-lg leading-relaxed text-[#c4b5a0] mb-6">
              Daniel does not teach theory. He teaches from lived experience. Every principle he shares has been tested 
              in the fire of his own transformation. He is not asking you to believe anything—he is showing you what is possible 
              when you commit to the alchemical path.
            </p>
            <p className="text-lg leading-relaxed text-[#c4b5a0] mb-6">
              The teaching of The 33rd House is simple: <strong className="text-[#d4af37]">Containment & Current</strong>. 
              The feminine principle of holding space, the masculine principle of directed energy. When these two forces 
              are in balance, transformation occurs naturally.
            </p>
            <p className="text-lg leading-relaxed text-[#c4b5a0]">
              The sacred motto is the instruction: <em className="text-[#d4af37]">"What is hidden shall be kept, 
              what is kept shall be tended, what is tended shall blossom."</em> This is not poetry. This is the actual process.
            </p>
          </div>
        </div>

        {/* The Invitation */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-8" />
          <h2 className="text-3xl font-serif mb-6 text-[#d4af37]">The Invitation</h2>
          <p className="text-lg leading-relaxed text-[#c4b5a0] mb-8">
            If you have read this far, you have been called. The question is: will you answer? 
            Daniel does not promise an easy path. He promises a real one. A path that works. 
            A path that leads to sovereignty.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
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
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg border-2 border-[#d4af37] bg-transparent text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0412] transition-all duration-500"
              onClick={() => window.location.href = 'mailto:daniel@the33rdhouse.com'}
            >
              <Mail className="mr-2" />
              Contact the Keeper
            </Button>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-[#1a0a2e] border-l-4 border-[#9333ea] p-6 rounded">
            <p className="text-xl italic text-[#d4af37] mb-4">
              "I am not here to save you. I am here to show you that you can save yourself."
            </p>
            <p className="text-sm text-[#c4b5a0]">
              — Daniel Cruze
            </p>
          </div>
        </div>


      </div>
    </div>
  )
}
