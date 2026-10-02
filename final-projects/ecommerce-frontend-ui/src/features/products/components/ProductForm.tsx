import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Loader2, Image as ImageIcon } from "lucide-react";

import {
  productSchema,
  type ProductFormInput,
  type ProductFormValues,
} from "../schemas/product.schema";
import { PRODUCT_CATEGORIES } from "../constants/product-categories";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ProductFormProps = {
  mode: "create" | "edit";
  loading?: boolean | undefined;
  defaultValues?: Partial<ProductFormValues> | undefined;
  onSubmit: (values: ProductFormValues) => void;
  onCancel?: (() => void) | undefined;
};

type SpecEntry = {
  key: string;
  value: string;
};

const getInitialSpecEntries = (defaultValues?: Partial<ProductFormValues>): SpecEntry[] => {
  if (defaultValues?.specifications) {
    return Object.entries(defaultValues.specifications).map(
      ([key, value]) => ({
        key,
        value: String(value ?? ""),
      }),
    );
  }
  return [];
};

export default function ProductForm({
  mode,
  loading = false,
  defaultValues,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [specEntries, setSpecEntries] = useState<SpecEntry[]>(() =>
    getInitialSpecEntries(defaultValues)
  );

  const categoryOptions = useMemo(() => {
    const current = defaultValues?.category;
    if (current && !PRODUCT_CATEGORIES.some((c) => c.id === current)) {
      return [{ id: current, label: current }, ...PRODUCT_CATEGORIES];
    }
    return PRODUCT_CATEGORIES;
  }, [defaultValues?.category]);

  const form = useForm<ProductFormInput, undefined, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
      stock: 0,
      images: [""],
      specifications: {},
      isActive: true,
      ...defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    // @ts-expect-error - images is an array of strings in ProductFormValues
    name: "images",
  });

  const handleAppendImage = () => append("");
  const handleRemoveImage = (index: number) => () => remove(index);

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        name: defaultValues.name ?? "",
        description: defaultValues.description ?? "",
        category: defaultValues.category ?? "",
        price: defaultValues.price ?? 0,
        stock: defaultValues.stock ?? 0,
        images: defaultValues.images?.length ? defaultValues.images : [""],
        specifications: defaultValues.specifications ?? {},
        isActive: defaultValues.isActive ?? true,
      });

      if (defaultValues.specifications) {
        setSpecEntries(
          Object.entries(defaultValues.specifications).map(([key, value]) => ({
            key,
            value: String(value ?? ""),
          })),
        );
      }
    }
  }, [defaultValues, form]);

  const addSpecEntry = () => {
    setSpecEntries((prev) => [...prev, { key: "", value: "" }]);
  };

  const updateSpecEntry = (
    index: number,
    field: "key" | "value",
    val: string,
  ) => {
    setSpecEntries((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, [field]: val } : item,
      ),
    );
  };

  const removeSpecEntry = (index: number) => () => {
    setSpecEntries((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleFormSubmit = (values: ProductFormValues) => {
    const specsRecord: Record<string, unknown> = {};
    specEntries.forEach((entry) => {
      const trimmedKey = entry.key.trim();
      if (trimmedKey) {
        specsRecord[trimmedKey] = entry.value.trim();
      }
    });

    onSubmit({
      ...values,
      specifications: specsRecord,
    });
  };

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Product Name */}
        <Field invalid={!!form.formState.errors.name} className="md:col-span-2">
          <FieldLabel htmlFor="name">Product Name *</FieldLabel>
          <FieldContent>
            <Input
              id="name"
              placeholder="e.g. Apple iPhone 15 Pro"
              disabled={loading}
              {...form.register("name")}
            />
            <FieldError errors={[form.formState.errors.name]} />
          </FieldContent>
        </Field>

        {/* Category */}
        <Field invalid={!!form.formState.errors.category}>
          <FieldLabel htmlFor="category">Category *</FieldLabel>
          <FieldContent>
            <Select
              value={form.watch("category")}
              onValueChange={(value) =>
                form.setValue("category", value, { shouldValidate: true })
              }
              disabled={loading}
            >
              <SelectTrigger
                id="category"
                aria-invalid={!!form.formState.errors.category}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError errors={[form.formState.errors.category]} />
          </FieldContent>
        </Field>

        {/* Status */}
        <Field>
          <FieldLabel>Status</FieldLabel>
          <FieldContent>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.watch("isActive") ?? true}
                onCheckedChange={(checked) =>
                  form.setValue("isActive", checked)
                }
              />
              <span className="text-sm">
                {form.watch("isActive") ? "Active" : "Inactive"}
              </span>
            </div>
          </FieldContent>
        </Field>

        {/* Price */}
        <Field invalid={!!form.formState.errors.price}>
          <FieldLabel htmlFor="price">Price (₹) *</FieldLabel>
          <FieldContent>
            <Input
              id="price"
              type="number"
              step="any"
              min="0"
              placeholder="0.00"
              disabled={loading}
              {...form.register("price", {
                setValueAs: (v) => (v === "" ? 0 : Number(v)),
              })}
            />
            <FieldError errors={[form.formState.errors.price]} />
          </FieldContent>
        </Field>

        {/* Stock */}
        <Field invalid={!!form.formState.errors.stock}>
          <FieldLabel htmlFor="stock">Stock Quantity *</FieldLabel>
          <FieldContent>
            <Input
              id="stock"
              type="number"
              step="1"
              min="0"
              placeholder="0"
              disabled={loading}
              {...form.register("stock", {
                setValueAs: (v) => (v === "" ? 0 : Number(v)),
              })}
            />
            <FieldError errors={[form.formState.errors.stock]} />
          </FieldContent>
        </Field>
      </div>

      {/* Description */}
      <Field invalid={!!form.formState.errors.description}>
        <FieldLabel htmlFor="description">Description *</FieldLabel>
        <FieldContent>
          <Textarea
            id="description"
            rows={5}
            placeholder="Provide a detailed description of the product..."
            disabled={loading}
            {...form.register("description")}
          />
          <FieldError errors={[form.formState.errors.description]} />
        </FieldContent>
      </Field>

      {/* Images */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <FieldLabel className="mb-0">Product Images (URLs) *</FieldLabel>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAppendImage}
            disabled={loading}
          >
            <Plus className="mr-1.5 size-3.5" />
            Add Image URL
          </Button>
        </div>

        <div className="space-y-2">
          {fields.map((fieldItem, index) => {
            const currentUrl = form.watch(`images.${index}`);
            const isImage =
              currentUrl.startsWith("http") ||
              currentUrl.startsWith("https") ||
              currentUrl.startsWith("data:image");
            return (
              <div key={fieldItem.id} className="flex items-start gap-2">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border bg-muted/30 overflow-hidden">
                  {isImage ? (
                    <img
                      src={currentUrl}
                      alt="Preview"
                      className="size-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="size-4 text-muted-foreground" />
                  )}
                </div>

                <div className="flex-1">
                  <Input
                    placeholder="https://example.com/image.jpg"
                    disabled={loading}
                    {...form.register(`images.${index}`)}
                  />
                  {form.formState.errors.images?.[index] && (
                    <p className="mt-1 text-xs text-destructive">
                      {form.formState.errors.images[index]?.message}
                    </p>
                  )}
                </div>

                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveImage(index)}
                    disabled={loading}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
        {form.formState.errors.images &&
          !Array.isArray(form.formState.errors.images) && (
            <p className="text-xs text-destructive">
              {form.formState.errors.images.message}
            </p>
          )}
      </div>

      {/* Specifications */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <FieldLabel className="mb-0">Specifications</FieldLabel>
            <p className="text-xs text-muted-foreground">
              Add custom key-value attributes (e.g., Brand, Warranty, Color)
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSpecEntry}
            disabled={loading}
          >
            <Plus className="mr-1.5 size-3.5" />
            Add Specification
          </Button>
        </div>

        {specEntries.length === 0 ? (
          <div className="rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">
            No specifications added yet. Click "Add Specification" to add
            details.
          </div>
        ) : (
          <div className="space-y-2">
            {specEntries.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  placeholder="Attribute name (e.g. Brand)"
                  value={entry.key}
                  onChange={(e) => updateSpecEntry(idx, "key", e.target.value)}
                  disabled={loading}
                />
                <Input
                  placeholder="Value (e.g. Apple)"
                  value={entry.value}
                  onChange={(e) =>
                    updateSpecEntry(idx, "value", e.target.value)
                  }
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={removeSpecEntry(idx)}
                  disabled={loading}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {mode === "create" ? "Create Product" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
