import { Role } from "./role";

export interface TeamMember {
  objectId: string;
  email: string;
  role: Role;
  status: "pending" | "active";
}
