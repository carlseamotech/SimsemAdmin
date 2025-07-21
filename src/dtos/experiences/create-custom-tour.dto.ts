import { z } from "zod";
import { proposedTourSchema } from "./proposed-tour.dto";

export const createCustomTourSchema = proposedTourSchema.extend({
  type: z.literal("custom"),
});

export type CreateCustomTourDTO = z.infer<typeof createCustomTourSchema>;
