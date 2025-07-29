"use client";
import { useEffect } from "react";
import { FieldErrors, useForm, FormProvider } from "react-hook-form";
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
import { GalleryFormData, gallerySchema } from "./experience-schema";
import MultiFileUploader from "@/components/common/multi-file-uploader";
import { useTour } from "@/hooks/use-tour";
import logger from "@/lib/logger";

interface GalleryModalProps {
  tour: ProposedTour;
  isOpen: boolean;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  tour,
  isOpen,
  onClose,
}) => {
  const { updateTour } = useTour(tour.objectId);
  const methods = useForm<GalleryFormData>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      galleryImageUrls: tour.galleryImageUrls || [],
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isOpen) {
      reset({
        galleryImageUrls: tour.galleryImageUrls || [],
      });
    }
  }, [isOpen, reset, tour.galleryImageUrls]);

  const onFormError = (errors: FieldErrors<GalleryFormData>) => {
    logger.warn("Form validation errors:", errors);
  };

  const onSubmit = async (data: GalleryFormData) => {
    logger.info("Submitting form data:", data);
    try {
      await updateTour({ ...data, type: tour.type });
      toast.success("Gallery updated successfully");
      onClose();
    } catch (error) {
      logger.error("API submission failed:", error);
      toast.error("Failed to update gallery");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Gallery</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit, onFormError)}>
            <MultiFileUploader name="galleryImageUrls" label="Gallery Images" />
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
