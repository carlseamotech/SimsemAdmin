import { z } from "zod";

export const thingsToKnowSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type ThingsToKnow = z.infer<typeof thingsToKnowSchema>;
