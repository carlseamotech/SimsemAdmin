import type React from "react";
import Sidebar from "@/components/common/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen bg-[#F8F8F8]">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-0">
          <main className="flex-1 overflow-y-auto ">{children}</main>
        </div>
      </div>
    </>
  );
}
