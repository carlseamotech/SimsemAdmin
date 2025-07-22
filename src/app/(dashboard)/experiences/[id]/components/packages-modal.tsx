"use client";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
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
import { updateCustomTour } from "@/services";
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
        tourPackages: (tour.tourPackages || []).map((pkg) =>
          typeof pkg === "string" ? JSON.parse(pkg) : pkg
        ),
      });
    }
  }, [tour, reset]);

  const onSubmit: SubmitHandler<PackagesFormData> = async (data) => {
    try {
      await updateCustomTour(tour.objectId, {
        tourPackages: data.tourPackages,
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Pricing Packages</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-end gap-4 p-4 border rounded-lg"
              >
                <div className="grid grid-cols-2 gap-4 flex-grow">
                  <div>
                    <Label htmlFor={`tourPackages.${index}.fromPerson`}>
                      From (pax)
                    </Label>
                    <Input
                      id={`tourPackages.${index}.fromPerson`}
                      {...register(`tourPackages.${index}.fromPerson`)}
                      placeholder="e.g., 1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`tourPackages.${index}.toPerson`}>
                      To (pax)
                    </Label>
                    <Input
                      id={`tourPackages.${index}.toPerson`}
                      {...register(`tourPackages.${index}.toPerson`)}
                      placeholder="e.g., 4"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor={`tourPackages.${index}.cost`}>Cost</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        $
                      </span>
                      <Input
                        id={`tourPackages.${index}.cost`}
                        {...register(`tourPackages.${index}.cost`)}
                        placeholder="e.g., 100"
                        className="pl-7"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
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
