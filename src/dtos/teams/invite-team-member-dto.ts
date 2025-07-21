import { z } from "zod";
import { Role } from "@/models/role";

export const inviteTeamMemberSchema = z.object({
  email: z.string().email(),
  role: z.nativeEnum(Role),
});

export type InviteTeamMemberDTO = z.infer<typeof inviteTeamMemberSchema>;