import { z } from "zod";

export const pickupPointSchema = z.object({
  key: z.string(),
  value: z.object({
    pickupPointTitle: z.string(),
    pickupPoint: z.string(),
    pickupPointLat: z.number(),
    pickupPointLong: z.number(),
    cameraZoom: z.number(),
  }),
});

export type PickupPoint = z.infer<typeof pickupPointSchema>;
