import { z } from "zod";
import { createGetawayTourSchema } from "./create-getaway-tour.dto";

export const updateGetawayTourSchema = createGetawayTourSchema.partial();

export type UpdateGetawayTourDTO = z.infer<typeof updateGetawayTourSchema>;