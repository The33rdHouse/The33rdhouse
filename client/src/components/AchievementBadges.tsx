import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Flame, Target, Award, Crown } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  progress?: number;
  total?: number;
}

interface AchievementBadgesProps {
  completedRealms: number;
  completedGates: number;
  totalSessions: number;
  currentStreak: number;
}

export default function AchievementBadges({
  completedRealms,
  completedGates,
  totalSessions,
  currentStreak,
}: AchievementBadgesProps) {
  const achievements: Achievement[] = [
    {
      id: "first_step",
      title: "First Step",
      description: "Complete your first realm",
      icon: Star,
      unlocked: completedRealms >= 1,
      progress: Math.min(completedRealms, 1),
      total: 1,
    },
    {
      id: "gate_keeper",
      title: "Gate Keeper",
      description: "Complete an entire gate (12 realms)",
      icon: Trophy,
      unlocked: completedGates >= 1,
      progress: Math.min(completedGates, 1),
      total: 1,
    },
    {
      id: "dedicated_seeker",
      title: "Dedicated Seeker",
      description: "Complete 10 meditation sessions",
      icon: Flame,
      unlocked: totalSessions >= 10,
      progress: Math.min(totalSessions, 10),
      total: 10,
    },
    {
      id: "streak_master",
      title: "Streak Master",
      description: "Maintain a 7-day practice streak",
      icon: Target,
      unlocked: currentStreak >= 7,
      progress: Math.min(currentStreak, 7),
      total: 7,
    },
    {
      id: "realm_explorer",
      title: "Realm Explorer",
      description: "Complete 50 realms",
      icon: Award,
      unlocked: completedRealms >= 50,
      progress: Math.min(completedRealms, 50),
      total: 50,
    },
    {
      id: "master_initiate",
      title: "Master Initiate",
      description: "Complete all 12 gates",
      icon: Crown,
      unlocked: completedGates >= 12,
      progress: Math.min(completedGates, 12),
      total: 12,
    },
  ];

  return (
    <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-purple-200 flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Achievements
        </CardTitle>
        <CardDescription className="text-gray-400">
          Unlock badges as you progress on your journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`relative p-4 rounded-lg border transition-all ${
                  achievement.unlocked
                    ? "border-purple-600 bg-purple-950/30"
                    : "border-gray-800 bg-gray-950/30 opacity-50"
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div
                    className={`p-3 rounded-full ${
                      achievement.unlocked
                        ? "bg-purple-600 text-white"
                        : "bg-gray-800 text-gray-500"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-sm ${
                      achievement.unlocked ? "text-purple-200" : "text-gray-500"
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {achievement.description}
                    </p>
                  </div>
                  {!achievement.unlocked && achievement.progress !== undefined && achievement.total !== undefined && (
                    <div className="w-full">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{achievement.progress}/{achievement.total}</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div
                          className="bg-purple-600 h-1.5 rounded-full transition-all"
                          style={{
                            width: `${(achievement.progress / achievement.total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {achievement.unlocked && (
                    <Badge className="bg-purple-600 text-white text-xs">
                      Unlocked
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
