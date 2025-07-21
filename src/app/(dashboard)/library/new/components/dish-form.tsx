"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createLibraryDish, uploadFile } from "@/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { CountryDropdown } from "@/components/common/country-dropdown";
import { useState } from "react";

const dishSchema = z.object({
  name: z.string().min(1, "Required"),
  ingredients: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  type: z.string().min(1, "Required"),
  course: z.string().min(1, "Required"),
  image: z.any(),
});

type DishFormData = z.infer<typeof dishSchema>;

export const DishForm: React.FC = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm<DishFormData>({
    resolver: zodResolver(dishSchema),
    defaultValues: {
      name: "",
      ingredients: "",
      country: "",
      type: "",
      course: "",
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
      setIsUploading(true);
      const imageFile = data.image[0];
      const uploadedImage = await uploadFile(imageFile);
      setIsUploading(false);

      await createLibraryDish({
        ...data,
        image: {
          __type: "File",
          name: uploadedImage.name,
          url: uploadedImage.url,
        },
      });
      toast.success("Dish created successfully");
      router.push("/library?tab=dishes");
    } catch {
      setIsUploading(false);
      toast.error("Failed to create dish");
    }
  };

  return (
    <FormProvider {...form}>
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
          <CountryDropdown control={control} name="country" />
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Input id="type" {...register("type")} />
        </div>
        <div>
          <Label htmlFor="course">Course</Label>
          <Input id="course" {...register("course")} />
        </div>
        <div>
          <Label htmlFor="image">Image</Label>
          <Input id="image" type="file" {...register("image")} />
        </div>
        <Button type="submit" disabled={isSubmitting || isUploading}>
          {isSubmitting || isUploading ? "Creating..." : "Create"}
        </Button>
      </form>
    </FormProvider>
  );
};
