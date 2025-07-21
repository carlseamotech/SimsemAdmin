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

const thingToKnowSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
});

const thingsToKnowSchema = z.object({
  thingsToKnow: z.array(thingToKnowSchema),
});

type ThingsToKnowFormData = z.infer<typeof thingsToKnowSchema>;

interface ThingsToKnowModalProps {
  tour: ProposedTour;
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
}

export const ThingsToKnowModal: React.FC<ThingsToKnowModalProps> = ({
  tour,
  isOpen,
  onClose,
  mutate,
}) => {
  const form = useForm<ThingsToKnowFormData>({
    resolver: zodResolver(thingsToKnowSchema),
    defaultValues: {
      thingsToKnow: [],
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
    name: "thingsToKnow",
  });

  useEffect(() => {
    if (tour) {
      reset({
        thingsToKnow: (tour.thingsToKnow || []).map((item) => JSON.parse(item)),
      });
    }
  }, [tour, reset]);

  const onSubmit: SubmitHandler<ThingsToKnowFormData> = async (data) => {
    try {
      await updateCustomTour(tour.objectId, {
        thingsToKnow: data.thingsToKnow.map((item) => JSON.stringify(item)),
      });
      mutate();
      onClose();
      toast.success("Things to Know updated successfully");
    } catch {
      toast.error("Failed to update Things to Know");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Things to Know</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4">
              <Input
                {...register(`thingsToKnow.${index}.title`)}
                placeholder="Title"
              />
              <Input
                {...register(`thingsToKnow.${index}.description`)}
                placeholder="Description"
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
            onClick={() => append({ title: "", description: "" })}
          >
            Add Item
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
