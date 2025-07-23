import { z } from "zod";
import { proposedTourSchema } from "./proposed-tour.dto";

export const createGetawayTourSchema = proposedTourSchema.extend({
  type: z.literal("getaway"),
});

export type CreateGetawayTourDTO = z.infer<typeof createGetawayTourSchema>;