import { useRoute, Link } from 'wouter'
import { Calendar, Tag, ArrowLeft, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/SEO'

// This would normally come from a database or CMS
const articles: Record<string, any> = {
  'awakening-kundalini': {
    title: 'Awakening the Serpent: A Guide to Kundalini Rising',
    date: '2025-11-10',
    category: ['Kundalini', 'Tantric Practice'],
    type: 'Teaching',
    content: `
The kundalini awakening is not a destination but a sacred journey of transformation. It is the rising of the primordial life force energy that sleeps coiled at the base of the spine, waiting for the moment of awakening.

## Understanding Kundalini

Kundalini is often depicted as a serpent—not because it is dangerous, but because it represents the ancient wisdom that lies dormant within us all. When awakened, this energy rises through the central channel (sushumna nadi), activating and purifying each of the seven major chakras along its path.

## The Signs of Awakening

The awakening process is unique for each individual, but common experiences include:

- **Physical sensations**: Heat, tingling, or energy moving up the spine
- **Emotional releases**: Old traumas and suppressed emotions surfacing for healing
- **Heightened sensitivity**: Increased awareness of energy in yourself and others
- **Spontaneous movements**: Kriyas (automatic yogic movements) or mudras (hand gestures)
- **Altered states**: Visions, profound insights, or experiences of unity consciousness

## Foundational Practices

### 1. Breathwork (Pranayama)

The breath is the bridge between the physical and energetic bodies. Practice:

- **Alternate Nostril Breathing** (Nadi Shodhana): Balances the masculine and feminine energies
- **Breath of Fire** (Kapalabhati): Awakens and circulates prana
- **Retention** (Kumbhaka): Builds energetic pressure for kundalini activation

### 2. Spinal Alignment

Kundalini rises through the spine. Maintain:

- Daily spinal exercises and stretches
- Proper posture in meditation
- Awareness of the central channel

### 3. Chakra Purification

Each chakra must be cleared before kundalini can rise safely:

- **Root** (Muladhara): Ground and stabilize
- **Sacral** (Svadhisthana): Heal sexual and creative blocks
- **Solar Plexus** (Manipura): Reclaim personal power
- **Heart** (Anahata): Open to love and compassion
- **Throat** (Vishuddha): Speak your truth
- **Third Eye** (Ajna): Develop intuition and insight
- **Crown** (Sahasrara): Connect to divine consciousness

## Safety and Integration

Kundalini awakening can be intense. Essential guidelines:

1. **Work with a qualified teacher**: This is not a solo journey
2. **Go slowly**: Forced awakening can cause energetic imbalances
3. **Ground regularly**: Connect with earth, nature, physical activity
4. **Integrate experiences**: Journal, rest, and process what arises
5. **Maintain daily practice**: Consistency is more important than intensity

## The Sacred Masculine and Kundalini

For men, kundalini awakening often involves transmuting sexual energy. This is not about suppression but transformation—learning to circulate life force energy throughout the body rather than releasing it outward.

The sacred masculine path involves:

- Mastering sexual energy through tantric practices
- Channeling creative power into purpose and service
- Balancing strength with sensitivity
- Embodying both warrior and lover archetypes

## Conclusion

Kundalini awakening is a return to your true nature. It is the remembering of who you always were beneath the conditioning and wounds. Walk this path with reverence, patience, and trust in the intelligence of your own body and spirit.

The serpent rises when you are ready. Your only task is to prepare the vessel.

---

*For personalized guidance on your kundalini journey, consider joining The 33rd House community or booking a private session.*
    `
  },
  'sacred-masculine': {
    title: 'Reclaiming the Sacred Masculine',
    date: '2025-11-05',
    category: ['Sacred Masculinity'],
    type: 'Teaching',
    content: `
True masculine power is not domination but sovereignty. It is not control but presence. It is not hardness but the capacity to hold both strength and tenderness simultaneously.

## The Wounded Masculine

For generations, men have been taught to suppress their emotions, to equate vulnerability with weakness, to measure their worth by external achievements. This has created a crisis of disconnection—from ourselves, from others, from the sacred.

The wounded masculine manifests as:

- Aggression or passivity (fight or freeze)
- Emotional unavailability
- Addiction to work, substances, or validation
- Fear of intimacy and authentic connection
- Loss of purpose and meaning

## The Sacred Masculine Archetype

The sacred masculine is:

- **The King**: Sovereign, just, benevolent
- **The Warrior**: Disciplined, protective, courageous
- **The Magician**: Wise, transformative, alchemical
- **The Lover**: Passionate, present, heart-centered

These are not separate roles but integrated aspects of wholeness.

## The Path of Reclamation

### 1. Feel Your Feelings

Emotions are not weakness—they are intelligence. Learn to:

- Name what you feel without judgment
- Allow emotions to move through you
- Express authentically without harming others

### 2. Reclaim Your Body

Your body is not a machine. It is a temple. Practices:

- Breathwork to release stored trauma
- Movement to embody power and grace
- Touch and sensation to reconnect with aliveness

### 3. Transmute Sexual Energy

Sexual energy is life force. Learn to:

- Separate orgasm from ejaculation
- Circulate energy through the microcosmic orbit
- Channel sexual power into creativity and purpose

### 4. Serve Something Greater

Purpose is not what you do—it's why you do it. Ask:

- What is mine to give?
- Who am I here to serve?
- What legacy will I leave?

## Integration

The sacred masculine is not about becoming someone new. It's about remembering who you've always been beneath the armor.

This work requires:

- Courage to face your shadow
- Humility to ask for help
- Commitment to daily practice
- Community of other men on the path

## Conclusion

The world needs men who are awake, alive, and aligned with their purpose. Men who can hold space for others because they've learned to hold space for themselves. Men who lead with both strength and compassion.

This is the path of the sacred masculine. This is the Great Work.

---

*Join The 33rd House to walk this path with other men committed to transformation.*
    `
  }
}

export default function BlogArticle() {
  const [, params] = useRoute('/blog/:id')
  const articleId = params?.id || ''
  const article = articles[articleId]

  const seoTitle = article ? article.title : 'Article Not Found'
  const seoDescription = article ? article.content.substring(0, 160) + '...' : 'The requested article could not be found.'

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412] text-[#f0e6d2] flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-[#9333ea]/30" />
          <h2 className="text-2xl font-serif text-[#d4af37] mb-4">Article Not Found</h2>
          <Link href="/blog">
            <Button className="bg-[#9333ea] hover:bg-[#7c2dc7] text-white">
              <ArrowLeft className="mr-2" />
              Back to All Teachings
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412] text-[#f0e6d2]">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={`${article.category.join(', ')}, alchemical teachings, spiritual wisdom, The 33rd House`}
      />
      <div className="container mx-auto px-4 py-16">
        
        {/* Back Button */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link href="/blog">
            <Button variant="outline" className="border-[#9333ea]/30 text-[#c4b5a0] hover:border-[#d4af37] hover:text-[#d4af37]">
              <ArrowLeft className="mr-2" />
              Back to All Teachings
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-[#9333ea]/20 text-[#9333ea] text-sm border border-[#9333ea]/50">
              {article.type}
            </span>
            <span className="text-sm text-[#c4b5a0] flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-[#f0e6d2]" style={{ fontFamily: 'Georgia, serif' }}>
            {article.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {article.category.map((cat: string) => (
              <span key={cat} className="px-3 py-1 rounded-full bg-[#d4af37]/20 text-[#d4af37] text-sm border border-[#d4af37]/50">
                {cat}
              </span>
            ))}
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert prose-lg max-w-none">
            <div 
              className="text-[#f0e6d2] leading-relaxed"
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.75'
              }}
            >
              {article.content.split('\n\n').map((paragraph: string, index: number) => {
                // Handle headings
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-3xl font-serif text-[#d4af37] mt-12 mb-6">
                      {paragraph.replace('## ', '')}
                    </h2>
                  )
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-2xl font-serif text-[#d4af37] mt-8 mb-4">
                      {paragraph.replace('### ', '')}
                    </h3>
                  )
                }
                // Handle lists
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(line => line.startsWith('- '))
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 my-6 text-[#c4b5a0]">
                      {items.map((item, i) => (
                        <li key={i} className="ml-4">
                          {item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#d4af37]">$1</strong>').split('<strong').map((part, j) => {
                            if (j === 0) return part
                            const [strong, rest] = part.split('</strong>')
                            return <span key={j}><strong className="text-[#d4af37]">{strong.replace(' class="text-[#d4af37]">', '')}</strong>{rest}</span>
                          })}
                        </li>
                      ))}
                    </ul>
                  )
                }
                // Handle horizontal rule
                if (paragraph === '---') {
                  return <div key={index} className="h-px w-full bg-gradient-to-r from-transparent via-[#9333ea] to-transparent my-12" />
                }
                // Handle italic paragraphs
                if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                  return (
                    <p key={index} className="text-[#c4b5a0] italic my-6 text-center">
                      {paragraph.replace(/^\*/, '').replace(/\*$/, '')}
                    </p>
                  )
                }
                // Regular paragraphs
                return (
                  <p key={index} className="mb-6 text-[#f0e6d2]">
                    {paragraph}
                  </p>
                )
              })}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto mt-16 p-8 bg-gradient-to-br from-[#9333ea]/20 to-[#1a0a2e] border-2 border-[#d4af37] rounded-lg text-center">
          <h3 className="text-2xl font-serif text-[#d4af37] mb-4">Continue Your Journey</h3>
          <p className="text-[#c4b5a0] mb-6">
            Ready to walk the path of transformation? Join The 33rd House community.
          </p>
          <Link href="/portal">
            <Button className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0a0412]">
              Enter The Portal
            </Button>
          </Link>
        </div>

      </div>
    </div>
  )
}
