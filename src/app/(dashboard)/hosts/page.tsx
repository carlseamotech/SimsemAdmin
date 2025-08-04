"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHosts } from "@/hooks/use-hosts";
import Header from "@/components/common/header";
import { HostsTable } from "@/app/(dashboard)/hosts/components/hosts-table";
import { HostsFilterSheet } from "@/app/(dashboard)/hosts/components/hosts-filter-sheet";
import { Badge } from "@/components/ui/badge";

const HostDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hostId, setHostId] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const { count } = useHosts(searchTerm, hostId, email, country, activeFilter);

  const getFilterButtons = () => ["all", "for-approval", "approved"];

  const getFilterLabel = (filter: string) => {
    const labels: { [key: string]: string } = {
      all: "All",
      "for-approval": "For Approval",
      approved: "Approved",
    };
    return labels[filter] || filter;
  };

  const handleApplyFilters = () => {
    // The useHosts hook automatically re-fetches when state changes
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setHostId("");
    setEmail("");
    setCountry("");
  };

  const filters = {
    "Search Term": searchTerm,
    "Host ID": hostId,
    Email: email,
    Country: country,
  };

  const activeFilters = Object.entries(filters).filter(([, value]) => value);

  const clearFilter = (filterName: string) => {
    switch (filterName) {
      case "Search Term":
        setSearchTerm("");
        break;
      case "Host ID":
        setHostId("");
        break;
      case "Email":
        setEmail("");
        break;
      case "Country":
        setCountry("");
        break;
    }
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
                  <p className="text-sm text-muted-foreground">
                    Total: {count}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search by Name"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-48"
                    />
                  </div>
                  <div className="border-l border-[#D9D9DC] h-10" />
                  <HostsFilterSheet
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    hostId={hostId}
                    setHostId={setHostId}
                    email={email}
                    setEmail={setEmail}
                    country={country}
                    setCountry={setCountry}
                    onApply={handleApplyFilters}
                    onClear={handleClearFilters}
                  />
                </div>
              </div>
              {activeFilters.length > 0 && (
                <div className="flex items-center gap-2 mt-4">
                  <p className="text-sm font-medium">Active Filters:</p>
                  {activeFilters.map(([key, value]) => (
                    <Badge
                      key={key}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {key}: {value}
                      <button
                        onClick={() => clearFilter(key)}
                        className="ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <Button
                    variant="link"
                    size="sm"
                    onClick={handleClearFilters}
                    className="text-red-500"
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </div>
            <HostsTable
              searchTerm={searchTerm}
              activeFilter={activeFilter}
              hostId={hostId}
              email={email}
              country={country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
