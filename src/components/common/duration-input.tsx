"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DurationInputProps {
  name: string;
  label: string;
}

export const DurationInput: React.FC<DurationInputProps> = ({
  name,
  label,
}) => {
  const { register, setValue, getValues, watch } = useFormContext();
  const currentValue = watch(name);

  const handleUnitClick = (unit: "hour" | "minutes") => {
    const currentVal = getValues(name) || "";
    const numberValue = parseInt(currentVal, 10);

    if (!isNaN(numberValue)) {
      const pluralUnit = numberValue !== 1 ? `${unit}s` : unit;
      setValue(name, `${numberValue} ${pluralUnit}`, { shouldValidate: true });
    }
  };

  return (
    <div>
      <Label htmlFor={name} className="text-lg font-semibold">
        {label}
      </Label>
      <div className="flex items-center gap-2 mt-2">
        <Input
          id={name}
          {...register(name)}
          className="text-base"
          placeholder="e.g., 2"
        />
        <Button
          type="button"
          variant={currentValue?.includes("hour") ? "default" : "outline"}
          onClick={() => handleUnitClick("hour")}
        >
          Hour
        </Button>
        <Button
          type="button"
          variant={currentValue?.includes("minute") ? "default" : "outline"}
          onClick={() => handleUnitClick("minutes")}
        >
          Minutes
        </Button>
      </div>
    </div>
  );
};
