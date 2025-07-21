"use client";

import { useCountries } from "@/hooks/use-countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";

interface CountryDropdownProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export const CountryDropdown = <T extends FieldValues>({
  control,
  name,
}: CountryDropdownProps<T>) => {
  const { countries, isLoading } = useCountries();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        if (isLoading) {
          return (
            <FormItem>
              <Skeleton className="h-[59px] w-full rounded-xl" />
              <FormMessage />
            </FormItem>
          );
        }

        const country = countries.find(
          (c) => c.objectId === field.value || c.name === field.value
        );
        const value = country ? country.name : field.value;

        return (
          <FormItem>
            <Select onValueChange={field.onChange} value={value}>
              <FormControl>
                <SelectTrigger className="bg-white h-[59px] rounded-xl focus-visible:ring-0 w-full">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.objectId} value={country.name}>
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
