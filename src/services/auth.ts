import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "@/models/user";
import { TeamMember } from "@/models/team";

export const signIn = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const firebaseUser = userCredential.user;

  const teamMemberRef = doc(db, "team", firebaseUser.uid);
  const teamMemberSnap = await getDoc(teamMemberRef);

  if (teamMemberSnap.exists()) {
    const teamMember = teamMemberSnap.data() as TeamMember;
    return { ...firebaseUser, ...teamMember };
  }

  return firebaseUser as User;
};

export const signOut = async (): Promise<void> => {
  return await auth.signOut();
};

