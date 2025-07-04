"use client";
import { FaChevronDown } from "react-icons/fa";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import SearchIcon from "../../../public/common/search-icon.svg";
import NotificationIcon from "../../../public/common/notification-icon.svg";
import ProfileImage from "../../../public/common/profile-image.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Search } from "lucide-react";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const Header = ({ title, showBackButton = false, onBack }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="hidden lg:block px-6 py-12 bg-[#F8F8F8]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="mr-4 bg-[#F2EDED] rounded-full"
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
            variant="normal"
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
                    src={ProfileImage}
                    alt="Profile"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <FaChevronDown
                  className={`w-4 h-4 transition-transform duration-200 text-[#5F647E] ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
