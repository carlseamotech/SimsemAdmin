"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProposedTour } from "@/models/proposed-tour";
import toast from "react-hot-toast";
import {
  CoverPhotoFormData,
  coverPhotoSchema,
} from "./experience-schema";
import SingleImageUploader from "@/components/common/single-image-uploader";
import { Form } from "@/components/ui/form";
import { useTour } from "@/hooks/use-tour";
import logger from "@/lib/logger";

interface CoverPhotoModalProps {
  tour: ProposedTour;
  isOpen: boolean;
  onClose: () => void;
}

export const CoverPhotoModal: React.FC<CoverPhotoModalProps> = ({
  tour,
  isOpen,
  onClose,
}) => {
  const { updateTour, mutate } = useTour(tour.objectId);
  const form = useForm<CoverPhotoFormData>({
    resolver: zodResolver(coverPhotoSchema),
    defaultValues: {
      coverImageUrl: tour.coverImageUrl || "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (isOpen) {
      reset({
        coverImageUrl: tour.coverImageUrl || "",
      });
    }
  }, [isOpen, reset, tour.coverImageUrl]);

  const onFormError = (errors: any) => {
    logger.warn("Form validation errors:", errors);
  };

  const onSubmit = async (data: CoverPhotoFormData) => {
    logger.info("Submitting form data:", data);
    try {
      await updateTour({ ...data, type: tour.type });
      toast.success("Cover photo updated successfully");
      onClose();
    } catch (error) {
      logger.error("API submission failed:", error);
      toast.error("Failed to update cover photo");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Cover Photo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit, onFormError)}>
            <SingleImageUploader name="coverImageUrl" label="Cover Photo" />
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};