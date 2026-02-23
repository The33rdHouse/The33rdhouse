import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";
import { Lock, Mail, Eye, EyeOff, Flame } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { APP_TITLE } from "@/const";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const utils = trpc.useUtils();
  
  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: async (data) => {
      // Invalidate auth.me query to refetch user data with new session
      await utils.auth.me.invalidate();
      
      // Check if user has 2FA enabled
      if (data.requires2FA) {
        // Store userId in session storage for 2FA verification
        sessionStorage.setItem('2fa_userId', data.userId?.toString() || "");
        toast.info("Please enter your 2FA code");
        window.location.href = "/verify-2fa";
      } else {
        toast.success("Welcome back to The 33rd House");
        // Redirect to return URL if it exists, otherwise go to dashboard
        const returnUrl = sessionStorage.getItem('returnUrl');
        if (returnUrl) {
          sessionStorage.removeItem('returnUrl');
          window.location.href = returnUrl;
        } else {
          window.location.href = "/dashboard";
        }
      }
    },
    onError: (error) => {
      toast.error(error.message || "Invalid email or password");
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412] text-[#f0e6d2] flex items-center justify-center px-4">
      <SEO 
        title={`Login - ${APP_TITLE}`}
        description="Sign in to access your journey through the 144 realms"
      />
      
      <div className="w-full max-w-md">
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
            Welcome Back
          </h1>
          <p className="text-[#c4b5a0]">
            Enter the portal and continue your journey
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-gradient-to-br from-[#9333ea]/10 to-[#1a0a2e] border-2 border-[#9333ea] rounded-lg p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#c4b5a0] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0a0412] border-[#d4af37] text-[#f0e6d2] placeholder:text-[#c4b5a0]"
                required
                autoFocus
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#c4b5a0] flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
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

            {/* Forgot Password */}
            <div className="text-right">
              <Link href="/forgot-password">
                <span className="text-sm text-[#9333ea] hover:text-[#d4af37] transition-colors cursor-pointer">
                  Forgot your password?
                </span>
              </Link>
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
                  Entering...
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
              <span className="px-4 bg-[#1a0a2e] text-[#c4b5a0]">New to The 33rd House?</span>
            </div>
          </div>

          {/* Signup Link */}
          <div className="text-center">
            <Link href="/signup">
              <Button 
                variant="outline" 
                className="w-full border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10"
              >
                Begin Your Journey
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-[#c4b5a0]">
          <p>
            By signing in, you agree to our{' '}
            <Link href="/terms">
              <span className="text-[#9333ea] hover:text-[#d4af37] transition-colors cursor-pointer">
                Terms of Service
              </span>
            </Link>
            {' '}and{' '}
            <Link href="/privacy">
              <span className="text-[#9333ea] hover:text-[#d4af37] transition-colors cursor-pointer">
                Privacy Policy
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
