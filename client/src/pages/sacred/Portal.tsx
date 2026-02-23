import { SEO } from '@/components/SEO'
import { seoConfig } from '@/lib/seo-config'
import { useState } from 'react'
import { Shield, Heart, Flame, Lock, Unlock, Calendar, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { trpc } from '@/lib/trpc'
import { toast } from 'sonner'


export default function Portal() {
  const { isAuthenticated, user } = useAuth()
  const [step, setStep] = useState(1) // 1: Birth Info, 2: Documents, 3: Access
  
  // Birth info
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthLocation, setBirthLocation] = useState('')
  
  // Document signing
  const [memberAgreementAccepted, setMemberAgreementAccepted] = useState(false)
  const [sacredOathAccepted, setSacredOathAccepted] = useState(false)
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false)

  // tRPC mutations
  const saveBirthInfo = trpc.auth.saveBirthInfo.useMutation()
  const signDocuments = trpc.auth.signPortalDocuments.useMutation()

  const handleBirthInfo = async () => {
    if (!birthDate || !birthTime || !birthLocation) {
      toast.error('Please provide all birth information')
      return
    }
    
    try {
      await saveBirthInfo.mutateAsync({ birthDate, birthTime, birthLocation })
      toast.success('Birth information saved')
      setStep(2)
    } catch (error) {
      toast.error('Failed to save birth information')
      console.error(error)
    }
  }

  const handleDocuments = async () => {
    if (!memberAgreementAccepted || !sacredOathAccepted || !privacyPolicyAccepted) {
      toast.error('You must accept all agreements to proceed')
      return
    }
    
    try {
      await signDocuments.mutateAsync()
      toast.success('Welcome to The 33rd House Portal!')
      setStep(3)
    } catch (error) {
      toast.error('Failed to sign documents')
      console.error(error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412] text-[#f0e6d2] flex items-center justify-center px-4">
        <SEO {...seoConfig.portal} />
        <div className="max-w-2xl text-center">
          <Lock className="w-20 h-20 mx-auto mb-6 text-[#9333ea]" />
          <h1 className="text-4xl font-serif mb-6 text-[#d4af37]">The Portal</h1>
          <p className="text-lg text-[#c4b5a0] mb-8">
            The Portal is reserved for members of The 33rd House. Please sign in to access the Inner Sanctum.
          </p>
          <Button 
            onClick={() => window.location.href = '/login'}
            className="bg-[#9333ea] hover:bg-[#7c2dc7] text-white"
          >
            Sign In to Continue
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412] text-[#f0e6d2]">
      <SEO {...seoConfig.portal} />
      
      <div className="container mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            THE PORTAL
          </h1>
          <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-6" />
          <p className="text-xl text-[#d4af37] italic mb-4">
            The Gateway to the Inner Sanctum
          </p>
          <p className="text-sm text-[#c4b5a0]">
            A Private Members Association
          </p>
        </div>

        {/* PMA Information */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-[#9333ea]/10 to-[#1a0a2e] border border-[#d4af37]/30 rounded-lg p-8">
            <h2 className="text-3xl font-serif text-center mb-6 text-[#d4af37]">Private Members Association</h2>
            
            <div className="space-y-6 text-[#c4b5a0] leading-relaxed">
              <p className="text-lg">
                The 33rd House operates as a <strong className="text-[#d4af37]">Private Members Association (PMA)</strong>—a 
                legal structure that protects the sacred work we do together. This is not a public organization. It is a 
                private sanctuary for those who have been called to the alchemical path.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-[#0a0412] border border-[#9333ea]/30 rounded-lg p-6">
                  <h3 className="text-xl font-serif text-[#d4af37] mb-3">What is a PMA?</h3>
                  <p className="text-sm">
                    A Private Members Association is a legally recognized entity where members contract privately with each other 
                    for mutual benefit. PMAs exist outside the jurisdiction of regulatory agencies that govern public commerce.
                  </p>
                </div>
                
                <div className="bg-[#0a0412] border border-[#9333ea]/30 rounded-lg p-6">
                  <h3 className="text-xl font-serif text-[#d4af37] mb-3">Why PMA Structure?</h3>
                  <p className="text-sm">
                    The sacred teachings and practices of The 33rd House—including tantric work, kundalini activation, and 
                    alchemical transformation—require a protected space free from external interference or regulation.
                  </p>
                </div>
              </div>

              <div className="bg-[#1a0a2e] border-l-4 border-[#d4af37] p-6 rounded">
                <h3 className="text-xl font-serif text-[#d4af37] mb-4">Member Rights & Protections</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-[#9333ea] flex-shrink-0 mt-0.5" />
                    <span><strong>Privacy Protection:</strong> All member information, practices, and communications remain confidential within the association</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-[#9333ea] flex-shrink-0 mt-0.5" />
                    <span><strong>Freedom of Practice:</strong> Members may engage in sacred practices without external regulation or interference</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-[#9333ea] flex-shrink-0 mt-0.5" />
                    <span><strong>Contractual Relationship:</strong> The relationship between members and The 33rd House is governed by private contract, not public law</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-[#9333ea] flex-shrink-0 mt-0.5" />
                    <span><strong>Sovereign Choice:</strong> Membership is voluntary and may be terminated by either party at any time</span>
                  </li>
                </ul>
              </div>

              <p className="text-sm italic text-center mt-6">
                By entering The Portal, you are applying for membership in this private association. Membership is granted 
                at the sole discretion of the Keeper and requires acceptance of the Sacred Oath and Member Agreement.
              </p>
            </div>
          </div>
        </div>

        {/* Step 1: Birth Information */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <Calendar className="w-20 h-20 mx-auto mb-6 text-[#9333ea]" />
              <h2 className="text-3xl font-serif mb-6 text-[#d4af37]">Your Cosmic Blueprint</h2>
              <p className="text-lg leading-relaxed text-[#c4b5a0] mb-8">
                To create your personalized chart and map your journey through the 144 realms, we need your exact birth information. 
                This data is sacred and will be kept strictly confidential within the association.
              </p>
            </div>

            <div className="bg-[#1a0a2e] border-2 border-[#9333ea] rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-serif mb-6 text-[#d4af37]">Birth Information</h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-[#c4b5a0] flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Birth Date
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="bg-[#0a0412] border-[#d4af37] text-[#f0e6d2]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthTime" className="text-[#c4b5a0] flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Birth Time (as exact as possible)
                  </Label>
                  <Input
                    id="birthTime"
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="bg-[#0a0412] border-[#d4af37] text-[#f0e6d2]"
                    required
                  />
                  <p className="text-xs text-[#c4b5a0] italic">
                    If you don't know your exact birth time, provide your best estimate. Check your birth certificate if possible.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthLocation" className="text-[#c4b5a0] flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Birth Location (City, Country)
                  </Label>
                  <Input
                    id="birthLocation"
                    type="text"
                    placeholder="e.g., Sydney, Australia"
                    value={birthLocation}
                    onChange={(e) => setBirthLocation(e.target.value)}
                    className="bg-[#0a0412] border-[#d4af37] text-[#f0e6d2] placeholder:text-[#c4b5a0]"
                    required
                  />
                  <p className="text-xs text-[#c4b5a0] italic">
                    We need the city and country to calculate accurate planetary positions for your chart.
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={handleBirthInfo}
                className="w-full mt-8 bg-[#9333ea] hover:bg-[#7c2dc7] text-white"
              >
                <Shield className="mr-2" />
                Continue to Agreements
              </Button>
            </div>

            <div className="bg-[#0a0412] border border-[#d4af37]/30 rounded-lg p-4 text-sm text-[#c4b5a0]">
              <Shield className="w-5 h-5 inline mr-2 text-[#9333ea]" />
              <strong className="text-[#d4af37]">Privacy Guarantee:</strong> Your birth information is encrypted and stored securely. 
              It will never be shared outside the association and is used solely for creating your personalized chart and teachings.
            </div>
          </div>
        )}

        {/* Step 2: Document Signing */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <Heart className="w-20 h-20 mx-auto mb-6 text-[#9333ea]" />
              <h2 className="text-3xl font-serif mb-6 text-[#d4af37]">Sacred Agreements</h2>
              <p className="text-lg leading-relaxed text-[#c4b5a0] mb-8">
                Before entering the Inner Sanctum, you must review and accept the following agreements. 
                These documents protect both you and the association, and establish the sacred container for our work together.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {/* Member Agreement */}
              <div className="bg-[#1a0a2e] border-2 border-[#9333ea] rounded-lg p-6">
                <h3 className="text-xl font-serif mb-4 text-[#d4af37]">1. Private Members Association Agreement</h3>
                <div className="bg-[#0a0412] border border-[#d4af37]/30 rounded p-4 mb-4 max-h-64 overflow-y-auto text-sm text-[#c4b5a0] leading-relaxed">
                  <p className="mb-4">
                    This Agreement is entered into between you ("Member") and The 33rd House ("Association"), a Private Members Association.
                  </p>
                  <p className="mb-4">
                    <strong className="text-[#d4af37]">1. Nature of Association:</strong> The Association is a private, unincorporated membership organization. 
                    Membership is a private contract between consenting adults and is not subject to public regulation.
                  </p>
                  <p className="mb-4">
                    <strong className="text-[#d4af37]">2. Services Provided:</strong> The Association provides spiritual teachings, practices, and community 
                    for consciousness transformation. These are not medical, psychological, or therapeutic services.
                  </p>
                  <p className="mb-4">
                    <strong className="text-[#d4af37]">3. Member Responsibilities:</strong> Members agree to engage with teachings responsibly, respect confidentiality, 
                    and honor the sacred nature of the work.
                  </p>
                  <p className="mb-4">
                    <strong className="text-[#d4af37]">4. Limitation of Liability:</strong> The Association and its representatives are not liable for any outcomes 
                    resulting from Member's engagement with teachings or practices.
                  </p>
                  <p>
                    <strong className="text-[#d4af37]">5. Termination:</strong> Either party may terminate membership at any time. Upon termination, 
                    Member's access to private materials and community will be revoked.
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="member-agreement" 
                    checked={memberAgreementAccepted}
                    onCheckedChange={(checked) => setMemberAgreementAccepted(checked === true)}
                    className="border-[#d4af37] mt-1"
                  />
                  <label
                    htmlFor="member-agreement"
                    className="text-sm leading-relaxed text-[#c4b5a0] cursor-pointer"
                  >
                    I have read and accept the Private Members Association Agreement
                  </label>
                </div>
              </div>

              {/* Sacred Oath */}
              <div className="bg-[#1a0a2e] border-2 border-[#d4af37] rounded-lg p-6">
                <h3 className="text-xl font-serif mb-4 text-[#d4af37]">2. The Sacred Oath of the Initiate</h3>
                <div className="bg-[#0a0412] border border-[#d4af37]/30 rounded p-6 mb-4 text-[#c4b5a0] leading-relaxed">
                  <p className="italic text-center text-lg mb-4">
                    "I, {user?.name || 'a seeker of truth'}, stand at the threshold of The 33rd House.
                  </p>
                  <p className="italic text-center mb-4">
                    I acknowledge that I have been called to this path, and I answer the call with an open heart.
                  </p>
                  <p className="italic text-center mb-4">
                    I commit to the sacred work of transformation—to face my shadow, to purify my being, 
                    to awaken my power, to unite my opposites, and to claim my sovereignty.
                  </p>
                  <p className="italic text-center mb-4">
                    I vow to keep what is hidden, to tend what is kept, and to allow what is tended to blossom.
                  </p>
                  <p className="italic text-center mb-4">
                    I understand that this path is not easy, but I am ready.
                  </p>
                  <p className="italic text-center text-lg">
                    I enter the Portal of my own free will."
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="sacred-oath" 
                    checked={sacredOathAccepted}
                    onCheckedChange={(checked) => setSacredOathAccepted(checked === true)}
                    className="border-[#d4af37] mt-1"
                  />
                  <label
                    htmlFor="sacred-oath"
                    className="text-sm leading-relaxed text-[#c4b5a0] cursor-pointer"
                  >
                    I accept this Sacred Oath and commit to the path of transformation
                  </label>
                </div>
              </div>

              {/* Privacy Policy */}
              <div className="bg-[#1a0a2e] border-2 border-[#9333ea] rounded-lg p-6">
                <h3 className="text-xl font-serif mb-4 text-[#d4af37]">3. Privacy Policy & Data Protection</h3>
                <div className="bg-[#0a0412] border border-[#d4af37]/30 rounded p-4 mb-4 max-h-48 overflow-y-auto text-sm text-[#c4b5a0] leading-relaxed">
                  <p className="mb-4">
                    <strong className="text-[#d4af37]">Data Collection:</strong> We collect birth information, contact details, and usage data 
                    to provide personalized teachings and maintain the association.
                  </p>
                  <p className="mb-4">
                    <strong className="text-[#d4af37]">Data Security:</strong> All personal information is encrypted and stored securely. 
                    We use industry-standard security measures to protect your data.
                  </p>
                  <p className="mb-4">
                    <strong className="text-[#d4af37]">Data Sharing:</strong> Your information will never be sold or shared with third parties. 
                    It remains confidential within the association.
                  </p>
                  <p>
                    <strong className="text-[#d4af37]">Your Rights:</strong> You may request access to, correction of, or deletion of your personal data at any time.
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="privacy-policy" 
                    checked={privacyPolicyAccepted}
                    onCheckedChange={(checked) => setPrivacyPolicyAccepted(checked === true)}
                    className="border-[#d4af37] mt-1"
                  />
                  <label
                    htmlFor="privacy-policy"
                    className="text-sm leading-relaxed text-[#c4b5a0] cursor-pointer"
                  >
                    I have read and accept the Privacy Policy
                  </label>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleDocuments}
              disabled={!memberAgreementAccepted || !sacredOathAccepted || !privacyPolicyAccepted}
              className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#0a0412] disabled:opacity-50"
            >
              <Flame className="mr-2" />
              Enter the Inner Sanctum
            </Button>
          </div>
        )}

        {/* Step 3: Access Granted */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <Unlock className="w-20 h-20 mx-auto mb-6 text-[#d4af37] animate-pulse" />
              <h2 className="text-3xl font-serif mb-6 text-[#d4af37]">Welcome, Initiate</h2>
              <p className="text-lg leading-relaxed text-[#c4b5a0] mb-8">
                The Portal is now open to you. You have taken the first step on the path of transformation. 
                Your cosmic blueprint has been recorded, and your agreements have been sealed.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#9333ea]/20 to-[#1a0a2e] border-2 border-[#d4af37] rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-serif mb-6 text-[#d4af37] text-center">What Happens Next</h3>
              
              <div className="space-y-4 text-[#c4b5a0]">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#9333ea] flex items-center justify-center flex-shrink-0 text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#d4af37] mb-2">Your Chart is Being Created</h4>
                    <p className="text-sm">
                      Using your birth information, we are calculating your personalized chart through The 33rd House system. 
                      This maps your unique path through the 12 Gates and 144 Realms.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#9333ea] flex items-center justify-center flex-shrink-0 text-white font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#d4af37] mb-2">Access to Inner Circle</h4>
                    <p className="text-sm">
                      You now have access to the complete 48-week Inner Circle curriculum, personalized teachings, 
                      and the private members community.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#9333ea] flex items-center justify-center flex-shrink-0 text-white font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#d4af37] mb-2">Begin Your Journey</h4>
                    <p className="text-sm">
                      Start with Gate 1 in the Inner Circle, or explore the Library to discover teachings that resonate with your current stage.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="/inner-circle" className="flex-1">
                <Button className="w-full bg-[#9333ea] hover:bg-[#7c2dc7] text-white">
                  Enter Inner Circle
                </Button>
              </a>
              <a href="/dashboard" className="flex-1">
                <Button variant="outline" className="w-full border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10">
                  Go to Dashboard
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
