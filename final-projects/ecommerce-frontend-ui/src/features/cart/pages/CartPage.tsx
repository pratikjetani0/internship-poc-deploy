import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  Home,
  Loader2,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/common";
import { ROUTES } from "@/app/router/routes";
import { useCart } from "../api/cart.queries";
import { useClearCart } from "../api/cart.mutations";
import CartItemRow from "../components/CartItemRow";
import CartSummaryCard from "../components/CartSummaryCard";
import { getCartTotals } from "../utils/cart.utils";
import { toastService } from "@/lib/services/toast.service";

export default function CartPage() {
  const navigate = useNavigate();
  const { data: cart, isPending, isError, refetch } = useCart();
  const clearCartMutation = useClearCart();

  const { items, totalItems } = getCartTotals(cart);

  const handleRefetch = () => refetch();
  const handleNavigateToHome = () => navigate(ROUTES.HOME);
  const handleGoBack = () => navigate(-1);

  const executeClearCart = async () => {
    try {
      await clearCartMutation.mutateAsync();
      toastService.success("Your cart has been cleared.");
    } catch {
      toastService.error("Failed to clear cart. Please try again.");
    }
  };

  const handleCheckout = () => {
    if (totalItems === 0) return;
    navigate(ROUTES.CHECKOUT);
  };

  if (isPending) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm font-semibold tracking-wide">
            Loading your shopping cart...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center gap-4 text-center p-8">
        <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive border border-destructive/20">
          <ShoppingBag className="size-8" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">
          Unable to Load Cart
        </h2>
        <p className="text-muted-foreground max-w-md text-sm">
          We encountered an error while fetching your cart items. Please check your connection or log in to continue.
        </p>
        <div className="flex items-center gap-3 mt-2">
          <Button onClick={handleRefetch} variant="outline" className="rounded-xl">
            Try Again
          </Button>
          <Button onClick={handleNavigateToHome} className="rounded-xl">
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6  space-y-8">
      {/* Breadcrumbs Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
        <nav className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground flex-wrap">
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Home className="size-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="size-3.5 opacity-60" />
          <span className="text-foreground font-semibold">Shopping Cart</span>
        </nav>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleGoBack}
          className="w-fit rounded-xl hover:bg-muted/60 text-xs font-semibold -ml-3 sm:ml-0"
        >
          <ArrowLeft className="mr-1.5 size-3.5" />
          Continue Shopping
        </Button>
      </div>

      {/* Main Cart Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Your Shopping Cart
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {totalItems === 0
              ? "You have no items in your cart yet."
              : `Review your ${totalItems} selected ${totalItems === 1 ? "item" : "items"} before checkout.`}
          </p>
        </div>

        {items.length > 0 && (
          <ConfirmDialog
            title="Clear Entire Cart?"
            description="Are you sure you want to clear your shopping cart?"
            confirmText="Clear Cart"
            cancelText="Cancel"
            variant="destructive"
            icon={<Trash2 className="size-4" />}
            onConfirm={executeClearCart}
            trigger={
              <Button
                variant="outline"
                size="sm"
                disabled={clearCartMutation.isPending}
                className="rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive w-fit font-semibold text-xs cursor-pointer"
              >
                {clearCartMutation.isPending ? (
                  <Loader2 className="mr-2 size-3.5 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 size-3.5" />
                )}
                Clear Entire Cart
              </Button>
            }
          />
        )}
      </div>

      {/* Cart Content or Empty State */}
      {items.length === 0 ? (
        <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md p-10 sm:p-16 text-center space-y-6 flex flex-col items-center justify-center min-h-[400px]">
          <div className="flex size-20 items-center justify-center rounded-3xl bg-primary/10 text-primary border border-primary/20 shadow-inner">
            <ShoppingBag className="size-10" />
          </div>

          <div className="space-y-2 max-w-md">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Your Cart is Empty
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Looks like you haven't added anything to your cart yet. Explore our top categories and find something extraordinary!
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="rounded-2xl px-8 py-6 font-extrabold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
          >
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
              <ArrowLeft className="size-4" />
              <span>Explore Collection</span>
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 items-start">
          {/* Left Column: Items List */}
          <div className="lg:col-span-8 space-y-4 min-w-0">
            {items.map((item) => (
              <CartItemRow key={item.productId} item={item} />
            ))}

            <div className="pt-4 flex items-center justify-between">
              <Link
                to={ROUTES.HOME}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="size-4" />
                <span>Add more items to order</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-4">
            <CartSummaryCard cart={cart} onCheckout={handleCheckout} />
          </div>
        </div>
      )}
    </div>
  );
}
