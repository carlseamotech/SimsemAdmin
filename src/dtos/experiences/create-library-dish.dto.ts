import { z } from "zod";

export const createLibraryDishSchema = z.object({
  name: z.string(),
  ingredients: z.string(),
  country: z.string(),
  image: z.object({
    __type: z.literal("File"),
    name: z.string(),
    url: z.string(),
  }),
  type: z.string(),
  course: z.string(),
});

export type CreateLibraryDishDTO = z.infer<typeof createLibraryDishSchema>;
