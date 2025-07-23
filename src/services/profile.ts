import apiClient from "@/services/api";
import { UpdateProfileDTO } from "@/dtos/profile";
import { User } from "@/models/user";

export const updateProfile = async (
  userId: string,
  data: UpdateProfileDTO,
  sessionToken: string
): Promise<User> => {
  return apiClient.put<User>(`/parse/users/${userId}`, data, {
    headers: { "X-Parse-Session-Token": sessionToken },
  });
};
