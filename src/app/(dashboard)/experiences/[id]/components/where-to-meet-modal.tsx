"use client";
import { useForm, SubmitHandler } from "react-hook-form";
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

const whereToMeetSchema = z.object({
  meetingPoint: z.string().min(1, "Meeting point is required"),
});

type WhereToMeetFormData = z.infer<typeof whereToMeetSchema>;

interface WhereToMeetModalProps {
  tour: ProposedTour;
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
}

export const WhereToMeetModal: React.FC<WhereToMeetModalProps> = ({
  tour,
  isOpen,
  onClose,
  mutate,
}) => {
  const form = useForm<WhereToMeetFormData>({
    resolver: zodResolver(whereToMeetSchema),
    defaultValues: {
      meetingPoint: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    reset,
  } = form;

  useEffect(() => {
    if (tour) {
      reset({
        meetingPoint: tour.meetingPoint,
      });
    }
  }, [tour, reset]);

  const onSubmit: SubmitHandler<WhereToMeetFormData> = async (data) => {
    try {
      await updateCustomTour(tour.objectId, data);
      mutate();
      onClose();
      toast.success("Meeting point updated successfully");
    } catch {
      toast.error("Failed to update meeting point");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Where to Meet</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input {...register("meetingPoint")} />
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
