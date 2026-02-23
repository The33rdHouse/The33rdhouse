import { Instagram, Twitter, Youtube, Mail, Download, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  const socialLinks = [
    { href: 'https://instagram.com/the33rdhouse', icon: Instagram, label: 'Instagram' },
    { href: 'https://twitter.com/the33rdhouse', icon: Twitter, label: 'Twitter' },
    { href: 'https://youtube.com/@the33rdhouse', icon: Youtube, label: 'YouTube' },
    { href: 'mailto:daniel@the33rdhouse.com', icon: Mail, label: 'Email' },
  ]

  const downloads = [
    { label: 'Sacred Teachings PDF', href: '#', size: '2.4 MB' },
    { label: 'Alchemical Guide', href: '#', size: '1.8 MB' },
  ]

  return (
    <footer className="bg-gradient-to-b from-[#0a0412] to-[#000000] border-t border-[#9333ea]/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#9333ea] to-[#d4af37] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">33</span>
              </div>
              <h3 className="text-[#f0e6d2] font-serif text-xl">The 33rd House</h3>
            </div>
            <p className="text-[#c4b5a0] text-sm leading-relaxed mb-4">
              An ancient lineage of spiritual teachers and healers. Founded by Daniel Cruze, 
              we guide seekers through the alchemical path of transformation.
            </p>
            <p className="text-[#9333ea] text-xs italic">
              "Form that breathes, Fire that remembers"
            </p>
          </div>

          {/* Downloads */}
          <div>
            <h3 className="text-[#d4af37] font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Sacred Resources
            </h3>
            <div className="space-y-3">
              {downloads.map((download, index) => (
                <a
                  key={index}
                  href={download.href}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#1a0a2e]/50 border border-[#9333ea]/20 hover:border-[#d4af37]/50 hover:bg-[#1a0a2e]/80 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-4 h-4 text-[#9333ea] group-hover:text-[#d4af37] transition-colors" />
                    <div>
                      <p className="text-[#f0e6d2] text-sm font-medium">{download.label}</p>
                      <p className="text-[#c4b5a0] text-xs">{download.size}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-[#d4af37] font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#1a0a2e]/50 border border-[#9333ea]/20 flex items-center justify-center text-[#c4b5a0] hover:text-[#d4af37] hover:border-[#d4af37]/50 hover:bg-[#1a0a2e]/80 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            
            <div className="space-y-2">
              <p className="text-[#c4b5a0] text-sm">
                <span className="text-[#9333ea]">Email:</span> daniel@the33rdhouse.com
              </p>
              <p className="text-[#c4b5a0] text-sm">
                <span className="text-[#9333ea]">Location:</span> Global Community
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#9333ea]/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#c4b5a0] text-sm text-center md:text-left">
              © {new Date().getFullYear()} The 33rd House. All rights reserved.
            </p>
            <p className="text-xs tracking-[0.3em] text-[#d4af37]">
              AMOR AETERNUS. LIBERTAS SACRA.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
