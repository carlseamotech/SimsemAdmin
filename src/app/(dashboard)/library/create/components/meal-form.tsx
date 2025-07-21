"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createLibraryMeal, uploadFile } from "@/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CountryDropdown } from "@/components/common/country-dropdown";

const mealSchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  cost: z.string().min(1, "Required"),
  dishIds: z.array(z.string()),
  coverImage: z.any(),
});

type MealFormData = z.infer<typeof mealSchema>;

export const MealForm = () => {
  const router = useRouter();
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const form = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
  } = form;

  const onSubmit: SubmitHandler<MealFormData> = async (data) => {
    try {
      let coverImageUrl = "";
      if (coverImageFile) {
        const uploadedFile = await uploadFile(coverImageFile);
        coverImageUrl = uploadedFile.url;
      }

      await createLibraryMeal({
        ...data,
        coverImage: {
          __type: "File",
          name: coverImageFile?.name || "",
          url: coverImageUrl,
        },
      });
      toast.success("Meal created successfully");
      router.push("/experiences?tab=experience-library");
    } catch {
      toast.error("Failed to create meal");
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
      <div>
        <Label htmlFor="coverImage">Cover Image</Label>
        <Input
          id="coverImage"
          type="file"
          onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)}
        />
      </div>
      {/* Add dishIds editing here */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create"}
      </Button>
    </form>
  );
};
