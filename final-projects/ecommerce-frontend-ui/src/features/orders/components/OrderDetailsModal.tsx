import {
  Calendar,
  Package,
  Receipt,
  User,
  ShieldAlert,
} from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import { useUpdateOrderStatus } from "../api/order.mutations";
import type { Order, OrderStatus } from "../types/order.types";
import { formatDateTime } from "@/lib/date";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrderDetailsModal({
  order,
  open,
  onOpenChange,
  isAdmin = false,
}: {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAdmin?: boolean;
}) {
  const updateStatusMutation = useUpdateOrderStatus();

  if (!order) return null;

  const handleStatusChange = (newStatus: OrderStatus) => {
    updateStatusMutation.mutate({ id: order.id, status: newStatus });
  };

  const handleClose = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-7 border-border/60 bg-card/95 backdrop-blur-md shadow-2xl">
        <DialogHeader className="text-left space-y-2 pb-4 border-b border-border/40">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                <Receipt className="size-6" />
              </div>
              <div>
                <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight">
                  Order #{order.id.slice(-8).toUpperCase()}
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                  <Calendar className="size-3.5" />
                  Placed on {formatDateTime(order.createdAt)}
                </DialogDescription>
              </div>
            </div>

            <OrderStatusBadge status={order.status} />
          </div>
        </DialogHeader>

        {/* Admin Quick Status Update */}
        {isAdmin && (
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 my-2">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
              <ShieldAlert className="size-5 text-primary" />
              <span>Update Order Status (Admin)</span>
            </div>

            <div className="w-full sm:w-52">
              <Select
                value={order.status}
                onValueChange={(val) => handleStatusChange(val as OrderStatus)}
                disabled={updateStatusMutation.isPending}
              >
                <SelectTrigger className="w-full rounded-xl bg-background border-border font-bold text-xs h-10 shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={6} className="rounded-xl">
                  <SelectItem value="PENDING" className="font-semibold text-amber-600">
                    Pending Payment
                  </SelectItem>
                  <SelectItem value="PAID" className="font-semibold text-blue-600">
                    Paid & Processing
                  </SelectItem>
                  <SelectItem value="SHIPPED" className="font-semibold text-purple-600">
                    Shipped
                  </SelectItem>
                  <SelectItem value="DELIVERED" className="font-semibold text-emerald-600">
                    Delivered
                  </SelectItem>
                  <SelectItem value="CANCELLED" className="font-semibold text-rose-600">
                    Cancelled
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Customer / User ID info if Admin */}
        {isAdmin && order.userId && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
            <User className="size-3.5" />
            <span>Customer User ID: <strong className="text-foreground font-mono">{order.userId}</strong></span>
          </div>
        )}

        {/* Order Items Breakdown */}
        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
            <Package className="size-4 text-primary" />
            Order Items ({order.items?.length || 0})
          </h4>

          <div className="divide-y divide-border/40 rounded-2xl border border-border/60 bg-muted/20 overflow-hidden">
            {order.items?.map((item, idx) => (
              <div
                key={`${item.productId}-${idx}`}
                className="flex items-center justify-between p-4 gap-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex flex-col space-y-1">
                  <span className="font-bold text-sm text-foreground">
                    {item.productName || `Product #${item.productId.slice(-6)}`}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    Unit Price: ₹{item.price?.toLocaleString()} × {item.quantity}
                  </span>
                </div>

                <div className="text-right font-black text-sm sm:text-base text-foreground">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Footer */}
        <div className="pt-4 border-t border-border/40 space-y-3">
          <div className="flex items-center justify-between text-base sm:text-lg font-black text-foreground px-1">
            <span>Grand Total</span>
            <span className="text-primary text-xl sm:text-2xl">
              ₹{order.totalAmount?.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              className="rounded-xl font-bold px-6 shadow-sm"
            >
              Close Details
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
