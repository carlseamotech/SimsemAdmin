"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import * as authService from "@/services/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "@/models/user";
import { TeamMember } from "@/models/team";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthService {
  onAuthStateChanged: (callback: (user: FirebaseUser | null) => void) => () => void;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
}

const defaultAuthService: AuthService = {
  onAuthStateChanged: (callback) => onAuthStateChanged(auth, callback),
  signIn: authService.signIn,
  signOut: authService.signOut,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  authService: providedAuthService,
}: {
  children: ReactNode;
  authService?: Partial<AuthService>;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const authServiceInstance = useMemo(
    () => ({ ...defaultAuthService, ...providedAuthService }),
    [providedAuthService]
  );

  useEffect(() => {
    const unsubscribe = authServiceInstance.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const teamMemberRef = doc(db, "team", firebaseUser.uid);
        const teamMemberSnap = await getDoc(teamMemberRef);

        if (teamMemberSnap.exists()) {
          const teamMember = teamMemberSnap.data() as TeamMember;
          setUser({ ...firebaseUser, ...teamMember });
        } else {
          setUser(firebaseUser as User);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [authServiceInstance]);

  const signIn = async (email: string, password: string) => {
    await authServiceInstance.signIn(email, password);
  };

  const signOut = async () => {
    await authServiceInstance.signOut();
    router.push("/auth");
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
