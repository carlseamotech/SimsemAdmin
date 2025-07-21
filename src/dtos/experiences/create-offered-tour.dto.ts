import { z } from "zod";
import { proposedTourSchema } from "./proposed-tour.dto";

export const createOfferedTourSchema = proposedTourSchema.extend({
  type: z.literal("offered"),
  offeredTourId: z.string(),
  maxGuest: z.string(),
});

export type CreateOfferedTourDTO = z.infer<typeof createOfferedTourSchema>;