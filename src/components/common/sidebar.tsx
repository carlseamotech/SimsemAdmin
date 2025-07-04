"use client";

import { SidebarContent } from "./sidebar-content";

const Sidebar = () => {
  return (
    <div className="hidden lg:flex w-64 bg-[#0D2E61] text-white  flex-col">
      <SidebarContent />
    </div>
  );
};

export default Sidebar;
