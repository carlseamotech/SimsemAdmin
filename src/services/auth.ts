import { User, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const signIn = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const signOut = async (): Promise<void> => {
  return await auth.signOut();
};

