import { api } from "@/lib/api/axios";
import type {
  CreateProductPayload,
  PaginatedProducts,
  Product,
  ProductQuery,
  UpdateProductPayload,
} from "../types/product.types";
import { ENDPOINTS } from "@/lib/api/endpoints";

export const productApi = {
  findAll: async (query: ProductQuery = {}): Promise<PaginatedProducts> => {
    const { data } = await api.get<PaginatedProducts>(ENDPOINTS.PRODUCTS, {
      params: query,
    });

    return data;
  },

  findById: async (id: string): Promise<Product> => {
    const { data } = await api.get<Product>(`${ENDPOINTS.PRODUCTS}/${id}`);

    return data;
  },

  findBySlug: async (slug: string): Promise<Product> => {
    const { data } = await api.get<Product>(
      `${ENDPOINTS.PRODUCTS}/slug/${slug}`,
    );

    return data;
  },

  create: async (payload: CreateProductPayload): Promise<Product> => {
    const { data } = await api.post<Product>(ENDPOINTS.PRODUCTS, payload);

    return data;
  },

  update: async (
    id: string,
    payload: UpdateProductPayload,
  ): Promise<Product> => {
    const { data } = await api.patch<Product>(
      `${ENDPOINTS.PRODUCTS}/${id}`,
      payload,
    );

    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`${ENDPOINTS.PRODUCTS}/${id}`);
  },
};
