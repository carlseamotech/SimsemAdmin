"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Header from "@/components/common/header";

const hosts = [
  {
    id: 1,
    name: "Ahmed Habib",
    phone: "https://www.figma.com/des...",
    email: "demo@example.com",
    country: "Turkey",
    status: "For Approval",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Sophia",
    phone: "+962 6 555 5555",
    email: "demo@example.com",
    country: "Jordan",
    status: "Approved",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Daneesh",
    phone: "+20 12 3456 7890",
    email: "demo@example.com",
    country: "Egypt",
    status: "Approved",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "Layla Noor",
    phone: "+962 6 555 5555",
    email: "demo@example.com",
    country: "Jordan",
    status: "Approved",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    name: "Yousef Ibrahim",
    phone: "+20 12 3456 7890",
    email: "demo@example.com",
    country: "Egypt",
    status: "For Approval",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 6,
    name: "Fatima Zahra",
    phone: "+962 6 555 5555",
    email: "demo@example.com",
    country: "Jordan",
    status: "For Approval",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 7,
    name: "Omar Khalid",
    phone: "+90 212 555 1212",
    email: "demo@example.com",
    country: "Turkey",
    status: "For Approval",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 8,
    name: "Shirin Farah",
    phone: "+962 6 555 5555",
    email: "demo@example.com",
    country: "Jordan",
    status: "For Approval",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 9,
    name: "Mohammed Ali",
    phone: "+90 212 555 1212",
    email: "demo@example.com",
    country: "Turkey",
    status: "Approved",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 10,
    name: "Ahmed Hassan",
    phone: "+20 12 3456 7890",
    email: "demo@example.com",
    country: "Egypt",
    status: "For Approval",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

export default function HostDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // renamed from activeTab

  const getFilterButtons = () => ["all", "for-approval", "approved"];

  const getFilterLabel = (filter: string) => {
    const labels: { [key: string]: string } = {
      all: "All",
      "for-approval": "For Approval",
      approved: "Approved",
    };
    return labels[filter] || filter;
  };

  const filteredHosts = hosts.filter((host) => {
    const matchesSearch =
      host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.country.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "for-approval")
      return matchesSearch && host.status === "For Approval";
    if (activeFilter === "approved")
      return matchesSearch && host.status === "Approved";

    return matchesSearch;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <Header title="Hosts" />

        <div className="flex-1 py-6 px-8">
          <div className=" bg-white  drop-shadow-lg rounded-2xl px-16 py-4">
            {/* Filter Buttons and Search */}
            <div className="py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getFilterButtons().map((filter) => (
                    <Button
                      key={filter}
                      variant={activeFilter === filter ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter(filter)}
                      className={`rounded-full border-none text-[16px] font-normal h-[39px] px-4 ${
                        activeFilter === filter
                          ? "bg-[#FBB040] hover:bg-orange-400 text-white"
                          : "bg-[#3D3D3D1A] text-[#000000B2]"
                      }`}
                    >
                      {getFilterLabel(filter)}
                    </Button>
                  ))}
                </div>

                {/* Search & Pagination */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>1 - 10 of {filteredHosts.length}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 bg-transparent border-none"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 bg-transparent border-none"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="border-l border-[#D9D9DC] h-10" />

                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 bg-transparent border-none"
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
                    Host
                  </TableHead>
                  <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
                    Phone Number
                  </TableHead>
                  <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
                    Email Address
                  </TableHead>
                  <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
                    Country
                  </TableHead>
                  <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredHosts.map((host) => (
                  <TableRow key={host.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={host.avatar} />
                          <AvatarFallback>{host.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">
                          {host.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{host.phone}</TableCell>
                    <TableCell>{host.email}</TableCell>
                    <TableCell>{host.country}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          host.status === "Approved" ? "default" : "secondary"
                        }
                        className={`rounded-full text-[16px] font-normal ${
                          host.status === "Approved"
                            ? "bg-[#C9E8E8] text-[#105352] hover:bg-teal-100"
                            : "bg-[#FFF3DD] text-[#AA8345] hover:bg-orange-100"
                        }`}
                      >
                        {host.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
