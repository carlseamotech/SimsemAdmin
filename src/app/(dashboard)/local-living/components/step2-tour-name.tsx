"use client";

import type React from "react";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "./types";
import { useFormContext } from "react-hook-form";

const Step1TourName: React.FC = () => {
  const { register, watch } = useFormContext<FormData>();
  const name = watch("name");

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
          {...register("name")}
          placeholder="The Ultimate Breakfast at Istanbul"
          className="w-full text-[25px] text-[#00000066] py-4 px-4 bg-[#00000008] min-h-[130px] focus-visible:ring-[1px] "
          maxLength={60}
        />

        <p className="text-sm text-gray-500 mt-1">
          {name?.length || 0}/60
        </p>
      </div>
    </div>
  );
};

export default Step1TourName;
