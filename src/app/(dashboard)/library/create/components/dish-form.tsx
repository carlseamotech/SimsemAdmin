"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createLibraryDish } from "@/services/experiences/library";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

const dishSchema = z.object({
  name: z.string().min(1, "Required"),
  ingredients: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  type: z.string().min(1, "Required"),
  course: z.string().min(1, "Required"),
});

type DishFormData = z.infer<typeof dishSchema>;

export const DishForm = () => {
  const router = useRouter();
  const form = useForm<DishFormData>({
    resolver: zodResolver(dishSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<DishFormData> = async (data) => {
    try {
      await createLibraryDish(data);
      toast.success("Dish created successfully");
      router.push("/experiences?tab=dish-library");
    } catch {
      toast.error("Failed to create dish");
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
        <Input id="country" {...register("country")} />
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
        {isSubmitting ? "Creating..." : "Create"}
      </Button>
    </form>
  );
};
