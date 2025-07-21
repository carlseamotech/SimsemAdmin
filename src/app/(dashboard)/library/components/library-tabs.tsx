"use client";
import { Button } from "@/components/ui/button";

interface LibraryTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setShowCreateLibraryModal: (show: boolean) => void;
}

const LibraryTabs: React.FC<LibraryTabsProps> = ({
  activeTab,
  setActiveTab,
  setShowCreateLibraryModal,
}) => {
  const tabs = [
    { id: "tours", label: "Tours" },
    { id: "meals", label: "Meals" },
    { id: "dishes", label: "Dishes" },
  ];

  return (
    <div className="flex justify-between items-center bg-white drop-shadow-lg rounded-t-2xl px-8 pt-4">
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <Button onClick={() => setShowCreateLibraryModal(true)}>
        Create New
      </Button>
    </div>
  );
};

export default LibraryTabs;
