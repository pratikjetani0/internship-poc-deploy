import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  Home,
  Loader2,
  PackageOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useProductBySlug } from "../api";
import ProductImageGallery from "../components/ProductImageGallery";
import ProductInfo from "../components/ProductInfo";
import { ROUTES } from "@/app/router/routes";

export default function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  const { data: product, isPending, isError } = useProductBySlug(slug);

  if (isPending) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm font-semibold tracking-wide">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center gap-4 text-center p-8">
        <div className="flex size-18 items-center justify-center rounded-full bg-destructive/10 text-destructive border border-destructive/20">
          <PackageOpen className="size-9" />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight">
          Product Not Found
        </h2>
        <p className="text-muted-foreground max-w-md text-sm sm:text-base leading-relaxed">
          The product you are looking for does not exist, may have been removed,
          or is temporarily out of stock.
        </p>
        <Button onClick={handleGoBack} className="mt-2 rounded-xl px-6">
          <ArrowLeft className="mr-2 size-4" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl sm:px-6 space-y-8">
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
          <Link
            to={ROUTES.HOME}
            className="hover:text-primary transition-colors uppercase tracking-wider text-[11px] font-bold"
          >
            {product.category || "General"}
          </Link>
          <ChevronRight className="size-3.5 opacity-60" />
          <span className="text-foreground font-semibold line-clamp-1 max-w-[200px] sm:max-w-xs">
            {product.name}
          </span>
        </nav>

        <Button
          variant="outline"
          size="sm"
          onClick={handleGoBack}
          className="w-fit rounded-xl border-border/60 hover:bg-muted/60 text-xs font-semibold"
        >
          <ArrowLeft className="mr-1.5 size-3.5" />
          Back to Products
        </Button>
      </div>

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-24 items-start">
        <div className="lg:col-span-6 lg:sticky lg:top-24">
          <ProductImageGallery
            images={product.images}
            productName={product.name}
          />
        </div>

        <div className="lg:col-span-6">
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}
