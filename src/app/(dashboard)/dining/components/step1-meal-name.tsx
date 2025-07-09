"use client";

import type React from "react";
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
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Tour name</h2>
        <p className="text-gray-600">
          Add a descriptive and enticing title for your tour!
        </p>
      </div>

      <div>
        <Input
          value={formData.tourName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, tourName: e.target.value }))
          }
          placeholder="A walk through my campus"
          className="w-full text-lg"
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
