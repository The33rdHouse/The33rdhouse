import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "wouter";
import { Mail, Clock, CheckCircle, XCircle, Users } from "lucide-react";

export default function AdminEmailSequences() {
  const { user, isAuthenticated } = useAuth();
  const { data: sequences = [], isLoading } = trpc.emailSequences.getAll.useQuery();
  const { data: emailLogs = [] } = trpc.emailSequences.getUserLogs.useQuery();

  // Redirect if not admin
  if (isAuthenticated && user?.role !== "admin") {
    return <Redirect to="/" />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0f2e] to-[#0a0412] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-purple-950/30 border-purple-800/50">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-purple-300">Admin Access Required</CardTitle>
            <CardDescription className="text-center text-purple-400">
              Please log in with an admin account to access this page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0f2e] to-[#0a0412] pt-24 pb-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mail className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-serif text-purple-300">Email Sequences</h1>
          </div>
          <p className="text-purple-400">
            Manage automated email campaigns and view delivery status
          </p>
        </div>

        {/* Active Sequences */}
        <div className="mb-8">
          <h2 className="text-2xl font-serif text-purple-300 mb-4">Active Sequences</h2>
          {isLoading ? (
            <p className="text-purple-400">Loading sequences...</p>
          ) : sequences.length === 0 ? (
            <Card className="bg-purple-950/30 border-purple-800/50">
              <CardContent className="p-8 text-center">
                <Mail className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <p className="text-purple-400">No email sequences configured yet.</p>
                <p className="text-sm text-purple-500 mt-2">
                  Email sequences are automatically created when the system initializes.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {sequences.map((sequence) => (
                <Card key={sequence.id} className="bg-purple-950/30 border-purple-800/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl text-purple-300">{sequence.name}</CardTitle>
                        {sequence.description && (
                          <CardDescription className="text-purple-400 mt-1">
                            {sequence.description}
                          </CardDescription>
                        )}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        sequence.isActive 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-gray-500/20 text-gray-400"
                      }`}>
                        {sequence.isActive ? "Active" : "Inactive"}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6 text-sm text-purple-400">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Trigger: {sequence.trigger.replace(/_/g, " ")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Created: {new Date(sequence.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Recent Email Logs */}
        <div>
          <h2 className="text-2xl font-serif text-purple-300 mb-4">Recent Email Activity</h2>
          {emailLogs.length === 0 ? (
            <Card className="bg-purple-950/30 border-purple-800/50">
              <CardContent className="p-8 text-center">
                <Mail className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <p className="text-purple-400">No emails sent yet.</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-purple-950/30 border-purple-800/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {emailLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start justify-between p-4 bg-purple-950/50 rounded-lg border border-purple-800/30"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {log.status === "sent" ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                          <h3 className="font-semibold text-purple-300">{log.subject}</h3>
                        </div>
                        <p className="text-sm text-purple-400">
                          {log.emailType} • {new Date(log.sentAt).toLocaleString()}
                        </p>
                        {log.errorMessage && (
                          <p className="text-sm text-red-400 mt-2">Error: {log.errorMessage}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-purple-950/20 border border-purple-800/30 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-300 mb-3">Email Sequence System</h3>
          <div className="space-y-2 text-purple-400 text-sm">
            <p><strong>Welcome Sequence:</strong> Automatically triggered when new members join (5 emails over 14 days)</p>
            <p><strong>Milestone Emails:</strong> Sent when members complete realms, gates, or unlock achievements</p>
            <p><strong>Processing:</strong> Email queue is processed every 5 minutes automatically</p>
            <p><strong>Configuration:</strong> To add your Resend API key, go to Settings → Secrets and add RESEND_API_KEY</p>
          </div>
        </div>
      </div>
    </div>
  );
}
