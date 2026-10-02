import { useState, useMemo } from "react";
import {
  Search,
  MoreHorizontal,
  Shield,
  Trash2,
  Eye,
  Mail,
  Calendar,
  Phone,
  UserCheck,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CommonTable } from "@/components/common/table/CommonTable";
import type { CommonTableColumn } from "@/components/common/table/common-table.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useUsers,
  useUpdateUserRole,
  useUpdateUserStatus,
  useDeleteUser,
} from "../api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { User, UserQuery, UserRole } from "../types/user.types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTableSearchParams } from "@/hooks/useTableSearchParams";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate, formatFullDate } from "@/lib/date";

const getColumns = ({
  onView,
  onToggleRole,
  onToggleStatus,
  onDelete,
}: {
  onView: (user: User) => void;
  onToggleRole: (user: User) => void;
  onToggleStatus: (user: User) => void;
  onDelete: (user: User) => void;
}): CommonTableColumn<User>[] => [
  {
    id: "user",
    header: "User",
    sortable: true,
    getSortValue: (row) => row.name,
    cell: (user) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-10 border border-border/40 shadow-sm">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-foreground text-sm">
            {user.name}
          </span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>
      </div>
    ),
  },
  {
    id: "role",
    header: "Role",
    sortable: true,
    getSortValue: (row) => row.role,
    cell: (user) =>
      user.role === "ADMIN" ? (
        <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 hover:bg-purple-500/20 font-bold gap-1 px-2.5 py-0.5">
          <Shield className="size-3" />
          Admin
        </Badge>
      ) : (
        <Badge variant="secondary" className="font-medium gap-1 px-2.5 py-0.5">
          <UserCheck className="size-3" />
          User
        </Badge>
      ),
  },
  {
    id: "status",
    header: "Status",
    cell: (user) =>
      user.isActive !== false ? (
        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20 font-bold gap-1 px-2.5 py-0.5">
          <CheckCircle2 className="size-3" />
          Active
        </Badge>
      ) : (
        <Badge
          variant="secondary"
          className="text-muted-foreground gap-1 px-2.5 py-0.5"
        >
          <XCircle className="size-3" />
          Inactive
        </Badge>
      ),
  },
  {
    id: "createdAt",
    header: "Joined Date",
    sortable: true,
    getSortValue: (row) => row.createdAt,
    cell: (user) => formatDate(user.createdAt),
  },
  {
    id: "actions",
    header: "Actions",
    className: "w-16 text-right",
    cell: (user) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-lg">
          <DropdownMenuItem
            onClick={() => onView(user)}
            className="cursor-pointer rounded-lg gap-2"
          >
            <Eye className="size-4 text-muted-foreground" />
            <span>View Details</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onToggleRole(user)}
            className="cursor-pointer rounded-lg gap-2"
          >
            <Shield className="size-4 text-muted-foreground" />
            <span>Make {user.role === "ADMIN" ? "User" : "Admin"}</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onToggleStatus(user)}
            className="cursor-pointer rounded-lg gap-2"
          >
            {user.isActive !== false ? (
              <XCircle className="size-4 text-amber-500" />
            ) : (
              <CheckCircle2 className="size-4 text-emerald-500" />
            )}
            <span>
              {user.isActive !== false ? "Deactivate User" : "Activate User"}
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer rounded-lg text-destructive focus:text-destructive gap-2 font-semibold"
            onClick={() => onDelete(user)}
          >
            <Trash2 className="size-4" />
            <span>Delete User</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function AdminUsersPage() {
  const { query, searchTerm, setPage, setLimit, setSearch, setFilter } =
    useTableSearchParams();

  const userQuery = useMemo<UserQuery>(() => {
    const queryObject: UserQuery = {
      page: query.page,
      limit: query.limit,
    };

    if (query.search) {
      queryObject.search = query.search;
    }

    if (query.category && query.category !== "all") {
      queryObject.role = query.category;
    }

    if (query.status && query.status !== "all") {
      queryObject.status = query.status;
    }

    if (
      query.sortBy === "name" ||
      query.sortBy === "email" ||
      query.sortBy === "createdAt"
    ) {
      queryObject.sortBy = query.sortBy;
    }

    if (query.sortOrder) {
      queryObject.sortOrder = query.sortOrder;
    }

    return queryObject;
  }, [query]);

  const { data, isPending } = useUsers(userQuery);
  const updateRoleMutation = useUpdateUserRole();
  const updateStatusMutation = useUpdateUserStatus();
  const deleteMutation = useDeleteUser();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  const handleToggleRole = (user: User) => {
    const newRole: UserRole = user.role === "ADMIN" ? "USER" : "ADMIN";
    updateRoleMutation.mutate({ id: user.id, role: newRole });
  };

  const handleToggleStatus = (user: User) => {
    const newStatus = user.isActive === false ? true : false;
    updateStatusMutation.mutate({ id: user.id, isActive: newStatus });
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    await deleteMutation.mutateAsync(userToDelete.id);
    setUserToDelete(null);
  };

  const handleCloseView = () => {
    setIsViewOpen(false);
  };

  const columns = getColumns({
    onView: handleView,
    onToggleRole: handleToggleRole,
    onToggleStatus: handleToggleStatus,
    onDelete: handleDelete,
  });

  const pagination =
    data == null
      ? undefined
      : {
          currentPage: data.page,
          pageSize: data.limit,
          pageSizeOptions: [10, 20, 50, 100] as const,
          totalItems: data.total,
          totalPages: data.totalPages,
          startItem: data.total === 0 ? 0 : (data.page - 1) * data.limit + 1,
          endItem: Math.min(data.page * data.limit, data.total),
          onPageChange: setPage,
          onPageSizeChange: setLimit,
        };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Users Management
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            View, filter, and manage user and administrator accounts across the
            platform.
          </p>
        </div>
      </div>

      <Card className="rounded-2xl border-border/60 shadow-sm bg-card/50 backdrop-blur">
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative sm:col-span-2 lg:col-span-2">
              <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or email address..."
                className="pl-10 rounded-xl h-11 border-border/60 focus-visible:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select
              value={query.category ?? "all"}
              onValueChange={(value) => setFilter("category", value)}
            >
              <SelectTrigger className="w-full rounded-xl h-11 border-border/60">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                sideOffset={6}
                className="rounded-xl"
              >
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="USER">User</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={query.status ?? "all"}
              onValueChange={(value) => setFilter("status", value)}
            >
              <SelectTrigger className="w-full rounded-xl h-11 border-border/60">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                sideOffset={6}
                className="rounded-xl"
              >
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <CommonTable
        columns={columns}
        data={data?.items ?? []}
        getRowKey={(user) => user.id}
        loading={isPending}
        emptyTitle="No users found"
        emptyDescription="No user or admin accounts match your current search filters."
        pagination={pagination}
      />

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6 border-border/60 bg-card/95 backdrop-blur-md shadow-2xl">
          <DialogHeader className="text-left space-y-1">
            <DialogTitle className="text-xl font-bold tracking-tight">
              User Profile
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Detailed account information and system privileges.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="mt-4 space-y-5">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/40">
                <Avatar className="size-16 border-2 border-primary/20 shadow-sm">
                  <AvatarImage
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                    {selectedUser.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 overflow-hidden">
                  <h3 className="font-bold text-lg leading-tight truncate">
                    {selectedUser.name}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap pt-0.5">
                    {selectedUser.role === "ADMIN" ? (
                      <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 font-bold text-xs gap-1">
                        <Shield className="size-3" />
                        Admin
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="font-medium text-xs gap-1"
                      >
                        <UserCheck className="size-3" />
                        Customer
                      </Badge>
                    )}

                    {selectedUser.isActive !== false ? (
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold text-xs gap-1">
                        <CheckCircle2 className="size-3" />
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="text-muted-foreground text-xs gap-1"
                      >
                        <XCircle className="size-3" />
                        Inactive
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 text-sm divide-y divide-border/40">
                <div className="flex items-center justify-between pt-2">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="size-4" /> Email Address
                  </span>
                  <span className="font-semibold text-foreground truncate max-w-[200px]">
                    {selectedUser.email}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="size-4" /> Phone Number
                  </span>
                  <span className="font-semibold text-foreground">
                    {selectedUser.phone || "Not provided"}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="size-4" /> Registered Date
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatFullDate(selectedUser.createdAt)}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  variant="outline"
                  onClick={handleCloseView}
                  className="rounded-xl font-semibold px-5"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!userToDelete}
        onOpenChange={(open) => !open && setUserToDelete(null)}
        title="Delete User Account?"
        description={
          userToDelete
            ? `Are you sure you want to permanently delete account "${userToDelete.name}" (${userToDelete.email})? All related data and permissions will be removed.`
            : "Are you sure you want to delete this user?"
        }
        confirmText="Delete User"
        cancelText="Cancel"
        variant="destructive"
        icon={<Trash2 className="size-5" />}
        onConfirm={confirmDeleteUser}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
