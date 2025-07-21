import { z } from "zod";

export const itinerarySchema = z.object({
  day: z.string(),
  title: z.string(),
  description: z.string(),
});

export type Itinerary = z.infer<typeof itinerarySchema>;
