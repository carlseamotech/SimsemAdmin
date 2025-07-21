"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LibraryTour } from "@/models/library";
import { updateLibraryTour } from "@/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
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
  requirements: z.array(z.string()).optional(),
});

type TourFormData = z.infer<typeof tourSchema>;

interface TourFormProps {
  tour: LibraryTour;
}

export const TourForm: React.FC<TourFormProps> = ({ tour }) => {
  const router = useRouter();
  const form = useForm<TourFormData>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      name: tour.name,
      description: tour.description,
      country: tour.country,
      cost: tour.cost,
      minDuration: tour.minDuration,
      maxDuration: tour.maxDuration,
      feature: tour.feature,
      timeUnit: tour.timeUnit,
      requirements: tour.requirements,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
  } = form;

  const onSubmit: SubmitHandler<TourFormData> = async (data) => {
    try {
      await updateLibraryTour(tour.objectId, data);
      toast.success("Tour updated successfully");
      router.push("/experiences?tab=experience-library");
    } catch {
      toast.error("Failed to update tour");
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
      {/* Add requirements editing here */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};
