import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "./useDebounce";

export type TableSearchParams = {
  page: number;
  limit: number;
  search: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  category?: string;
  status?: string;
};

type SetQueryValue = string | number | undefined | null;

export function useTableSearchParams(debounceDelay = 300) {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") ?? "";
  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);

  if (urlSearch !== prevUrlSearch) {
    setPrevUrlSearch(urlSearch);
    setSearchTerm(urlSearch);
  }

  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

  const query = useMemo<TableSearchParams>(() => {
    const result: TableSearchParams = {
      page: Number(searchParams.get("page") ?? 1),
      limit: Number(searchParams.get("limit") ?? 10),
      search: searchParams.get("search") ?? "",
    };

    const sortBy = searchParams.get("sortBy");
    if (sortBy) result.sortBy = sortBy;

    const sortOrder = searchParams.get("sortOrder") as "ASC" | "DESC" | null;
    if (sortOrder) result.sortOrder = sortOrder;

    const category = searchParams.get("category");
    if (category) result.category = category;

    const status = searchParams.get("status");
    if (status) result.status = status;

    return result;
  }, [searchParams]);

  const updateParams = useCallback(
    (updates: Record<string, SetQueryValue>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          value === "all"
        ) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    if (debouncedSearchTerm !== urlSearch) {
      updateParams({
        search: debouncedSearchTerm,
        page: 1,
      });
    }
  }, [debouncedSearchTerm, urlSearch, updateParams]);

  const setPage = useCallback(
    (page: number) => {
      updateParams({ page });
    },
    [updateParams],
  );

  const setLimit = useCallback(
    (limit: number) => {
      updateParams({
        limit,
        page: 1,
      });
    },
    [updateParams],
  );

  const setSearch = useCallback((search: string) => {
    setSearchTerm(search);
  }, []);

  const setSorting = useCallback(
    (sortBy?: string, sortOrder?: "ASC" | "DESC") => {
      updateParams({
        sortBy,
        sortOrder,
        page: 1,
      });
    },
    [updateParams],
  );

  const setFilter = useCallback(
    (key: string, value?: string) => {
      updateParams({
        [key]: value === "all" ? undefined : value,
        page: 1,
      });
    },
    [updateParams],
  );

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSearchParams({
      page: "1",
      limit: String(query.limit),
    });
  }, [query.limit, setSearchParams]);

  return {
    query,
    searchTerm,
    setPage,
    setLimit,
    setSearch,
    setSorting,
    setFilter,
    clearFilters,
  };
}

