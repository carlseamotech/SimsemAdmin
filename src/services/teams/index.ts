import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, writeBatch, doc } from "firebase/firestore";
import { TeamMember } from "@/models/team";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AcceptInviteDTO, InviteTeamMemberDTO } from "@/dtos";

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const teamCollection = collection(db, "team");
  const teamSnapshot = await getDocs(teamCollection);
  return teamSnapshot.docs.map(doc => ({ objectId: doc.id, ...doc.data() } as TeamMember));
};

export const inviteTeamMember = async (data: InviteTeamMemberDTO): Promise<void> => {
  await fetch("/api/teams/invite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const acceptInvite = async (
  data: AcceptInviteDTO
): Promise<void> => {
  const invitationsCollection = collection(db, "invitations");
  const q = query(invitationsCollection, where("token", "==", data.token));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("Invalid invite token.");
  }

  const invitationDoc = querySnapshot.docs[0];
  const invitation = invitationDoc.data();

  if (!data.password) {
    throw new Error("Password is required.");
  }

  const userCredential = await createUserWithEmailAndPassword(auth, invitation.email, data.password);
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

