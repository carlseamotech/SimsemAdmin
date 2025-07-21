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

const packageSchema = z.object({
  fromPerson: z.string().min(1, "Required"),
  toPerson: z.string().min(1, "Required"),
  cost: z.string().min(1, "Required"),
});

const packagesSchema = z.object({
  tourPackages: z.array(packageSchema),
});

type PackagesFormData = z.infer<typeof packagesSchema>;

interface PackagesModalProps {
  tour: ProposedTour;
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
}

export const PackagesModal: React.FC<PackagesModalProps> = ({
  tour,
  isOpen,
  onClose,
  mutate,
}) => {
  const form = useForm<PackagesFormData>({
    resolver: zodResolver(packagesSchema),
    defaultValues: {
      tourPackages: [],
    },
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting },
    reset,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tourPackages",
  });

  useEffect(() => {
    if (tour) {
      reset({
        tourPackages: tour.tourPackages.map((pkg) => JSON.parse(pkg)),
      });
    }
  }, [tour, reset]);

  const onSubmit: SubmitHandler<PackagesFormData> = async (data) => {
    try {
      await updateCustomTour(tour.objectId, {
        tourPackages: data.tourPackages.map((pkg) => JSON.stringify(pkg)),
      });
      mutate();
      onClose();
      toast.success("Packages updated successfully");
    } catch {
      toast.error("Failed to update packages");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Pricing Packages</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4">
              <Input
                {...register(`tourPackages.${index}.fromPerson`)}
                placeholder="From Person"
              />
              <Input
                {...register(`tourPackages.${index}.toPerson`)}
                placeholder="To Person"
              />
              <Input
                {...register(`tourPackages.${index}.cost`)}
                placeholder="Cost"
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => append({ fromPerson: "", toPerson: "", cost: "" })}
          >
            Add Package
          </Button>
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
