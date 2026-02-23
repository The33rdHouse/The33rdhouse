import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { 
  BookOpen, 
  Flame, 
  Target, 
  TrendingUp, 
  Calendar,
  Award,
  Clock,
  Star,
  ChevronRight,
  Play
} from "lucide-react";
import { Link } from "wouter";
import { SubscriptionBadge } from "@/components/SubscriptionBadge";
import { useSubscriptionAccess } from "@/hooks/useSubscriptionAccess";

export default function DashboardNew() {
  const { user } = useAuth();
  const { userTier } = useSubscriptionAccess();
  
  const { data: stats } = trpc.progress.getStats.useQuery();
  const { data: progress } = trpc.progress.getAll.useQuery();
  const { data: sessions } = trpc.meditation.getSessions.useQuery();

  if (!user) {
    return null;
  }

  const completedRealms = progress?.filter(p => p.completed).length || 0;
  const totalMeditationMinutes = sessions?.reduce((sum, s) => sum + Math.floor(s.duration / 60), 0) || 0;
  const currentStreak = 7; // TODO: Calculate from actual data
  const nextRealmNumber = (completedRealms + 1);

  return (
    <>
      <Navigation />
      <SEO
        title={`Dashboard | ${user.name || 'Member'}`}
        description="Your personal journey through The 33rd House"
      />

      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-serif font-bold text-purple-200">
                Welcome back, {user.name}
              </h1>
              <SubscriptionBadge tier={userTier} size="md" />
            </div>
            <p className="text-gray-400">
              Continue your journey through the realms of consciousness
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-purple-900/30 bg-black/40">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-400 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Realms Completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-200">{completedRealms}</div>
                <p className="text-sm text-gray-500">of 144 total</p>
              </CardContent>
            </Card>

            <Card className="border-purple-900/30 bg-black/40">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Meditation Time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-200">{totalMeditationMinutes}</div>
                <p className="text-sm text-gray-500">minutes total</p>
              </CardContent>
            </Card>

            <Card className="border-purple-900/30 bg-black/40">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  Current Streak
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-200">{currentStreak}</div>
                <p className="text-sm text-gray-500">days in a row</p>
              </CardContent>
            </Card>

            <Card className="border-purple-900/30 bg-black/40">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-400 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-200">
                  {stats?.achievements || 0}
                </div>
                <p className="text-sm text-gray-500">badges earned</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="journey" className="space-y-6">
            <TabsList className="bg-purple-950/30 border border-purple-900/30">
              <TabsTrigger value="journey">My Journey</TabsTrigger>
              <TabsTrigger value="curriculum">Inner Circle</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            {/* Journey Tab */}
            <TabsContent value="journey" className="space-y-6">
              {/* Continue Where You Left Off */}
              <Card className="border-purple-900/30 bg-black/40">
                <CardHeader>
                  <CardTitle className="text-purple-200 flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Continue Your Journey
                  </CardTitle>
                  <CardDescription>Pick up where you left off</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-200">
                        Realm {nextRealmNumber}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Gate {Math.ceil(nextRealmNumber / 12)} • Next in your path
                      </p>
                    </div>
                    <Link href={`/realms/${nextRealmNumber}`}>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Begin Realm
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>

                  {/* Overall Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Overall Progress</span>
                      <span className="text-purple-300">
                        {Math.round((completedRealms / 144) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(completedRealms / 144) * 100} 
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-purple-900/30 bg-black/40">
                <CardHeader>
                  <CardTitle className="text-purple-200">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sessions?.slice(0, 5).map((session, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-purple-900/20 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-950/50 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-purple-200">
                              Meditation Session
                            </p>
                            <p className="text-xs text-gray-500">
                              Realm {session.realmNumber} • {Math.floor(session.duration / 60)} minutes
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(session.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Inner Circle Curriculum Tab */}
            <TabsContent value="curriculum" className="space-y-6">
              <Card className="border-purple-900/30 bg-black/40">
                <CardHeader>
                  <CardTitle className="text-purple-200">12-Month Curriculum</CardTitle>
                  <CardDescription>
                    Structured journey through consciousness transformation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {[
                      { month: 1, title: "Presence & Grounding", progress: 100 },
                      { month: 2, title: "Regulation & Flow", progress: 75 },
                      { month: 3, title: "Identity & Boundaries", progress: 25 },
                      { month: 4, title: "Power & Will", progress: 0 },
                      { month: 5, title: "Connection & Relationship", progress: 0 },
                      { month: 6, title: "Shadow & Reflection", progress: 0 },
                    ].map((item) => (
                      <Link key={item.month} href={`/inner-circle/month-${item.month}`}>
                        <div className="flex items-center justify-between p-4 rounded-lg border border-purple-900/30 hover:border-purple-600/50 transition-colors cursor-pointer">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="outline" className="text-purple-400">
                                Month {item.month}
                              </Badge>
                              <h3 className="font-semibold text-purple-200">{item.title}</h3>
                            </div>
                            <Progress value={item.progress} className="h-1" />
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-500 ml-4" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Practice Tab */}
            <TabsContent value="practice" className="space-y-6">
              <Card className="border-purple-900/30 bg-black/40">
                <CardHeader>
                  <CardTitle className="text-purple-200">Meditation Practice</CardTitle>
                  <CardDescription>Your meditation history and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-purple-950/30">
                        <div className="text-2xl font-bold text-purple-200">
                          {sessions?.length || 0}
                        </div>
                        <p className="text-sm text-gray-400">Total Sessions</p>
                      </div>
                      <div className="p-4 rounded-lg bg-purple-950/30">
                        <div className="text-2xl font-bold text-purple-200">
                          {totalMeditationMinutes}
                        </div>
                        <p className="text-sm text-gray-400">Total Minutes</p>
                      </div>
                    </div>

                    <Link href="/meditations">
                      <Button variant="outline" className="w-full">
                        View All Sessions
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <Card className="border-purple-900/30 bg-black/40">
                <CardHeader>
                  <CardTitle className="text-purple-200">Your Achievements</CardTitle>
                  <CardDescription>Milestones on your journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { name: "First Step", icon: Star, unlocked: true },
                      { name: "Gate Keeper", icon: Award, unlocked: completedRealms >= 12 },
                      { name: "Dedicated Seeker", icon: Flame, unlocked: currentStreak >= 7 },
                      { name: "Realm Explorer", icon: Target, unlocked: completedRealms >= 24 },
                      { name: "Master Initiate", icon: BookOpen, unlocked: completedRealms >= 144 },
                    ].map((achievement, idx) => {
                      const Icon = achievement.icon;
                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border text-center ${
                            achievement.unlocked
                              ? "border-purple-600 bg-purple-950/30"
                              : "border-gray-800 bg-gray-950/30 opacity-50"
                          }`}
                        >
                          <Icon className={`w-8 h-8 mx-auto mb-2 ${
                            achievement.unlocked ? "text-purple-400" : "text-gray-600"
                          }`} />
                          <p className="text-sm font-medium text-purple-200">
                            {achievement.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
