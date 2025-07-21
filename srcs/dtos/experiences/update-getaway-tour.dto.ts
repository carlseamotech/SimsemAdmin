import { z } from "zod";

export const updateGetawayTourSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  images: z.array(z.string()).optional(),
  price: z.number().optional(),
  inclusions: z.array(z.string()).optional(),
  exclusions: z.array(z.string()).optional(),
  isPrivate: z.boolean().optional(),
});

export type UpdateGetawayTourDTO = z.infer<typeof updateGetawayTourSchema>;
