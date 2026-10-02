import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Loader2, ShoppingCart, XCircle } from "lucide-react";
import { ROUTES } from "@/app/router/routes";
import type { Product } from "../types/product.types";
import { cn } from "@/lib/utils";
import { useAddToCart } from "@/features/cart/api/cart.mutations";
import { toastService } from "@/lib/services/toast.service";
import { useAuthStore } from "@/stores/auth.store";
import { Role } from "@/types/role";

export type CustomerProductCardProps = {
  product: Product;
};

export default function CustomerProductCard({
  product,
}: CustomerProductCardProps) {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const inStock = product.stock > 0 && product.isActive;
  const imageUrl = product.images?.[0] || "/placeholder-product.png";
  const { user, isAuthenticated } = useAuthStore();
  const isAdmin = user?.role === Role.ADMIN;
  const addToCartMutation = useAddToCart();

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
        quantity: 1,
      });
      toastService.success(`Added ${product.name} to cart.`);
    } catch {
      toastService.error("Failed to add item to cart. Please check availability.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link
      to={ROUTES.PRODUCT_DETAILS.replace(":slug", product.slug)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/60 backdrop-blur-md transition-all duration-300",
        "hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10",
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-muted/50 via-muted/20 to-transparent p-6 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={product.name}
          className="size-full object-contain transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-product.png";
          }}
        />

        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[11px] font-semibold text-foreground/80 shadow-sm backdrop-blur-md">
            {product.category || "General"}
          </span>
        </div>

        <div className="absolute top-3 right-3 z-10">
          {inStock ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 shadow-sm backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full border border-destructive/20 bg-destructive/10 px-2.5 py-1 text-[11px] font-semibold text-destructive shadow-sm backdrop-blur-md">
              <XCircle className="size-3" />
              Out of Stock
            </span>
          )}
        </div>

        <div className="absolute inset-0 z-10 flex items-end justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4">
          <div className="flex w-full items-center gap-2 transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
            <div className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white dark:bg-zinc-900 py-2.5 text-xs font-semibold text-zinc-900 dark:text-white shadow-lg group-hover:bg-primary group-hover:text-primary-foreground">
              <Eye className="size-4" />
              <span>View Details</span>
            </div>

            {!isAdmin && inStock && (
              <button
                type="button"
                onClick={handleQuickAdd}
                disabled={isAdding || addToCartMutation.isPending}
                className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50"
                title="Quick Add to Cart"
              >
                {isAdding || addToCartMutation.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <ShoppingCart className="size-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div className="space-y-1.5">
          <h2 className="font-bold text-lg leading-tight tracking-tight text-foreground line-clamp-1 transition-colors duration-200 group-hover:text-primary">
            {product.name}
          </h2>
        </div>

        <div className="flex items-end justify-between border-t border-border/40 pt-3.5">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Price
            </span>
            <span className="text-2xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
