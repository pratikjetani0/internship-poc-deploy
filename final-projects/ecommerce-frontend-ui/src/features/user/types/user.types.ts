export type UserRole = "ADMIN" | "USER";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive?: boolean;
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedUsers = {
  items: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type UserQuery = {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
  sortBy?: "name" | "email" | "createdAt";
  sortOrder?: "ASC" | "DESC";
};

export type UpdateProfilePayload = {
  name: string;
};