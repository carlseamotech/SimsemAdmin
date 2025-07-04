import { usePathname } from "next/navigation";
import Link from "next/link";
import SimsemLogo from "../../../public/Simsem-Logo.svg";
import HomeIcon from "../../../public/sidebar-icons/home-icon.svg";
import ExperiencesIcon from "../../../public/sidebar-icons/experiences-icon.svg";
import PromotionsIcon from "../../../public/sidebar-icons/promotions-icon.svg";
import HostsIcon from "../../../public/sidebar-icons/hosts-icon.svg";
import TravelersIcon from "../../../public/sidebar-icons/travelers-icon.svg";
import LogoutIcon from "../../../public/sidebar-icons/logout-icon.svg";
import PaymentsIcon from "../../../public/sidebar-icons/payments-icon.svg";
import TeamsIcon from "../../../public/sidebar-icons/teams-icon.svg";
import SettingsIcon from "../../../public/sidebar-icons/settings-icon.svg";
import Image, { StaticImageData } from "next/image";
import { useAuth } from "@/context/auth";
import { Role } from "@/models/role";

// ✅ Interface for each sidebar item
interface SidebarItem {
  name: string;
  href: string;
  icon: StaticImageData;
  badge?: string;
  role?: Role;
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
  { name: "Teams", icon: TeamsIcon, href: "/teams", role: Role.Admin },
  { name: "Settings", icon: SettingsIcon, href: "/settings", role: Role.SuperAdmin },
];

export function SidebarContent() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const filteredSidebarItems = sidebarItems.filter(item => {
    if (!item.role) return true;
    if (!user) return false;
    if (user.role === Role.SuperAdmin) return true;
    return user.role === item.role;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-center space-x-3 h-36">
        <Image src={SimsemLogo} alt="Simsem Logo" width={120} height={50} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 pr-6">
        <ul className="space-y-2">
          {filteredSidebarItems.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between py-4 px-6  rounded-r-xl  cursor-pointer transition-colors ${
                    isActive
                      ? "bg-[#FEC540] text-[#000000] "
                      : "text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <div className="flex ">
                    <div className="flex items-center shrink-0 space-x-4">
                      <Image
                        src={item.icon}
                        alt={`${item.name} icon`}
                        width={24}
                        height={28}
                        className={`transition-all  ${
                          isActive ? "invert-0 brightness-0" : ""
                        }`}
                      />

                      <span className="text-[14px]">{item.name}</span>
                    </div>

                    <div className="-mt-2 mx-1.5">
                      {item.badge && (
                        <div className="flex items-center justify-center text-[6px] px-1.5 font-bold  w-full h-[17px] rounded-r-full  rounded-tl-full  bg-[#F28E33] text-[#0D2E61]">
                          {item.badge}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Log Out */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={signOut}
          className="w-full flex items-center space-x-3 p-3 text-slate-300 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
        >
          <span className="text-lg">
            <Image src={LogoutIcon} alt="logout" width={24} height={24} />
          </span>
          <span className="font-medium text-[14px]">Log Out</span>
        </button>
      </div>
    </div>
  );
}
