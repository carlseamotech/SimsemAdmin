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
import { Textarea } from "@/components/ui/textarea";
import { ProposedTour } from "@/models/proposed-tour";
import { updateCustomTour } from "@/services/experiences/custom-tour";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { z } from "zod";

const whatToExpectSchema = z.object({
  whatToExpect: z.string().min(1, "What to expect is required"),
});

type WhatToExpectFormData = z.infer<typeof whatToExpectSchema>;

interface WhatToExpectModalProps {
  tour: ProposedTour;
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
}

export const WhatToExpectModal: React.FC<WhatToExpectModalProps> = ({
  tour,
  isOpen,
  onClose,
  mutate,
}) => {
  const form = useForm<WhatToExpectFormData>({
    resolver: zodResolver(whatToExpectSchema),
    defaultValues: {
      whatToExpect: "",
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
        whatToExpect: tour.whatToExpect,
      });
    }
  }, [tour, reset]);

  const onSubmit: SubmitHandler<WhatToExpectFormData> = async (data) => {
    try {
      await updateCustomTour(tour.objectId, data);
      mutate();
      onClose();
      toast.success("What to expect updated successfully");
    } catch {
      toast.error("Failed to update what to expect");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit What to Expect</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Textarea {...register("whatToExpect")} />
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
