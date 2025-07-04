"use client";

import type React from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) {
      return; // Do nothing while loading.
    }

    // If loading is finished and there's no user, redirect to login.
    if (!user && pathname !== "/auth") {
      router.push("/auth");
    }

    // If loading is finished and there IS a user, but they are on the login page, redirect to home.
    if (user && pathname === "/auth") {
      router.push("/");
    }
  }, [isLoading, user, pathname, router]);

  // While loading, or if a redirect is imminent, show a loader.
  // This prevents the children from rendering and causing a hydration mismatch.
  if (isLoading || (!user && pathname !== "/auth") || (user && pathname === "/auth")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If we've passed all checks, the user is authenticated and on the correct page.
  return <>{children}</>;
}

