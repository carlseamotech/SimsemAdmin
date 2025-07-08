"use client";
import Image from "next/image";
import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MenuIndicatorIcon from "../../../../../../public/experience/menu-indicator.svg";

interface MenuItem {
  name: string;
  description: string;
  image: string;
  type: "Meat" | "Vegetarian";
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface TourMenuProps {
  images: string[];
}

export const TourMenu: React.FC<TourMenuProps> = ({ images }) => {
  const starterImages = images.slice(0, 6);
  const mainDishImages = images.slice(6, 11);
  const dessertImages = images.slice(11, 12);

  const menuData: MenuSection[] = [
    {
      title: "Starter",
      items: [
        {
          name: "Baba Ganoush",
          description: "Creamy eggplant dip with tahini, garlic, and lemon",
          image: starterImages[0] || "/placeholder.svg?height=120&width=120",
          type: "Meat",
        },
        {
          name: "Ful Medames",
          description: "Traditional fava beans with olive oil and spices",
          image: starterImages[1] || "/placeholder.svg?height=120&width=120",
          type: "Vegetarian",
        },
        {
          name: "Falafel",
          description: "Crispy chickpea fritters with herbs and spices",
          image: starterImages[2] || "/placeholder.svg?height=120&width=120",
          type: "Vegetarian",
        },
        {
          name: "Aish Baladi",
          description: "Traditional Egyptian flatbread, freshly baked",
          image: starterImages[3] || "/placeholder.svg?height=120&width=120",
          type: "Vegetarian",
        },
        {
          name: "Tamiya",
          description: "Egyptian-style falafel made with fava beans",
          image: starterImages[4] || "/placeholder.svg?height=120&width=120",
          type: "Vegetarian",
        },
        {
          name: "Shakshuka",
          description: "Eggs poached in spiced tomato sauce",
          image: starterImages[5] || "/placeholder.svg?height=120&width=120",
          type: "Vegetarian",
        },
      ],
    },
    {
      title: "Main Dish",
      items: [
        {
          name: "Hawwashi",
          description: "Spiced meat stuffed in crispy pita bread",
          image: mainDishImages[0] || "/placeholder.svg?height=120&width=120",
          type: "Meat",
        },
        {
          name: "Hamam Mahshi",
          description: "Stuffed pigeon with rice and aromatic spices",
          image: mainDishImages[1] || "/placeholder.svg?height=120&width=120",
          type: "Meat",
        },
        {
          name: "Masli Kromb",
          description: "Cabbage rolls stuffed with rice and herbs",
          image: mainDishImages[2] || "/placeholder.svg?height=120&width=120",
          type: "Vegetarian",
        },
        {
          name: "Mahshi Fitfit",
          description: "Mixed stuffed vegetables with rice and herbs",
          image: mainDishImages[3] || "/placeholder.svg?height=120&width=120",
          type: "Vegetarian",
        },
        {
          name: "Mulukhiya",
          description: "Traditional green soup with chicken or meat",
          image: mainDishImages[4] || "/placeholder.svg?height=120&width=120",
          type: "Meat",
        },
      ],
    },
    {
      title: "Dessert",
      items: [
        {
          name: "Knafeh",
          description: "Sweet cheese pastry with crispy shredded phyllo",
          image: dessertImages[0] || "/placeholder.svg?height=120&width=120",
          type: "Vegetarian",
        },
      ],
    },
  ];

  return (
    <Card className="bg-[#3D3D3D0D] border-none p-0">
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold text-[#0D2E61] mb-8">Tour Menu</h1>

        <div className="relative">
          {menuData.map((section, index) => {
            const isLast = index === menuData.length - 1;

            return (
              <div
                key={section.title}
                className="relative flex items-start pb-12 last:pb-0 gap-4"
              >
                {/* Vertical Line */}
                {!isLast && (
                  <div className="absolute left-[22px] top-8 w-0.5 h-full bg-gray-300 -translate-x-0.5" />
                )}

                {/* Icon */}
                <div className="relative z-10 flex items-center justify-center w-[43px] h-[43px]">
                  <Image src={MenuIndicatorIcon} alt="menu indicator icon" />
                </div>

                <div className="flex-1 min-w-0 pt-2">
                  <div className="flex items-center mb-6">
                    <h2 className="text-[20px] font-bold text-[#0D2E61]">
                      {section.title}
                    </h2>
                  </div>

                  <div className="ml-4 md:ml-6">
                    <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {section.items.map((item, itemIndex) => (
                        <Card
                          key={`${item.name}-${itemIndex}`}
                          className="overflow-hidden hover:shadow-lg p-2 rounded-2xl transition-shadow duration-200 aspect-h-[184/241] "
                        >
                          <CardContent className="p-0">
                            <div className="relative w-full h-[99px] ">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover rounded-t-2xl "
                              />
                            </div>

                            <div className="p-2 space-y-1">
                              <Badge
                                className={`text-[10px] text-white ${
                                  item.type === "Meat"
                                    ? "bg-[#FB8B24]"
                                    : "bg-[#183B56]"
                                } rounded-full px-3 py-0.5`}
                              >
                                {item.type}
                              </Badge>

                              <h1 className="font-semibold text-[#0D2E61] text-[18px] truncate">
                                {item.name}
                              </h1>

                              <h3 className="font-medium text-[#3D3D3D80] text-[12px]">
                                Ingredients
                              </h3>

                              <p className="text-[12px] text-[#3D3D3D] leading-relaxed line-clamp-3">
                                {item.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
