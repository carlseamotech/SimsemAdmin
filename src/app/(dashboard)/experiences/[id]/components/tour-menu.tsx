"use client";
import Image from "next/image";
import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MenuIndicatorIcon from "../../../../../../public/experience/menu-indicator.svg";

interface Dish {
  name: string;
  description: string;
  imageUrl: string;
  type: "Meat" | "Vegetarian" | "Vegan";
}

interface Course {
  name: string;
  dishes: Dish[];
}

interface TourMenuProps {
  courses?: string[];
}

export const TourMenu: React.FC<TourMenuProps> = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return null;
  }

  const parsedCourses: Course[] = courses.map((course) => JSON.parse(course));

  return (
    <Card className="bg-[#3D3D3D0D] border-none p-0">
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold text-[#0D2E61] mb-8">Tour Menu</h1>

        <div className="relative">
          {parsedCourses.map((section, index) => {
            const isLast = index === parsedCourses.length - 1;

            return (
              <div
                key={section.name}
                className="relative flex items-start pb-12 last:pb-0 gap-4"
              >
                {!isLast && (
                  <div className="absolute left-[22px] top-8 w-0.5 h-full bg-gray-300 -translate-x-0.5" />
                )}

                <div className="relative z-10 flex items-center justify-center w-[43px] h-[43px]">
                  <Image src={MenuIndicatorIcon} alt="menu indicator icon" />
                </div>

                <div className="flex-1 min-w-0 pt-2">
                  <div className="flex items-center mb-6">
                    <h2 className="text-[20px] font-bold text-[#0D2E61]">
                      {section.name}
                    </h2>
                  </div>

                  <div className="ml-4 md:ml-6">
                    <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {section.dishes.map((item, itemIndex) => (
                        <Card
                          key={`${item.name}-${itemIndex}`}
                          className="overflow-hidden hover:shadow-lg p-2 rounded-2xl transition-shadow duration-200 aspect-h-[184/241] "
                        >
                          <CardContent className="p-0">
                            <div className="relative w-full h-[99px] ">
                              <Image
                                src={item.imageUrl || "/placeholder.svg"}
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
