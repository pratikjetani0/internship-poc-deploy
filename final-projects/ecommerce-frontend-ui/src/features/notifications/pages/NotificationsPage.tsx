import { useMemo } from "react";
import { Bell, User, Calendar, CheckCircle2, Circle } from "lucide-react";
import { useNotifications } from "../api/notification.queries";
import {
  useMarkAllNotificationsAsRead,
} from "../api/notification.mutations";
import type { Notification } from "../types/notification.types";
import { Button } from "@/components/ui/button";
import { CommonTable } from "@/components/common/table/CommonTable";
import type { CommonTableColumn } from "@/components/common/table/common-table.types";
import { formatDateTime, parseDate } from "@/lib/date";

export default function NotificationsPage() {
  const { data: notifications, isPending } = useNotifications();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();

  const handleMarkAllAsRead = () => markAllAsReadMutation.mutate();

  const columns = useMemo<CommonTableColumn<Notification>[]>(
    () => [
      {
        id: "type",
        header: "Type",
        cell: (notification) => (
          <div className="flex items-center gap-3">
            <span className="font-medium text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground whitespace-nowrap">
              {notification.type?.replace("_", " ") || "SYSTEM"}
            </span>
          </div>
        ),
      },
      {
        id: "customer",
        header: "User Name",
        cell: (notification) => {
          const nameMatch = notification.message.match(/^Hello ([^,]+),/);
          const name = nameMatch ? nameMatch[1] : notification.userId;

          return (
            <div className="flex items-center gap-1.5 font-medium text-sm text-foreground bg-muted/40 px-2.5 py-1 rounded-lg border border-border/40 w-fit">
              <User className="size-3.5 text-muted-foreground shrink-0" />
              <span className="truncate max-w-[150px]">{name || "Guest"}</span>
            </div>
          );
        },
      },

      {
        id: "createdAt",
        header: "Date",
        sortable: true,
        getSortValue: (row) => parseDate(row.createdAt).getTime(),
        cell: (notification) => (
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="size-4 shrink-0" />
            {formatDateTime(notification.createdAt)}
          </span>
        ),
      },
      {
        id: "status",
        header: <div className="text-right pr-4">Status</div>,
        cell: (notification) => (
          <div className="flex items-center justify-end gap-1.5 pr-4">
            {notification.isRead ? (
              <span className="text-muted-foreground flex items-center gap-1 text-sm font-medium">
                <CheckCircle2 className="size-4" /> Read
              </span>
            ) : (
              <span className="text-primary flex items-center gap-1 text-sm font-bold">
                <Circle className="size-4 fill-primary/20" /> Unread
              </span>
            )}
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
            <Bell className="size-8 text-primary" />
            <span>Notifications History</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Monitor all system notifications and user alerts.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={handleMarkAllAsRead}
          disabled={
            !notifications?.some((n) => !n.isRead) ||
            markAllAsReadMutation.isPending
          }
        >
          <CheckCircle2 className="size-4 mr-2" />
          Mark all as read
        </Button>
      </div>

      <CommonTable
        columns={columns}
        data={notifications ?? []}
        getRowKey={(n) => n.id}
        loading={isPending}
        emptyIcon={<Bell className="size-12 text-muted-foreground/50" />}
        emptyTitle="No Notifications"
        emptyDescription="There are no notifications in the system yet."
      />
    </div>
  );
}
