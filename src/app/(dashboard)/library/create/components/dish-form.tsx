"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createLibraryDish } from "@/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { CountryDropdown } from "@/components/common/country-dropdown";
import SingleFileUploader from "@/components/common/single-file-uploader";

const dishSchema = z.object({
  name: z.string().min(1, "Required"),
  ingredients: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  type: z.string().min(1, "Required"),
  course: z.string().min(1, "Required"),
  imageUrl: z.string().min(1, "Image is required"),
});

type DishFormData = z.infer<typeof dishSchema>;

export const DishForm = () => {
  const router = useRouter();
  const methods = useForm<DishFormData>({
    resolver: zodResolver(dishSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
  } = methods;

  const onSubmit: SubmitHandler<DishFormData> = async (data) => {
    try {
      const dishData = {
        ...data,
        image: {
          __type: "File" as const,
          name: "image.jpg", // This is not ideal, but the uploader doesn't provide the name
          url: data.imageUrl,
        },
      };
      await createLibraryDish(dishData);
      toast.success("Dish created successfully");
      router.push("/experiences?tab=dish-library");
    } catch {
      toast.error("Failed to create dish");
    }
  };

  return (
    <FormProvider {...methods}>
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
        <SingleFileUploader name="imageUrl" label="Image" />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create"}
        </Button>
      </form>
    </FormProvider>
  );
};