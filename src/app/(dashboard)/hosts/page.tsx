"use client";
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/common/header";
import { HostsTable } from "@/app/(dashboard)/hosts/components/hosts-table";

const HostDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const getFilterButtons = () => ["all", "for-approval", "approved"];

  const getFilterLabel = (filter: string) => {
    const labels: { [key: string]: string } = {
      all: "All",
      "for-approval": "For Approval",
      approved: "Approved",
    };
    return labels[filter] || filter;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <Header title="Hosts" />

        <div className="flex-1 py-6 px-8">
          <div className=" bg-white  drop-shadow-lg rounded-2xl px-16 py-4">
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
            <HostsTable searchTerm={searchTerm} activeFilter={activeFilter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
