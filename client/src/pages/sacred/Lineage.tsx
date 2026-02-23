import { SEO } from '@/components/SEO'
import { seoConfig } from '@/lib/seo-config'
import { Crown, Flame, Shield, Sunrise, Globe } from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'

const chapters = [
  {
    icon: Crown,
    title: "The Founding",
    subtitle: "The First Keeper",
    content: "The 33rd House was founded by Valuria, a priestess and healer who lived in a time of great turmoil. She was a visionary who saw the need for a new spiritual path, one open to all people. She gathered followers and taught them the principles of the Veiled Heart tradition. These first followers became the first Keepers of The 33rd House.",
    era: "Ancient Times"
  },
  {
    icon: Sunrise,
    title: "The Golden Age",
    subtitle: "The Flourishing",
    content: "The teachings spread quickly, and soon there were communities of Keepers all over the world. This was the Golden Age—a time of great peace and prosperity. The Keepers were respected for their wisdom and healing abilities, sought out by people from all walks of life.",
    era: "The Flourishing"
  },
  {
    icon: Shield,
    title: "The Dark Age",
    subtitle: "The Persecution",
    content: "The Golden Age ended with the rise of a new order hostile to the Veiled Heart tradition. The Keepers were persecuted, forced into hiding. The teachings were driven underground, preserved in secret by a small and dedicated group.",
    era: "The Trials"
  },
  {
    icon: Flame,
    title: "The Great Veiling",
    subtitle: "1666",
    content: "In 1666, amidst a world consumed by fear, the Brotherhood of the Rose-Fire enacted The Great Veiling Decree: 'Let the Flame be hidden in the folds of silk, let the Rose sleep beneath the garden stones. Until the world no longer burns from ignorance, we shall be as shadows that guard the light.'",
    era: "The Sacred Concealment"
  },
  {
    icon: Globe,
    title: "The Unveiling",
    subtitle: "The Modern Era",
    content: "Today, The 33rd House is a thriving global community led by Daniel Cruze. The instruction has been received to begin the Unveiling. The world is ready. The Flame can no longer be hidden. The Keepers continue to teach the ancient wisdom, committed to creating a world of peace, love, and understanding.",
    era: "Present Day"
  }
]

export default function Lineage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412] text-[#f0e6d2]">
      <SEO {...seoConfig.lineage} />
      
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            THE CHRONICLES
          </h1>
          <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-6" />
          <p className="text-xl text-[#d4af37] italic">
            A History of The 33rd House
          </p>
        </div>

        {/* Introduction */}
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <p className="text-lg leading-relaxed text-[#c4b5a0]">
            The 33rd House is a lineage of spiritual teachers and healers that dates back to ancient times. 
            The Keepers have been entrusted with the sacred teachings of the Veiled Heart tradition, 
            passing them down from generation to generation. This is a record of our triumphs and tribulations, 
            a testament to the enduring power of the human spirit.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-16">
          {chapters.map((chapter, index) => {
            const Icon = chapter.icon
            const isLeft = index % 2 === 0
            
            return (
              <div 
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 ${isLeft ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full border-2 border-[#d4af37] bg-[#1a0a2e] flex items-center justify-center">
                    <Icon className="w-12 h-12 text-[#d4af37]" />
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${isLeft ? 'md:text-left' : 'md:text-right'}`}>
                  <p className="text-sm text-[#9333ea] mb-2 tracking-wider">{chapter.era}</p>
                  <h2 className="text-3xl font-serif mb-2 text-[#d4af37]">{chapter.title}</h2>
                  <h3 className="text-xl italic mb-4 text-[#c4b5a0]">{chapter.subtitle}</h3>
                  <p className="text-base leading-relaxed text-[#c4b5a0]">
                    {chapter.content}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Closing */}
        <div className="max-w-3xl mx-auto mt-20 text-center">
          <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-8" />
          <p className="text-2xl font-serif italic text-[#d4af37] mb-12">
            The flame that was hidden now burns bright. The time of the Unveiling has come.
          </p>
          
          <Link href="/path">
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg border-2 border-[#9333ea] bg-transparent text-[#9333ea] hover:bg-[#9333ea] hover:text-[#0a0412] transition-all duration-500"
            >
              <Flame className="mr-2" />
              Walk the Alchemical Path
            </Button>
          </Link>
        </div>


      </div>
    </div>
  )
}
