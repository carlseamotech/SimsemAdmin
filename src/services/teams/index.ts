import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, writeBatch, doc } from "firebase/firestore";
import { TeamMember } from "@/models/team";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AcceptInviteDTO, InviteTeamMemberDTO } from "@/dtos";
import logger from "@/lib/logger";

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  logger.debug("Attempting to get team members");
  try {
    const teamCollection = collection(db, "team");
    const teamSnapshot = await getDocs(teamCollection);
    const teamMembers = teamSnapshot.docs.map(doc => ({ objectId: doc.id, ...doc.data() } as TeamMember));
    logger.info("Successfully got team members", teamMembers);
    return teamMembers;
  } catch (error) {
    logger.error("Failed to get team members", error);
    throw error;
  }
};

export const inviteTeamMember = async (data: InviteTeamMemberDTO): Promise<void> => {
  logger.debug("Attempting to invite team member", data);
  try {
    await fetch("/api/teams/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    logger.info("Successfully invited team member", data);
  } catch (error) {
    logger.error("Failed to invite team member", error);
    throw error;
  }
};

export const acceptInvite = async (
  data: AcceptInviteDTO
): Promise<void> => {
  logger.debug("Attempting to accept invite", data);
  try {
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
    logger.info("Successfully accepted invite", data);
  } catch (error) {
    logger.error("Failed to accept invite", error);
    throw error;
  }
};

