"use client";

import type React from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FormData } from "./types";
import { CountryDropdown } from "@/components/common/country-dropdown";
import { useFormContext } from "react-hook-form";

const Step3BasicInfo: React.FC = () => {
  const { control, register, watch, setValue } = useFormContext<FormData>();
  const tourFeatures = watch("tourFeatures") || [];

  const categories = [
    "Historical",
    "Culture",
    "Architecture",
    "Culinary",
    "Guided Tours",
  ];

  const toggleCategory = (category: string) => {
    const currentFeatures = tourFeatures;
    const newFeatures = currentFeatures.includes(category)
      ? currentFeatures.filter((c: string) => c !== category)
      : [...currentFeatures, category];
    setValue("tourFeatures", newFeatures);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-[30px]  text-[#0D2E61] ">Tell us a bit more</h2>

      <div className="space-y-6  ">
        <div className="flex flex-row gap-4">
          <div className="space-y-6 w-full">
            <div className="w-1/2 ">
              <label className="block text-[20px] font-bold text-[#000000B2] mb-2">
                To which country do you want to make this experience available
              </label>

              <CountryDropdown control={control} name="country" label="" />
            </div>

            <div className="w-1/2 ">
              <label className="block text-[20px] font-bold text-[#000000B2] mb-2">
                Tour Cost per Person
              </label>

              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[19px]  text-[#000000B2] ">
                  $
                </div>

                <Input
                  type="number"
                  {...register("cost")}
                  placeholder="20"
                  className="bg-[#00000008]  placeholder:text-[19px] md:text-[19px]  text-[#000000B2] h-[59px] rounded-xl  focus-visible:ring-0 pl-7"
                />
              </div>
            </div>
          </div>

          <div />
        </div>

        <div>
          <label className="block text-[20px] font-bold text-[#000000B2] mb-2">
            Tour Duration
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-[14px] font-semibold text-[#000000B2] mb-1">
                Duration
              </label>

              <div className="flex items-center ">
                <Input
                  type="text"
                  {...register("tourDuration")}
                  className="bg-[#00000008]  placeholder:text-[19px] md:text-[19px]  text-[#000000B2]  h-[59px] rounded-xl  focus-visible:ring-0"
                  placeholder="2 hours"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[20px] font-bold text-[#000000B2] mb-2">
            Select what best describes your tour
          </label>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={
                  tourFeatures.includes(category) ? "default" : "outline"
                }
                className={`cursor-pointer px-8 py-2 h-[59px] text-[19px] font-normal rounded-2xl ${
                  tourFeatures.includes(category)
                    ? "bg-[#FEC540] hover:bg-yellow-500 text-white"
                    : "bg-[#00000008] hover:bg-gray-200 text-[#000000B2]"
                }`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3BasicInfo;
