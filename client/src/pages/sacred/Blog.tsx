import { SEO } from '@/components/SEO'
import { seoConfig } from '@/lib/seo-config'
import { useState } from 'react'
import { Link } from 'wouter'
import { BookOpen, Calendar, Tag, ArrowRight, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string[]
  date: string
  featured: boolean
  type: string
}

const blogPosts: BlogPost[] = [
  {
    id: 'awakening-kundalini',
    title: 'Awakening the Serpent: A Guide to Kundalini Rising',
    excerpt: 'The kundalini awakening is not a destination but a sacred journey of transformation. Learn the foundational practices for safely awakening your inner fire.',
    content: 'Full article content here...',
    category: ['Kundalini', 'Tantric Practice'],
    date: '2025-11-10',
    featured: true,
    type: 'Teaching'
  },
  {
    id: 'sacred-masculine',
    title: 'Reclaiming the Sacred Masculine',
    excerpt: 'True masculine power is not domination but sovereignty. Discover how to embody the sacred masculine through alchemical transformation.',
    content: 'Full article content here...',
    category: ['Sacred Masculinity'],
    date: '2025-11-05',
    featured: true,
    type: 'Teaching'
  },
  {
    id: 'nigredo-shadow',
    title: 'The Nigredo: Embracing Your Shadow',
    excerpt: 'The first stage of alchemical transformation requires us to descend into darkness. Only by facing our shadow can we begin the work of transmutation.',
    content: 'Full article content here...',
    category: ['Order Updates'],
    date: '2025-10-28',
    featured: false,
    type: 'Blog Post'
  },
  {
    id: 'tantric-breathwork',
    title: 'Tantric Breathwork for Energy Cultivation',
    excerpt: 'Breath is the bridge between body and spirit. Master these ancient tantric breathing techniques to cultivate and circulate life force energy.',
    content: 'Full article content here...',
    category: ['Tantric Practice', 'Kundalini'],
    date: '2025-10-20',
    featured: false,
    type: 'Resource'
  },
  {
    id: 'founding-33rd-house',
    title: 'The Founding of The 33rd House',
    excerpt: 'After years of walking the alchemical path, I received the vision to create a sanctuary for those called to the Great Work. This is our origin story.',
    content: 'Full article content here...',
    category: ['Order Updates'],
    date: '2025-10-15',
    featured: false,
    type: 'Announcement'
  },
  {
    id: 'five-stages-overview',
    title: 'The Five Stages of Alchemical Ascent',
    excerpt: 'An overview of the complete alchemical journey: from Nigredo (blackening) through Coronation (sovereignty). Each stage transforms you deeper.',
    content: 'Full article content here...',
    category: ['Order Updates'],
    date: '2025-10-08',
    featured: false,
    type: 'Teaching'
  }
]

const categories = ['All', 'Kundalini', 'Sacred Masculinity', 'Tantric Practice', 'Order Updates', 'Business']
const types = ['All', 'Blog Post', 'Teaching', 'Resource', 'Announcement']

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedType, setSelectedType] = useState('All')

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || post.category.includes(selectedCategory)
    const matchesType = selectedType === 'All' || post.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const featuredPosts = filteredPosts.filter(p => p.featured)
  const regularPosts = filteredPosts.filter(p => !p.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412] text-[#f0e6d2]">
      <SEO {...seoConfig.blog} />
      <div className="container mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-12">
          <BookOpen className="w-16 h-16 mx-auto mb-6 text-[#d4af37]" />
          <h1 className="text-5xl md:text-7xl font-serif mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            SACRED TEACHINGS
          </h1>
          <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-6" />
          <p className="text-xl text-[#d4af37] italic mb-4">
            Wisdom from the Alchemical Path
          </p>
          <p className="text-[#c4b5a0] max-w-2xl mx-auto">
            Insights, teachings, and guidance for those walking the path of transformation.
            Written by Daniel Cruze, Founder of The 33rd House.
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="w-full md:w-96">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#1a0a2e] border-[#9333ea]/30 text-[#f0e6d2]"
              />
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 md:flex-none px-4 py-2 rounded-md bg-[#1a0a2e] border border-[#9333ea]/30 text-[#f0e6d2]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="flex-1 md:flex-none px-4 py-2 rounded-md bg-[#1a0a2e] border border-[#9333ea]/30 text-[#f0e6d2]"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-2xl font-serif text-[#d4af37] mb-6 flex items-center gap-2">
              <span className="text-3xl">✨</span> Featured Teachings
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map(post => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <div className="bg-gradient-to-br from-[#9333ea]/20 to-[#1a0a2e] border-2 border-[#d4af37] rounded-lg p-8 hover:border-[#9333ea] transition-all cursor-pointer group">
                    <div className="flex items-start justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#d4af37]/20 text-[#d4af37] text-xs border border-[#d4af37]/50">
                        {post.type}
                      </span>
                      <span className="text-sm text-[#c4b5a0] flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-serif text-[#f0e6d2] mb-3 group-hover:text-[#d4af37] transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-[#c4b5a0] mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.category.map(cat => (
                        <span key={cat} className="px-2 py-1 rounded-full bg-[#9333ea]/20 text-[#9333ea] text-xs">
                          {cat}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-[#d4af37] text-sm group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-serif text-[#d4af37] mb-6">All Teachings</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {regularPosts.map(post => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <div className="bg-[#1a0a2e] border border-[#9333ea]/30 rounded-lg p-6 hover:border-[#d4af37]/50 transition-all cursor-pointer group h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-2 py-1 rounded-full bg-[#9333ea]/20 text-[#9333ea] text-xs">
                        {post.type}
                      </span>
                      <span className="text-xs text-[#c4b5a0]">
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-serif text-[#f0e6d2] mb-3 group-hover:text-[#d4af37] transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-[#c4b5a0] text-sm mb-4 leading-relaxed flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.category.map(cat => (
                        <span key={cat} className="px-2 py-1 rounded-full bg-[#0a0412] text-[#d4af37] text-xs border border-[#d4af37]/30">
                          {cat}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-[#d4af37] text-sm group-hover:gap-2 transition-all">
                      Read <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-[#9333ea]/30" />
            <p className="text-[#c4b5a0] text-lg">
              No teachings match your search. Try adjusting your filters.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
