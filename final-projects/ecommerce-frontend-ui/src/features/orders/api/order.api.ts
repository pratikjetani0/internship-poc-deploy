import { api } from "@/lib/api/axios";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { parseDate } from "@/lib/date";
import type {
  Order,
  OrderQuery,
  PaginatedOrders,
  OrderStatus,
} from "../types/order.types";

export const orderApi = {
  async getOrders(params?: OrderQuery): Promise<PaginatedOrders> {
    const { data } = await api.get<Order[] | PaginatedOrders>(
      ENDPOINTS.ORDERS,
      { params },
    );

    if (Array.isArray(data)) {
      let filtered = [...data];

      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filtered = filtered.filter(
          (o) =>
            o.id.toLowerCase().includes(searchLower) ||
            o.items?.some((i) =>
              i.productName?.toLowerCase().includes(searchLower),
            ),
        );
      }

      if (params?.status && params.status !== "all") {
        filtered = filtered.filter((o) => o.status === params.status);
      }

      if (params?.sortBy) {
        filtered.sort((a, b) => {
          if (params.sortBy === "totalAmount") {
            return params.sortOrder === "DESC"
              ? b.totalAmount - a.totalAmount
              : a.totalAmount - b.totalAmount;
          }
          const aVal = String(a[params.sortBy!] || "");
          const bVal = String(b[params.sortBy!] || "");
          return params.sortOrder === "DESC"
            ? bVal.localeCompare(aVal)
            : aVal.localeCompare(bVal);
        });
      } else {
        filtered.sort(
          (a, b) =>
            parseDate(b.createdAt).getTime() - parseDate(a.createdAt).getTime(),
        );
      }

      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const total = filtered.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const start = (page - 1) * limit;
      const items = filtered.slice(start, start + limit);

      return {
        items,
        total,
        page,
        limit,
        totalPages,
      };
    }

    return data;
  },

  async getOrderById(id: string): Promise<Order> {
    const { data } = await api.get<Order>(`${ENDPOINTS.ORDERS}/${id}`);

    return data;
  },

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const { data } = await api.patch<Order>(
      `${ENDPOINTS.ORDERS}/${id}/status`,
      { status },
    );

    return data;
  },
};
