import { z } from "zod";

export const updateProfileSchema = z.object({
  displayName: z.string().optional(),
  photoURL: z.string().optional(),
});

export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;