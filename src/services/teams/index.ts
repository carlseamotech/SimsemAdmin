import api from "@/services/api";
import { TeamMember } from "@/models/team";
import { Role } from "@/models/role";

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const response = await api.get<{ results: TeamMember[] }>("/classes/Team");
  return response.results;
};

export const inviteTeamMember = async (email: string, role: Role): Promise<void> => {
  await api.post("/functions/inviteTeamMember", { email, role });
};

export const acceptInvite = async (
  token: string,
  password: string
): Promise<void> => {
  await api.post("/functions/acceptInvite", { token, password });
};
