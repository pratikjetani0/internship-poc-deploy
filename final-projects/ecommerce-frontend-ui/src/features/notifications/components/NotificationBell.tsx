import { Bell, Check, Loader2, Package, CreditCard, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useNotifications,
} from "../api/notification.queries";
import { useMarkNotificationAsRead as useMarkAsReadMut, useMarkAllNotificationsAsRead as useMarkAllAsReadMut } from "../api/notification.mutations";
import type { Notification, NotificationType } from "../types/notification.types";
import { cn } from "@/lib/utils";
import { parseDate } from "@/lib/date";

function timeAgo(dateString: string) {
  const date = parseDate(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "ORDER_CREATED":
      return <Package className="size-4 text-blue-500" />;
    case "PAYMENT_SUCCESS":
      return <CreditCard className="size-4 text-emerald-500" />;
    case "USER_REGISTERED":
      return <User className="size-4 text-purple-500" />;
    default:
      return <AlertCircle className="size-4 text-amber-500" />;
  }
};

export default function NotificationBell() {
  const { data: notifications = [], isPending } = useNotifications();
  const markAsReadMutation = useMarkAsReadMut();
  const markAllAsReadMutation = useMarkAllAsReadMut();

  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const unreadCount = unreadNotifications.length;

  const handleMarkAsRead = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    markAsReadMutation.mutate(id);
  };

  const handleMarkAllAsRead = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    markAllAsReadMutation.mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] animate-in zoom-in">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 sm:w-96 p-0 rounded-2xl overflow-hidden border-border/60 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-muted/20">
          <span className="font-bold text-sm text-foreground">Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={markAllAsReadMutation.isPending}
              className="h-auto px-2 py-1 text-xs text-primary hover:text-primary hover:bg-primary/10 rounded-lg"
            >
              {markAllAsReadMutation.isPending ? (
                <Loader2 className="size-3.5 animate-spin mr-1.5" />
              ) : (
                <Check className="size-3.5 mr-1.5" />
              )}
              Mark all read
            </Button>
          )}
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {isPending ? (
            <div className="p-8 flex flex-col items-center justify-center text-muted-foreground gap-3">
              <Loader2 className="size-6 animate-spin text-primary" />
              <p className="text-xs font-medium">Loading notifications...</p>
            </div>
          ) : unreadNotifications.length === 0 ? (
            <div className="p-8 flex flex-col items-center justify-center text-muted-foreground text-center gap-3">
              <div className="p-3 bg-muted rounded-full">
                <Bell className="size-6 opacity-40" />
              </div>
              <p className="text-sm font-medium">You're all caught up!</p>
              <p className="text-xs opacity-70">No new notifications right now.</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {unreadNotifications.map((notification: Notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex gap-3 p-4 border-b border-border/30 last:border-0 transition-colors",
                    !notification.isRead ? "bg-primary/5" : "bg-transparent hover:bg-muted/30"
                  )}
                >
                  <div className={cn(
                    "mt-0.5 shrink-0 flex items-center justify-center size-8 rounded-full shadow-xs",
                    !notification.isRead ? "bg-background border border-primary/20" : "bg-muted"
                  )}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className={cn(
                        "text-sm font-semibold leading-tight",
                        !notification.isRead ? "text-foreground" : "text-foreground/80"
                      )}>
                        {notification.title}
                      </p>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0 pt-0.5">
                        {timeAgo(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed pr-2">
                      {notification.message}
                    </p>

                    {!notification.isRead && (
                      <div className="pt-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleMarkAsRead(notification.id, e)}
                          disabled={markAsReadMutation.isPending && markAsReadMutation.variables === notification.id}
                          className="h-6 px-2 text-[10px] font-semibold text-primary hover:text-primary hover:bg-primary/10 rounded-md -ml-2"
                        >
                          Mark as read
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
