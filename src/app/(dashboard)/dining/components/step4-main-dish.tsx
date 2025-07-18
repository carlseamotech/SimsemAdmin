"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import TestImage from "../../../../../public/dining-test.png";
import type { DiningFormData, DishItem } from "../page";
import { CreateDishModal } from "./create-dish-modal";

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

  const [mainDishes, setMainDishes] = useState<DishItem[]>([
    {
      id: "tabbouleh",
      name: "Tabbouleh",
      description: "Chopped ",
      image: {
        __type: "File",
        name: "tabbouleh.jpg",
        url: "/placeholder.svg?height=150&width=200",
      },
      mealType: "vegetarian",
      ingredients: "Chopped ",
      type: "vegetarian",
    },
    {
      id: "galayet",
      name: "Galayet Banadoura",
      description: "Tomatoes fried in olive oil with spicy sesame pepper",
      image: {
        __type: "File",
        name: "galayet.jpg",
        url: "/placeholder.svg?height=150&width=200",
      },
      mealType: "vegetarian",
      ingredients: "Tomatoes fried in olive oil with spicy sesame pepper",
      type: "vegetarian",
    },
    {
      id: "dawali",
      name: "Dawali",
      description: "Wrapped grape leaves stuffed with rice and vegetables",
      image: {
        __type: "File",
        name: "dawali.jpg",
        url: "/placeholder.svg?height=150&width=200",
      },
      mealType: "vegetarian",
      ingredients: "Wrapped grape leaves stuffed with rice and vegetables",
      type: "vegetarian",
    },
    {
      id: "mujadara",
      name: "Mujadara",
      description: "Lentils, rice, caramelized onions, yogurt and herbs",
      image: {
        __type: "File",
        name: "mujadara.jpg",
        url: "/placeholder.svg?height=150&width=200",
      },
      mealType: "vegetarian",
      ingredients: "Lentils, rice, caramelized onions, yogurt and herbs",
      type: "vegetarian",
    },
  ]);

  const filteredDishes = mainDishes.filter(
    (dish) => dish.mealType === selectedMealType
  );

  const handleDishSelect = (dish: DishItem) => {
    setFormData((prev) => ({
      ...prev,
      main: prev.main.find((d) => d.id === dish.id)
        ? prev.main.filter((d) => d.id !== dish.id)
        : [...prev.main, dish],
    }));
  };

  const onDishCreated = (dish: DishItem) => {
    setMainDishes((prev) => [...prev, dish]);
    handleDishSelect(dish);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <h2 className="text-[30px]  text-[#0D2E61]">
          Select a <span className="italic">Main Dish</span> for you menu
        </h2>

        <p className="text-[#000000B2] text-[15px]">
          Keep in mind that you will be cooking this to your travelers or bring
          them to your local restaurant that serves this.
        </p>
      </div>

      <div>
        <h3 className="text-[20px] font-bold text-[#000000B2] mb-3">
          Meal Type
        </h3>
        <div className="flex space-x-2">
          {(["vegetarian", "meat", "vegan"] as const).map((type) => (
            <Badge
              key={type}
              variant={selectedMealType === type ? "default" : "outline"}
              className={` cursor-pointer px-8 py-2 h-[59px] text-[19px] font-normal rounded-2xl ${
                selectedMealType === type
                  ? "bg-[#FEC540] hover:bg-yellow-400 text-white"
                  : "bg-[#00000008] hover:bg-gray-200 text-[#000000B2]"
              }`}
              onClick={() => setSelectedMealType(type)}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-14">
        <CreateDishModal onDishCreated={onDishCreated} course="main" />

        {/* Main Dish Cards */}
        {filteredDishes.map((dish) => (
          <Card
            key={dish.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md p-0 gap-0 ${
              formData.main.find((d) => d.id === dish.id)
                ? "ring-2 ring-[#FB8B24]"
                : ""
            }`}
            onClick={() => handleDishSelect(dish)}
          >
            <CardContent className="p-0 ">
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                <Image
                  src={TestImage || "/placeholder.svg"}
                  alt={dish.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>

            <div className="p-3 rounded-b-2xl h-full  bg-[#C4C4C4] rounde-xl">
              <h4 className="font-semibold text-[20px] text-[#000000] mb-1 truncate">
                {dish.name}
              </h4>
              <p className="text-[10px] text-[#000000] leading-relaxed line-clamp-2">
                {dish.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Step4MainDish;
