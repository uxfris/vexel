import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["BUYER", "SELLER"]).default("BUYER"),
});

export const pluginSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  shortDesc: z
    .string()
    .max(160, "Short description must be under 160 characters")
    .optional(),
  price: z.coerce.number().min(0, "Price must be positive"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  aeVersions: z.array(z.string()).min(1, "At least one AE version is required"),
  osCompatibility: z.array(z.string()).min(1, "At least one OS is required"),
  version: z.string().default("1.0.0"),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().max(1000).optional(),
});
