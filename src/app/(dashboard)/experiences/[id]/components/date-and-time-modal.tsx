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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProposedTour } from "@/models/proposed-tour";
import { updateCustomTour } from "@/services/experiences/custom-tour";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { z } from "zod";
import { TrashIcon } from "lucide-react";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

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

const timeSlots = Array.from({ length: 25 }, (_, i) => {
  const hour = Math.floor(i / 2) + 8;
  const minute = i % 2 === 0 ? "00" : "30";
  const period = hour < 12 ? "AM" : "PM";
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minute} ${period}`;
});

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
      const token = localStorage.getItem("sessionToken");
      if (!token) throw new Error("No session token found");
      const transformedData = {
        ...data,
        tourTimes: data.tourTimes.map((time) => time.value),
      };
      await updateCustomTour(tour.objectId, transformedData, token);
      mutate();
      onClose();
      toast.success("Date & Time updated successfully");
    } catch {
      toast.error("Failed to update Date & Time");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Date & Time</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4">
              <FormField
                control={control}
                name={`tourTimes.${index}.value`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
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
            onClick={() => append({ value: "" })}
            className="w-full"
          >
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