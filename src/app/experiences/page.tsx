"use client";
import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import Header from "@/components/common/header";
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
import DishFormPage from "@/components/experiences/dish-form";
import DishLibraryPage from "@/components/experiences/dish-library";
import ExperiencesPage from "@/components/experiences/experiences";
import ExperienceLibraryPage from "@/components/experiences/experience-library";

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
      return [
        "all",
        "dining",
        "local-living",
        "for-approval",
        "active",
        "inactive",
      ];
    } else if (activeTab === "experience-library") {
      return ["all", "dining", "local-living"];
    }
    return ["all"];
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
      <Header title="Experiences" />

      {!showDishForm ? (
        <div className="flex-1 py-6 px-8">
          <div className="bg-white rounded-lg border border-gray-200">
            {/* Tabs and Add Button */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-auto"
                >
                  <TabsList className="grid w-full grid-cols-3 ">
                    <TabsTrigger
                      value="experiences"
                      className="data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900"
                    >
                      Experiences
                    </TabsTrigger>
                    <TabsTrigger
                      value="experience-library"
                      className="data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900"
                    >
                      Experience Library
                    </TabsTrigger>
                    <TabsTrigger
                      value="dish-library"
                      className="data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900"
                    >
                      Dish Library
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <Button
                  className="bg-[#FB8B24] hover:bg-orange-400 text-white text-[15px] cursor-pointer rounded-full"
                  onClick={() => {
                    if (activeTab === "dish-library") {
                      setShowDishForm(true);
                    }
                  }}
                >
                  {getButtonText()}
                </Button>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getFilterButtons().map((filter) => (
                    <Button
                      key={filter}
                      variant={activeFilter === filter ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter(filter)}
                      className={`rounded-full border-none text-[16px] font-normal ${
                        activeFilter === filter
                          ? "bg-[#FBB040] hover:bg-orange-400 text-white "
                          : "bg-[#3D3D3D1A]  "
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
              <>
                <ExperienceLibraryPage
                  activeFilter={activeFilter}
                  searchTerm={searchTerm}
                />
              </>
            )}

            {activeTab === "dish-library" && (
              <>
                <DishLibraryPage searchTerm={searchTerm} />
              </>
            )}
          </div>
        </div>
      ) : (
        <DishFormPage />
      )}
    </>
  );
};

export default ExperiencesMainPage;
