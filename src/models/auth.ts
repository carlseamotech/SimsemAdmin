import { Role } from "./role";

export interface LoginResponse {
  objectId: string;
  username: string;
  sessionToken: string;
  isSocialAuth: boolean;
  createdAt: string;
  updatedAt: string;
  ACL: Record<string, { read: boolean; write: boolean }>;
}

export interface UserResponse {
  objectId: string;
  username: string;
  email: string;
  role: Role;
}
