import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, writeBatch, doc } from "firebase/firestore";
import { TeamMember } from "@/models/team";
import { Role } from "@/models/role";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const teamCollection = collection(db, "team");
  const teamSnapshot = await getDocs(teamCollection);
  return teamSnapshot.docs.map(doc => ({ objectId: doc.id, ...doc.data() } as TeamMember));
};

export const inviteTeamMember = async (email: string, role: Role): Promise<void> => {
  await fetch("/api/teams/invite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, role }),
  });
};

export const acceptInvite = async (
  token: string,
  password: string
): Promise<void> => {
  const invitationsCollection = collection(db, "invitations");
  const q = query(invitationsCollection, where("token", "==", token));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("Invalid invite token.");
  }

  const invitationDoc = querySnapshot.docs[0];
  const invitation = invitationDoc.data();

  const userCredential = await createUserWithEmailAndPassword(auth, invitation.email, password);
  const user = userCredential.user;

  const batch = writeBatch(db);

  const teamMemberRef = doc(db, "team", user.uid);
  batch.set(teamMemberRef, {
    email: user.email,
    role: invitation.role,
    status: "active",
  });

  batch.delete(invitationDoc.ref);

  await batch.commit();
};
