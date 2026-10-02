import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Receipt,
  Eye,
  ShoppingBag,
  Calendar,
  ArrowRight,
  Package,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import OrderStatusBadge from "../components/OrderStatusBadge";
import OrderDetailsModal from "../components/OrderDetailsModal";
import { useOrders } from "../api/order.queries";
import type { Order, OrderQuery } from "../types/order.types";
import { ROUTES } from "@/app/router/routes";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/date";
import { Card, CardContent } from "@/components/ui/card";
import { useTableSearchParams } from "@/hooks/useTableSearchParams";

export default function CustomerOrdersPage() {
  const navigate = useNavigate();
  const { query, searchTerm, setPage } = useTableSearchParams();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orderQuery = useMemo<OrderQuery>(() => {
    const queryObject: OrderQuery = {
      page: query.page || 1,
      limit: query.limit || 10,
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

  const orders = data?.items ?? [];

  const handleNavigateToProducts = () => navigate(ROUTES.PRODUCTS);
  const handleViewInvoice = (order: Order) => () => setSelectedOrder(order);
  const handlePrevPage = () => setPage(data!.page - 1);
  const handleNextPage = () => setPage(data!.page + 1);
  const handleCloseOrderDetails = (open: boolean) => {
    if (!open) setSelectedOrder(null);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary/15 via-primary/5 to-background border border-border/60 shadow-md">
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground flex items-center gap-3">
            <ShoppingBag className="size-8 text-primary" />
            <span>My Orders</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Track, review item lists, and monitor fulfillment status of your
            past purchases in a clean visual layout.
          </p>
        </div>

        <Button
          onClick={handleNavigateToProducts}
          className="rounded-2xl font-bold gap-2 px-6 shadow-md hover:shadow-lg transition-all self-start sm:self-center"
        >
          <span>Explore Products</span>
          <ArrowRight className="size-4" />
        </Button>
      </div>

      {/* Orders Visual Card Feed */}
      {isPending ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm font-semibold tracking-wide">
            Loading your order history...
          </p>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-10 sm:p-16 text-center space-y-6 flex flex-col items-center justify-center min-h-[380px] shadow-sm">
          <div className="flex size-20 items-center justify-center rounded-3xl bg-primary/10 text-primary border border-primary/20 shadow-inner">
            <Receipt className="size-10" />
          </div>

          <div className="space-y-2 max-w-md">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              No Orders Found
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {searchTerm || query.status
                ? "We couldn't find any orders matching your search or status filters. Try clearing filters to see more."
                : "You haven't placed any orders yet. Once you check out items from your cart, they will appear right here!"}
            </p>
          </div>

          <Button
            onClick={handleNavigateToProducts}
            size="lg"
            className="rounded-2xl px-8 py-6 font-extrabold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all gap-2"
          >
            <span>Start Shopping Now</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            const itemCount =
              order.items?.reduce((acc, item) => acc + item.quantity, 0) ||
              order.items?.length ||
              0;

            return (
              <Card
                key={order.id}
                className="rounded-3xl border-border/60 bg-card/90 backdrop-blur shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden"
              >
                {/* Card Header Bar */}
                <div className="p-5 sm:p-6 pb-4 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/20">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0 shadow-2xs">
                      <Receipt className="size-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-foreground tracking-tight text-base sm:text-lg">
                          Order #{order.id.slice(-8).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Calendar className="size-3.5" />
                        Placed on {formatDateTime(order.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto">
                    <span className="text-xs font-bold text-muted-foreground bg-background px-3 py-1.5 rounded-xl border border-border/60">
                      {itemCount} {itemCount === 1 ? "unit" : "units"}
                    </span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>

                {/* Card Body: Items Preview */}
                <CardContent className="p-5 sm:p-6 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Package className="size-3.5 text-primary" />
                    <span>Items Ordered</span>
                  </div>

                  <div className="divide-y divide-border/40 rounded-2xl border border-border/60 bg-muted/10 overflow-hidden">
                    {order.items?.map((item, idx) => (
                      <div
                        key={`${item.productId}-${idx}`}
                        className="flex items-center justify-between p-3.5 sm:p-4 gap-4 hover:bg-muted/20 transition-colors"
                      >
                        <div className="flex flex-col space-y-0.5 min-w-0">
                          <span className="font-bold text-sm text-foreground truncate">
                            {item.productName ||
                              `Product #${item.productId.slice(-6)}`}
                          </span>
                          <span className="text-xs text-muted-foreground font-medium">
                            Qty:{" "}
                            <strong className="text-foreground">
                              {item.quantity}
                            </strong>{" "}
                            × ₹{item.price?.toLocaleString()}
                          </span>
                        </div>

                        <div className="text-right font-black text-sm sm:text-base text-foreground shrink-0">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Card Footer: Total & View Details Action */}
                <div className="p-5 sm:p-6 pt-4 border-t border-border/40 bg-muted/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-muted-foreground">
                      Total Amount:
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-primary">
                      ₹{order.totalAmount?.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={handleViewInvoice(order)}
                      className="rounded-xl font-bold gap-2 px-6 shadow-2xs hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all h-11"
                    >
                      <Eye className="size-4" />
                      <span>View Full Invoice</span>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-border/40">
          <span className="text-xs sm:text-sm text-muted-foreground font-medium">
            Showing Page{" "}
            <strong className="text-foreground">{data.page}</strong> of{" "}
            <strong className="text-foreground">{data.totalPages}</strong> (
            {data.total} total orders)
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={data.page <= 1}
              onClick={handlePrevPage}
              className="rounded-xl font-bold gap-1"
            >
              <ChevronLeft className="size-4" />
              <span>Previous</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={data.page >= data.totalPages}
              onClick={handleNextPage}
              className="rounded-xl font-bold gap-1"
            >
              <span>Next</span>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={handleCloseOrderDetails}
        isAdmin={false}
      />
    </div>
  );
}
