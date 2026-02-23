import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { trpc } from "@/lib/trpc";
import { 
  User, 
  Mail, 
  Calendar,
  Award,
  Target,
  Clock,
  Edit
} from "lucide-react";
import { Link } from "wouter";

export default function UserProfile() {
  const { user } = useAuth();
  
  const { data: stats } = trpc.progress.getStats.useQuery();
  const { data: progress } = trpc.progress.getAll.useQuery();

  if (!user) {
    return null;
  }

  const completedRealms = progress?.filter(p => p.completed).length || 0;
  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <>
      <Navigation />
      <SEO
        title={`Profile | ${user.name || 'Member'}`}
        description="Your profile and journey statistics"
      />

      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          {/* Profile Header */}
          <Card className="border-purple-900/30 bg-black/40 mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24 border-2 border-purple-600">
                  <AvatarFallback className="bg-purple-950 text-purple-200 text-2xl">
                    {user.name?.charAt(0).toUpperCase() || 'M'}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-serif font-bold text-purple-200">
                      {user.name}
                    </h1>
                    <Link href="/settings">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-2 text-gray-400">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Member since {memberSince}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Badge variant="outline" className="text-purple-400 border-purple-600">
                      {user.role === 'admin' ? 'Administrator' : 'Member'}
                    </Badge>
                    <Badge variant="outline" className="text-purple-400 border-purple-600">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Journey Statistics */}
          <Card className="border-purple-900/30 bg-black/40 mb-8">
            <CardHeader>
              <CardTitle className="text-purple-200">Journey Statistics</CardTitle>
              <CardDescription>Your progress through The 33rd House</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-purple-950/30">
                  <Target className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold text-purple-200">{completedRealms}</div>
                  <p className="text-sm text-gray-400">Realms Completed</p>
                </div>

                <div className="text-center p-4 rounded-lg bg-purple-950/30">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold text-purple-200">
                    {stats?.totalMeditationMinutes || 0}
                  </div>
                  <p className="text-sm text-gray-400">Meditation Minutes</p>
                </div>

                <div className="text-center p-4 rounded-lg bg-purple-950/30">
                  <Award className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold text-purple-200">
                    {stats?.achievements || 0}
                  </div>
                  <p className="text-sm text-gray-400">Achievements</p>
                </div>

                <div className="text-center p-4 rounded-lg bg-purple-950/30">
                  <User className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold text-purple-200">
                    {Math.ceil(completedRealms / 12)}
                  </div>
                  <p className="text-sm text-gray-400">Gates Mastered</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="border-purple-900/30 bg-black/40">
            <CardHeader>
              <CardTitle className="text-purple-200">Recent Achievements</CardTitle>
              <CardDescription>Your latest milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedRealms >= 1 && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-950/30">
                    <Award className="w-6 h-6 text-purple-400" />
                    <div>
                      <p className="font-medium text-purple-200">First Step</p>
                      <p className="text-sm text-gray-400">Completed your first realm</p>
                    </div>
                  </div>
                )}
                {completedRealms >= 12 && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-950/30">
                    <Award className="w-6 h-6 text-purple-400" />
                    <div>
                      <p className="font-medium text-purple-200">Gate Keeper</p>
                      <p className="text-sm text-gray-400">Completed Gate 1</p>
                    </div>
                  </div>
                )}
                {completedRealms === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    Complete your first realm to earn achievements
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
