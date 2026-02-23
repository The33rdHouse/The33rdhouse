import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";
import { Shield, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { APP_TITLE } from "@/const";

export default function Setup2FA() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'setup' | 'verify'>('setup');
  const [secret, setSecret] = useState("");
  const [qrCode, setQRCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const setupMutation = trpc.auth.setupTwoFactor.useMutation({
    onSuccess: (data) => {
      setSecret(data.secret);
      setQRCode(data.qrCode);
      setStep('verify');
    },
    onError: (error) => {
      toast.error(error.message || "Failed to setup 2FA");
    },
  });

  const enableMutation = trpc.auth.enableTwoFactor.useMutation({
    onSuccess: () => {
      toast.success("Two-factor authentication enabled successfully!");
      setTimeout(() => {
        setLocation("/settings");
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message || "Invalid verification code");
    },
  });

  const handleSetup = () => {
    setupMutation.mutate();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    enableMutation.mutate({
      secret,
      token: verificationCode,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black flex items-center justify-center px-4 py-12">
      <SEO 
        title={`Setup Two-Factor Authentication - ${APP_TITLE}`}
        description="Enable two-factor authentication for enhanced security"
      />
      
      <Card className="max-w-md w-full">
        {step === 'setup' && (
          <>
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-16 w-16 text-purple-600" />
              </div>
              <CardTitle className="text-2xl text-center">Enable Two-Factor Authentication</CardTitle>
              <CardDescription className="text-center">
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">What is 2FA?</h3>
                <p className="text-sm text-muted-foreground">
                  Two-factor authentication (2FA) adds an extra layer of security by requiring a verification code from your authenticator app in addition to your password.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">You'll need:</h3>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>An authenticator app (Google Authenticator, Authy, etc.)</li>
                  <li>Your phone or tablet</li>
                </ul>
              </div>

              <Button 
                onClick={handleSetup}
                disabled={setupMutation.isPending}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {setupMutation.isPending ? "Setting up..." : "Continue"}
              </Button>

              <Button 
                variant="outline"
                onClick={() => setLocation("/settings")}
                className="w-full"
              >
                Cancel
              </Button>
            </CardContent>
          </>
        )}

        {step === 'verify' && (
          <>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Scan QR Code</CardTitle>
              <CardDescription className="text-center">
                Use your authenticator app to scan this QR code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code */}
              <div className="flex justify-center">
                <img 
                  src={qrCode} 
                  alt="2FA QR Code" 
                  className="w-64 h-64 border-2 border-purple-600 rounded-lg"
                />
              </div>

              {/* Manual entry code */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Or enter this code manually:</Label>
                <div className="p-3 bg-muted rounded-md">
                  <code className="text-sm break-all">{secret}</code>
                </div>
              </div>

              {/* Verification form */}
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Enter 6-digit code from your app</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    required
                    autoFocus
                    className="text-center text-2xl tracking-widest"
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={enableMutation.isPending || verificationCode.length !== 6}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {enableMutation.isPending ? "Verifying..." : "Enable 2FA"}
                </Button>

                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/settings")}
                  className="w-full"
                >
                  Cancel
                </Button>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
