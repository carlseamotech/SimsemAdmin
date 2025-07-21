import { z } from "zod";
import { createLibraryTourSchema } from "./create-library-tour.dto";

export const updateLibraryTourSchema = createLibraryTourSchema.partial();

export type UpdateLibraryTourDTO = z.infer<typeof updateLibraryTourSchema>;
