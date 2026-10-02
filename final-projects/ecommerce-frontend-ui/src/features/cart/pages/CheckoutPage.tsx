import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  Home,
  Loader2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/app/router/routes";
import { useCart } from "../api/cart.queries";
import { getCartTotals } from "../utils/cart.utils";
import { getCartItemDetails } from "../utils/cart.utils";
import { useCheckout } from "@/features/payments";
import type { PaymentMethod } from "@/features/payments";
import PaymentMethodModal from "@/features/payments/components/PaymentMethodModal";
import { getApiErrorMessage } from "@/lib/api/error";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { data: cart, isPending, isError } = useCart();
  const checkoutMutation = useCheckout();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { items, totalItems, subtotal, shipping, discount, total } =
    getCartTotals(cart);

  const handlePayNow = () => {
    if (totalItems === 0) return;
    setIsPaymentModalOpen(true);
  };

  const handleConfirmPayment = (method: PaymentMethod) => {
    checkoutMutation.mutate(method, {
      onSuccess: () => {
        setIsPaymentModalOpen(false);
        navigate(ROUTES.ORDERS);
      },
    });
  };

  if (isPending) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm font-semibold tracking-wide">
            Preparing your order summary...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive border border-destructive/20">
          <ShoppingBag className="size-8" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">
          Unable to Load Cart
        </h2>
        <Button onClick={() => navigate(ROUTES.HOME)} className="rounded-xl">
          Back to Shop
        </Button>
      </div>
    );
  }

  if (totalItems === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
          <ShoppingBag className="size-8" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Your cart is empty</h2>
        <Button asChild className="rounded-xl">
          <Link to={ROUTES.HOME}>Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground flex-wrap">
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-1 hover:text-primary transition-colors"
        >
          <Home className="size-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="size-3.5 opacity-60" />
        <Link
          to={ROUTES.CART}
          className="hover:text-primary transition-colors"
        >
          Shopping Cart
        </Link>
        <ChevronRight className="size-3.5 opacity-60" />
        <span className="text-foreground font-semibold">Order Summary</span>
      </nav>

      {/* Heading */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
          <ShieldCheck className="size-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            Order Summary
          </h1>
          <p className="text-sm text-muted-foreground">
            Review your items and totals before completing payment.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 items-start">
        {/* Items list */}
        <div className="lg:col-span-8 space-y-4 min-w-0">
          <div className="rounded-2xl border border-border/50 bg-card/60 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Items ({totalItems})
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-semibold rounded-xl"
                asChild
              >
                <Link to={ROUTES.CART} className="flex items-center gap-1.5">
                  <ArrowLeft className="size-3.5" />
                  Edit Cart
                </Link>
              </Button>
            </div>

            {items.map((item) => {
              const { name, price, image, category, subtotal: itemTotal } =
                getCartItemDetails(item);

              return (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 rounded-xl border border-border/40 bg-background/60 p-3"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-border/40 bg-muted/20 p-1.5 flex items-center justify-center">
                    <img
                      src={image}
                      alt={name}
                      className="size-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/placeholder-product.png";
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="w-fit rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {category}
                    </span>
                    <p className="font-bold text-sm sm:text-base text-foreground truncate mt-1">
                      {name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: <strong className="text-foreground">{item.quantity}</strong> ×
                      ₹{price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <span className="font-extrabold text-sm sm:text-base text-primary shrink-0">
                    ₹{itemTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-4">
          <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-xl backdrop-blur-md space-y-5 sticky top-24">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold tracking-tight text-foreground">
                Payment Details
              </h2>
              <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary">
                {totalItems} {totalItems === 1 ? "Item" : "Items"}
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 p-3.5 text-xs text-foreground/90">
              <Truck className="size-4 text-primary shrink-0" />
              <span>
                {shipping === 0
                  ? "Free shipping applied!"
                  : `Shipping: ₹${shipping.toLocaleString("en-IN")}`}
              </span>
            </div>

            <Separator className="bg-border/60" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground font-medium">
                <span>Subtotal</span>
                <span className="font-bold text-foreground">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-muted-foreground font-medium">
                <span>Shipping & Handling</span>
                <span className="font-bold text-foreground">
                  {shipping === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      FREE
                    </span>
                  ) : (
                    `₹${shipping.toLocaleString("en-IN")}`
                  )}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Sparkles className="size-3.5" /> Discount
                  </span>
                  <span className="font-bold">
                    -₹{discount.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              <Separator className="bg-border/60" />

              <div className="flex justify-between items-baseline pt-1">
                <span className="text-base font-extrabold text-foreground">
                  Total Payable
                </span>
                <span className="text-2xl font-black text-primary">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <Button
              size="lg"
              onClick={handlePayNow}
              disabled={totalItems === 0}
              className="w-full rounded-2xl bg-primary py-6 text-base font-extrabold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <CreditCard className="size-5" />
              <span>Pay Now</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="w-full rounded-xl font-semibold text-xs"
              asChild
            >
              <Link to={ROUTES.CART}>← Back to Cart</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Method Modal */}
      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        totalAmount={total}
        isProcessing={checkoutMutation.isPending}
        error={
          checkoutMutation.isError
            ? getApiErrorMessage(
                checkoutMutation.error,
                "Payment failed. Please try again.",
              )
            : null
        }
        onConfirm={handleConfirmPayment}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </div>
  );
}
