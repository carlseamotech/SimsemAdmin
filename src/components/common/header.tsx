"use client";
import { FaChevronDown } from "react-icons/fa";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import NotificationIcon from "../../../public/common/notification-icon.svg";
import ProfileImage from "../../../public/common/profile-image.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const Header = ({ title, showBackButton = false, onBack }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  return (
    <header className="hidden lg:block px-6 py-12 bg-[#F8F8F8]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="mr-4 bg-[#F2EDED] rounded-full cursor-pointer"
            >
              <FaChevronLeft className="w-4 h-4" />
            </Button>
          ) : title ? (
            <h1 className="text-[32px] text-[#0D2E61]">{title}</h1>
          ) : null}
        </div>

        {/* Right Side: Search + Notification + Profile */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Global Search"
              className="pl-10 w-80 border-gray-300 text-[14px]"
            />
          </div>

          {/* Notifications */}
          <Button
            variant="default"
            size="icon"
            className="relative bg-[#0D2E61] rounded-full h-[50px] w-[50px]"
          >
            <Image
              src={NotificationIcon}
              alt="Notification Icon"
              className="w-[24px] h-[24px]"
            />
            <div className="absolute -top-[0.5px] -right-[1px] w-3 h-3 bg-[#EC502C] rounded-full"></div>
          </Button>

          {/* Profile */}
          <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center cursor-pointer">
                <Avatar className="h-[50px] w-[50px]">
                  <Image
                    src={user?.photoURL || ProfileImage}
                    alt="Profile"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <AvatarFallback>
                    {user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <FaChevronDown
                  className={`w-4 h-4 transition-transform duration-200 text-[#5F647E] ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {user?.displayName || "User"}
                  </span>
                  <span className="text-sm text-gray-500">{user?.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={signOut}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
