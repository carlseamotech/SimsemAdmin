"use client";

import { useCountries } from "@/hooks/use-countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

interface CountryDropdownProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

export const CountryDropdown = <T extends FieldValues>({
  control,
  name,
  label,
}: CountryDropdownProps<T>) => {
  const { countries, isLoading } = useCountries();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const country = countries.find(
          (c) => c.objectId === field.value || c.name === field.value
        );
        const value = country ? country.objectId : field.value;

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <Select
              onValueChange={field.onChange}
              value={value}
              disabled={isLoading}
            >
              <FormControl>
                <SelectTrigger className="bg-white h-[59px] rounded-xl focus-visible:ring-0 w-full">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.objectId} value={country.objectId}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
