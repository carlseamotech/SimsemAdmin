"use client";

import type React from "react";
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

interface Step2DescriptionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Step2Description: React.FC<Step2DescriptionProps> = ({
  formData,
  setFormData,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[30px] text-[#0D2E61] mb-2">Tour description</h2>
        <p className="text-[#00000099] text-[15px]">
          Provide a brief overview of your tour
        </p>
      </div>

      <div>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="A walk through my campus in Turkey offers a delightful blend of modernity and tradition. You'll explore a vibrant community of students from diverse backgrounds, hear Turkish conversations, and witness cultural activities like backgammon games and tea-drinking at local cafes. In just a short walk, you'll experience the essence of Turkey's unique cultural tapestry."
          rows={8}
          className="w-full text-[18px] focus-visible:ring-[1px] text-[#00000066] py-4 px-4 bg-[#00000008] min-h-[257px]  "
        />
      </div>
    </div>
  );
};

export default Step2Description;
