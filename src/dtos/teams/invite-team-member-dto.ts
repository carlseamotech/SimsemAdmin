import { Role } from '@/models/role';

export interface InviteTeamMemberDTO {
  email: string;
  role: Role;
}
