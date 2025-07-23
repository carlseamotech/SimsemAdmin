"use client";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
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
import { updateCustomTour } from "@/services/experiences/custom-tour";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { z } from "zod";
import { TrashIcon } from "lucide-react";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

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
  mutate: () => void;
}

export const InclusionsExclusionsModal: React.FC<
  InclusionsExclusionsModalProps
> = ({ tour, isOpen, onClose, mutate }) => {
  const form = useForm<InclusionsExclusionsFormData>({
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
  } = form;

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
    if (tour) {
      reset({
        inclusions: tour.inclusions?.map((inc) => ({ value: inc })) || [],
        exclusions: tour.exclusions?.map((exc) => ({ value: exc })) || [],
      });
    }
  }, [tour, reset]);

  const onSubmit: SubmitHandler<InclusionsExclusionsFormData> = async (
    data
  ) => {
    try {
      const token = localStorage.getItem("sessionToken");
      if (!token) throw new Error("No session token found");
      const transformedData = {
        ...data,
        inclusions: data.inclusions.map((inc) => inc.value),
        exclusions: data.exclusions.map((exc) => exc.value),
      };
      await updateCustomTour(tour.objectId, transformedData, token);
      mutate();
      onClose();
      toast.success("Inclusions & Exclusions updated successfully");
    } catch {
      toast.error("Failed to update Inclusions & Exclusions");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Inclusions & Exclusions</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Inclusions</h3>
            {inclusionFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <FormField
                  control={control}
                  name={`inclusions.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input {...field} placeholder="Inclusion" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeInclusion(index)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => appendInclusion({ value: "" })}>
              Add Inclusion
            </Button>
          </div>
          <div>
            <h3 className="text-lg font-medium">Exclusions</h3>
            {exclusionFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <FormField
                  control={control}
                  name={`exclusions.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input {...field} placeholder="Exclusion" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeExclusion(index)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => appendExclusion({ value: "" })}>
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
      </DialogContent>
    </Dialog>
  );
};