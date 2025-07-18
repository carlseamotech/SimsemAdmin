"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import TestImage from "../../../../../public/dining-test.png";
import type { DiningFormData, DishItem } from "../page";
import { CreateDishModal } from "./create-dish-modal";

interface Step5DessertProps {
  formData: DiningFormData;
  setFormData: React.Dispatch<React.SetStateAction<DiningFormData>>;
}

const Step5Dessert: React.FC<Step5DessertProps> = ({
  formData,
  setFormData,
}) => {
  const [selectedMealType, setSelectedMealType] = useState<
    "vegetarian" | "meat" | "vegan"
  >("vegetarian");

  const [desserts, setDesserts] = useState<DishItem[]>([
    {
      id: "knafeh",
      name: "Knafeh",
      description:
        "Crust of spun pastry and a filling of sweet cheese topped with a suga...",
      image: {
        __type: "File",
        name: "knafeh.jpg",
        url: "/placeholder.svg?height=150&width=200",
      },
      mealType: "vegetarian",
      ingredients:
        "Crust of spun pastry and a filling of sweet cheese topped with a suga...",
      type: "vegetarian",
    },
    {
      id: "namoura",
      name: "Namoura",
      description: "Honey, butter, and milk",
      image: {
        __type: "File",
        name: "namoura.jpg",
        url: "/placeholder.svg?height=150&width=200",
      },
      mealType: "vegetarian",
      ingredients: "Honey, butter, and milk",
      type: "vegetarian",
    },
    {
      id: "baklava",
      name: "Baklava",
      description:
        "Phyllo dough that is layered with nuts and sweetened with honey",
      image: {
        __type: "File",
        name: "baklava.jpg",
        url: "/placeholder.svg?height=150&width=200",
      },
      mealType: "vegetarian",
      ingredients: "Phyllo dough that is layered with nuts and sweetened with honey",
      type: "vegetarian",
    },
    {
      id: "qatayef",
      name: "Qatayef",
      description:
        "Fried sweet dumplings filled with cream and nuts then covered in s...",
      image: {
        __type: "File",
        name: "qatayef.jpg",
        url: "/placeholder.svg?height=150&width=200",
      },
      mealType: "vegetarian",
      ingredients: "Fried sweet dumplings filled with cream and nuts then covered in s...",
      type: "vegetarian",
    },
  ]);

  const filteredDesserts = desserts.filter(
    (dessert) => dessert.mealType === selectedMealType
  );

  const handleDessertSelect = (dessert: DishItem) => {
    setFormData((prev) => ({
      ...prev,
      dessert: prev.dessert.find((d) => d.id === dessert.id)
        ? prev.dessert.filter((d) => d.id !== dessert.id)
        : [...prev.dessert, dessert],
    }));
  };

  const onDishCreated = (dish: DishItem) => {
    setDesserts((prev) => [...prev, dish]);
    handleDessertSelect(dish);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <h2 className="text-[30px]  text-[#0D2E61]">
          Select a <span className="italic">Dessert</span> for you menu
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
        <CreateDishModal onDishCreated={onDishCreated} course="dessert" />

        {/* Dessert Cards */}
        {filteredDesserts.map((dessert) => (
          <Card
            key={dessert.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md p-0 gap-0 ${
              formData.dessert.find((d) => d.id === dessert.id)
                ? "ring-2 ring-[#FB8B24]"
                : ""
            }`}
            onClick={() => handleDessertSelect(dessert)}
          >
            <CardContent className="p-0 ">
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                <Image
                  src={TestImage || "/placeholder.svg"}
                  alt={dessert.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>

            <div className="p-3 rounded-b-2xl h-full  bg-[#C4C4C4] rounde-xl">
              <h4 className="font-semibold text-[20px] text-[#000000] mb-1 truncate">
                {dessert.name}
              </h4>
              <p className="text-[10px] text-[#000000] leading-relaxed line-clamp-2">
                {dessert.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Step5Dessert;
