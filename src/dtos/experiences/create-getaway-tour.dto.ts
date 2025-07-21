import { z } from "zod";
import { proposedTourSchema } from "./proposed-tour.dto";

export const createGetawayTourSchema = proposedTourSchema.extend({
  type: z.literal("getaway"),
  pickupPoints: z.array(z.object({
    key: z.string(),
    value: z.object({
      pickupPointTitle: z.string(),
      pickupPoint: z.string(),
      pickupPointLat: z.number(),
      pickupPointLong: z.number(),
      cameraZoom: z.number(),
    }),
  })),
});

export type CreateGetawayTourDTO = z.infer<typeof createGetawayTourSchema>;
