import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  User, 
  Bell, 
  Lock,
  Mail,
  CreditCard,
  Shield
} from "lucide-react";
import { useLocation } from "wouter";
import { useSubscriptionAccess } from "@/hooks/useSubscriptionAccess";
import { SubscriptionBadge } from "@/components/SubscriptionBadge";
import { trpc } from "@/lib/trpc";

export default function UserSettings() {
  const { user } = useAuth();
  const { userTier, hasPaidSubscription } = useSubscriptionAccess();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  if (!user) {
    return null;
  }

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved");
  };

  return (
    <>
      <Navigation />
      <SEO
        title="Settings"
        description="Manage your account settings and preferences"
      />

      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-serif font-bold text-purple-200 mb-8">
            Settings
          </h1>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-purple-950/30 border border-purple-900/30">
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="subscription">
                <CreditCard className="w-4 h-4 mr-2" />
                Subscription
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Subscription Settings */}
            <TabsContent value="subscription">
              <Card className="border-purple-900/30 bg-black/40">
                <CardHeader>
                  <CardTitle className="text-purple-200">Subscription Management</CardTitle>
                  <CardDescription>Manage your membership tier and billing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-purple-950/30 border border-purple-900/50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Current Tier</p>
                      <SubscriptionBadge tier={userTier} size="lg" />
                    </div>
                    {hasPaidSubscription && (
                      <Button 
                        variant="outline"
                        className="border-purple-600 text-purple-300 hover:bg-purple-950/50"
                        onClick={() => {
                          trpc.stripe.createPortalSession.mutate({}, {
                            onSuccess: (data) => {
                              if (data.url) {
                                window.location.href = data.url;
                              }
                            },
                            onError: (error) => {
                              toast.error(error.message || "Failed to open billing portal");
                            },
                          });
                        }}
                      >
                        Manage Subscription
                      </Button>
                    )}
                  </div>

                  {hasPaidSubscription ? (
                    <div className="space-y-4">
                      <div className="bg-black/40 border border-purple-900/30 rounded-lg p-4">
                        <h4 className="text-purple-200 font-semibold mb-3">What you can manage:</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li className="flex items-start gap-2">
                            <span className="text-purple-400">•</span>
                            <span>Update payment method</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-400">•</span>
                            <span>View billing history and invoices</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-400">•</span>
                            <span>Upgrade or downgrade your tier</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-400">•</span>
                            <span>Cancel subscription (access continues until period end)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400 mb-4">You're currently on the free tier</p>
                      <a href="/pricing">
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          View Upgrade Options
                        </Button>
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Settings */}
            <TabsContent value="profile">
              <Card className="border-purple-900/30 bg-black/40">
                <CardHeader>
                  <CardTitle className="text-purple-200">Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-purple-200">Name</Label>
                    <Input
                      id="name"
                      defaultValue={user.name || ''}
                      className="bg-purple-950/30 border-purple-900/30 text-purple-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-purple-200">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user.email || ''}
                      className="bg-purple-950/30 border-purple-900/30 text-purple-200"
                    />
                  </div>

                  <Button onClick={handleSaveProfile} className="bg-purple-600 hover:bg-purple-700">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card className="border-purple-900/30 bg-black/40">
                <CardHeader>
                  <CardTitle className="text-purple-200">Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-purple-200 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Notifications
                      </Label>
                      <p className="text-sm text-gray-400">
                        Receive email updates about your progress
                      </p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-purple-200 flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Push Notifications
                      </Label>
                      <p className="text-sm text-gray-400">
                        Get notified about new content and achievements
                      </p>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-purple-200">Weekly Digest</Label>
                      <p className="text-sm text-gray-400">
                        Receive a weekly summary of your journey
                      </p>
                    </div>
                    <Switch
                      checked={weeklyDigest}
                      onCheckedChange={setWeeklyDigest}
                    />
                  </div>

                  <Button onClick={handleSaveNotifications} className="bg-purple-600 hover:bg-purple-700">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <Card className="border-purple-900/30 bg-black/40">
                <CardHeader>
                  <CardTitle className="text-purple-200">Security</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-purple-200">
                      Current Password
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      className="bg-purple-950/30 border-purple-900/30 text-purple-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-purple-200">
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      className="bg-purple-950/30 border-purple-900/30 text-purple-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-purple-200">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      className="bg-purple-950/30 border-purple-900/30 text-purple-200"
                    />
                  </div>

                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-900/30 bg-black/40 mt-6">
                <CardHeader>
                  <CardTitle className="text-purple-200">Account Security</CardTitle>
                  <CardDescription>
                    Monitor your account activity and manage sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => window.location.href = "/security"}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    View Security Dashboard
                  </Button>
                  <p className="text-sm text-gray-400 mt-3">
                    View active sessions, login history, and manage device access
                  </p>
                </CardContent>
              </Card>

              <Card className="border-purple-900/30 bg-black/40 mt-6">
                <CardHeader>
                  <CardTitle className="text-purple-200 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Two-Factor Authentication
                  </CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.twoFactorEnabled ? (
                    <>
                      <div className="p-4 bg-green-950/30 border border-green-900/50 rounded-lg">
                        <p className="text-green-400 font-semibold mb-1">✓ 2FA Enabled</p>
                        <p className="text-sm text-gray-400">
                          Your account is protected with two-factor authentication
                        </p>
                      </div>
                      <Button 
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-950/30"
                        onClick={() => {
                          toast.info("To disable 2FA, you'll need to verify with your authenticator app");
                          // TODO: Implement disable 2FA flow
                        }}
                      >
                        Disable 2FA
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="p-4 bg-yellow-950/30 border border-yellow-900/50 rounded-lg">
                        <p className="text-yellow-400 font-semibold mb-1">! 2FA Not Enabled</p>
                        <p className="text-sm text-gray-400">
                          Enable two-factor authentication for enhanced security
                        </p>
                      </div>
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => window.location.href = "/setup-2fa"}
                      >
                        Enable 2FA
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
