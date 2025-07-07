"use client";

import type React from "react";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface MenuItem {
  name: string;
  description: string;
  image: string;
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
        },
        {
          name: "Ful Medames",
          description: "Traditional fava beans with olive oil and spices",
          image: starterImages[1] || "/placeholder.svg?height=120&width=120",
        },
        {
          name: "Falafel",
          description: "Crispy chickpea fritters with herbs and spices",
          image: starterImages[2] || "/placeholder.svg?height=120&width=120",
        },
        {
          name: "Aish Baladi",
          description: "Traditional Egyptian flatbread, freshly baked",
          image: starterImages[3] || "/placeholder.svg?height=120&width=120",
        },
        {
          name: "Tamiya",
          description: "Egyptian-style falafel made with fava beans",
          image: starterImages[4] || "/placeholder.svg?height=120&width=120",
        },
        {
          name: "Shakshuka",
          description: "Eggs poached in spiced tomato sauce",
          image: starterImages[5] || "/placeholder.svg?height=120&width=120",
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
        },
        {
          name: "Hamam Mahshi",
          description: "Stuffed pigeon with rice and aromatic spices",
          image: mainDishImages[1] || "/placeholder.svg?height=120&width=120",
        },
        {
          name: "Masli Kromb",
          description: "Cabbage rolls stuffed with rice and herbs",
          image: mainDishImages[2] || "/placeholder.svg?height=120&width=120",
        },
        {
          name: "Mahshi Fitfit",
          description: "Mixed stuffed vegetables with rice and herbs",
          image: mainDishImages[3] || "/placeholder.svg?height=120&width=120",
        },
        {
          name: "Mulukhiya",
          description: "Traditional green soup with chicken or meat",
          image: mainDishImages[4] || "/placeholder.svg?height=120&width=120",
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
        },
      ],
    },
  ];

  return (
    <div className="rounded-2xl p-6  bg-[#3D3D3D0D] space-y-4">
      <h1 className="text-2xl font-bold text-[#0D2E61] mb-8">Tour Menu</h1>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#0D2E614D]"></div>

        {menuData.map((section, sectionIndex) => (
          <div key={section.title} className="relative mb-12">
            {/* Timeline indicator and title row */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#0D2E61] rounded-full flex items-center justify-center z-10">
                <div className="w-6 h-6 bg-white rounded-full"></div>
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
                className={`grid gap-4 ${
                  section.items.length <= 3
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    : "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4"
                }`}
              >
                {section.items.map((item, itemIndex) => (
                  <Card
                    key={itemIndex}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-175/99">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
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
