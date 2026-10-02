import {
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  PackageCheck,
} from "lucide-react";
import type { OrderStatus } from "../types/order.types";
import { Badge } from "@/components/ui/badge";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; icon: typeof Clock; className: string }
> = {
  PENDING: {
    label: "Pending Payment",
    icon: Clock,
    className:
      "bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20",
  },
  PAID: {
    label: "Paid & Processing",
    icon: CheckCircle2,
    className:
      "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20",
  },
  SHIPPED: {
    label: "Shipped",
    icon: Truck,
    className:
      "bg-purple-500/10 text-purple-600 border-purple-500/20 hover:bg-purple-500/20",
  },
  DELIVERED: {
    label: "Delivered",
    icon: PackageCheck,
    className:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    className:
      "bg-rose-500/10 text-rose-600 border-rose-500/20 hover:bg-rose-500/20",
  },
};

export default function OrderStatusBadge({
  status,
}: {
  status: OrderStatus;
}) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    icon: Clock,
    className: "bg-secondary text-secondary-foreground",
  };
  const Icon = config.icon;

  return (
    <Badge
      className={`font-bold text-xs gap-1.5 px-2.5 py-1 rounded-full border shadow-2xs transition-colors ${config.className}`}
    >
      <Icon className="size-3.5 stroke-[2.5]" />
      <span>{config.label}</span>
    </Badge>
  );
}
