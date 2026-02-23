import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { APP_TITLE } from "@/const";

export default function VerifyEmail() {
  const [, setLocation] = useLocation();
  const [token, setToken] = useState<string | null>(null);
  
  // Get token from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get("token");
    setToken(tokenParam);
  }, []);

  const verifyMutation = trpc.auth.verifyEmail.useMutation();

  useEffect(() => {
    if (token && !verifyMutation.isLoading && !verifyMutation.isSuccess && !verifyMutation.isError) {
      verifyMutation.mutate({ token });
    }
  }, [token]);

  const renderContent = () => {
    if (verifyMutation.isLoading) {
      return (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Loader2 className="h-16 w-16 text-purple-600 animate-spin" />
            </div>
            <CardTitle className="text-center">Verifying Your Email</CardTitle>
            <CardDescription className="text-center">
              Please wait while we verify your email address...
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    if (verifyMutation.isSuccess) {
      return (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-center text-green-600">Email Verified!</CardTitle>
            <CardDescription className="text-center">
              Your email address has been successfully verified.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              You can now access all features of The 33rd House.
            </p>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => setLocation("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      );
    }

    if (verifyMutation.isError) {
      return (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <XCircle className="h-16 w-16 text-red-600" />
            </div>
            <CardTitle className="text-center text-red-600">Verification Failed</CardTitle>
            <CardDescription className="text-center">
              {verifyMutation.error?.message || "Invalid or expired verification link"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              The verification link may have expired or is invalid. Please request a new verification email.
            </p>
            <Link href="/dashboard">
              <Button className="w-full" variant="outline">
                Go to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Email Verification</CardTitle>
          <CardDescription className="text-center">
            No verification token found. Please check your email for the verification link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/">
            <Button className="w-full" variant="outline">
              Go to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black flex items-center justify-center px-4 py-12">
      <SEO 
        title={`Email Verification - ${APP_TITLE}`}
        description="Verify your email address to complete your registration"
      />
      
      <div className="w-full max-w-2xl">
        {renderContent()}
      </div>
    </div>
  );
}
