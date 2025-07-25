"use client";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProposedTour } from "@/models/proposed-tour";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { z } from "zod";
import { TrashIcon } from "lucide-react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useTour } from "@/hooks/use-tour";
import logger from "@/lib/logger";

const inclusionsExclusionsSchema = z.object({
  inclusions: z.array(z.object({ value: z.string().min(1, "Required") })),
  exclusions: z.array(z.object({ value: z.string().min(1, "Required") })),
});

type InclusionsExclusionsFormData = z.infer<
  typeof inclusionsExclusionsSchema
>;

interface InclusionsExclusionsModalProps {
  tour: ProposedTour;
  isOpen: boolean;
  onClose: () => void;
}

export const InclusionsExclusionsModal: React.FC<
  InclusionsExclusionsModalProps
> = ({ tour, isOpen, onClose }) => {
  const { updateTour, mutate } = useTour(tour.objectId);
  const methods = useForm<InclusionsExclusionsFormData>({
    resolver: zodResolver(inclusionsExclusionsSchema),
    defaultValues: {
      inclusions: [],
      exclusions: [],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const {
    fields: inclusionFields,
    append: appendInclusion,
    remove: removeInclusion,
  } = useFieldArray({
    control,
    name: "inclusions",
  });

  const {
    fields: exclusionFields,
    append: appendExclusion,
    remove: removeExclusion,
  } = useFieldArray({
    control,
    name: "exclusions",
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        inclusions: tour.inclusions?.map((inc) => ({ value: inc })) || [],
        exclusions: tour.exclusions?.map((exc) => ({ value: exc })) || [],
      });
    }
  }, [isOpen, tour, reset]);

  const onFormError = (errors: any) => {
    logger.warn("Form validation errors:", errors);
  };

  const onSubmit: SubmitHandler<InclusionsExclusionsFormData> = async (
    data
  ) => {
    logger.info("Submitting form data:", data);
    try {
      const transformedData = {
        inclusions: data.inclusions.map((inc) => inc.value),
        exclusions: data.exclusions.map((exc) => exc.value),
      };
      await updateTour({ ...transformedData, type: tour.type });
      mutate();
      onClose();
      toast.success("Inclusions & Exclusions updated successfully");
    } catch (error) {
      logger.error("API submission failed:", error);
      toast.error("Failed to update Inclusions & Exclusions");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Inclusions & Exclusions</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit, onFormError)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Inclusions</h3>
              <div className="space-y-2">
                {inclusionFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-4">
                    <FormField
                      control={control}
                      name={`inclusions.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input {...field} placeholder="e.g., Lunch" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeInclusion(index)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                onClick={() => appendInclusion({ value: "" })}
                variant="outline"
              >
                Add Inclusion
              </Button>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Exclusions</h3>
              <div className="space-y-2">
                {exclusionFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-4">
                    <FormField
                      control={control}
                      name={`exclusions.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input {...field} placeholder="e.g., Flights" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeExclusion(index)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                onClick={() => appendExclusion({ value: "" })}
                variant="outline"
              >
                Add Exclusion
              </Button>
            </div>
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