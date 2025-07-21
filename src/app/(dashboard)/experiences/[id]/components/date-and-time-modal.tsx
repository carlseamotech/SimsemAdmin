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

const dateAndTimeSchema = z.object({
  tourTimes: z.array(z.object({ value: z.string().min(1, "Required") })),
});

type DateAndTimeFormData = z.infer<typeof dateAndTimeSchema>;

interface DateAndTimeModalProps {
  tour: ProposedTour;
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
}

export const DateAndTimeModal: React.FC<DateAndTimeModalProps> = ({
  tour,
  isOpen,
  onClose,
  mutate,
}) => {
  const form = useForm<DateAndTimeFormData>({
    resolver: zodResolver(dateAndTimeSchema),
    defaultValues: {
      tourTimes: [],
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
    name: "tourTimes",
  });

  useEffect(() => {
    if (tour) {
      reset({
        tourTimes: tour.tourTimes?.map((time) => ({ value: time })) || [],
      });
    }
  }, [tour, reset]);

  const onSubmit: SubmitHandler<DateAndTimeFormData> = async (data) => {
    try {
      const transformedData = {
        ...data,
        tourTimes: data.tourTimes.map((time) => time.value),
      };
      await updateCustomTour(tour.objectId, transformedData);
      mutate();
      onClose();
      toast.success("Date & Time updated successfully");
    } catch {
      toast.error("Failed to update Date & Time");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Date & Time</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4">
              <Input
                {...register(`tourTimes.${index}.value`)}
                placeholder="Time"
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
          <Button type="button" onClick={() => append({ value: "" })}>
            Add Time
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
