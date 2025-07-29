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

export const DishForm: React.FC = () => {
  const router = useRouter();
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
      await createLibraryDish({
        ...data,
        image: {
          __type: "File",
          name: "image.jpg",
          url: data.imageUrl,
        },
      });
      toast.success("Dish created successfully");
      router.push("/library?tab=dishes");
    } catch {
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
        <SingleFileUploader name="imageUrl" label="Image" />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create"}
        </Button>
      </form>
    </FormProvider>
  );
};