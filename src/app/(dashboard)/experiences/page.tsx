"use client";
import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DishFormPage from "@/app/(dashboard)/experiences/components/dish-form";
import DishLibraryPage from "@/app/(dashboard)/experiences/components/dish-library-table";
import ExperiencesPage from "@/app/(dashboard)/experiences/components/experiences-table";
import ExperienceLibraryPage from "@/app/(dashboard)/experiences/components/experience-library-table";
import TabsExperiencePage from "@/app/(dashboard)/experiences/components/tabs-experience";
import { useSearchParams } from "next/navigation";
import { ProposedTour } from "@/models/proposed-tour";
import { ExperienceForm } from "./components/experience-form";

const ExperiencesMainPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDishForm, setShowDishForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [experienceToEdit, setExperienceToEdit] = useState<ProposedTour | null>(
    null
  );

  const [activeTab, setActiveTab] = useState("experiences");
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleEdit = (experience: ProposedTour) => {
    setExperienceToEdit(experience);
    setShowExperienceForm(true);
  };

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
            onEdit={handleEdit}
          />
        );
      case "experience-library":
        return (
          <ExperienceLibraryPage
            activeFilter={activeFilter}
            searchTerm={searchTerm}
          />
        );
      case "dish-library":
        return <DishLibraryPage searchTerm={searchTerm} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header
        title={!showDishForm && !showExperienceForm ? "Experiences" : undefined}
        showBackButton={showDishForm || showExperienceForm}
        onBack={() => {
          setShowDishForm(false);
          setShowExperienceForm(false);
        }}
      />

      {!showDishForm && !showExperienceForm ? (
        <div className="flex-1 py-6 px-8">
          <div className="rounded-xl">
            <TabsExperiencePage
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setShowDishForm={setShowDishForm}
              getButtonText={getButtonText}
            />

            <div className="bg-white  drop-shadow-lg rounded-b-2xl rounded-tr-2xl px-16 py-4">
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
      ) : showDishForm ? (
        <DishFormPage setShowDishForm={setShowDishForm} />
      ) : (
        <ExperienceForm
          setShowForm={setShowExperienceForm}
          experienceToEdit={experienceToEdit}
        />
      )}
    </>
  );
};

export default ExperiencesMainPage;
