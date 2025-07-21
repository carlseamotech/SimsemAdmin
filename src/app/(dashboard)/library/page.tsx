"use client";
import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import LibraryTabs from "./components/library-tabs";
import ToursTable from "./components/tours-table";
import MealsTable from "./components/meals-table";
import DishesTable from "./components/dishes-table";
import { CreateLibraryItemModal } from "./components/create-library-item-modal";

const LibraryPage = () => {
  const [activeFilter, setActiveFilter] = useState("tours");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateLibraryModal, setShowCreateLibraryModal] = useState(false);

  const [activeTab, setActiveTab] = useState("tours");
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams, activeTab]);

  const getFilterButtons = () => {
    return ["tours", "meals", "dishes"];
  };

  const getFilterLabel = (filter: string) => {
    const labels: { [key: string]: string } = {
      tours: "Tours",
      meals: "Meals",
      dishes: "Dishes",
    };
    return labels[filter] || filter;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "tours":
        return <ToursTable searchTerm={searchTerm} />;
      case "meals":
        return <MealsTable searchTerm={searchTerm} />;
      case "dishes":
        return <DishesTable searchTerm={searchTerm} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header title="Library" />
      <div className="flex-1 py-6 px-8">
        <div className="rounded-xl">
          <LibraryTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setShowCreateLibraryModal={setShowCreateLibraryModal}
          />

          <div className="bg-white  drop-shadow-lg rounded-b-2xl rounded-tr-2xl px-16 py-4">
            <div className="py-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getFilterButtons().map((filter) => (
                    <Button
                      key={filter}
                      variant={activeFilter === filter ? "default" : "outline"}
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
                      placeholder="Search by Name"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-48"
                    />
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
      <CreateLibraryItemModal
        isOpen={showCreateLibraryModal}
        onClose={() => setShowCreateLibraryModal(false)}
      />
    </>
  );
};

export default LibraryPage;
