"use client";

import type React from "react";
import { Input } from "@/components/ui/input";
import type { DiningFormData } from "../page";

interface Step1MealNameProps {
  formData: DiningFormData;
  setFormData: React.Dispatch<React.SetStateAction<DiningFormData>>;
}

const Step1MealName: React.FC<Step1MealNameProps> = ({
  formData,
  setFormData,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-blue-900 mb-2">
          Name your meal
        </h2>
        <p className="text-gray-600">
          Add a descriptive and enticing title for your menu!
        </p>
      </div>

      <div>
        <Input
          value={formData.mealName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, mealName: e.target.value }))
          }
          placeholder="The Ultimate Breakfast at Istanbul"
          className="w-full text-lg py-6 px-4"
          maxLength={60}
        />
        <p className="text-sm text-gray-500 mt-1">
          {formData.mealName.length}/60
        </p>
      </div>
    </div>
  );
};

export default Step1MealName;
