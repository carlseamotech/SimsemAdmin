"use client";

import type React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import ClockIcon from "../../../../../public/experience/clock-icon.svg";
import LocationIcon from "../../../../../public/experience/location-icon.svg";
import cover from "../../../../../public/dining-test.png";
import CheckIcon from "../../../../../public/experience/check-icon.svg";
import XIcon from "../../../../../public/experience/x-icon.svg";
import MenuIndicatorIcon from "../../../../../public/experience/menu-indicator.svg";
import type { DiningFormData } from "../page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Step8SummaryProps {
  formData: DiningFormData;
}

const Step8Summary: React.FC<Step8SummaryProps> = ({ formData }) => {
  const menuData = [
    {
      title: "Starter",
      items: [
        {
          name: "Baba Ganoush",
          description: "Creamy eggplant dip with tahini, garlic, and lemon",
          image: cover || "/placeholder.svg?height=120&width=120",
          type: "Meat",
        },
        {
          name: "Ful Medames",
          description: "Traditional fava beans with olive oil and spices",
          image: cover || "/placeholder.svg?height=120&width=120",
          type: "Vegetarian",
        },
        {
          name: "Falafel",
          description: "Crispy chickpea fritters with herbs and spices",
          image: cover || "/placeholder.svg?height=120&width=120",
          type: "Vegetarian",
        },
        {
          name: "Aish Baladi",
          description: "Traditional Egyptian flatbread, freshly baked",
          image: cover || "/placeholder.svg?height=120&width=120",
          type: "Vegetarian",
        },
        {
          name: "Tamiya",
          description: "Egyptian-style falafel made with fava beans",
          image: cover || "/placeholder.svg?height=120&width=120",
          type: "Vegetarian",
        },
        {
          name: "Shakshuka",
          description: "Eggs poached in spiced tomato sauce",
          image: cover || "/placeholder.svg?height=120&width=120",
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
          image: cover || "/placeholder.svg?height=120&width=120",
          type: "Meat",
        },
        {
          name: "Hamam Mahshi",
          description: "Stuffed pigeon with rice and aromatic spices",
          image: cover || "/placeholder.svg?height=120&width=120",
          type: "Meat",
        },
        {
          name: "Masli Kromb",
          description: "Cabbage rolls stuffed with rice and herbs",
          image: cover || "/placeholder.svg?height=120&width=120",
          type: "Vegetarian",
        },
        {
          name: "Mahshi Fitfit",
          description: "Mixed stuffed vegetables with rice and herbs",
          image: cover || "/placeholder.svg?height=120&width=120",
          type: "Vegetarian",
        },
        {
          name: "Mulukhiya",
          description: "Traditional green soup with chicken or meat",
          image: cover || "/placeholder.svg?height=120&width=120",
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
          image: cover || "/placeholder.svg?height=120&width=120",
          type: "Vegetarian",
        },
      ],
    },
  ];

  // const tourFeatures = [
  //   "Culture",
  //   "Gratuities",
  //   "Shopping",
  //   "Outdoor",
  //   "Workshop",
  // ];

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <h1 className="text-[30px] text-[#0D2E61] capitalize">
          Dining Summary
        </h1>

        <p className="text-[#000000B2] text-[17px] ">
          Review all the tour details and click confirm
        </p>
      </div>

      <div className="m space-y-8 shadow-lg   drop-shadow-lg rounded-2xl p-8">
        <div className=" border-b rounded-none shadow-none flex justify-between items-center py-6">
          <div>
            <h1 className="text-[15px] text-[#3D3D3DCC]">MEAL NAME</h1>
            <p className="text-[#0D2E61] text-[30px] font-bold ">
              The Ultimate Breakfast at Istanbul
            </p>
          </div>

          <Button className="h-[64px] bg-[#FB8B24] hover:bg-orange-400 font-bold text-white text-[22px] cursor-pointer rounded-full">
            $30.00/ Person
          </Button>
        </div>

        <div className=" flex flex-col gap-8 ">
          {/* about the toour */}
          <div className=" rounded-2xl p-6  bg-[#3D3D3D0D]  flex flex-col gap-6">
            <div className="text-[24px] font-bold text-[#0D2E61]">
              About the tour
            </div>

            <div>
              <p className="text-[#3D3D3D] text-[18px] ">
                {/* {formData.description} */}
                We’ll pick you up from your hotel in Giza or Cairo downtown at
                9am. Then start out tour to visit: Giza Pyramids and Sphinx, the
                panorama fot the best view of the pyramid, Came Rides (30
                minutes), ATV Quad Bikes (60 minutes). Ticket to the whole area
                of the Pyramids and Sphinx is included. After the day trip,
                we’ll transfer you back to your hotel. End of tour.
              </p>
            </div>

            <div className="grid grid-cols-3 items-center w-full lg:w-3/3 h-[55px]">
              <div className="border-y p-4 border-[#3D3D3D1A] flex flex-row items- center justify-center gap-2 h-full ">
                <Image
                  src={LocationIcon}
                  alt="location icon"
                  className="object-contain"
                />

                <span className="text-[#3D3D3D] font-bold text-[15px] capitalize truncate space-x-1">
                  <span className="text-[#0D2E61] text-[15px] ">Country:</span>
                  <span>
                    {/* {formData.city},  
                  {formData.country}*/}
                    Istanbul, Turkey
                  </span>
                </span>
              </div>

              {/* <div className="border-y border-l p-4 border-[#3D3D3D1A]  text-[#3D3D3D]  flex flex-row items-center justify-center gap-2 h-full  ">
                <Image
                  src={ClockIcon}
                  alt="clock icon"
                  className="object-contain"
                />

                <span className="text-[#3D3D3D] font-bold text-[15px] capitalize truncate space-x-1">
                  <span className="text-[#0D2E61] text-[15px] ">Duration:</span>
                  <span> 2-3 Hours</span>
                </span>
              </div> */}
            </div>

            {/* <div className="flex flex-wrap gap-2 ">
              {tourFeatures.map((feature) => (
                <Badge
                  key={feature}
                  className="text-[15px] text-[#3D3D3D] bg-[#0D2E610D] rounded-full px-4 py-1.5"
                >
                  {feature}
                </Badge>
              ))}
            </div> */}
          </div>

          {/* cover photo */}
          <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-4">
            <div className="text-[24px] font-bold text-[#0D2E61]">
              Cover Photo
            </div>

            {/* This wrapper ensures responsive ratio */}
            <div className="relative w-full aspect-[887/312] rounded-lg overflow-hidden">
              <Image
                src={cover}
                alt="Cover photo"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Menu */}
          <Card className="bg-[#3D3D3D0D] border-none p-0">
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold text-[#0D2E61] mb-8">
                Tour Menu
              </h1>

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
                        <Image
                          src={MenuIndicatorIcon}
                          alt="menu indicator icon"
                        />
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
        </div>
      </div>
    </div>
  );
};

export default Step8Summary;
