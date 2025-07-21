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

const inclusionsExclusionsSchema = z.object({
  inclusions: z.array(z.string().min(1, "Required")),
  exclusions: z.array(z.string().min(1, "Required")),
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
    register,
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
        inclusions: tour.inclusions || [],
        exclusions: tour.exclusions || [],
      });
    }
  }, [tour, reset]);

  const onSubmit: SubmitHandler<InclusionsExclusionsFormData> = async (
    data
  ) => {
    try {
      await updateCustomTour(tour.objectId, data);
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
                <Input
                  {...register(`inclusions.${index}`)}
                  placeholder="Inclusion"
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
            <Button type="button" onClick={() => appendInclusion("")}>
              Add Inclusion
            </Button>
          </div>
          <div>
            <h3 className="text-lg font-medium">Exclusions</h3>
            {exclusionFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <Input
                  {...register(`exclusions.${index}`)}
                  placeholder="Exclusion"
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
            <Button type="button" onClick={() => appendExclusion("")}>
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
