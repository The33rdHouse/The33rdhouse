import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Shield, 
  Smartphone,
  Monitor,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { APP_TITLE } from "@/const";

export default function SecurityDashboard() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'sessions' | 'history'>('sessions');

  const { data: sessions, refetch: refetchSessions } = trpc.security.getSessions.useQuery();
  const { data: loginHistory } = trpc.security.getLoginHistory.useQuery({ limit: 50 });

  const revokeSessionMutation = trpc.security.revokeSession.useMutation({
    onSuccess: () => {
      toast.success("Session revoked successfully");
      refetchSessions();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to revoke session");
    },
  });

  const revokeAllMutation = trpc.security.revokeAllOtherSessions.useMutation({
    onSuccess: () => {
      toast.success("All other sessions have been revoked");
      refetchSessions();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to revoke sessions");
    },
  });

  if (!user) {
    return null;
  }

  const handleRevokeSession = (sessionId: number) => {
    if (confirm("Are you sure you want to revoke this session? The device will be logged out.")) {
      revokeSessionMutation.mutate({ sessionId });
    }
  };

  const handleRevokeAll = () => {
    if (confirm("Are you sure you want to revoke all other sessions? All other devices will be logged out.")) {
      revokeAllMutation.mutate();
    }
  };

  return (
    <>
      <Navigation />
      <SEO
        title={`Security Dashboard - ${APP_TITLE}`}
        description="Manage your account security, active sessions, and login history"
      />

      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold text-purple-200 mb-2 flex items-center gap-3">
              <Shield className="w-10 h-10 text-purple-600" />
              Security Dashboard
            </h1>
            <p className="text-gray-400">
              Monitor and manage your account security
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <Button
              variant={selectedTab === 'sessions' ? 'default' : 'outline'}
              onClick={() => setSelectedTab('sessions')}
              className={selectedTab === 'sessions' ? 'bg-purple-600' : ''}
            >
              <Monitor className="w-4 h-4 mr-2" />
              Active Sessions ({sessions?.length || 0})
            </Button>
            <Button
              variant={selectedTab === 'history' ? 'default' : 'outline'}
              onClick={() => setSelectedTab('history')}
              className={selectedTab === 'history' ? 'bg-purple-600' : ''}
            >
              <Clock className="w-4 h-4 mr-2" />
              Login History
            </Button>
          </div>

          {/* Active Sessions */}
          {selectedTab === 'sessions' && (
            <div className="space-y-4">
              <Card className="border-purple-900/30 bg-black/40">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-purple-200">Active Sessions</CardTitle>
                      <CardDescription>
                        Devices currently logged into your account
                      </CardDescription>
                    </div>
                    {sessions && sessions.length > 1 && (
                      <Button
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-950/30"
                        onClick={handleRevokeAll}
                        disabled={revokeAllMutation.isPending}
                      >
                        Revoke All Others
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!sessions || sessions.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">
                      No active sessions found
                    </p>
                  ) : (
                    sessions.map((session) => (
                      <div
                        key={session.id}
                        className="p-4 bg-purple-950/20 border border-purple-900/30 rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-950/50 rounded-lg">
                              {session.deviceInfo?.includes('Phone') || session.deviceInfo?.includes('Android') ? (
                                <Smartphone className="w-6 h-6 text-purple-400" />
                              ) : (
                                <Monitor className="w-6 h-6 text-purple-400" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-purple-200 font-semibold flex items-center gap-2">
                                {session.deviceInfo}
                                {session.isCurrent && (
                                  <Badge className="bg-green-950/50 text-green-400 border-green-900">
                                    Current Session
                                  </Badge>
                                )}
                              </h3>
                              <div className="mt-2 space-y-1 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  {session.ipAddress || 'Unknown location'}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  Last active: {new Date(session.lastActivity).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                          {!session.isCurrent && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-950/30"
                              onClick={() => handleRevokeSession(session.id)}
                              disabled={revokeSessionMutation.isPending}
                            >
                              Revoke
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Login History */}
          {selectedTab === 'history' && (
            <Card className="border-purple-900/30 bg-black/40">
              <CardHeader>
                <CardTitle className="text-purple-200">Login History</CardTitle>
                <CardDescription>
                  Recent login attempts to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!loginHistory || loginHistory.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">
                    No login history found
                  </p>
                ) : (
                  <div className="space-y-3">
                    {loginHistory.map((entry) => (
                      <div
                        key={entry.id}
                        className={`p-4 rounded-lg border ${
                          entry.success
                            ? 'bg-green-950/10 border-green-900/30'
                            : 'bg-red-950/10 border-red-900/30'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            {entry.success ? (
                              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                            )}
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`font-semibold ${entry.success ? 'text-green-400' : 'text-red-400'}`}>
                                  {entry.success ? 'Successful Login' : 'Failed Login'}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {entry.loginMethod}
                                </Badge>
                              </div>
                              <div className="space-y-1 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                  <Smartphone className="w-4 h-4" />
                                  {entry.deviceInfo}
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  {entry.ipAddress || 'Unknown'} {entry.location && `• ${entry.location}`}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  {new Date(entry.createdAt).toLocaleString()}
                                </div>
                                {!entry.success && entry.failureReason && (
                                  <div className="flex items-center gap-2 text-red-400">
                                    <AlertTriangle className="w-4 h-4" />
                                    {entry.failureReason}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
