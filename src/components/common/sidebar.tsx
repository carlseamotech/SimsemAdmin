"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

import SimsemLogo from "../../../public/Simsem-Logo.svg";
import HomeIcon from "../../../public/sidebar-icons/home-icon.svg";
import ExperiencesIcon from "../../../public/sidebar-icons/experiences-icon.svg";
import PromotionsIcon from "../../../public/sidebar-icons/promotions-icon.svg";
import HostsIcon from "../../../public/sidebar-icons/hosts-icon.svg";
import TravelersIcon from "../../../public/sidebar-icons/travelers-icon.svg";
import PaymentsIcon from "../../../public/sidebar-icons/payments-icon.svg";

import { FC, SVGProps } from "react";

// ✅ Interface for each sidebar item
interface SidebarItem {
  name: string;
  href: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  badge?: string;
}

const sidebarItems: SidebarItem[] = [
  { name: "Home", icon: HomeIcon, href: "/" },
  { name: "Experiences", icon: ExperiencesIcon, href: "/experiences" },
  { name: "Promotions", icon: PromotionsIcon, href: "/promotions" },
  { name: "Hosts", icon: HostsIcon, href: "/hosts" },
  {
    name: "Travelers",
    icon: TravelersIcon,
    href: "/travelers",
    badge: "COMING SOON",
  },
  {
    name: "Payments",
    icon: PaymentsIcon,
    href: "/payments",
    badge: "COMING SOON",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#0D2E61] text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold italic">Simsom</h1>
        <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    isActive
                      ? "bg-[#FEC540] text-[#000000]"
                      : "text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <div className="flex items-center shrink-0 space-x-4">
                    <Icon
                      style={{ fill: isActive ? "#000000" : "#94a3b8" }}
                      className={`w-[24px] h-[24px] ${
                        isActive ? "text-black" : "text-slate-300"
                      }`}
                      aria-label={`${item.name} icon`}
                    />
                    <span className="text-[14px]">{item.name}</span>
                  </div>

                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-[#F28E33] text-[#0D2E61]"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Log Out */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3 p-3 text-slate-300 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">
          <span className="text-lg">🚪</span>
          <span className="font-medium">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
