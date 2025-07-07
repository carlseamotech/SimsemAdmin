"use client";

import type React from "react";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  // Distribute images across sections
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
    <div className="rounded-2xl p-6  bg-[#3D3D3D0D] space-y-4">
      <h1 className="text-2xl font-bold text-[#0D2E61] mb-8">Tour Menu</h1>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#0D2E614D] z-0" />

        {menuData.map((section, sectionIndex) => (
          <div key={section.title} className="relative mb-12 z-10">
            {/* Timeline indicator and title */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#0D2E61] rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full" />
              </div>
              <div className="ml-4">
                <h2 className="text-[20px] font-bold text-[#0D2E61]">
                  {section.title}
                </h2>
              </div>
            </div>

            {/* Menu items grid - positioned below the title */}
            <div className="ml-16">
              <div
                className={`grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 `}
              >
                {section.items.map((item, itemIndex) => (
                  <Card
                    key={itemIndex}
                    className="overflow-hidden hover:shadow-lg p-2 rounded-3xl transition-shadow duration-200"
                  >
                    <CardContent className="p-0">
                      {/* ✅ Fixed aspect ratio container for image */}
                      <div className="relative aspect-[175/99] w-full">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-3xl"
                        />
                      </div>

                      <div className="p-4 space-y-2">
                        {/* ✅ One clean badge */}
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
        ))}
      </div>
    </div>
  );
};
