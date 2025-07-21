"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  experienceSchema,
  ExperienceFormData,
} from "./experience-schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProposedTour } from "@/models/proposed-tour";
import { updateCustomTour } from "@/services";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { CountryDropdown } from "@/components/common/country-dropdown";

interface AboutTourModalProps {
  tour: ProposedTour;
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
  difficultyLevels: string[];
}

export const AboutTourModal: React.FC<AboutTourModalProps> = ({
  tour,
  isOpen,
  onClose,
  mutate,
  difficultyLevels,
}) => {
  const methods = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      name: "",
      description: "",
      country: "",
      city: "",
      tourDuration: "",
      difficultyLevel: undefined,
      tourFeatures: [],
    },
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting },
    reset,
    control,
  } = methods;

  useEffect(() => {
    if (tour) {
      reset({
        name: tour.name,
        description: tour.description,
        country: tour.country,
        city: tour.city,
        tourDuration: tour.tourDuration,
        difficultyLevel: difficultyLevels.includes(
          tour.difficultyLevel as string
        )
          ? (tour.difficultyLevel as "Beginner" | "Intermediate" | "Advanced")
          : undefined,
        tourFeatures: tour.tourFeatures,
      });
    }
  }, [tour, reset, difficultyLevels]);

  const onSubmit: SubmitHandler<ExperienceFormData> = async (data) => {
    try {
      await updateCustomTour(tour.objectId, data);
      mutate();
      onClose();
      toast.success("Experience updated successfully");
    } catch {
      toast.error("Failed to update experience");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit About the Tour</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input id="name" {...register("name")} />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea id="description" {...register("description")} />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <CountryDropdown control={control} name="country" label="Country" />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <Input id="city" {...register("city")} />
            </div>
            <div>
              <label htmlFor="tourDuration" className="block text-sm font-medium text-gray-700">
                Tour Duration
              </label>
              <Input id="tourDuration" {...register("tourDuration")} />
            </div>
            <div>
              <label htmlFor="difficultyLevel" className="block text-sm font-medium text-gray-700">
                Difficulty Level
              </label>
              <Select
                onValueChange={(value) =>
                  setValue(
                    "difficultyLevel",
                    value as "Beginner" | "Intermediate" | "Advanced"
                  )
                }
                defaultValue={tour.difficultyLevel}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficultyLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Add tour features editing here */}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
