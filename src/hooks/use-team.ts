import useSWR from "swr";
import { getTeamMembers } from "@/services/teams";

export const useTeamMembers = () => {
  const { data, error } = useSWR("/classes/Team", getTeamMembers);

  return {
    teamMembers: data,
    isLoading: !error && !data,
    isError: error,
  };
};
