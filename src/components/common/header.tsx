"use client";
import { FaChevronDown } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchIcon from "../../../public/header-icons/search-icon.svg";
import NotificationIcon from "../../../public/header-icons/notification-icon.svg";
import ProfileImage from "../../../public/header-icons/profile-image.svg";
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

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-[32px] text-[#0D2E61]">{title}</h1>

        <div className="flex items-center space-x-4">
          {/* Global Search */}
          <div className="relative">
            <Image
              src={SearchIcon}
              alt="Search Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-[24px] h-[24px]"
            />

            <Input
              placeholder="Global Search"
              className="pl-10 w-80 border-gray-300 text-[14px]"
            />
          </div>

          {/* Notifications */}
          <Button
            variant="normal"
            size="icon"
            className="relative bg-[#0D2E61] rounded-full h-[50px] w-[50px] "
          >
            <Image
              src={NotificationIcon}
              alt="Notification Icon"
              className=" w-[24px] h-[24px]"
            />

            <div className="absolute -top-[0.5px] -right-[1px] w-3 h-3 bg-[#EC502C] rounded-full"></div>
          </Button>

          {/* User Profile */}
          <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger
              asChild
              className="focus:outline-none focus:ring-0"
            >
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
                  className={`w-4 h-4 transition-transform duration-200 text-[#5F647E] f ${
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
