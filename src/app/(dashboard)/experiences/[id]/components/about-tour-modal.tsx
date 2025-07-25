"use client";
import { useForm, SubmitHandler, FormProvider, FieldErrors } from "react-hook-form";
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
import toast from "react-hot-toast";
import { useEffect } from "react";
import { CountryDropdown } from "@/components/common/country-dropdown";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useTour } from "@/hooks/use-tour";
import logger from "@/lib/logger";

interface AboutTourModalProps {
  tour: ProposedTour;
  isOpen: boolean;
  onClose: () => void;
  difficultyLevels: string[];
}

export const AboutTourModal: React.FC<AboutTourModalProps> = ({
  tour,
  isOpen,
  onClose,
  difficultyLevels,
}) => {
  const { updateTour, mutate } = useTour(tour.objectId);
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
    control,
    reset,
    formState: { isSubmitting },
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
          ? (tour.difficultyLevel as "Basic" | "Intermediate" | "Advanced")
          : undefined,
        tourFeatures: tour.tourFeatures,
      });
    }
  }, [tour, reset, difficultyLevels]);

  const onFormError = (errors: FieldErrors<ExperienceFormData>) => {
    logger.warn("Form validation errors:", errors);
  };

  const onSubmit: SubmitHandler<ExperienceFormData> = async (data) => {
    logger.info("Submitting form data:", data);
    try {
      await updateTour({ ...data, type: tour.type });
      mutate();
      onClose();
      toast.success("Experience updated successfully");
    } catch (error) {
      logger.error("API submission failed:", error);
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
          <form onSubmit={handleSubmit(onSubmit, onFormError)} className="space-y-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CountryDropdown control={control} name="country" label="Country" />
            <FormField
              control={control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="tourDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Duration</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="difficultyLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {difficultyLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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