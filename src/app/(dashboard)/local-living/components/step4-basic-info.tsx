"use client";

import type React from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FormData } from "./types";
import { CountryDropdown } from "@/components/common/country-dropdown";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

const Step4BasicInfo: React.FC = () => {
  const { control, register, watch, setValue } = useFormContext<FormData>();
  const tourFeatures = watch("tourFeatures") || [];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tourPackages",
  });

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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[20px] font-bold text-[#000000B2] mb-2">
                  To which country do you want to make this experience available
                </label>
                <CountryDropdown control={control} name="country" label="" />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-[20px] font-bold text-[#000000B2] mb-2"
                >
                  City
                </label>
                <Input
                  id="city"
                  {...register("city")}
                  placeholder="Enter city"
                  className="bg-[#00000008] placeholder:text-[16px] md:text-[16px] text-[#000000B2] h-[50px] rounded-xl focus-visible:ring-0"
                />
              </div>
            </div>

            <div>
              <label className="block text-[20px] font-bold text-[#000000B2] mb-2">
                Tour Packages
              </label>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-4">
                    <Input
                      {...register(`tourPackages.${index}.fromPerson`)}
                      placeholder="From Person"
                      className="bg-[#00000008] placeholder:text-[16px] md:text-[16px] text-[#000000B2] h-[50px] rounded-xl focus-visible:ring-0"
                    />
                    <Input
                      {...register(`tourPackages.${index}.toPerson`)}
                      placeholder="To Person"
                      className="bg-[#00000008] placeholder:text-[16px] md:text-[16px] text-[#000000B2] h-[50px] rounded-xl focus-visible:ring-0"
                    />
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[16px] text-[#000000B2]">
                        $
                      </div>
                      <Input
                        {...register(`tourPackages.${index}.cost`)}
                        placeholder="Cost"
                        className="bg-[#00000008] placeholder:text-[16px] md:text-[16px] text-[#000000B2] h-[50px] rounded-xl focus-visible:ring-0 pl-7"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                onClick={() =>
                  append({ fromPerson: "", toPerson: "", cost: "" })
                }
                className="mt-4"
              >
                Add Package
              </Button>
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

              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  {...register("tourDuration")}
                  className="bg-[#00000008]  placeholder:text-[19px] md:text-[19px]  text-[#000000B2]  h-[59px] rounded-xl  focus-visible:ring-0"
                  placeholder="2"
                />
                <Button
                  type="button"
                  onClick={() => setValue("tourDuration", `${watch("tourDuration")} hour`)}
                >
                  Hour
                </Button>
                <Button
                  type="button"
                  onClick={() => setValue("tourDuration", `${watch("tourDuration")} minutes`)}
                >
                  Minutes
                </Button>
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

export default Step4BasicInfo;
