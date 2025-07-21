"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrashIcon, XIcon } from "lucide-react";
import { FormData, Dish } from "./types";
import { useLibraryDishes } from "@/hooks/use-library-dishes";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

const Step4Menu = () => {
  const { control, setValue, watch } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });
  const { dishes, isLoading } = useLibraryDishes();

  const handleDishSelect = (courseIndex: number, dish: Dish) => {
    const currentDishes = watch(`courses.${courseIndex}.dishes`) || [];
    if (!currentDishes.some((d: Dish) => d.objectId === dish.objectId)) {
      setValue(`courses.${courseIndex}.dishes`, [...currentDishes, dish]);
    }
  };

  const handleDishRemove = (courseIndex: number, dishId: string) => {
    const currentDishes = watch(`courses.${courseIndex}.dishes`) || [];
    setValue(
      `courses.${courseIndex}.dishes`,
      currentDishes.filter((d: Dish) => d.objectId !== dishId)
    );
  };

  return (
    <div className="space-y-4">
      <Label className="text-2xl font-bold">Menu</Label>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <Input
              {...control.register(`courses.${index}.name`)}
              placeholder="Course Name (e.g., Starter, Main, Dessert)"
              className="text-lg font-semibold"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => remove(index)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Selected Dishes:</Label>
            <div className="flex flex-wrap gap-2">
              {(watch(`courses.${index}.dishes`) || []).map((dish: Dish) => (
                <Badge key={dish.objectId} variant="secondary" className="flex items-center gap-1">
                  {dish.name}
                  <button
                    type="button"
                    onClick={() => handleDishRemove(index, dish.objectId)}
                    className="ml-1 rounded-full hover:bg-gray-300"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <Command>
            <CommandInput placeholder="Search for a dish to add..." />
            <CommandList>
              {isLoading && <CommandEmpty>Loading dishes...</CommandEmpty>}
              <CommandEmpty>No dishes found.</CommandEmpty>
              <CommandGroup>
                {dishes.map((dish) => (
                  <CommandItem
                    key={dish.objectId}
                    onSelect={() => handleDishSelect(index, dish)}
                  >
                    {dish.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => append({ name: "", dishes: [] })}
        variant="outline"
      >
        Add Course
      </Button>
    </div>
  );
};

export default Step4Menu;
