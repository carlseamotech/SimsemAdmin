"use client";
import { BiPlus } from "react-icons/bi";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormData {
  country: string;
  costPerPerson: string;
  minDuration: string;
  maxDuration: string;
  categories: string[];
  description: string;
  coverPhoto: File | null;
  included: string[];
  notIncluded: string[];
  tourName: string;
}

interface Step4InclusionsProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Step4Inclusions: React.FC<Step4InclusionsProps> = ({
  formData,
  setFormData,
}) => {
  const inclusionOptions = [
    "Breakfast",
    "Lunch",
    "Bottled Water",
    "Transportation",
    "Tickets",
    "Accommodation",
    "Entrance Fees",
    "Snacks",
  ];

  const toggleInclusion = (item: string, type: "included" | "notIncluded") => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].includes(item)
        ? prev[type].filter((i) => i !== item)
        : [...prev[type], item],
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-[30px]  text-[#0D2E61] ">
        What's Included & Not Included in Your Tour
      </h2>

      <div className="space-y-6">
        <div className="space-y-8">
          <h3 className="block text-[20px] font-bold text-[#000000B2] mb-2">
            This tour includes
          </h3>

          <div className="flex flex-wrap gap-3">
            {inclusionOptions.map((item) => (
              <Badge
                key={`included-${item}`}
                variant={
                  formData.included.includes(item) ? "default" : "outline"
                }
                className={`cursor-pointer px-8 py-2 h-[59px] text-[19px] font-normal rounded-2xl ${
                  formData.included.includes(item)
                    ? "bg-[#0F4C5C] hover:bg-cyan-800 text-white"
                    : "bg-[#00000008] hover:bg-gray-200 text-[#000000B2]"
                }`}
                onClick={() => toggleInclusion(item, "included")}
              >
                {item}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 ">
            <div className="h-[59px] col-span-1 flex">
              <Input
                placeholder="If others, please specify..."
                className=" placeholder:text-[19px] md:text-[19px]  h-[59px] rounded-l-3xl rounded-r-sm   focus-visible:ring-0 px-4 "
              />

              <Button
                variant="outline"
                className="bg-gray-200 h-full cursor-pointer flex justify-center items-center rounded-r-3xl rounded-l-sm w-18"
              >
                <BiPlus />
              </Button>
            </div>

            <div className="col-span-1" />
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="block text-[20px] font-bold text-[#000000B2] mb-2">
            This tour does NOT include
          </h3>
          <div className="flex flex-wrap gap-2">
            {inclusionOptions.map((item) => (
              <Badge
                key={`not-included-${item}`}
                variant={
                  formData.notIncluded.includes(item) ? "default" : "outline"
                }
                className={`cursor-pointer px-8 py-2 h-[59px] text-[19px] font-normal rounded-2xl ${
                  formData.notIncluded.includes(item)
                    ? "bg-[#9A031E] hover:bg-red-800 text-white"
                    : "bg-[#00000008] hover:bg-gray-200 text-[#000000B2]"
                }`}
                onClick={() => toggleInclusion(item, "notIncluded")}
              >
                {item}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 ">
            <div className="h-[59px] col-span-1 flex">
              <Input
                placeholder="If others, please specify..."
                className=" placeholder:text-[19px] md:text-[19px]  h-[59px] rounded-l-3xl rounded-r-sm   focus-visible:ring-0 px-4 "
              />

              <Button
                variant="outline"
                className="bg-gray-200 h-full cursor-pointer flex justify-center items-center rounded-r-3xl rounded-l-sm w-18"
              >
                <BiPlus />
              </Button>
            </div>

            <div className="col-span-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4Inclusions;
