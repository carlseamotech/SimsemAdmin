import { z } from "zod";

export const promotionSchema = z.object({
  promotionName: z.string().min(2, "Promotion name must be at least 2 characters"),
  promotionDetails: z.string().min(10, "Promotion details must be at least 10 characters"),
  for: z.string(),
  promotionCode: z.string().min(2, "Promotion code must be at least 2 characters"),
  quantity: z.string(),
  expirationDate: z.string(),
  discount: z.string(),
  country: z.string().min(2, "Country is required"),
});

export type PromotionFormData = z.infer<typeof promotionSchema>;
