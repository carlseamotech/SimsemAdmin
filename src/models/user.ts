import { User as FirebaseUser } from "firebase/auth";
import { TeamMember } from "./team";

export interface User extends FirebaseUser, Omit<TeamMember, "objectId" | "email" | "status"> {}
