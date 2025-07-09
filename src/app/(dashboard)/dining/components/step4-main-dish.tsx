"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import type { DiningFormData, DishItem } from "../page";

interface Step4MainDishProps {
  formData: DiningFormData;
  setFormData: React.Dispatch<React.SetStateAction<DiningFormData>>;
}

const Step4MainDish: React.FC<Step4MainDishProps> = ({
  formData,
  setFormData,
}) => {
  const [selectedMealType, setSelectedMealType] = useState<
    "vegetarian" | "meat" | "vegan"
  >("vegetarian");

  const mainDishes: DishItem[] = [
    {
      id: "tabbouleh",
      name: "Tabbouleh",
      description:
        "Chopped parsley, mint, tomatoes, onion and bulgur, tabbouleh is a f...",
      image: "/placeholder.svg?height=150&width=200",
      mealType: "vegetarian",
    },
    {
      id: "galayet",
      name: "Galayet Banadoura",
      description: "Tomatoes fried in olive oil with spicy sesame pepper",
      image: "/placeholder.svg?height=150&width=200",
      mealType: "vegetarian",
    },
    {
      id: "dawali",
      name: "Dawali",
      description: "Wrapped grape leaves stuffed with rice and vegetables",
      image: "/placeholder.svg?height=150&width=200",
      mealType: "vegetarian",
    },
    {
      id: "mujadara",
      name: "Mujadara",
      description: "Lentils, rice, caramelized onions, yogurt and herbs",
      image: "/placeholder.svg?height=150&width=200",
      mealType: "vegetarian",
    },
  ];

  const filteredDishes = mainDishes.filter(
    (dish) => dish.mealType === selectedMealType
  );

  const handleDishSelect = (dish: DishItem) => {
    setFormData((prev) => ({ ...prev, selectedMainDish: dish }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-blue-900 mb-2">
          Select a <span className="italic">Main Dish</span> for you menu
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

        {/* Main Dish Cards */}
        {filteredDishes.map((dish) => (
          <Card
            key={dish.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              formData.selectedMainDish?.id === dish.id
                ? "ring-2 ring-[#FB8B24]"
                : ""
            }`}
            onClick={() => handleDishSelect(dish)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                <Image
                  src={dish.image || "/placeholder.svg"}
                  alt={dish.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {dish.name}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {dish.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Step4MainDish;
