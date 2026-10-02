import { useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useProducts } from "../api";
import CustomerProductCard from "../components/CustomerProductCard";
import CategoryBar from "../components/CategoryBar";
import { Button } from "@/components/ui/button";

const DEFAULT_CATEGORY = "for-you";

export default function CustomerProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? DEFAULT_CATEGORY;

  const handleCategorySelect = (id: string) => {
    const next = new URLSearchParams(searchParams);

    if (id === DEFAULT_CATEGORY) {
      next.delete("category");
    } else {
      next.set("category", id);
    }

    setSearchParams(next);
  };

  const { data, isPending, isError } = useProducts({
    page: 1,
    limit: 12,
    ...(selectedCategory !== DEFAULT_CATEGORY
      ? { category: selectedCategory }
      : {}),
  });

  if (isPending) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center p-8">
        <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-center text-destructive">
          <p className="font-semibold">Unable to load products right now.</p>
          <p className="mt-1 text-xs opacity-80">
            Please check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  if (!data?.items.length) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center gap-2 p-8 text-center text-muted-foreground">
        <p className="text-lg font-semibold">No products available</p>
        <p className="text-sm">Check back soon for new arrivals!</p>

        {selectedCategory !== DEFAULT_CATEGORY && (
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => handleCategorySelect(DEFAULT_CATEGORY)}
          >
            <ArrowLeft className="mr-2 size-4" />
            Browse All Products
          </Button>
        )}
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl space-y-6">
      <CategoryBar
        activeCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/40 pb-5">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Explore Our Collection
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              Discover handpicked tech, premium footwear, and everyday
              essentials crafted with exceptional quality.
            </p>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-4 py-1.5 text-xs font-semibold text-muted-foreground w-fit backdrop-blur-md">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            {data.items.length} Products Available
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.items.map((product) => (
            <CustomerProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </section>
  );
}
