import { z } from "zod";

export const createPromoCodeSchema = z.object({
  code: z.string(),
  discount: z.number(),
  discountType: z.enum(["amount", "percentage"]),
  expiryDate: z.object({
    __type: z.literal("Date"),
    iso: z.string(),
  }),
  country: z.string(),
  serviceType: z.enum(["tour", "meal"]),
  isActive: z.boolean(),
});

export type CreatePromoCodeDTO = z.infer<typeof createPromoCodeSchema>;