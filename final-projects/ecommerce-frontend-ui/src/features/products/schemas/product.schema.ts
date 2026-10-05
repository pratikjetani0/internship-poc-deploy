import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name is required")
    .max(255, "Product name cannot exceed 255 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),
  category: z.string().trim().min(1, "Category is required"),
  price: z
    .number({
      error: "Price is required",
    })
    .min(0, "Price cannot be negative"),
  stock: z
    .number({
      error: "Stock is required",
    })
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),
  images: z
    .array(z.string().refine((val) => val.startsWith("http://") || val.startsWith("https://") || val.startsWith("data:image/"), "Invalid image URL"))
    .min(1, "At least one image is required"),
  specifications: z.record(z.string(), z.unknown()).default({}),
  isActive: z.boolean().default(true),
});

export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;
