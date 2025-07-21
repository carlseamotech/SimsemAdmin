"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "./types";

const Step2MealName = () => {
  const { register } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#0D2E61]">
        What is the name of your meal?
      </h2>
      <p className="text-gray-500">
        This will be the title of your dining experience.
      </p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-lg font-semibold">
            Meal Name
          </Label>
          <Input id="name" {...register("name")} className="mt-2 text-base" />
        </div>
      </div>
    </div>
  );
};

export default Step2MealName;
