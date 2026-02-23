import { SEO } from '@/components/SEO'
import { seoConfig } from '@/lib/seo-config'
import { useState, useEffect } from 'react'
import { BookOpen, Plus, Download, Calendar, Tag, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface JournalEntry {
  id: string
  date: Date
  title: string
  content: string
  stage: string
  tags: string[]
  mood?: string
}

const alchemicalStages = [
  { id: 'nigredo', name: 'Nigredo', color: '#1a0a2e', prompt: 'What shadows am I facing today? What needs to die for me to transform?' },
  { id: 'albedo', name: 'Albedo', color: '#f0e6d2', prompt: 'What clarity has emerged? What truth is being revealed?' },
  { id: 'citrinitas', name: 'Citrinitas', color: '#d4af37', prompt: 'How am I stepping into my power? What am I creating?' },
  { id: 'rubedo', name: 'Rubedo', color: '#9333ea', prompt: 'What opposites are uniting within me? How am I becoming whole?' },
  { id: 'coronation', name: 'Coronation', color: '#d4af37', prompt: 'What wisdom have I gained? How am I embodying sovereignty?' },
]

const suggestedTags = [
  'Shadow Work', 'Purification', 'Awakening', 'Integration', 'Breakthrough',
  'Resistance', 'Surrender', 'Clarity', 'Power', 'Love', 'Wisdom', 'Ceremony'
]

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isWriting, setIsWriting] = useState(false)
  const [currentEntry, setCurrentEntry] = useState({
    title: '',
    content: '',
    stage: 'nigredo',
    tags: [] as string[],
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStage, setFilterStage] = useState('all')

  // Load entries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('truthJournal')
    if (saved) {
      const parsed = JSON.parse(saved)
      setEntries(parsed.map((e: any) => ({ ...e, date: new Date(e.date) })))
    }
  }, [])

  // Save entries to localStorage
  const saveEntries = (newEntries: JournalEntry[]) => {
    setEntries(newEntries)
    localStorage.setItem('truthJournal', JSON.stringify(newEntries))
  }

  const handleSaveEntry = () => {
    if (!currentEntry.title || !currentEntry.content) return

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      title: currentEntry.title,
      content: currentEntry.content,
      stage: currentEntry.stage,
      tags: currentEntry.tags,
    }

    saveEntries([newEntry, ...entries])
    setCurrentEntry({ title: '', content: '', stage: 'nigredo', tags: [] })
    setIsWriting(false)
  }

  const toggleTag = (tag: string) => {
    setCurrentEntry(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const exportToPDF = () => {
    // Simple text export for now - can be enhanced with proper PDF generation
    const text = entries.map(e => 
      `${e.date.toLocaleDateString()} - ${e.title}\nStage: ${e.stage}\nTags: ${e.tags.join(', ')}\n\n${e.content}\n\n---\n\n`
    ).join('')
    
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `truth-journal-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
  }

  const currentStage = alchemicalStages.find(s => s.id === currentEntry.stage)
  
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = filterStage === 'all' || entry.stage === filterStage
    return matchesSearch && matchesStage
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412] text-[#f0e6d2]">
      <SEO {...seoConfig.journal} />
      <div className="container mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-12">
          <BookOpen className="w-16 h-16 mx-auto mb-6 text-[#d4af37]" />
          <h1 className="text-5xl md:text-7xl font-serif mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            TRUTH JOURNAL
          </h1>
          <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-6" />
          <p className="text-xl text-[#d4af37] italic mb-4">
            Document Your Alchemical Journey
          </p>
          <p className="text-[#c4b5a0] max-w-2xl mx-auto">
            A sacred space to record your transformation. Track your progress through the five stages,
            reflect on your experiences, and witness your own becoming.
          </p>
        </div>

        {/* Actions Bar */}
        <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-3 w-full md:w-auto">
            <Button
              onClick={() => setIsWriting(!isWriting)}
              className="bg-[#9333ea] hover:bg-[#7c2dc7] text-white"
            >
              <Plus className="mr-2" />
              New Entry
            </Button>
            <Button
              onClick={exportToPDF}
              variant="outline"
              className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0412]"
            >
              <Download className="mr-2" />
              Export
            </Button>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#c4b5a0]" />
              <Input
                type="text"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#1a0a2e] border-[#9333ea]/30 text-[#f0e6d2]"
              />
            </div>
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="px-4 py-2 rounded-md bg-[#1a0a2e] border border-[#9333ea]/30 text-[#f0e6d2]"
            >
              <option value="all">All Stages</option>
              {alchemicalStages.map(stage => (
                <option key={stage.id} value={stage.id}>{stage.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Writing Area */}
        {isWriting && (
          <div className="max-w-4xl mx-auto mb-12 bg-[#1a0a2e] border-2 border-[#9333ea] rounded-lg p-8">
            <h2 className="text-2xl font-serif mb-6 text-[#d4af37]">New Journal Entry</h2>
            
            {/* Stage Selection */}
            <div className="mb-6">
              <label className="block text-sm text-[#c4b5a0] mb-3">Alchemical Stage</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {alchemicalStages.map(stage => (
                  <button
                    key={stage.id}
                    onClick={() => setCurrentEntry({ ...currentEntry, stage: stage.id })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      currentEntry.stage === stage.id
                        ? 'border-[#d4af37] bg-[#d4af37]/20'
                        : 'border-[#9333ea]/30 hover:border-[#9333ea]'
                    }`}
                  >
                    <div className="text-sm font-semibold text-[#f0e6d2]">{stage.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Reflection Prompt */}
            {currentStage && (
              <div className="mb-6 p-4 bg-[#0a0412]/50 rounded-lg border border-[#d4af37]/30">
                <p className="text-sm text-[#d4af37] italic">
                  💭 Reflection Prompt: {currentStage.prompt}
                </p>
              </div>
            )}

            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm text-[#c4b5a0] mb-2">Entry Title</label>
              <Input
                type="text"
                placeholder="Give your entry a title..."
                value={currentEntry.title}
                onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                className="bg-[#0a0412] border-[#9333ea]/30 text-[#f0e6d2]"
              />
            </div>

            {/* Content */}
            <div className="mb-6">
              <label className="block text-sm text-[#c4b5a0] mb-2">Your Reflection</label>
              <Textarea
                placeholder="Write your truth..."
                value={currentEntry.content}
                onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                className="min-h-[300px] bg-[#0a0412] border-[#9333ea]/30 text-[#f0e6d2]"
              />
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label className="block text-sm text-[#c4b5a0] mb-3">
                <Tag className="inline w-4 h-4 mr-1" />
                Sacred Insights (select tags)
              </label>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      currentEntry.tags.includes(tag)
                        ? 'bg-[#9333ea] text-white'
                        : 'bg-[#0a0412] text-[#c4b5a0] border border-[#9333ea]/30 hover:border-[#9333ea]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleSaveEntry}
                className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0a0412]"
              >
                Save Entry
              </Button>
              <Button
                onClick={() => setIsWriting(false)}
                variant="outline"
                className="border-[#9333ea]/30 text-[#c4b5a0]"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Entries List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-[#9333ea]/30" />
              <p className="text-[#c4b5a0] text-lg">
                {searchTerm || filterStage !== 'all' 
                  ? 'No entries match your search'
                  : 'Your journal is empty. Begin your journey by writing your first entry.'}
              </p>
            </div>
          ) : (
            filteredEntries.map(entry => {
              const stage = alchemicalStages.find(s => s.id === entry.stage)
              return (
                <div
                  key={entry.id}
                  className="bg-[#1a0a2e] border border-[#9333ea]/30 rounded-lg p-6 hover:border-[#d4af37]/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-serif text-[#d4af37] mb-2">{entry.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-[#c4b5a0]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {entry.date.toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                        {stage && (
                          <span className="px-2 py-1 rounded-full bg-[#9333ea]/20 text-[#9333ea] text-xs">
                            {stage.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-[#f0e6d2] mb-4 leading-relaxed whitespace-pre-wrap">
                    {entry.content}
                  </p>

                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full bg-[#0a0412] text-[#d4af37] text-xs border border-[#d4af37]/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Stats */}
        {entries.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12 p-6 bg-[#1a0a2e] border border-[#d4af37]/30 rounded-lg">
            <h3 className="text-lg font-serif text-[#d4af37] mb-4">Your Journey Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-[#9333ea]">{entries.length}</div>
                <div className="text-sm text-[#c4b5a0]">Total Entries</div>
              </div>
              {alchemicalStages.map(stage => {
                const count = entries.filter(e => e.stage === stage.id).length
                if (count === 0) return null
                return (
                  <div key={stage.id}>
                    <div className="text-3xl font-bold text-[#d4af37]">{count}</div>
                    <div className="text-sm text-[#c4b5a0]">{stage.name}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
