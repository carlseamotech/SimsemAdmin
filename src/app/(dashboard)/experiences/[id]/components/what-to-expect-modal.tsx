"use client";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
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
import toast from "react-hot-toast";
import { useEffect } from "react";
import { z } from "zod";
import { useTour } from "@/hooks/use-tour";
import logger from "@/lib/logger";

const whatToExpectSchema = z.object({
  whatToExpect: z.string().min(1, "What to expect is required"),
});

type WhatToExpectFormData = z.infer<typeof whatToExpectSchema>;

interface WhatToExpectModalProps {
  tour: ProposedTour;
  isOpen: boolean;
  onClose: () => void;
}

export const WhatToExpectModal: React.FC<WhatToExpectModalProps> = ({
  tour,
  isOpen,
  onClose,
}) => {
  const { updateTour, mutate } = useTour(tour.objectId);
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

  const onFormError = (errors: FieldErrors<WhatToExpectFormData>) => {
    logger.warn("Form validation errors:", errors);
  };

  const onSubmit: SubmitHandler<WhatToExpectFormData> = async (data) => {
    logger.info("Submitting form data:", data);
    try {
      await updateTour({ ...data, type: tour.type });
      mutate();
      onClose();
      toast.success("What to expect updated successfully");
    } catch (error) {
      logger.error("API submission failed:", error);
      toast.error("Failed to update what to expect");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit What to Expect</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit, onFormError)} className="space-y-4">
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
