import { z } from "zod";

export const updateHostInfoSchema = z.object({
  city: z.string().optional(),
  bio: z.string().optional(),
  languages: z.array(z.string()).optional(),
});

export type UpdateHostInfoDTO = z.infer<typeof updateHostInfoSchema>;
