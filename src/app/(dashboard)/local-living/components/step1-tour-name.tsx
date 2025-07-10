"use client";

import type React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

interface Step5TourNameProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Step1TourName: React.FC<Step5TourNameProps> = ({
  formData,
  setFormData,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[30px] text-[#0D2E61] mb-2">Tour name</h2>
        <p className="text-[#00000099] text-[15px]">
          Add a descriptive and enticing title for your tour!
        </p>
      </div>

      <div className="space-y-2">
        <Textarea
          value={formData.tourName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, tourName: e.target.value }))
          }
          placeholder="The Ultimate Breakfast at Istanbul"
          className="w-full text-[25px] text-[#00000066] py-4 px-4 bg-[#00000008] min-h-[130px] focus-visible:ring-[1px] "
          maxLength={60}
        />

        <p className="text-sm text-gray-500 mt-1">
          {formData.tourName.length}/60
        </p>
      </div>
    </div>
  );
};

export default Step1TourName;
