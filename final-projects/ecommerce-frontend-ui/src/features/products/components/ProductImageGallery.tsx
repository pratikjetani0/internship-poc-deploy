import { useState } from "react";
import { Image as ImageIcon, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProductImageGalleryProps = {
  images: string[];
  productName?: string;
};

export default function ProductImageGallery({
  images,
  productName = "Product image",
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectImage = (index: number) => () => {
    setSelectedIndex(index);
  };

  const safeImages = images && images.length > 0 ? images : ["/placeholder-product.png"];
  const activeImage = safeImages[selectedIndex] ?? safeImages[0];

  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl p-5 sm:p-7 shadow-xl">
      <div className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-muted/50 via-muted/20 to-transparent flex items-center justify-center shadow-inner">
        {activeImage ? (
          <img
            src={activeImage}
            alt={`${productName} - view ${selectedIndex + 1}`}
            className="size-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-product.png";
            }}
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <ImageIcon className="size-16 stroke-1 opacity-50" />
          </div>
        )}

        {safeImages.length > 1 && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-semibold text-foreground/80 shadow-sm backdrop-blur-md">
              View {selectedIndex + 1} of {safeImages.length}
            </span>
          </div>
        )}

        <div className="absolute bottom-4 right-4 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/90 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-md backdrop-blur-md">
            <ZoomIn className="size-3.5 text-primary" />
            <span>Hover to zoom</span>
          </span>
        </div>
      </div>

      {safeImages.length > 1 && (
        <div className="flex flex-wrap gap-3.5 pt-1">
          {safeImages.map((imgUrl, index) => (
            <button
              key={index}
              type="button"
              onClick={handleSelectImage(index)}
              aria-label={`View image ${index + 1}`}
              className={cn(
                "relative size-20 sm:size-22 overflow-hidden rounded-xl border-2 transition-all duration-200 cursor-pointer bg-muted/30 p-1.5",
                selectedIndex === index
                  ? "border-primary ring-4 ring-primary/20 shadow-md scale-105 bg-background"
                  : "border-transparent opacity-60 hover:opacity-100 hover:border-border hover:scale-102",
              )}
            >
              <img
                src={imgUrl}
                alt={`${productName} thumbnail ${index + 1}`}
                className="size-full object-contain rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder-product.png";
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
