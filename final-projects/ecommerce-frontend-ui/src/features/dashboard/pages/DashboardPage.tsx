import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CreditCard,
  IndianRupee,
  Package,
  Receipt,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Activity,
  Layers,
  Calendar,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { ROUTES } from "@/app/router/routes";
import { useOrders } from "@/features/orders/api/order.queries";
import { useUsers } from "@/features/user/api/user.queries";
import { useProducts } from "@/features/products/api/product.queries";
import { usePayments } from "@/features/payments";
import { OrderStatusBadge } from "@/features/orders";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/date";

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const handleNavigateToOrders = () => navigate(ROUTES.ORDERS);
  const handleNavigateToPayments = () => navigate(ROUTES.PAYMENTS);
  const handleNavigateToProducts = () => navigate(ROUTES.PRODUCTS);
  const handleNavigateToUsers = () => navigate(ROUTES.USERS);

  // live store data the dashboard renders
  const { data: ordersData, isPending: isOrdersPending } = useOrders({
    limit: 50,
  });
  const { data: usersData, isPending: isUsersPending } = useUsers({
    limit: 50,
  });
  const { data: productsData, isPending: isProductsPending } = useProducts({
    limit: 50,
    status: "all",
  });
  const { data: payments, isPending: isPaymentsPending } = usePayments();

  const orders = useMemo(() => ordersData?.items ?? [], [ordersData]);
  const users = useMemo(() => usersData?.items ?? [], [usersData]);
  const products = useMemo(() => productsData?.items ?? [], [productsData]);

  const adminStats = useMemo(() => {
    const totalOrdersCount = ordersData?.total || orders.length;
    const totalUsersCount = usersData?.total || users.length;
    const totalProductsCount = productsData?.total || products.length;

    // revenue only counts settled orders
    const revenueOrders = orders.filter((o) =>
      ["PAID", "SHIPPED", "DELIVERED"].includes(o.status),
    );
    const totalRevenue = revenueOrders.reduce(
      (acc, o) => acc + (o.totalAmount || 0),
      0,
    );

    const pendingOrders = orders.filter((o) => o.status === "PENDING").length;
    const paidOrders = orders.filter((o) => o.status === "PAID").length;
    const shippedOrders = orders.filter((o) => o.status === "SHIPPED").length;
    const deliveredOrders = orders.filter(
      (o) => o.status === "DELIVERED",
    ).length;

    // stock that's at zero
    const outOfStockProducts = products.filter(
      (p) => (p.stock ?? 0) <= 0,
    ).length;
    const activeProducts = products.filter((p) => p.isActive !== false).length;

    return {
      totalRevenue,
      totalOrdersCount,
      totalUsersCount,
      totalProductsCount,
      pendingOrders,
      paidOrders,
      shippedOrders,
      deliveredOrders,
      outOfStockProducts,
      activeProducts,
    };
  }, [ordersData, orders, usersData, users, productsData, products]);

  const isLoading = isOrdersPending || isUsersPending || isProductsPending || isPaymentsPending;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-muted-foreground">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-sm font-semibold tracking-wide">
          Syncing live intelligence across store modules...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary/15 via-primary/5 to-background border border-border/60 shadow-md">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <Badge
              variant="outline"
              className="rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 font-bold text-xs uppercase tracking-wider"
            >
              Admin Dashboard
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
              <Activity className="size-3.5 text-emerald-500 animate-pulse" />
              Live Store Intelligence
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Welcome back, {user?.name || "Admin"}!
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Monitor comprehensive store revenue, review fulfillment queues,
            audit user accounts, and verify payment gateway integration state.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center">
          <Button
            onClick={handleNavigateToOrders}
            className="rounded-2xl font-bold gap-2 px-6 shadow-md hover:shadow-lg transition-all h-12"
          >
            <span>Manage Orders</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-3xl border-border/60 bg-card/90 backdrop-blur shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Total Store Revenue
            </CardTitle>
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600">
              <IndianRupee className="size-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              ₹{adminStats.totalRevenue.toLocaleString("en-IN")}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <TrendingUp className="size-3.5 text-emerald-500" />
              <span>
                Calculated from{" "}
                {adminStats.paidOrders +
                  adminStats.shippedOrders +
                  adminStats.deliveredOrders}{" "}
                settled orders
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border/60 bg-card/90 backdrop-blur shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Total Orders
            </CardTitle>
            <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-600">
              <Receipt className="size-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              {adminStats.totalOrdersCount}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <span className="text-amber-600 font-bold">
                {adminStats.pendingOrders} Pending
              </span>
              <span>•</span>
              <span className="text-purple-600 font-bold">
                {adminStats.shippedOrders} Shipped
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border/60 bg-card/90 backdrop-blur shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Registered Users
            </CardTitle>
            <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-600">
              <Users className="size-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              {adminStats.totalUsersCount}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <span className="text-emerald-600 font-bold">
                All Accounts Active
              </span>
              <span>across store database</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border/60 bg-card/90 backdrop-blur shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Catalog Products
            </CardTitle>
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600">
              <Package className="size-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              {adminStats.totalProductsCount}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium">
              {adminStats.outOfStockProducts > 0 ? (
                <span className="text-rose-600 font-bold flex items-center gap-1">
                  <AlertTriangle className="size-3" />
                  {adminStats.outOfStockProducts} Out of Stock
                </span>
              ) : (
                <span className="text-muted-foreground">
                  {adminStats.activeProducts} Active & listed for sale
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* payment gateway status */}
      <Card className="rounded-3xl border-border/60 shadow-md bg-card/90 backdrop-blur overflow-hidden">
        <CardHeader className="p-6 pb-4 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 shrink-0">
              <CreditCard className="size-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <CardTitle className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
                  Live Checkout & Settlements
                </CardTitle>
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold text-[10px] uppercase tracking-wider">
                  Operational
                </Badge>
              </div>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                The payment gateway is live. Orders are securely processed and tracked.
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNavigateToPayments}
            className="rounded-xl font-bold gap-2 px-4 shadow-sm"
          >
            <span>View All Transactions</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 rounded-2xl bg-background/60 border border-border/60 space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Total Processed Volume
              </span>
              <div className="font-extrabold text-foreground text-sm flex items-center gap-1.5">
                <IndianRupee className="size-4 text-emerald-500" />
                <span>
                  {payments
                    ?.filter((p) => p.status === "SUCCESS")
                    .reduce((sum, p) => sum + Number(p.amount), 0)
                    .toLocaleString() || "0"}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Total settled payments across the platform.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-background/60 border border-border/60 space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Successful Transactions
              </span>
              <div className="font-extrabold text-foreground text-sm flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span>
                  {payments?.filter((p) => p.status === "SUCCESS").length || 0} Settled
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Completed checkouts via the payment module.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-background/60 border border-border/60 space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Pending Settlements
              </span>
              <div className="font-extrabold text-amber-600 text-sm flex items-center gap-1.5">
                <Clock className="size-4" />
                <span>
                  {payments?.filter((p) => p.status === "PENDING").length || 0} Processing
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Transactions awaiting confirmation from the gateway.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        <Card className="lg:col-span-8 rounded-3xl border-border/60 bg-card/90 backdrop-blur shadow-md overflow-hidden">
          <CardHeader className="p-6 pb-4 border-b border-border/40 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Receipt className="size-5 text-primary" />
              <CardTitle className="text-lg font-extrabold">
                Recent Orders
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNavigateToOrders}
              className="rounded-xl font-bold text-xs gap-1 hover:text-primary"
            >
              <span>View All ({orders.length})</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {orders.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground font-medium">
                No orders have been placed yet.
              </div>
            ) : (
              <div className="divide-y divide-border/40">
                {orders.slice(0, 5).map((order) => {
                  const itemCount =
                    order.items?.reduce(
                      (acc, item) => acc + item.quantity,
                      0,
                    ) ||
                    order.items?.length ||
                    0;
                  return (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 sm:p-5 hover:bg-muted/20 transition-colors gap-4"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="p-2.5 rounded-2xl bg-primary/10 text-primary shrink-0">
                          <Receipt className="size-4 stroke-[2.5]" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-extrabold text-sm text-foreground truncate">
                            #{order.id.slice(-8).toUpperCase()}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Calendar className="size-3" />
                            {formatDateTime(order.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <div className="font-black text-sm text-foreground">
                            ₹{order.totalAmount?.toLocaleString()}
                          </div>
                          <div className="text-[11px] font-medium text-muted-foreground">
                            {itemCount} {itemCount === 1 ? "item" : "items"}
                          </div>
                        </div>
                        <OrderStatusBadge status={order.status} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-6">
          <Card className="rounded-3xl border-border/60 bg-card/90 backdrop-blur shadow-md overflow-hidden">
            <CardHeader className="p-6 pb-4 border-b border-border/40">
              <CardTitle className="text-lg font-extrabold flex items-center gap-2">
                <Layers className="size-5 text-primary" />
                <span>Module Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <Button
                variant="outline"
                onClick={handleNavigateToProducts}
                className="w-full rounded-2xl justify-between h-14 px-4 font-bold hover:bg-primary/10 hover:border-primary/30 transition-all shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <Package className="size-5 text-primary" />
                  <div className="text-left">
                    <div className="text-sm">Product Catalog</div>
                    <div className="text-[11px] font-normal text-muted-foreground">
                      {adminStats.totalProductsCount} items listed
                    </div>
                  </div>
                </div>
                <ArrowRight className="size-4 opacity-70" />
              </Button>

              <Button
                variant="outline"
                onClick={handleNavigateToUsers}
                className="w-full rounded-2xl justify-between h-14 px-4 font-bold hover:bg-primary/10 hover:border-primary/30 transition-all shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <Users className="size-5 text-purple-600" />
                  <div className="text-left">
                    <div className="text-sm">User Directory</div>
                    <div className="text-[11px] font-normal text-muted-foreground">
                      {adminStats.totalUsersCount} accounts synced
                    </div>
                  </div>
                </div>
                <ArrowRight className="size-4 opacity-70" />
              </Button>

              <Button
                variant="outline"
                onClick={handleNavigateToOrders}
                className="w-full rounded-2xl justify-between h-14 px-4 font-bold hover:bg-primary/10 hover:border-primary/30 transition-all shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <Receipt className="size-5 text-blue-600" />
                  <div className="text-left">
                    <div className="text-sm">Order Fulfillment</div>
                    <div className="text-[11px] font-normal text-muted-foreground">
                      {adminStats.pendingOrders} pending action
                    </div>
                  </div>
                </div>
                <ArrowRight className="size-4 opacity-70" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
