import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "wouter";
import { Bell, Send } from "lucide-react";

export default function AdminNotifications() {
  const { user, isAuthenticated } = useAuth();
  const [type, setType] = useState<"announcement" | "update" | "alert" | "meditation_reminder" | "achievement">("announcement");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [sendToAll, setSendToAll] = useState(true);

  const createNotificationMutation = trpc.notifications.create.useMutation({
    onSuccess: () => {
      toast.success("Notification sent successfully!");
      setTitle("");
      setMessage("");
      setLink("");
    },
    onError: (error) => {
      toast.error(`Failed to send notification: ${error.message}`);
    },
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !message) {
      toast.error("Please fill in all required fields");
      return;
    }

    createNotificationMutation.mutate({
      type,
      title,
      message,
      link: link || undefined,
      userId: sendToAll ? undefined : user?.id,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0412] via-[#1a0f2e] to-[#0a0412] pt-24 pb-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bell className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-serif text-purple-300">Send Notifications</h1>
          </div>
          <p className="text-purple-400">
            Create and send notifications to members of The 33rd House
          </p>
        </div>

        <Card className="bg-purple-950/30 border-purple-800/50">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-300">Create Notification</CardTitle>
            <CardDescription className="text-purple-400">
              Fill in the details below to send a notification to your members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-purple-300">Notification Type</Label>
                <Select value={type} onValueChange={(value: any) => setType(value)}>
                  <SelectTrigger id="type" className="bg-purple-950/50 border-purple-800/50 text-purple-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-purple-950 border-purple-800">
                    <SelectItem value="announcement">📢 Announcement</SelectItem>
                    <SelectItem value="update">ℹ️ Update</SelectItem>
                    <SelectItem value="alert">⚠️ Alert</SelectItem>
                    <SelectItem value="meditation_reminder">🎵 Meditation Reminder</SelectItem>
                    <SelectItem value="achievement">🏆 Achievement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-purple-300">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter notification title"
                  className="bg-purple-950/50 border-purple-800/50 text-purple-200 placeholder:text-purple-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-purple-300">Message *</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter notification message"
                  rows={4}
                  className="bg-purple-950/50 border-purple-800/50 text-purple-200 placeholder:text-purple-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="link" className="text-purple-300">Link (Optional)</Label>
                <Input
                  id="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="/inner-circle or https://..."
                  className="bg-purple-950/50 border-purple-800/50 text-purple-200 placeholder:text-purple-500"
                />
                <p className="text-sm text-purple-500">
                  Add a link for users to navigate to when clicking the notification
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sendToAll"
                  checked={sendToAll}
                  onChange={(e) => setSendToAll(e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-purple-950/50 border-purple-800/50 rounded"
                />
                <Label htmlFor="sendToAll" className="text-purple-300 cursor-pointer">
                  Send to all members
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white"
                disabled={createNotificationMutation.isPending}
              >
                {createNotificationMutation.isPending ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Notification
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-purple-950/20 border border-purple-800/30 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-300 mb-3">Notification Types Guide</h3>
          <ul className="space-y-2 text-purple-400 text-sm">
            <li><strong>📢 Announcement:</strong> General announcements and news</li>
            <li><strong>ℹ️ Update:</strong> Platform updates and new features</li>
            <li><strong>⚠️ Alert:</strong> Important alerts requiring attention</li>
            <li><strong>🎵 Meditation Reminder:</strong> Reminders for meditation practice</li>
            <li><strong>🏆 Achievement:</strong> Celebrate member achievements and milestones</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
