import { z } from "zod";
import { createDiningExperienceSchema } from "./create-dining-experience.dto";

export const updateDiningExperienceSchema = createDiningExperienceSchema.partial();

export type UpdateDiningExperienceDTO = z.infer<typeof updateDiningExperienceSchema>;