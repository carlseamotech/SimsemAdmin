import { z } from "zod";
import { createPromoCodeSchema } from "./create-promo-code.dto";

export const updatePromoCodeSchema = createPromoCodeSchema.partial().extend({
  quantity: z.number().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
});

export type UpdatePromoCodeDTO = z.infer<typeof updatePromoCodeSchema>;