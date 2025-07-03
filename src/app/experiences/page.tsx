"use client";
import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DishFormPage from "@/components/experiences/dish-form";
import DishLibraryPage from "@/components/experiences/dish-library";
import ExperiencesPage from "@/components/experiences/experiences";
import ExperienceLibraryPage from "@/components/experiences/experience-library";
import TabsExperiencePage from "@/components/experiences/tabs-experience";

const ExperiencesMainPage = () => {
  const [activeTab, setActiveTab] = useState("experiences");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDishForm, setShowDishForm] = useState(false);

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

  return (
    <>
      <Header
        title="Experiences"
        showDishForm={showDishForm}
        setShowDishForm={setShowDishForm}
      />

      {!showDishForm ? (
        <div className="flex-1 py-6 px-8">
          <div className=" rounded-xl ">
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
                      <span>1 - 10 of 52</span>
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

                    <div className="border-l border-[#D9D9DC] border h-10" />

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

              {/* Table Content */}
              {activeTab === "experiences" && (
                <>
                  <ExperiencesPage
                    activeFilter={activeFilter}
                    searchTerm={searchTerm}
                  />
                </>
              )}

              {activeTab === "experience-library" && (
                <ExperienceLibraryPage
                  activeFilter={activeFilter}
                  searchTerm={searchTerm}
                />
              )}

              {activeTab === "dish-library" && (
                <>
                  <DishLibraryPage searchTerm={searchTerm} />
                </>
              )}
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
