"use client";
import React, { Dispatch, SetStateAction } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface TabsExperienceProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  setShowDishForm: Dispatch<SetStateAction<boolean>>;
  getButtonText: () => "Add a new dish" | "Add new experience";
}

const TabsExperiencePage: React.FC<TabsExperienceProps> = ({
  activeTab,
  setActiveTab,
  setShowDishForm,
  getButtonText,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between border-none">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-auto rounded-none"
      >
        <TabsList className="grid w-full grid-cols-3 p-0 h-full rounded-none">
          <TabsTrigger
            value="experiences"
            className="data-[state=active]:bg-[#FFFFFF] data-[state=active]:shadow-none font-bold rounded-none rounded-t-2xl p-4 bg-[#ECECED] data-[state=active]:text-[#0E356C] text-[23px] text-[#707070]"
          >
            Experiences
          </TabsTrigger>

          <TabsTrigger
            value="experience-library"
            className="data-[state=active]:bg-[#FFFFFF] data-[state=active]:shadow-none font-bold rounded-none rounded-t-2xl p-4 bg-[#ECECED] data-[state=active]:text-[#0E356C] text-[23px] text-[#707070]"
          >
            Experience Library
          </TabsTrigger>

          <TabsTrigger
            value="dish-library"
            className="data-[state=active]:bg-[#FFFFFF] data-[state=active]:shadow-none font-bold rounded-none rounded-t-2xl p-4 bg-[#ECECED] data-[state=active]:text-[#0E356C] text-[23px] text-[#707070]"
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
  );
};

export default TabsExperiencePage;
