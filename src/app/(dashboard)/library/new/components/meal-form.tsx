"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createLibraryMeal, uploadFile } from "@/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { CountryDropdown } from "@/components/common/country-dropdown";
import { useState } from "react";

const mealSchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  cost: z.string().min(1, "Required"),
  dishIds: z.array(z.string()).optional(),
  coverImage: z.any(),
});

type MealFormData = z.infer<typeof mealSchema>;

export const MealForm: React.FC = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      name: "",
      description: "",
      country: "",
      cost: "",
      dishIds: [],
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
      setIsUploading(true);
      const imageFile = data.coverImage[0];
      const uploadedImage = await uploadFile(imageFile);
      setIsUploading(false);

      await createLibraryMeal({
        ...data,
        dishIds: data.dishIds || [],
        coverImage: {
          __type: "File",
          name: uploadedImage.name,
          url: uploadedImage.url,
        },
      });
      toast.success("Meal created successfully");
      router.push("/library?tab=meals");
    } catch {
      setIsUploading(false);
      toast.error("Failed to create meal");
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
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <CountryDropdown control={control} name="country" />
        </div>
        <div>
          <Label htmlFor="cost">Cost</Label>
          <Input id="cost" {...register("cost")} />
        </div>
        <div>
          <Label htmlFor="coverImage">Cover Image</Label>
          <Input id="coverImage" type="file" {...register("coverImage")} />
        </div>
        {/* Add dishIds editing here */}
        <Button type="submit" disabled={isSubmitting || isUploading}>
          {isSubmitting || isUploading ? "Creating..." : "Create"}
        </Button>
      </form>
    </FormProvider>
  );
};
