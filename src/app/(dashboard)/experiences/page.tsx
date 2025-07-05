"use client";
import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DishFormPage from "@/app/(dashboard)/experiences/components/dish-form";
import DishLibraryPage from "@/app/(dashboard)/experiences/components/dish-library-table";
import ExperiencesPage from "@/app/(dashboard)/experiences/components/experiences-table";
import ExperienceLibraryPage from "@/app/(dashboard)/experiences/components/experience-library-table";
import TabsExperiencePage from "@/app/(dashboard)/experiences/components/tabs-experience";
import { useTours } from "@/hooks/use-experiences";
import { useSearchParams } from "next/navigation";

const ExperiencesMainPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDishForm, setShowDishForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const searchParams = useSearchParams();
  // const [activeTab, setActiveTab] = useState("experiences");
  const tabInUrl = searchParams.get("tab") || "experiences";
  const [activeTab, setActiveTab] = useState(tabInUrl);

  useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [searchParams]);

  const getButtonText = () => {
    if (activeTab === "dish-library") return "Add a new dish";
    return "Add new experience";
  };

  const getFilterButtons = () => {
    if (activeTab === "experiences") {
      return ["all", "for-approval", "active", "inactive"];
    } else if (activeTab === "experience-library") {
      return ["all", "dining", "local-living"];
    }
    return [];
  };

  const getFilterLabel = (filter: string) => {
    const labels: { [key: string]: string } = {
      all: "All",
      dining: "Dining",
      "local-living": "Local Living",
      "for-approval": "For Approval",
      active: "Active",
      inactive: "Inactive",
    };
    return labels[filter] || filter;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "experiences":
        return (
          <ExperiencesPage
            activeFilter={activeFilter}
            searchTerm={searchTerm}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        );
      case "experience-library":
        return (
          <ExperienceLibraryPage
            activeFilter={activeFilter}
            searchTerm={searchTerm}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        );
      case "dish-library":
        return (
          <DishLibraryPage
            searchTerm={searchTerm}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        );
      default:
        return null;
    }
  };

  const { tours } = useTours(
    ["custom", "getaway", "offered"],
    10000,
    activeTab === "experiences"
  );

  const totalItems = () => {
    if (activeTab === "experiences") {
      return tours?.length || 0;
    }
    return 0;
  };

  const totalPages = Math.ceil(totalItems() / itemsPerPage);

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
    <>
      <Header
        title={!showDishForm ? "Experiences" : undefined}
        showBackButton={showDishForm}
        onBack={() => setShowDishForm(false)}
      />

      {!showDishForm ? (
        <div className="flex-1 py-6 px-8">
          <div className="rounded-xl">
            {/* Tabs and Add Button */}
            <TabsExperiencePage
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setShowDishForm={setShowDishForm}
              getButtonText={getButtonText}
            />

            <div className="bg-white  drop-shadow-lg rounded-b-2xl rounded-tr-2xl px-16 py-4">
              {/* Filters and Search */}
              <div className="py-6 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getFilterButtons().map((filter) => (
                      <Button
                        key={filter}
                        variant={
                          activeFilter === filter ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setActiveFilter(filter)}
                        className={`rounded-full border-none text-[16px]  font-normal h-[39px] px-4 ${
                          activeFilter === filter
                            ? "bg-[#FBB040] hover:bg-orange-400 text-white "
                            : "bg-[#3D3D3D1A]   text-[#000000B2]"
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

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div>
                        {`${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(
                          currentPage * itemsPerPage,
                          totalItems()
                        )} of ${totalItems()}`}
                      </div>

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

                    <div className="border-l border-[#D9D9DC] border h-9" />

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

              {renderTabContent()}
            </div>
          </div>
        </div>
      ) : (
        <DishFormPage setShowDishForm={setShowDishForm} />
      )}
    </>
  );
};

export default ExperiencesMainPage;
