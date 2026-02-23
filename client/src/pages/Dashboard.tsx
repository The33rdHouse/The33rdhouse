import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Loader2 } from "lucide-react";
import AchievementBadges from "@/components/AchievementBadges";
import { trpc } from "@/lib/trpc";
import PullToRefresh from "@/components/PullToRefresh";

export default function Dashboard() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();
  
  // Fetch user progress using tRPC
  const { data: progressData, isLoading: progressLoading } = trpc.progress.getAll.useQuery(
    undefined,
    { enabled: !!user }
  );
  
  // Fetch meditation sessions using tRPC
  const { data: sessionsData, isLoading: sessionsLoading } = trpc.meditation.getSessions.useQuery(
    undefined,
    { enabled: !!user }
  );
  
  // Fetch progress stats using tRPC
  const { data: stats } = trpc.progress.getStats.useQuery(
    undefined,
    { enabled: !!user }
  );

  // Pull-to-refresh handler
  const handleRefresh = async () => {
    await Promise.all([
      utils.progress.getAll.invalidate(),
      utils.meditation.getSessions.invalidate(),
      utils.progress.getStats.invalidate(),
    ]);
  };

  const loading = authLoading || progressLoading || sessionsLoading;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/login");
    }
  }, [authLoading, user, setLocation]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const progress = progressData || [];
  const sessions = sessionsData || [];
  
  const completedRealms = stats?.completedRealms || progress.filter(p => p.completed).length;
  const totalRealms = 144;
  const progressPercentage = (completedRealms / totalRealms) * 100;
  
  const totalMeditationMinutes = sessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const totalMeditationHours = Math.floor(totalMeditationMinutes / 60);
  
  const currentGate = Math.floor(completedRealms / 12) + 1;
  const realmsInCurrentGate = completedRealms % 12;

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Dashboard"
        description="Your personal journey through The 33rd House"
      />
      <Navigation />
      
      <PullToRefresh onRefresh={handleRefresh}>
        <main className="flex-1 container py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome, {user.name || "Seeker"}</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Track your journey through the 12 Gates and 144 Realms
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Realms Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedRealms} / {totalRealms}</div>
              <Progress value={progressPercentage} className="mt-3" />
              <p className="text-xs text-muted-foreground mt-2">
                {progressPercentage.toFixed(1)}% of your journey
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Meditation Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalMeditationHours}h {totalMeditationMinutes % 60}m</div>
              <p className="text-xs text-muted-foreground mt-2">
                {sessions.length} sessions completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Current Gate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Gate {currentGate}</div>
              <p className="text-xs text-muted-foreground mt-2">
                {realmsInCurrentGate} / 12 realms in this gate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="history">Meditation History</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Journey Map</CardTitle>
                <CardDescription>
                  Track your progress through all 12 gates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 12 }, (_, i) => {
                    const gateNumber = i + 1;
                    const gateRealmsStart = i * 12 + 1; // Realm numbers start at 1
                    const gateRealmsEnd = gateRealmsStart + 12;
                    const gateProgress = progress.filter(
                      p => p.realmNumber >= gateRealmsStart && p.realmNumber < gateRealmsEnd && p.completed
                    ).length;
                    
                    return (
                      <Card key={gateNumber} className="border-2">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Gate {gateNumber}</CardTitle>
                            <Badge variant={gateProgress === 12 ? "default" : "secondary"}>
                              {gateProgress}/12
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Progress value={(gateProgress / 12) * 100} />
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Subscription</CardTitle>
                <CardDescription>
                  Manage your membership tier and billing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Tier */}
                <div className="border rounded-lg p-6 bg-gradient-to-br from-purple-950/20 to-purple-900/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-purple-200">
                        {user.tier === 'free' ? 'Seeker (Free)' : 
                         user.tier === 'seeker' ? 'Initiate' :
                         user.tier === 'initiate' ? 'Adept' : 'Elder'}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {user.tier === 'free' ? 'Free tier' :
                         user.tier === 'seeker' ? '$27/month' :
                         user.tier === 'initiate' ? '$97/month' : '$297/month'}
                      </p>
                    </div>
                    <Badge className="text-lg px-4 py-2">
                      {user.tier === 'free' ? '🌱' :
                       user.tier === 'seeker' ? '✨' :
                       user.tier === 'initiate' ? '⭐' : '👑'}
                    </Badge>
                  </div>
                  
                  {user.tier !== 'free' && (
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-300">
                        <span className="text-gray-500">Billing cycle:</span> Monthly
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-500">Status:</span> <Badge variant="outline" className="ml-2">Active</Badge>
                      </p>
                    </div>
                  )}
                </div>

                {/* Upgrade Options */}
                {user.tier !== 'elder' && (
                  <div>
                    <h4 className="font-semibold mb-4">Upgrade Your Experience</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      {user.tier === 'free' && (
                        <>
                          <Card className="border-purple-600/50">
                            <CardHeader>
                              <CardTitle className="text-lg">Initiate</CardTitle>
                              <CardDescription>$27/month</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ul className="text-sm space-y-2 mb-4">
                                <li>✓ Full Inner Circle curriculum</li>
                                <li>✓ Complete book library</li>
                                <li>✓ Guided meditations</li>
                              </ul>
                              <a href="/pricing" className="inline-block w-full">
                                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                                  Upgrade to Initiate
                                </button>
                              </a>
                            </CardContent>
                          </Card>
                          <Card className="border-purple-600/50">
                            <CardHeader>
                              <CardTitle className="text-lg">Adept</CardTitle>
                              <CardDescription>$97/month</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ul className="text-sm space-y-2 mb-4">
                                <li>✓ Everything in Initiate</li>
                                <li>✓ AI spiritual guidance</li>
                                <li>✓ Quarterly Chartography</li>
                              </ul>
                              <a href="/pricing" className="inline-block w-full">
                                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                                  Upgrade to Adept
                                </button>
                              </a>
                            </CardContent>
                          </Card>
                        </>
                      )}
                      {user.tier === 'seeker' && (
                        <>
                          <Card className="border-purple-600/50">
                            <CardHeader>
                              <CardTitle className="text-lg">Adept</CardTitle>
                              <CardDescription>$97/month</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ul className="text-sm space-y-2 mb-4">
                                <li>✓ AI spiritual guidance</li>
                                <li>✓ Personalized insights</li>
                                <li>✓ Quarterly Chartography</li>
                              </ul>
                              <a href="/pricing" className="inline-block w-full">
                                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                                  Upgrade to Adept
                                </button>
                              </a>
                            </CardContent>
                          </Card>
                          <Card className="border-purple-600/50">
                            <CardHeader>
                              <CardTitle className="text-lg">Elder</CardTitle>
                              <CardDescription>$297/month</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ul className="text-sm space-y-2 mb-4">
                                <li>✓ Personal mentorship</li>
                                <li>✓ Unlimited Chartography</li>
                                <li>✓ Elder Council access</li>
                              </ul>
                              <a href="/pricing" className="inline-block w-full">
                                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                                  Upgrade to Elder
                                </button>
                              </a>
                            </CardContent>
                          </Card>
                        </>
                      )}
                      {user.tier === 'initiate' && (
                        <Card className="border-purple-600/50">
                          <CardHeader>
                            <CardTitle className="text-lg">Elder</CardTitle>
                            <CardDescription>$297/month</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="text-sm space-y-2 mb-4">
                              <li>✓ Monthly 1-on-1 mentorship</li>
                              <li>✓ Unlimited Chartography</li>
                              <li>✓ Elder Council membership</li>
                              <li>✓ Private retreat invitations</li>
                            </ul>
                            <a href="/pricing" className="inline-block w-full">
                              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                                Upgrade to Elder
                              </button>
                            </a>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                )}

                {/* Cancel Subscription (only for paid tiers) */}
                {user.tier !== 'free' && (
                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-2 text-gray-400">Manage Subscription</h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Need to make changes? You can upgrade, downgrade, or cancel your subscription anytime.
                    </p>
                    <div className="flex gap-4">
                      <a href="/pricing" className="inline-block">
                        <button className="bg-purple-900/50 hover:bg-purple-800/50 text-purple-200 px-4 py-2 rounded-lg text-sm">
                          Change Plan
                        </button>
                      </a>
                      <button className="text-red-400 hover:text-red-300 px-4 py-2 rounded-lg text-sm border border-red-900/50 hover:border-red-800/50">
                        Cancel Subscription
                      </button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Meditation Sessions</CardTitle>
                <CardDescription>
                  Your meditation practice history
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sessions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No meditation sessions yet. Start your first meditation to begin tracking your practice.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {sessions.slice(0, 10).map((session) => (
                      <div key={session.id} className="flex items-center justify-between border-b pb-3">
                        <div>
                          <p className="font-medium">Realm {session.realmNumber}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(session.completedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="outline">{session.durationMinutes} min</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <AchievementBadges
              completedRealms={completedRealms}
              completedGates={Math.floor(completedRealms / 12)}
              totalSessions={sessions.length}
              currentStreak={0}
            />
            <Card>
              <CardHeader>
                <CardTitle>Legacy Achievements</CardTitle>
                <CardDescription>
                  Your original milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start space-x-4 border rounded-lg p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      🌟
                    </div>
                    <div>
                      <h3 className="font-semibold">First Steps</h3>
                      <p className="text-sm text-muted-foreground">Complete your first realm</p>
                      <Badge className="mt-2" variant={completedRealms >= 1 ? "default" : "secondary"}>
                        {completedRealms >= 1 ? "Unlocked" : "Locked"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 border rounded-lg p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      🚪
                    </div>
                    <div>
                      <h3 className="font-semibold">Gate Keeper</h3>
                      <p className="text-sm text-muted-foreground">Complete your first gate (12 realms)</p>
                      <Badge className="mt-2" variant={completedRealms >= 12 ? "default" : "secondary"}>
                        {completedRealms >= 12 ? "Unlocked" : "Locked"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 border rounded-lg p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      🧘
                    </div>
                    <div>
                      <h3 className="font-semibold">Dedicated Practitioner</h3>
                      <p className="text-sm text-muted-foreground">Complete 10 meditation sessions</p>
                      <Badge className="mt-2" variant={sessions.length >= 10 ? "default" : "secondary"}>
                        {sessions.length >= 10 ? "Unlocked" : "Locked"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 border rounded-lg p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      ✨
                    </div>
                    <div>
                      <h3 className="font-semibold">Halfway Home</h3>
                      <p className="text-sm text-muted-foreground">Complete 72 realms (6 gates)</p>
                      <Badge className="mt-2" variant={completedRealms >= 72 ? "default" : "secondary"}>
                        {completedRealms >= 72 ? "Unlocked" : "Locked"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      </PullToRefresh>
    </div>
  );
}
