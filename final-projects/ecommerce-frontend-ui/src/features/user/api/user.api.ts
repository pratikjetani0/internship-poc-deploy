import { api } from "@/lib/api/axios";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type {
  User,
  UpdateProfilePayload,
  PaginatedUsers,
  UserQuery,
  UserRole,
} from "../types/user.types";

export const userApi = {
  async getCurrentUser(): Promise<User> {
    const { data } = await api.get<User>(`${ENDPOINTS.USERS}/me`);

    return data;
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<User> {
    const { data } = await api.patch<User>(`${ENDPOINTS.USERS}/me`, payload);

    return data;
  },

  async getUsers(params?: UserQuery): Promise<PaginatedUsers> {
    const { data } = await api.get<User[] | PaginatedUsers>(
      ENDPOINTS.USERS,
      { params },
    );

    if (Array.isArray(data)) {
      let filtered = [...data];

      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filtered = filtered.filter(
          (u) =>
            (u.name && u.name.toLowerCase().includes(searchLower)) ||
            (u.email && u.email.toLowerCase().includes(searchLower)),
        );
      }

      if (params?.role && params.role !== "all") {
        filtered = filtered.filter((u) => u.role === params.role);
      }

      if (params?.status && params.status !== "all") {
        if (params.status === "active") {
          filtered = filtered.filter((u) => u.isActive !== false);
        } else if (params.status === "inactive") {
          filtered = filtered.filter((u) => u.isActive === false);
        }
      }

      if (params?.sortBy) {
        filtered.sort((a, b) => {
          const aVal = String(a[params.sortBy!] || "");
          const bVal = String(b[params.sortBy!] || "");
          return params.sortOrder === "DESC"
            ? bVal.localeCompare(aVal)
            : aVal.localeCompare(bVal);
        });
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

  async getUserById(id: string): Promise<User> {
    const { data } = await api.get<User>(`${ENDPOINTS.USERS}/${id}`);

    return data;
  },

  async updateUserRole(id: string, role: UserRole): Promise<User> {
    const { data } = await api.patch<User>(`${ENDPOINTS.USERS}/${id}/role`, {
      role,
    });

    return data;
  },

  async updateUserStatus(id: string, isActive: boolean): Promise<User> {
    const { data } = await api.patch<User>(`${ENDPOINTS.USERS}/${id}/status`, {
      isActive,
    });

    return data;
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`${ENDPOINTS.USERS}/${id}`);
  },
};
