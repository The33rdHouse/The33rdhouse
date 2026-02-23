import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSubscriptionAccess } from "@/hooks/useSubscriptionAccess";
import { UpgradeModal } from "@/components/UpgradeModal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Lock, Play, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";

// Months data will be fetched from tRPC

export default function InnerCircle() {
  const { user, isAuthenticated, loading } = useAuth();
  const { hasAccess, userTier } = useSubscriptionAccess();
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  const canAccessInnerCircle = hasAccess('innerCircle');
  
  // Fetch Inner Circle months and weeks from database
  const { data: months, isLoading: monthsLoading } = trpc.innerCircle.getMonths.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );
  
  const { data: weeks, isLoading: weeksLoading } = trpc.innerCircle.getWeeks.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  if (loading || (isAuthenticated && monthsLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
      </div>
    );
  }

  // Show upgrade modal for authenticated users without access
  if (isAuthenticated && !canAccessInnerCircle) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <SEO 
          title="Inner Circle | The 33rd House"
          description="12-month initiatic curriculum for deep transformation"
        />
        <Navigation />
        
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-2xl w-full bg-black/40 border-purple-900/30">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-serif text-purple-200">
                Upgrade to Access Inner Circle
              </CardTitle>
              <CardDescription className="text-base sm:text-lg text-gray-300">
                The Inner Circle requires Initiate tier or higher.
                Upgrade now to unlock the complete 48-week curriculum.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => setShowUpgradeModal(true)}
              >
                View Upgrade Options
              </Button>
            </CardContent>
          </Card>
        </main>
        
        <UpgradeModal 
          open={showUpgradeModal}
          onOpenChange={setShowUpgradeModal}
          feature="innerCircle"
          requiredTier="seeker"
          currentTier={userTier}
        />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <SEO 
          title="Inner Circle | The 33rd House"
          description="12-month initiatic curriculum for deep transformation"
        />
        <Navigation />
        
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-2xl w-full bg-black/40 border-purple-900/30">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-serif text-purple-200">
                The Inner Circle
              </CardTitle>
              <CardDescription className="text-base sm:text-lg text-gray-300">
                A 12-month initiatic journey through the complete Star Gate system.
                Members-only access to weekly teachings, practices, and community.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-purple-300">What's Included:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>12 months of structured curriculum aligned with the 12 Gates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Weekly 10-20 minute video teachings with Daniel Cruze</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Guided somatic practices and meditation sessions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Daily homework prompts for integration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Private community forum for members</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Progress tracking through all 144 realms</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 flex flex-col gap-4">
                <Button 
                  size="lg" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => window.location.href = getLoginUrl()}
                >
                  Login to Access Inner Circle
                </Button>
                <p className="text-sm text-center text-gray-500">
                  Members-only area • Requires authentication
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const currentMonth = months?.find(m => m.monthNumber === selectedMonth);
  const currentMonthWeeks = weeks?.filter(w => w.monthNumber === selectedMonth) || [];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <SEO 
        title="Inner Circle | The 33rd House"
        description="12-month initiatic curriculum for deep transformation"
      />
      <Navigation />
      
      <main className="flex-1 container py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-purple-200 mb-2">
            The Inner Circle
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300">
            Your 12-month journey through the Star Gate Cosmology
          </p>
        </div>

        <Tabs defaultValue="curriculum" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="progress">My Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum" className="space-y-8">
            {/* Month Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {months?.map((month) => (
                <Card
                  key={month.monthNumber}
                  className={`cursor-pointer transition-all ${
                    selectedMonth === month.monthNumber
                      ? "border-purple-600 bg-purple-950/30"
                      : "border-purple-900/30 hover:border-purple-700/50 bg-black/40"
                  }`}
                  onClick={() => setSelectedMonth(month.monthNumber)}
                >
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        Month {month.monthNumber}
                      </Badge>
                      <Circle className="w-4 h-4 text-gray-600" />
                    </div>
                    <CardTitle className="text-sm font-semibold text-purple-200">
                      {month.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Selected Month Content */}
            {currentMonth && (
              <Card className="bg-black/40 border-purple-900/30">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="text-sm">
                      Month {currentMonth.monthNumber}
                    </Badge>
                    <Badge className="bg-purple-600 text-white">
                      Gate {currentMonth.gateNumber}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl font-serif text-purple-200">
                    {currentMonth.title}
                  </CardTitle>
                  <CardDescription className="text-base sm:text-lg text-gray-300">
                    {currentMonth.theme}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Accordion type="single" collapsible className="w-full">
                    {currentMonthWeeks.map((week) => (
                      <AccordionItem key={week.id} value={`week-${week.weekNumber}`}>
                        <AccordionTrigger className="hover:text-purple-300">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">Week {week.weekNumber}</Badge>
                            <div className="text-left">
                              <div className="font-semibold">{week.title}</div>
                              <div className="text-sm text-gray-400">{week.subtitle}</div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-4">
                          <div className="grid gap-4">
                            <Card className="bg-purple-950/20 border-purple-800/30">
                              <CardHeader className="pb-3">
                                <div className="flex items-center gap-2">
                                  <Play className="w-4 h-4 text-purple-400" />
                                  <CardTitle className="text-sm">Video Teaching</CardTitle>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-gray-400 mb-3 whitespace-pre-wrap">
                                  {week.videoScript?.substring(0, 200)}...
                                </p>
                                <Button size="sm" variant="outline" className="border-purple-600 text-purple-300">
                                  Watch Video
                                </Button>
                              </CardContent>
                            </Card>

                            <Card className="bg-purple-950/20 border-purple-800/30">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Somatic Practice</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-gray-400 mb-3 whitespace-pre-wrap">
                                  {week.somaticPractice?.substring(0, 150)}...
                                </p>
                                <Button size="sm" variant="outline" className="border-purple-600 text-purple-300">
                                  Start Practice
                                </Button>
                              </CardContent>
                            </Card>

                            <Card className="bg-purple-950/20 border-purple-800/30">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Daily Homework</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-gray-400 whitespace-pre-wrap">
                                  {week.dailyHomework?.substring(0, 150)}...
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card className="bg-black/40 border-purple-900/30">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-200">Your Journey Progress</CardTitle>
                <CardDescription>
                  Track your completion through the 12-month curriculum
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {months?.map((month) => (
                    <div key={month.monthNumber} className="flex items-center gap-4 p-4 rounded-lg border border-purple-900/30">
                      <div className="flex-shrink-0">
                        <Circle className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-purple-200">
                          Month {month.monthNumber}: {month.title}
                        </div>
                        <div className="text-sm text-gray-400">
                          0 of 4 weeks completed
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Not Started
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
