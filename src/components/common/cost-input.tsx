"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CostInputProps {
  name: string;
  label: string;
}

export const CostInput: React.FC<CostInputProps> = ({ name, label }) => {
  const { register } = useFormContext();

  return (
    <div>
      <Label htmlFor={name} className="text-lg font-semibold">
        {label}
      </Label>
      <div className="relative mt-2">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <Input
          id={name}
          {...register(name)}
          className="pl-7 text-base"
          placeholder="0.00"
        />
      </div>
    </div>
  );
};
