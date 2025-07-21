import { z } from "zod";
import { createOfferedTourSchema } from "./create-offered-tour.dto";

export const updateOfferedTourSchema = createOfferedTourSchema.partial();

export type UpdateOfferedTourDTO = z.infer<typeof updateOfferedTourSchema>;