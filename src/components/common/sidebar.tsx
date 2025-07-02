"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const sidebarItems = [
  { name: "Home", icon: "🏠", href: "/", active: false },
  { name: "Experiences", icon: "✨", href: "/experiences", active: false },
  { name: "Promotions", icon: "🎯", href: "/promotions", active: false },
  { name: "Hosts", icon: "👥", href: "/hosts", active: false },
  {
    name: "Travelers",
    icon: "🧳",
    href: "/travelers",
    active: false,
    badge: "COMING SOON",
  },
  {
    name: "Payments",
    icon: "💳",
    href: "/payments",
    active: false,
    badge: "COMING SOON",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-slate-800 text-white flex flex-col">
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
            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-orange-500 text-white"
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
}
