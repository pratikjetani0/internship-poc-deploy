import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/router/routes";
import {
  Info,
  Loader2,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Product } from "../types/product.types";
import { toastService } from "@/lib/services/toast.service";
import { useAuthStore } from "@/stores/auth.store";
import { Role } from "@/types/role";
import { useAddToCart } from "@/features/cart/api/cart.mutations";

export type ProductInfoProps = {
  product: Product;
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const inStock = product.stock > 0 && product.isActive;
  const { user, isAuthenticated } = useAuthStore();
  const isAdmin = user?.role === Role.ADMIN;
  const addToCartMutation = useAddToCart();

  const handleQuantityChange = (delta: number) => () => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > product.stock) return product.stock;
      return next;
    });
  };

  const handleAddToCart = async () => {
    if (!inStock || isAdding) return;
    if (!isAuthenticated || !user) {
      toastService.info("Please log in to add items to your cart.");
      navigate(ROUTES.LOGIN);
      return;
    }
    setIsAdding(true);
    try {
      await addToCartMutation.mutateAsync({
        productId: product.id,
        quantity,
      });
      toastService.success(`Added ${quantity} x ${product.name} to your cart.`);
    } catch {
      toastService.error(
        "Failed to add product to cart. Please check availability.",
      );
    } finally {
      setIsAdding(false);
    }
  };

  const specificationsEntries = product.specifications
    ? Object.entries(product.specifications)
    : [];

  return (
    <div className="flex flex-col space-y-7">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold tracking-wider text-primary uppercase shadow-sm">
            {product.category || "General"}
          </span>

          {inStock ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 shadow-sm">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              In Stock ({product.stock} units left)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/20 bg-destructive/10 px-3.5 py-1 text-xs font-semibold text-destructive shadow-sm">
              <XCircle className="size-3.5" />
              Out of Stock
            </span>
          )}
        </div>

        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl leading-tight">
          {product.name}
        </h1>

        <div className="flex flex-wrap items-baseline gap-3 pt-1">
          <span className="text-2xl sm:text-2xl font-black tracking-tight text-primary">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Inclusive of all taxes
          </span>
        </div>
      </div>

      <Separator className="bg-border/60" />

      <div className="rounded-2xl border border-border/50 bg-muted/30 p-5 backdrop-blur-sm space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground/80">
          <Sparkles className="size-4 text-primary" />
          <span>About This Product</span>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-foreground/90 whitespace-pre-line">
          {product.description || "No description provided for this product."}
        </p>
      </div>

      {!isAdmin && (
        <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-xl backdrop-blur-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-sm font-bold text-foreground">
                Select Quantity
              </span>
              {inStock && (
                <p className="text-xs text-muted-foreground">
                  Maximum {product.stock} available
                </p>
              )}
            </div>

            <div className="flex items-center rounded-2xl border border-border/80 bg-background p-1.5 shadow-sm w-fit">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="size-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                onClick={handleQuantityChange(-1)}
                disabled={!inStock || quantity <= 1}
              >
                <Minus className="size-4" />
              </Button>

              <span className="w-14 text-center text-base font-bold text-foreground">
                {quantity}
              </span>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="size-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                onClick={handleQuantityChange(1)}
                disabled={!inStock || quantity >= product.stock}
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full rounded-2xl bg-primary py-6 text-base font-extrabold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            onClick={handleAddToCart}
            disabled={!inStock || isAdding || addToCartMutation.isPending}
          >
            {isAdding || addToCartMutation.isPending ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <ShoppingCart className="size-5" />
            )}
            <span>
              {isAdding || addToCartMutation.isPending
                ? "Adding to Cart..."
                : inStock
                  ? "Add to Cart"
                  : "Currently Unavailable"}
            </span>
          </Button>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/40 text-center text-xs font-medium text-muted-foreground">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 py-1">
              <ShieldCheck className="size-4 text-primary" />
              <span>Genuine Product</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 py-1 border-x border-border/40">
              <Truck className="size-4 text-primary" />
              <span>Fast Shipping</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 py-1">
              <RotateCcw className="size-4 text-primary" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      )}

      {specificationsEntries.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="size-4 text-primary" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Specifications
              </h3>
            </div>
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-bold text-muted-foreground">
              {specificationsEntries.length} Specs
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/60 backdrop-blur-md shadow-sm">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-border/40">
                {specificationsEntries.map(([key, val], index) => (
                  <tr
                    key={index}
                    className="transition-colors hover:bg-muted/40"
                  >
                    <th className="w-2/5 bg-muted/20 px-5 py-3.5 font-semibold text-muted-foreground">
                      {key}
                    </th>
                    <td className="px-5 py-3.5 font-bold text-foreground">
                      {String(val ?? "-")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
