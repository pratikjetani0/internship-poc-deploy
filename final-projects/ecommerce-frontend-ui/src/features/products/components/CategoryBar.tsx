import {
  ShoppingBag,
  Shirt,
  Smartphone,
  Laptop,
  Sparkles,
  Lamp,
  Tv,
  Baby,
  Apple,
  Car,
  Dumbbell,
  type LucideIcon,
} from "lucide-react";
import { PRODUCT_CATEGORIES } from "../constants/product-categories";

export type CategoryItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

const categoryIcons: Record<string, LucideIcon> = {
  fashion: Shirt,
  mobiles: Smartphone,
  electronics: Laptop,
  beauty: Sparkles,
  home: Lamp,
  appliances: Tv,
  "toys-baby": Baby,
  "food-health": Apple,
  auto: Car,
  sports: Dumbbell,
};

const categories: CategoryItem[] = [
  { id: "for-you", label: "For You", icon: ShoppingBag },
  ...PRODUCT_CATEGORIES.map((category) => ({
    ...category,
    icon: categoryIcons[category.id] ?? ShoppingBag,
  })),
];

export type CategoryBarProps = {
  activeCategory: string;
  onCategorySelect: (id: string) => void;
};

export default function CategoryBar({
  activeCategory,
  onCategorySelect,
}: CategoryBarProps) {
  const handleCategoryClick = (id: string) => () => {
    onCategorySelect(id);
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-4 mb-2 border-b border-border/40 sticky top-16 z-40 bg-background/95 backdrop-blur">
      <div className="flex items-center justify-between min-w-max xl:min-w-full gap-4 sm:gap-6 pb-2 px-2">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={handleCategoryClick(category.id)}
              className="flex flex-col items-center gap-2 group cursor-pointer transition-all focus:outline-none shrink-0"
            >
              <div
                className={`relative flex items-center justify-center p-3 rounded-2xl transition-all duration-300 ${isActive
                  ? "bg-primary/5 border border-primary/20 scale-110 shadow-sm"
                  : "bg-transparent border border-transparent hover:bg-muted/50"
                  }`}
              >
                {/* Simulated yellow accent for the icons */}
                <div className="absolute inset-0 bg-yellow-400/20 blur-md rounded-full scale-50 opacity-0 group-hover:opacity-100 transition-opacity" />

                <Icon
                  className={`size-6 transition-colors z-10 ${isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
              </div>
              <span
                className={`text-xs font-semibold tracking-wide transition-colors ${isActive
                  ? "text-foreground"
                  : "text-muted-foreground group-hover:text-foreground"
                  }`}
              >
                {category.label}
              </span>

              {/* Active Indicator */}
              <div
                className={`h-0.5 rounded-t-full transition-all duration-300 ${isActive
                  ? "w-full bg-primary mt-1"
                  : "w-0 bg-transparent mt-1"
                  }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
