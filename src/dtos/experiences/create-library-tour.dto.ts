import { z } from "zod";

export const createLibraryTourSchema = z.object({
  name: z.string(),
  description: z.string(),
  country: z.string(),
  coverImage: z.object({
    __type: z.literal("File"),
    name: z.string(),
    url: z.string(),
  }),
  requirements: z.array(z.string()),
  cost: z.number(),
  minDuration: z.number(),
  maxDuration: z.number(),
  timeUnit: z.string(),
  feature: z.string(),
});

export type CreateLibraryTourDTO = z.infer<typeof createLibraryTourSchema>;
