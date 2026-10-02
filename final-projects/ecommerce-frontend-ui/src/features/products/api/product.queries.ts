import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { productApi } from "./product.api";
import type { ProductQuery } from "../types/product.types";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (query: ProductQuery) => [...productKeys.lists(), query] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  slug: (slug: string) => [...productKeys.all, "slug", slug] as const,
};

export function useProducts(query: ProductQuery) {
  return useQuery({
    queryKey: productKeys.list(query),

    queryFn: () => productApi.findAll(query),

    placeholderData: keepPreviousData,
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: productKeys.detail(id!),

    queryFn: () => productApi.findById(id!),

    enabled: !!id,
  });
}

export function useProductBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: productKeys.slug(slug!),

    queryFn: () => productApi.findBySlug(slug!),

    enabled: !!slug,
  });
}
