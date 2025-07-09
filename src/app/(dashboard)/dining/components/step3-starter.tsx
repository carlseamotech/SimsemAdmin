"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import type { DiningFormData, DishItem } from "../page";

interface Step3StarterProps {
  formData: DiningFormData;
  setFormData: React.Dispatch<React.SetStateAction<DiningFormData>>;
}

const Step3Starter: React.FC<Step3StarterProps> = ({
  formData,
  setFormData,
}) => {
  const [selectedMealType, setSelectedMealType] = useState<
    "vegetarian" | "meat" | "vegan"
  >("vegetarian");

  const starters: DishItem[] = [
    {
      id: "hummus",
      name: "Hummus",
      description:
        "Chickpeas, garlic, lemon, sesame paste (Tahini) and olive oil",
      image: "/placeholder.svg?height=150&width=200",
      mealType: "vegetarian",
    },
    {
      id: "mutabbal",
      name: "Mutabbal",
      description: "Eggplant, tahini, and lemon",
      image: "/placeholder.svg?height=150&width=200",
      mealType: "vegetarian",
    },
    {
      id: "makdous",
      name: "Makdous",
      description:
        "Small pickled eggplant stuffed with red pepper, walnuts, garlic...",
      image: "/placeholder.svg?height=150&width=200",
      mealType: "vegetarian",
    },
    {
      id: "ful",
      name: "Ful",
      description:
        "Pureed fava beans, lemon juice, olive oil and chopped chilis",
      image: "/placeholder.svg?height=150&width=200",
      mealType: "vegetarian",
    },
  ];

  const filteredStarters = starters.filter(
    (starter) => starter.mealType === selectedMealType
  );

  const handleStarterSelect = (starter: DishItem) => {
    setFormData((prev) => ({ ...prev, selectedStarter: starter }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-blue-900 mb-2">
          Select a <span className="italic">Starter</span> for you menu
        </h2>
        <p className="text-gray-600">
          Keep in mind that you will be cooking this to your travelers or bring
          them to your local restaurant that serves this.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Meal Type</h3>
        <div className="flex space-x-2">
          {(["vegetarian", "meat", "vegan"] as const).map((type) => (
            <Badge
              key={type}
              variant={selectedMealType === type ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 capitalize ${
                selectedMealType === type
                  ? "bg-[#FBB040] hover:bg-orange-400 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              onClick={() => setSelectedMealType(type)}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Create Custom Dish Card */}
        <Card className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
          <CardContent className="p-6 flex flex-col items-center justify-center h-48">
            <Plus className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 text-center">
              Create your own dish
            </p>
          </CardContent>
        </Card>

        {/* Starter Cards */}
        {filteredStarters.map((starter) => (
          <Card
            key={starter.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              formData.selectedStarter?.id === starter.id
                ? "ring-2 ring-[#FB8B24]"
                : ""
            }`}
            onClick={() => handleStarterSelect(starter)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                <Image
                  src={starter.image || "/placeholder.svg"}
                  alt={starter.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {starter.name}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {starter.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Step3Starter;
