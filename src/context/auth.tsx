"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import * as authService from "@/services/auth";
import { User } from "@/models/user";
import { useRouter } from "next/navigation";
import { LoginDTO } from "@/dtos/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (credentials: LoginDTO) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("sessionToken");
      if (token) {
        try {
          const currentUser = await authService.getCurrentUser(token);
          setUser(currentUser);
        } catch (error) {
          console.error("Failed to fetch user", error);
          localStorage.removeItem("sessionToken");
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const signIn = async (credentials: LoginDTO) => {
    const loginResponse = await authService.signIn(credentials);
    localStorage.setItem("sessionToken", loginResponse.sessionToken);
    const currentUser = await authService.getCurrentUser(
      loginResponse.sessionToken
    );
    setUser(currentUser);
  };

  const signOut = async () => {
    await authService.signOut();
    localStorage.removeItem("sessionToken");
    setUser(null);
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