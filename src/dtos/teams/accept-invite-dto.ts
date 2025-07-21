import { z } from "zod";

export const acceptInviteSchema = z.object({
  token: z.string(),
  password: z.string().optional(),
});

export type AcceptInviteDTO = z.infer<typeof acceptInviteSchema>;