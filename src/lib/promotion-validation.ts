import { z } from "zod";

export const promotionSchema = z.object({
  serviceType: z.enum(["tour", "meal"]),
  code: z.string().min(2, "Promotion code must be at least 2 characters"),
  expiryDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  discount: z.coerce.number().min(1, "Discount is required"),
  discountType: z.enum(["amount", "percentage"]),
  country: z.string().min(2, "Country is required"),
  isActive: z.boolean().optional(),
});

export type PromotionFormData = z.infer<typeof promotionSchema>;