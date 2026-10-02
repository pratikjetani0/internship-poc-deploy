export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  category: string;
  specifications: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedProducts = {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ProductQuery = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "name" | "price" | "createdAt";
  sortOrder?: "ASC" | "DESC";
  inStock?: boolean;
};

export type CreateProductPayload = {
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  category: string;
  specifications?: Record<string, unknown>;
  isActive?: boolean;
};

export type UpdateProductPayload = Partial<CreateProductPayload>;