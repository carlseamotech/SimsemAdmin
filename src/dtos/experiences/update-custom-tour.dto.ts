import { z } from "zod";
import { proposedTourSchema } from "./proposed-tour.dto";

export const updateCustomTourSchema = proposedTourSchema.partial();

export type UpdateCustomTourDTO = z.infer<typeof updateCustomTourSchema>;