"use client";
import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useHosts } from "@/hooks/use-hosts";
import { Host } from "@/models/host";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
import { HostsTableSkeleton } from "@/components/hosts/hosts-table-skeleton";

export default function HostDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const router = useRouter();
  const { hosts, isLoading } = useHosts(10000);

  const getFilterButtons = () => ["all", "for-approval", "approved"];

  const getFilterLabel = (filter: string) => {
    const labels: { [key: string]: string } = {
      all: "All",
      "for-approval": "For Approval",
      approved: "Approved",
    };
    return labels[filter] || filter;
  };

  const filteredHosts = hosts?.filter((host: Host) => {
    const matchesSearch =
      host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.country.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "for-approval")
      return matchesSearch && !host.isVerified;
    if (activeFilter === "approved")
      return matchesSearch && host.isVerified;

    return matchesSearch;
  });

  const totalPages = Math.ceil((filteredHosts?.length || 0) / itemsPerPage);
  const paginatedHosts = filteredHosts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
                    <span>
                      {`${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(
                        currentPage * itemsPerPage,
                        filteredHosts?.length || 0
                      )} of ${filteredHosts?.length}`}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 bg-transparent border-none"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 bg-transparent border-none"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
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
            {isLoading ? (
              <HostsTableSkeleton />
            ) : (
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
                  {paginatedHosts?.map((host) => (
                    <TableRow
                      key={host.objectId}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/hosts/${host.objectId}`)}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={host.imageUrl}
                              alt="Host Image"
                            />
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
                          variant={host.isVerified ? "default" : "secondary"}
                          className={`rounded-full text-[16px] font-normal ${
                            host.isVerified
                              ? "bg-[#C9E8E8] text-[#105352] hover:bg-teal-100"
                              : "bg-[#FFF3DD] text-[#AA8345] hover:bg-orange-100"
                          }`}
                        >
                          {host.isVerified ? "Approved" : "For Approval"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
