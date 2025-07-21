import { z } from "zod";

export const createLibraryMealSchema = z.object({
  name: z.string(),
  description: z.string(),
  country: z.string(),
  coverImage: z.object({
    __type: z.literal("File"),
    name: z.string(),
    url: z.string(),
  }),
  dishIds: z.array(z.string()),
  cost: z.string(),
});

export type CreateLibraryMealDTO = z.infer<typeof createLibraryMealSchema>;
