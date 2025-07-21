"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrashIcon } from "lucide-react";
import { FormData } from "./types";

const Step6ThingsToKnow = () => {
  const { control, register } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "thingsToKnow",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#0D2E61]">Things to Know</h2>
      <p className="text-gray-500">
        Provide any additional information your guests should know.
      </p>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="flex-1 space-y-2">
              <Label htmlFor={`thingsToKnow.${index}.title`} className="text-base font-semibold">
                Title
              </Label>
              <Input
                id={`thingsToKnow.${index}.title`}
                {...register(`thingsToKnow.${index}.title`)}
                placeholder="e.g., Cancellation Policy"
                className="text-base"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor={`thingsToKnow.${index}.description`} className="text-base font-semibold">
                Description
              </Label>
              <Input
                id={`thingsToKnow.${index}.description`}
                {...register(`thingsToKnow.${index}.description`)}
                placeholder="e.g., Full refund if cancelled 24 hours in advance."
                className="text-base"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => remove(index)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => append({ title: "", description: "" })}
          variant="outline"
        >
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default Step6ThingsToKnow;
