import { z } from "zod";
import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
} from "@/lib/api/types/endpoints";

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  brand: z.string().min(2, "Brand must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  stock: z.coerce.number().min(0, "Stock must be at least 0"),
  featured: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  discountPercentage: z.coerce.number().min(0).max(100).optional(),
  discountedPrice: z.coerce.number().min(0).optional(),
  videos: z.any().optional(),
  specifications: z.record(z.string(), z.any()).optional(),
  categoryID: z.string().min(1, "Category is required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export interface AdminProductFormProps {
  initialData?: Product | null;
  onSubmit: (data: FormData) => Promise<void>;
  isLoading: boolean;
  onCancel: () => void;
}
