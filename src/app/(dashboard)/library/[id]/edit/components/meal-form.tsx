"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LibraryMeal } from "@/models/library";
import { updateLibraryMeal } from "@/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { CountryDropdown } from "@/components/common/country-dropdown";

const mealSchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  cost: z.string().min(1, "Required"),
  dishIds: z.array(z.string()).optional(),
});

type MealFormData = z.infer<typeof mealSchema>;

interface MealFormProps {
  meal: LibraryMeal;
}

export const MealForm: React.FC<MealFormProps> = ({ meal }) => {
  const router = useRouter();
  const form = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      name: meal.name,
      description: meal.description,
      country: meal.country,
      cost: meal.cost,
      dishIds: meal.dishIds,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
  } = form;

  const onSubmit: SubmitHandler<MealFormData> = async (data) => {
    try {
      await updateLibraryMeal(meal.objectId, data);
      toast.success("Meal updated successfully");
      router.push("/experiences?tab=experience-library");
    } catch {
      toast.error("Failed to update meal");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
      </div>
      <div>
        <Label htmlFor="country">Country</Label>
        <CountryDropdown control={control} name="country" label="Country" />
      </div>
      <div>
        <Label htmlFor="cost">Cost</Label>
        <Input id="cost" {...register("cost")} />
      </div>
      {/* Add dishIds editing here */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};
