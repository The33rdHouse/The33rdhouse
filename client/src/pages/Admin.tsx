import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Loader2, Users, Mail, Bell, TrendingUp, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"announcement" | "update" | "alert" | "meditation_reminder" | "achievement">("announcement");

  // Fetch all users (admin only)
  const { data: users, isLoading: usersLoading } = trpc.admin.getAllUsers.useQuery(
    undefined,
    { enabled: !!user && user.role === 'admin' }
  );

  // Fetch platform stats
  const { data: stats, isLoading: statsLoading } = trpc.admin.getStats.useQuery(
    undefined,
    { enabled: !!user && user.role === 'admin' }
  );

  // Send notification mutation
  const sendNotification = trpc.notifications.create.useMutation({
    onSuccess: () => {
      toast.success("Notification sent successfully!");
      setNotificationTitle("");
      setNotificationMessage("");
    },
    onError: (error) => {
      toast.error(`Failed to send notification: ${error.message}`);
    },
  });

  const loading = authLoading || usersLoading || statsLoading;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-purple-950/20 to-black">
        <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-purple-950/20 to-black">
          <Card className="max-w-md border-purple-900/30 bg-black/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-200">Access Denied</CardTitle>
              <CardDescription className="text-gray-400">
                This page is only accessible to administrators.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </>
    );
  }

  const handleSendNotification = () => {
    if (!notificationTitle || !notificationMessage) {
      toast.error("Please fill in all fields");
      return;
    }

    sendNotification.mutate({
      title: notificationTitle,
      message: notificationMessage,
      type: notificationType,
      userId: 0, // 0 means send to all users
    });
  };

  return (
    <>
      <Navigation />
      <SEO 
        title="Admin Dashboard | The 33rd House"
        description="Platform administration and management"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-serif font-bold text-purple-200 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-400">
                Platform management and analytics
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-200">{stats?.totalUsers || 0}</div>
                  <p className="text-xs text-gray-500 mt-1">Registered members</p>
                </CardContent>
              </Card>

              <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Active Users</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-200">{stats?.activeUsers || 0}</div>
                  <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                </CardContent>
              </Card>

              <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Sessions</CardTitle>
                  <Mail className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-200">{stats?.totalSessions || 0}</div>
                  <p className="text-xs text-gray-500 mt-1">Meditation sessions</p>
                </CardContent>
              </Card>

              <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Avg Progress</CardTitle>
                  <Bell className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-200">{stats?.avgProgress || 0}%</div>
                  <p className="text-xs text-gray-500 mt-1">Realm completion</p>
                </CardContent>
              </Card>
            </div>

            {/* Admin Tools */}
            <Tabs defaultValue="notifications" className="space-y-6">
              <TabsList className="bg-black/40 border border-purple-900/30">
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="meditations">Meditations</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-purple-200">Send Notification</CardTitle>
                    <CardDescription className="text-gray-400">
                      Broadcast a notification to all members
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="notif-type" className="text-gray-300">Type</Label>
                      <Select value={notificationType} onValueChange={(value: any) => setNotificationType(value)}>
                        <SelectTrigger id="notif-type" className="bg-black/60 border-purple-900/30 text-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-purple-900/30">
                          <SelectItem value="announcement">Announcement</SelectItem>
                          <SelectItem value="update">Update</SelectItem>
                          <SelectItem value="alert">Alert</SelectItem>
                          <SelectItem value="meditation_reminder">Meditation Reminder</SelectItem>
                          <SelectItem value="achievement">Achievement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notif-title" className="text-gray-300">Title</Label>
                      <Input
                        id="notif-title"
                        placeholder="Notification title"
                        value={notificationTitle}
                        onChange={(e) => setNotificationTitle(e.target.value)}
                        className="bg-black/60 border-purple-900/30 text-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notif-message" className="text-gray-300">Message</Label>
                      <Textarea
                        id="notif-message"
                        placeholder="Notification message"
                        value={notificationMessage}
                        onChange={(e) => setNotificationMessage(e.target.value)}
                        rows={4}
                        className="bg-black/60 border-purple-900/30 text-gray-300"
                      />
                    </div>

                    <Button
                      onClick={handleSendNotification}
                      disabled={sendNotification.isPending}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      {sendNotification.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Bell className="mr-2 h-4 w-4" />
                          Send Notification
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users" className="space-y-6">
                <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-purple-200">All Users</CardTitle>
                    <CardDescription className="text-gray-400">
                      {users?.length || 0} registered members
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users?.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-purple-900/30 bg-black/20"
                        >
                          <div>
                            <p className="font-medium text-gray-200">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs px-2 py-1 rounded-full bg-purple-950/50 text-purple-300 border border-purple-900/30">
                              {user.role}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Meditations Tab */}
              <TabsContent value="meditations" className="space-y-6">
                <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-purple-200">Upload Audio Meditations</CardTitle>
                    <CardDescription className="text-gray-400">
                      Add guided meditation audio files for each realm
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-center border-2 border-dashed border-purple-900/30 rounded-lg p-12 bg-black/20">
                      <div className="text-center space-y-4">
                        <Upload className="h-12 w-12 text-purple-400 mx-auto" />
                        <div>
                          <p className="text-gray-300 font-medium">Upload meditation audio</p>
                          <p className="text-sm text-gray-500 mt-1">MP3, WAV up to 50MB</p>
                        </div>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                          Choose File
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Note: Audio upload functionality will be implemented in the next phase
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-purple-200">Platform Analytics</CardTitle>
                    <CardDescription className="text-gray-400">
                      Coming soon: Detailed analytics and insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">
                      Advanced analytics dashboard will be available in the next update
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
