import { useState, useMemo, useCallback } from "react";
import {
  Search,
  Receipt,
  Eye,
  Calendar,
  MoreHorizontal,
  ShieldAlert,
  CheckCircle2,
  Truck,
  PackageCheck,
  Clock,
  XCircle,
  User,
} from "lucide-react";
import OrderStatusBadge from "../components/OrderStatusBadge";
import OrderDetailsModal from "../components/OrderDetailsModal";
import { useOrders } from "../api/order.queries";
import { useUpdateOrderStatus } from "../api/order.mutations";
import type { Order, OrderQuery, OrderStatus } from "../types/order.types";
import { useUsers } from "@/features/user/api/user.queries";
import { formatDateTime } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTableSearchParams } from "@/hooks/useTableSearchParams";
import { CommonTable } from "@/components/common/table/CommonTable";
import type { CommonTableColumn } from "@/components/common/table/common-table.types";

export default function AdminOrdersPage() {
  const { query, searchTerm, setPage, setLimit, setSearch, setFilter } =
    useTableSearchParams();

  const orderQuery = useMemo<OrderQuery>(() => {
    const queryObject: OrderQuery = {
      page: query.page,
      limit: query.limit,
    };

    if (query.search) {
      queryObject.search = query.search;
    }

    if (query.status && query.status !== "all") {
      queryObject.status = query.status;
    }

    if (
      query.sortBy === "createdAt" ||
      query.sortBy === "totalAmount" ||
      query.sortBy === "status"
    ) {
      queryObject.sortBy = query.sortBy;
    }

    if (query.sortOrder) {
      queryObject.sortOrder = query.sortOrder;
    }

    return queryObject;
  }, [query]);

  const { data, isPending } = useOrders(orderQuery);
  const updateStatusMutation = useUpdateOrderStatus();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data: usersData } = useUsers({ page: 1, limit: 1000 });
  const userNameMap = useMemo(() => {
    const map = new Map<string, string>();
    usersData?.items.forEach((user) => map.set(user.id, user.name));
    return map;
  }, [usersData]);

  const handleUpdateStatus = useCallback(
    (orderId: string, status: OrderStatus) => () => {
      updateStatusMutation.mutate({ id: orderId, status });
    },
    [updateStatusMutation],
  );

  const handleViewInvoice = (order: Order) => () => setSelectedOrder(order);
  const handleCloseOrderDetails = (open: boolean) => {
    if (!open) setSelectedOrder(null);
  };

  const columns = useMemo<CommonTableColumn<Order>[]>(
    () => [
      {
        id: "id",
        header: "Order Number",
        sortable: true,
        getSortValue: (row) => row.id,
        cellClassName: "pr-6",
        cell: (order) => (
          <div className="flex items-center min-w-[220px]  gap-3">
            <div className="p-2.5 rounded-2xl bg-primary/10 text-primary shrink-0">
              <Receipt className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-foreground tracking-tight text-sm">
                #{order.id.slice(-8).toUpperCase()}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 whitespace-nowrap">
                <Calendar className="size-3 shrink-0" />
                {formatDateTime(order.createdAt)}
              </span>
            </div>
          </div>
        ),
      },
      {
        id: "customer",
        header: "Customer",
        cell: (order) => {
          const name = userNameMap.get(order.userId);

          return (
            <div className="flex items-center gap-1.5 font-medium text-sm text-foreground bg-muted/40 px-2.5 py-1 rounded-lg border border-border/40 w-fit">
              <User className="size-3.5 text-muted-foreground shrink-0" />
              <span className="truncate max-w-[150px]">
                {name || order.userId || "Guest"}
              </span>
            </div>
          );
        },
      },
      {
        id: "items",
        header: "Items",
        cell: (order) => {
          const itemCount =
            order.items?.reduce((acc, item) => acc + item.quantity, 0) ||
            order.items?.length ||
            0;
          return (
            <span className="font-bold text-sm text-foreground">
              {itemCount} {itemCount === 1 ? "unit" : "units"}
            </span>
          );
        },
      },
      {
        id: "totalAmount",
        header: "Total Amount",
        sortable: true,
        getSortValue: (row) => row.totalAmount,
        cell: (order) => (
          <span className="font-black text-foreground text-base">
            ₹{order.totalAmount?.toLocaleString()}
          </span>
        ),
      },
      {
        id: "status",
        header: "Status",
        sortable: true,
        getSortValue: (row) => row.status,
        cell: (order) => <OrderStatusBadge status={order.status} />,
      },
      {
        id: "actions",
        header: "Actions",
        className: "w-24 text-center",
        cell: (order) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-52 rounded-xl shadow-lg"
            >
              <DropdownMenuItem
                onClick={handleViewInvoice(order)}
                className="cursor-pointer rounded-lg gap-2 font-bold"
              >
                <Eye className="size-4 text-primary" />
                <span>View Full Invoice</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <ShieldAlert className="size-3 text-primary" />
                <span>Change Status</span>
              </div>

              <DropdownMenuItem
                onClick={handleUpdateStatus(order.id, "PENDING")}
                className="cursor-pointer rounded-lg gap-2 text-amber-600 font-semibold"
              >
                <Clock className="size-4" />
                <span>Pending Payment</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleUpdateStatus(order.id, "PAID")}
                className="cursor-pointer rounded-lg gap-2 text-blue-600 font-semibold"
              >
                <CheckCircle2 className="size-4" />
                <span>Paid & Processing</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleUpdateStatus(order.id, "SHIPPED")}
                className="cursor-pointer rounded-lg gap-2 text-purple-600 font-semibold"
              >
                <Truck className="size-4" />
                <span>Mark as Shipped</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleUpdateStatus(order.id, "DELIVERED")}
                className="cursor-pointer rounded-lg gap-2 text-emerald-600 font-semibold"
              >
                <PackageCheck className="size-4" />
                <span>Mark as Delivered</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleUpdateStatus(order.id, "CANCELLED")}
                className="cursor-pointer rounded-lg gap-2 text-rose-600 font-semibold"
              >
                <XCircle className="size-4" />
                <span>Cancel Order</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [userNameMap, handleUpdateStatus],
  );

  const pagination =
    data == null
      ? undefined
      : {
          currentPage: data.page,
          pageSize: data.limit,
          pageSizeOptions: [10, 20, 50, 100] as const,
          totalItems: data.total,
          totalPages: data.totalPages,
          startItem: data.total === 0 ? 0 : (data.page - 1) * data.limit + 1,
          endItem: Math.min(data.page * data.limit, data.total),
          onPageChange: setPage,
          onPageSizeChange: setLimit,
        };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
            <Receipt className="size-8 text-primary" />
            <span>Orders Management</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Monitor across all customer transactions, view invoices, and manage
            fulfillment statuses.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <Card className="rounded-2xl border-border/60 shadow-sm bg-card/60 backdrop-blur">
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="relative sm:col-span-2">
              <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders by Order Number, product name, or ID..."
                className="pl-10 rounded-xl h-11 border-border/60 focus-visible:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select
              value={query.status ?? "all"}
              onValueChange={(value) => setFilter("status", value)}
            >
              <SelectTrigger className="w-full rounded-xl h-11 border-border/60 font-semibold">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                sideOffset={6}
                className="rounded-xl font-medium"
              >
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="PENDING">Pending Payment</SelectItem>
                <SelectItem value="PAID">Paid & Processing</SelectItem>
                <SelectItem value="SHIPPED">Shipped</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <CommonTable
        columns={columns}
        data={data?.items ?? []}
        getRowKey={(order) => order.id}
        loading={isPending}
        emptyIcon={<Receipt className="size-12 text-muted-foreground/50" />}
        emptyTitle="No Orders Found"
        emptyDescription="No orders match your current search and status filter criteria."
        pagination={pagination}
      />

      {/* Order Details Modal (with Admin controls enabled!) */}
      <OrderDetailsModal
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={handleCloseOrderDetails}
        isAdmin={true}
      />
    </div>
  );
}
