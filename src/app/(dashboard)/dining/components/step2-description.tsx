"use client";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "./types";

const Step2Description = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Meal Description</h2>
      <p>Provide a detailed description of the meal.</p>
      <Textarea
        {...register("description", { required: "Description is required" })}
        placeholder="Enter meal description"
        className="min-h-[150px]"
      />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}
    </div>
  );
};

export default Step2Description;
