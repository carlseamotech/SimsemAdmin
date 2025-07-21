import { z } from "zod";
import { createLibraryMealSchema } from "./create-library-meal.dto";

export const updateLibraryMealSchema = createLibraryMealSchema.partial();

export type UpdateLibraryMealDTO = z.infer<typeof updateLibraryMealSchema>;
