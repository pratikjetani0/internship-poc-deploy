import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, MoreHorizontal } from "lucide-react";
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
import { useProducts, useDeleteProduct } from "../api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product, ProductQuery } from "../types/product.types";
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
import ProductFormPage from "./ProductFormPage";
import { ROUTES } from "@/app/router/routes";

const getColumns = ({
  onEdit,
  onView,
  onDelete,
}: {
  onEdit: (product: Product) => () => void;
  onView: (product: Product) => () => void;
  onDelete: (product: Product) => () => void;
}): CommonTableColumn<Product>[] => [
    {
      id: "image",
      header: "Image",
      cell: (product) => (
        <img
          src={product.images[0] ?? "/placeholder-product.png"}
          alt={product.name}
          className="h-14 w-14 rounded-md object-cover"
        />
      ),
    },
    {
      id: "name",
      header: "Name",
      sortable: true,
      cell: (product) => product.name,
    },
    {
      id: "category",
      header: "Category",
      sortable: true,
      cell: (product) => product.category,
    },
    {
      id: "price",
      header: "Price",
      sortable: true,
      cell: (product) => `₹${product.price.toLocaleString()}`,
    },
    {
      id: "stock",
      header: "Stock",
      sortable: true,
      cell: (product) => product.stock,
    },
    {
      id: "status",
      header: "Status",
      cell: (product) =>
        product.isActive ? (
          <Badge>Active</Badge>
        ) : (
          <Badge variant="secondary">Inactive</Badge>
        ),
    },
    {
      id: "actions",
      header: "",
      className: "w-16",
      cell: (product) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit(product)}>
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem onClick={onView(product)}>
              View
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-destructive"
              onClick={onDelete(product)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

export default function AdminProductsPage() {
  const navigate = useNavigate();
  const { query, searchTerm, setPage, setLimit, setSearch, setFilter } =
    useTableSearchParams();

  const productQuery = useMemo<ProductQuery>(() => {
    const queryObject: ProductQuery = {
      page: query.page,
      limit: query.limit,
    };

    if (query.search) {
      queryObject.search = query.search;
    }

    if (query.category && query.category !== "all") {
      queryObject.category = query.category;
    }

    if (
      query.sortBy === "name" ||
      query.sortBy === "price" ||
      query.sortBy === "createdAt"
    ) {
      queryObject.sortBy = query.sortBy;
    }

    if (query.sortOrder) {
      queryObject.sortOrder = query.sortOrder;
    }

    queryObject.status = query.status ?? "all";

    return queryObject;
  }, [query]);

  const { data, isPending } = useProducts(productQuery);
  const deleteMutation = useDeleteProduct();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => () => {
    setSelectedProduct(product);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setFormMode("create");
    setIsFormOpen(true);
  };

  const handleView = (product: Product) => () => {
    navigate(ROUTES.PRODUCT_DETAILS.replace(":slug", product.slug));
  };

  const handleDelete = (product: Product) => () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      deleteMutation.mutate(product.id);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  const columns = getColumns({
    onEdit: handleEdit,
    onView: handleView,
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
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>

          <p className="text-muted-foreground">
            Manage your products, inventory and pricing.
          </p>
        </div>

        <Button onClick={handleCreate}>
          <Plus className="mr-2 size-4" />
          Add Product
        </Button>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative sm:col-span-2 lg:col-span-2">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select
              value={query.category ?? "all"}
              onValueChange={(value) => setFilter("category", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>

              <SelectContent position="popper" sideOffset={6}>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="mobiles">Mobiles</SelectItem>
                <SelectItem value="laptops">Laptops</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={query.status ?? "all"}
              onValueChange={(value) => setFilter("status", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent position="popper" sideOffset={6}>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}

      <CommonTable
        columns={columns}
        data={data?.items ?? []}
        getRowKey={(product) => product.id}
        loading={isPending}
        emptyTitle="No products found"
        emptyDescription="Create your first product to get started."
        pagination={pagination}
      />

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {formMode === "create" ? "Create Product" : "Edit Product"}
            </DialogTitle>
            <DialogDescription>
              {formMode === "create"
                ? "Enter product details to add a new product to inventory."
                : `Update details for ${selectedProduct?.name ?? "this product"}.`}
            </DialogDescription>
          </DialogHeader>

          <ProductFormPage
            mode={formMode}
            product={selectedProduct ?? undefined}
            isDialog={true}
            onSuccess={handleCloseForm}
            onCancel={handleCloseForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
