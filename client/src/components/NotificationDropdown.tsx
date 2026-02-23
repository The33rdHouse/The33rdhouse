import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, CheckCheck, AlertCircle, Info, Music, Trophy } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "wouter";

interface NotificationDropdownProps {
  onClose: () => void;
}

const notificationIcons = {
  announcement: Bell,
  update: Info,
  alert: AlertCircle,
  meditation_reminder: Music,
  achievement: Trophy,
};

export function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  const utils = trpc.useUtils();
  const { data: notifications = [] } = trpc.notifications.getAll.useQuery();
  
  const markAsReadMutation = trpc.notifications.markAsRead.useMutation({
    onSuccess: () => {
      utils.notifications.getAll.invalidate();
      utils.notifications.getUnreadCount.invalidate();
    },
  });

  const markAllAsReadMutation = trpc.notifications.markAllAsRead.useMutation({
    onSuccess: () => {
      utils.notifications.getAll.invalidate();
      utils.notifications.getUnreadCount.invalidate();
    },
  });

  const handleNotificationClick = (notificationId: number, link?: string | null) => {
    markAsReadMutation.mutate({ notificationId });
    if (link) {
      onClose();
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  return (
    <div className="absolute right-0 top-12 w-96 bg-background border border-border rounded-lg shadow-lg z-50">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-lg">Notifications</h3>
        {notifications.some(n => !n.isRead) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAllAsRead}
            className="text-xs"
          >
            <CheckCheck className="h-4 w-4 mr-1" />
            Mark all read
          </Button>
        )}
      </div>

      <ScrollArea className="h-[400px]">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
            <Bell className="h-12 w-12 mb-2 opacity-50" />
            <p>No notifications yet</p>
            <p className="text-sm">We'll notify you when something important happens</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((notification) => {
              const Icon = notificationIcons[notification.type];
              const isUnread = !notification.isRead;

              const content = (
                <div
                  className={`p-4 hover:bg-accent/50 transition-colors cursor-pointer ${
                    isUnread ? "bg-purple-500/5" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification.id, notification.link)}
                >
                  <div className="flex gap-3">
                    <div className={`mt-1 ${isUnread ? "text-purple-600" : "text-muted-foreground"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`font-semibold text-sm ${isUnread ? "text-foreground" : "text-muted-foreground"}`}>
                          {notification.title}
                        </h4>
                        {isUnread && (
                          <span className="h-2 w-2 rounded-full bg-purple-600 flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              );

              if (notification.link) {
                return (
                  <Link key={notification.id} href={notification.link}>
                    {content}
                  </Link>
                );
              }

              return <div key={notification.id}>{content}</div>;
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
