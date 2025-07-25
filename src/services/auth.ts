import apiClient from "@/services/api";
import { LoginDTO } from "@/dtos/auth";
import { LoginResponse, UserResponse } from "@/models/auth";
import { User } from "@/models/user";
import logger from "@/lib/logger";

export const signIn = async (credentials: LoginDTO): Promise<LoginResponse> => {
  logger.debug("Attempting to sign in", credentials);
  try {
    const response = await apiClient.post<LoginResponse>(
      "/parse/login",
      credentials
    );
    logger.info("Successfully signed in", response);
    return response;
  } catch (error) {
    logger.error("Failed to sign in", error);
    throw error;
  }
};

export const getCurrentUser = async (
  sessionToken: string
): Promise<User> => {
  logger.debug("Attempting to get current user");
  try {
    const userResponse = await apiClient.get<UserResponse>("/parse/users/me", {
      headers: { "X-Parse-Session-Token": sessionToken },
    });
    const user = {
      uid: userResponse.objectId,
      displayName: userResponse.username,
      email: userResponse.email,
      photoURL: null,
      role: userResponse.role,
    };
    logger.info("Successfully got current user", user);
    return user;
  } catch (error) {
    logger.error("Failed to get current user", error);
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  logger.debug("Attempting to sign out");
  // The Postman collection does not specify a logout endpoint.
  // When one is available, it should be called here.
  logger.info("Successfully signed out");
  return Promise.resolve();
};