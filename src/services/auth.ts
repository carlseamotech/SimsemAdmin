import apiClient from "@/services/api";
import { LoginDTO } from "@/dtos/auth";
import { LoginResponse, UserResponse } from "@/models/auth";
import { User } from "@/models/user";

export const signIn = async (credentials: LoginDTO): Promise<LoginResponse> => {
  return apiClient.post<LoginResponse>("/parse/login", credentials);
};

export const getCurrentUser = async (
  sessionToken: string
): Promise<User> => {
  const userResponse = await apiClient.get<UserResponse>("/parse/users/me", {
    headers: { "X-Parse-Session-Token": sessionToken },
  });

  return {
    uid: userResponse.objectId,
    displayName: userResponse.username,
    email: userResponse.email,
    photoURL: null,
    role: userResponse.role,
  };
};

export const signOut = async (): Promise<void> => {
  // The Postman collection does not specify a logout endpoint.
  // When one is available, it should be called here.
  return Promise.resolve();
};