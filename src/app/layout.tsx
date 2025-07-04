import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import {AuthProvider} from "@/context/auth";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={null}>
          <AuthProvider>
           {children}
          </AuthProvider>
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
