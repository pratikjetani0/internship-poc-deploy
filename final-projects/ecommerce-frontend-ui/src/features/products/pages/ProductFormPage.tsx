import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/app/router/routes";
import {
  useCreateProduct,
  useUpdateProduct,
} from "../api/product.mutations";
import { useProduct } from "../api/product.queries";
import ProductForm from "../components/ProductForm";
import type { Product } from "../types/product.types";
import type { ProductFormValues } from "../schemas/product.schema";

export type ProductFormPageProps = {
  mode?: "create" | "edit" | undefined;
  productId?: string | undefined;
  product?: Product | undefined;
  onSuccess?: (() => void) | undefined;
  onCancel?: (() => void) | undefined;
  isDialog?: boolean | undefined;
};

export default function ProductFormPage({
  mode: propMode,
  productId: propProductId,
  product: propProduct,
  onSuccess,
  onCancel,
  isDialog = false,
}: ProductFormPageProps) {
  const navigate = useNavigate();
  const routeParams = useParams<{ id: string }>();

  const targetId = propProductId ?? propProduct?.id ?? routeParams.id;
  const mode: "create" | "edit" =
    propMode ?? (targetId ? "edit" : "create");

  const { data: fetchedProduct, isPending: isFetchingProduct } = useProduct(
    mode === "edit" && !propProduct ? targetId : undefined,
  );

  const productData = propProduct ?? fetchedProduct;

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = (values: ProductFormValues) => {
    if (mode === "create") {
      createMutation.mutate(values, {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          } else {
            navigate(ROUTES.PRODUCTS);
          }
        },
      });
    } else if (targetId) {
      updateMutation.mutate(
        {
          id: targetId,
          payload: values,
        },
        {
          onSuccess: () => {
            if (onSuccess) {
              onSuccess();
            } else {
              navigate(ROUTES.PRODUCTS);
            }
          },
        },
      );
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(-1);
    }
  };

  if (mode === "edit" && isFetchingProduct && !productData) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const content = (
    <ProductForm
      mode={mode}
      loading={isSaving}
      defaultValues={
        productData
          ? {
            name: productData.name,
            description: productData.description,
            category: productData.category,
            price: productData.price,
            stock: productData.stock,
            images: productData.images?.length
              ? productData.images
              : [""],
            specifications: productData.specifications ?? {},
            isActive: productData.isActive ?? true,
          }
          : undefined
      }
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );

  if (isDialog) {
    return content;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCancel}
          aria-label="Go back"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {mode === "create" ? "Create Product" : "Edit Product"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "create"
              ? "Add a new product to your store inventory."
              : `Update details for ${productData?.name ?? "this product"}.`}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>
            Fill out the required information and inventory specifications below.
          </CardDescription>
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    </div>
  );
}
