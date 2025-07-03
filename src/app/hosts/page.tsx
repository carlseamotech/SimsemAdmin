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
  const [activeTab, setActiveTab] = useState("all");

  const filteredHosts = hosts.filter((host) => {
    const matchesSearch =
      host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.country.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "for-approval")
      return matchesSearch && host.status === "For Approval";
    if (activeTab === "approved")
      return matchesSearch && host.status === "Approved";

    return matchesSearch;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header title="Hosts" />
        {/* Content */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg border border-gray-200">
            {/* Filters and Search */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-auto"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      value="for-approval"
                      className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                    >
                      For Approval
                    </TabsTrigger>
                    <TabsTrigger
                      value="approved"
                      className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                    >
                      Approved
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

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
                    <span>1 - 10 of 52</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 bg-transparent"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 bg-transparent"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 bg-transparent"
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
                  <TableHead className="font-semibold text-gray-700">
                    Host
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Phone Number
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Email Address
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Country
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHosts.map((host) => (
                  <TableRow key={host.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={host.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>{host.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">
                          {host.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {host.phone}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {host.email}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {host.country}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          host.status === "Approved" ? "default" : "secondary"
                        }
                        className={
                          host.status === "Approved"
                            ? "bg-teal-100 text-teal-800 hover:bg-teal-100"
                            : "bg-orange-100 text-orange-800 hover:bg-orange-100"
                        }
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
