import type React from "react";
import type { Metadata } from "next";
import { AuthProvider } from "@/context/auth";
import { AuthGuard } from "@/components/common/auth-guard";
import { Suspense } from "react";
import Sidebar from "@/components/common/sidebar";

export const metadata: Metadata = {
  title: "Simsem Dashboard",
  description: "Host management dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <AuthProvider>
        <AuthGuard>
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </AuthGuard>
      </AuthProvider>
    </Suspense>
  );
}
