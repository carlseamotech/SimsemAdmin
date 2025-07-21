"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CountryDropdown } from "@/components/common/country-dropdown";
import { FormData } from "./types";
import { DurationInput } from "@/components/common/duration-input";
import { CostInput } from "@/components/common/cost-input";

const Step3BasicInfo = () => {
  const { control, register } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#0D2E61]">Basic Information</h2>
      <p className="text-gray-500">
        Provide some basic details about your dining experience.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-lg font-semibold">Country</Label>
          <CountryDropdown control={control} name="country" label="" />
        </div>
        <div>
          <Label htmlFor="city" className="text-lg font-semibold">
            City
          </Label>
          <Input id="city" {...register("city")} className="mt-2 text-base" />
        </div>
        <DurationInput name="mealDuration" label="Meal Duration" />
        <div>
          <Label htmlFor="maxGuest" className="text-lg font-semibold">
            Max Guests
          </Label>
          <Input
            id="maxGuest"
            {...register("maxGuest")}
            className="mt-2 text-base"
          />
        </div>
        <CostInput name="cost" label="Cost per Person" />
      </div>
    </div>
  );
};

export default Step3BasicInfo;
