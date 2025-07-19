"use client";

import { useLanguages } from "@/hooks/use-languages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

interface LanguageDropdownProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

export const LanguageDropdown = <T extends FieldValues>({
  control,
  name,
  label,
}: LanguageDropdownProps<T>) => {
  const { languages, isLoading } = useLanguages();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const language = languages.find(
          (c) => c.objectId === field.value || c.name === field.value
        );
        const value = language ? language.objectId : field.value;

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
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.objectId} value={language.objectId}>
                    {language.name}
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
