import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";
import { Shield } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { APP_TITLE } from "@/const";

export default function Verify2FA() {
  const [, setLocation] = useLocation();
  const [userId, setUserId] = useState<number | null>(null);
  const [verificationCode, setVerificationCode] = useState("");

  // Get userId from session storage (set during login)
  useEffect(() => {
    const storedUserId = sessionStorage.getItem('2fa_userId');
    if (!storedUserId) {
      toast.error("Invalid session");
      setLocation("/login");
      return;
    }
    setUserId(parseInt(storedUserId));
  }, [setLocation]);

  const verifyMutation = trpc.auth.verifyTwoFactorLogin.useMutation({
    onSuccess: () => {
      sessionStorage.removeItem('2fa_userId');
      toast.success("Login successful!");
      window.location.href = "/dashboard";
    },
    onError: (error) => {
      toast.error(error.message || "Invalid verification code");
      setVerificationCode("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      toast.error("Invalid session");
      return;
    }

    if (verificationCode.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    verifyMutation.mutate({
      userId,
      token: verificationCode,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412] text-[#f0e6d2] flex items-center justify-center px-4">
      <SEO 
        title={`Two-Factor Verification - ${APP_TITLE}`}
        description="Enter your two-factor authentication code"
      />
      
      <Card className="max-w-md w-full bg-gradient-to-br from-[#9333ea]/10 to-[#1a0a2e] border-2 border-[#9333ea]">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-16 w-16 text-[#d4af37]" />
          </div>
          <CardTitle className="text-2xl text-center text-[#d4af37]">Two-Factor Authentication</CardTitle>
          <CardDescription className="text-center text-[#c4b5a0]">
            Enter the 6-digit code from your authenticator app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-[#c4b5a0]">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="000000"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                required
                autoFocus
                className="text-center text-3xl tracking-widest bg-[#0a0412] border-[#d4af37] text-[#f0e6d2]"
              />
              <p className="text-xs text-[#c4b5a0] text-center">
                Open your authenticator app to get your code
              </p>
            </div>

            <Button 
              type="submit"
              disabled={verifyMutation.isLoading || verificationCode.length !== 6}
              className="w-full bg-gradient-to-r from-[#9333ea] to-[#7c2dc7] hover:from-[#7c2dc7] hover:to-[#9333ea] text-white font-semibold py-6"
            >
              {verifyMutation.isLoading ? "Verifying..." : "Verify & Login"}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  sessionStorage.removeItem('2fa_userId');
                  setLocation("/login");
                }}
                className="text-[#9333ea] hover:text-[#d4af37]"
              >
                Back to Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
