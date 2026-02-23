import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SEO } from "@/components/SEO";
import { User, Mail, Lock, Calendar, Clock, MapPin, Eye, EyeOff, Flame } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { APP_TITLE } from "@/const";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthLocation, setBirthLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const utils = trpc.useUtils();
  
  const signupMutation = trpc.auth.signup.useMutation({
    onSuccess: async () => {
      toast.success("Welcome to The 33rd House! Let's get you started...");
      
      // Invalidate auth.me query to refetch user data with new session
      await utils.auth.me.invalidate();
      
      // Small delay to ensure session cookie is set
      setTimeout(() => {
        window.location.href = "/onboarding/welcome";
      }, 500);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create account");
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!acceptTerms) {
      toast.error("Please accept the Terms of Service and Privacy Policy");
      return;
    }

    setIsLoading(true);
    signupMutation.mutate({ 
      email, 
      password, 
      name,
      birthDate: birthDate || undefined,
      birthTime: birthTime || undefined,
      birthLocation: birthLocation || undefined,
      phone: phone || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412] text-[#f0e6d2] flex items-center justify-center px-4 py-12">
      <SEO 
        title={`Sign Up - ${APP_TITLE}`}
        description="Create your account and begin your journey through the 144 realms"
      />
      
      <div className="w-full max-w-2xl">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <div className="inline-flex items-center gap-3 cursor-pointer group mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#9333ea] to-[#d4af37] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">33</span>
              </div>
              <div>
                <div className="text-[#f0e6d2] font-serif text-2xl group-hover:text-[#d4af37] transition-colors">
                  The 33rd House
                </div>
              </div>
            </div>
          </Link>
          
          <h1 className="text-4xl font-serif mb-3 text-[#d4af37]">
            Begin Your Journey
          </h1>
          <p className="text-[#c4b5a0]">
            Create your account to access the complete 500-year initiatic path
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-gradient-to-br from-[#9333ea]/10 to-[#1a0a2e] border-2 border-[#9333ea] rounded-lg p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif text-[#d4af37] mb-4">Account Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#c4b5a0] flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#0a0412] border-[#d4af37] text-[#f0e6d2] placeholder:text-[#c4b5a0]"
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#c4b5a0] flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#0a0412] border-[#d4af37] text-[#f0e6d2] placeholder:text-[#c4b5a0]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#c4b5a0] flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password (min 8 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#0a0412] border-[#d4af37] text-[#f0e6d2] placeholder:text-[#c4b5a0] pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c4b5a0] hover:text-[#d4af37] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#c4b5a0]">
                  Phone Number (optional)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+61 422 741 776"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-[#0a0412] border-[#d4af37] text-[#f0e6d2] placeholder:text-[#c4b5a0]"
                />
              </div>
            </div>

            {/* Birth Information for Chart */}
            <div className="space-y-4 pt-6 border-t border-[#d4af37]/30">
              <h3 className="text-xl font-serif text-[#d4af37] mb-2">Birth Information</h3>
              <p className="text-sm text-[#c4b5a0] mb-4">
                Optional: Provide your birth details to create your personalized cosmic chart through The 33rd House system.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthTime" className="text-[#c4b5a0] flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Birth Time
                  </Label>
                  <Input
                    id="birthTime"
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="bg-[#0a0412] border-[#d4af37] text-[#f0e6d2]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthLocation" className="text-[#c4b5a0] flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Birth Location
                </Label>
                <Input
                  id="birthLocation"
                  type="text"
                  placeholder="City, Country (e.g., Sydney, Australia)"
                  value={birthLocation}
                  onChange={(e) => setBirthLocation(e.target.value)}
                  className="bg-[#0a0412] border-[#d4af37] text-[#f0e6d2] placeholder:text-[#c4b5a0]"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2 pt-4">
              <Checkbox 
                id="terms" 
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                className="border-[#d4af37] mt-1"
              />
              <label
                htmlFor="terms"
                className="text-sm leading-relaxed text-[#c4b5a0] cursor-pointer"
              >
                I accept the{' '}
                <Link href="/terms">
                  <span className="text-[#9333ea] hover:text-[#d4af37] transition-colors">
                    Terms of Service
                  </span>
                </Link>
                {' '}and{' '}
                <Link href="/privacy">
                  <span className="text-[#9333ea] hover:text-[#d4af37] transition-colors">
                    Privacy Policy
                  </span>
                </Link>
                , and understand that The 33rd House operates as a Private Members Association
              </label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#9333ea] to-[#7c2dc7] hover:from-[#7c2dc7] hover:to-[#9333ea] text-white font-semibold py-6 text-lg"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Flame className="w-5 h-5 animate-pulse" />
                  Creating Your Account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Flame className="w-5 h-5" />
                  Enter the Portal
                </span>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#d4af37]/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#1a0a2e] text-[#c4b5a0]">Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <Link href="/login">
              <Button 
                variant="outline" 
                className="w-full border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10"
              >
                Sign In Instead
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
