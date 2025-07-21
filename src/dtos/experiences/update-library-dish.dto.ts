import { z } from "zod";
import { createLibraryDishSchema } from "./create-library-dish.dto";

export const updateLibraryDishSchema = createLibraryDishSchema.partial();

export type UpdateLibraryDishDTO = z.infer<typeof updateLibraryDishSchema>;
