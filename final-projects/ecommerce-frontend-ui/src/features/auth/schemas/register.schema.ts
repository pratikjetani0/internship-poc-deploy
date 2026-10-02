import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required").max(100),
    email: z.email("Please enter a valid email").trim(),
    password: z.string().trim().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
