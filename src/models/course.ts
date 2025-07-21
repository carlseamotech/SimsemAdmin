import { z } from "zod";

export const courseSchema = z.object({
  name: z.string(),
  dishes: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    ingredients: z.string(),
    imageUrl: z.string(),
    course: z.string(),
    type: z.string(),
    isSpecial: z.boolean(),
    isChecked: z.boolean(),
  })),
});

export type Course = z.infer<typeof courseSchema>;
