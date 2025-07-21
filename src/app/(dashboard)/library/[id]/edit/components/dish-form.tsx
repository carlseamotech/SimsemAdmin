"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LibraryDish } from "@/models/library";
import { updateLibraryDish } from "@/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { CountryDropdown } from "@/components/common/country-dropdown";

const dishSchema = z.object({
  name: z.string().min(1, "Required"),
  ingredients: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  type: z.string().min(1, "Required"),
  course: z.string().min(1, "Required"),
});

type DishFormData = z.infer<typeof dishSchema>;

interface DishFormProps {
  dish: LibraryDish;
}

export const DishForm: React.FC<DishFormProps> = ({ dish }) => {
  const router = useRouter();
  const form = useForm<DishFormData>({
    resolver: zodResolver(dishSchema),
    defaultValues: {
      name: dish.name,
      ingredients: dish.ingredients,
      country: dish.country,
      type: dish.type,
      course: dish.course,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
  } = form;

  const onSubmit: SubmitHandler<DishFormData> = async (data) => {
    try {
      await updateLibraryDish(dish.objectId, data);
      toast.success("Dish updated successfully");
      router.push("/experiences?tab=dish-library");
    } catch {
      toast.error("Failed to update dish");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
      </div>
      <div>
        <Label htmlFor="ingredients">Ingredients</Label>
        <Textarea id="ingredients" {...register("ingredients")} />
      </div>
      <div>
        <Label htmlFor="country">Country</Label>
        <CountryDropdown control={control} name="country" label="Country" />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Input id="type" {...register("type")} />
      </div>
      <div>
        <Label htmlFor="course">Course</Label>
        <Input id="course" {...register("course")} />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};
