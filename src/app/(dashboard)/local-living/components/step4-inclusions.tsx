"use client";

import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

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
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          What's Included & Not Included in Your Tour
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            This tour includes
          </h3>
          <div className="flex flex-wrap gap-2">
            {inclusionOptions.map((item) => (
              <Badge
                key={`included-${item}`}
                variant={
                  formData.included.includes(item) ? "default" : "outline"
                }
                className={`cursor-pointer px-4 py-2 ${
                  formData.included.includes(item)
                    ? "bg-teal-600 hover:bg-teal-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                onClick={() => toggleInclusion(item, "included")}
              >
                {item}
              </Badge>
            ))}
          </div>
          <div className="mt-3">
            <Input
              placeholder="If others, please specify..."
              className="w-full"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            This tour does NOT include
          </h3>
          <div className="flex flex-wrap gap-2">
            {inclusionOptions.map((item) => (
              <Badge
                key={`not-included-${item}`}
                variant={
                  formData.notIncluded.includes(item) ? "default" : "outline"
                }
                className={`cursor-pointer px-4 py-2 ${
                  formData.notIncluded.includes(item)
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                onClick={() => toggleInclusion(item, "notIncluded")}
              >
                {item}
              </Badge>
            ))}
          </div>
          <div className="mt-3">
            <Input
              placeholder="If others, please specify..."
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4Inclusions;
