"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createLibraryTour, uploadFile } from "@/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CountryDropdown } from "@/components/common/country-dropdown";

const tourSchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  cost: z.number().min(0, "Required"),
  minDuration: z.number().min(0, "Required"),
  maxDuration: z.number().min(0, "Required"),
  feature: z.string().min(1, "Required"),
  timeUnit: z.string().min(1, "Required"),
  requirements: z.array(z.string()),
  coverImage: z.any(),
});

type TourFormData = z.infer<typeof tourSchema>;

export const TourForm = () => {
  const router = useRouter();
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const form = useForm<TourFormData>({
    resolver: zodResolver(tourSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
  } = form;

  const onSubmit: SubmitHandler<TourFormData> = async (data) => {
    try {
      let coverImageUrl = "";
      if (coverImageFile) {
        const uploadedFile = await uploadFile(coverImageFile);
        coverImageUrl = uploadedFile.url;
      }

      await createLibraryTour({
        ...data,
        coverImage: {
          __type: "File",
          name: coverImageFile?.name || "",
          url: coverImageUrl,
        },
      });
      toast.success("Tour created successfully");
      router.push("/experiences?tab=experience-library");
    } catch {
      toast.error("Failed to create tour");
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
        <Input
          id="cost"
          type="number"
          {...register("cost", { valueAsNumber: true })}
        />
      </div>
      <div>
        <Label htmlFor="minDuration">Min Duration</Label>
        <Input
          id="minDuration"
          type="number"
          {...register("minDuration", { valueAsNumber: true })}
        />
      </div>
      <div>
        <Label htmlFor="maxDuration">Max Duration</Label>
        <Input
          id="maxDuration"
          type="number"
          {...register("maxDuration", { valueAsNumber: true })}
        />
      </div>
      <div>
        <Label htmlFor="feature">Feature</Label>
        <Input id="feature" {...register("feature")} />
      </div>
      <div>
        <Label htmlFor="timeUnit">Time Unit</Label>
        <Input id="timeUnit" {...register("timeUnit")} />
      </div>
      <div>
        <Label htmlFor="coverImage">Cover Image</Label>
        <Input
          id="coverImage"
          type="file"
          onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)}
        />
      </div>
      {/* Add requirements editing here */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create"}
      </Button>
    </form>
  );
};
