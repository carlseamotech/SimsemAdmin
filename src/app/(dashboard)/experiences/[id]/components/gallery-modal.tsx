"use client";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
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
import { updateCustomTour } from "@/services/experiences/custom-tour";
import toast from "react-hot-toast";
import { GalleryFormData, gallerySchema } from "./experience-schema";
import MultiImageUploader from "@/components/common/multi-image-uploader";

interface GalleryModalProps {
  tour: ProposedTour;
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  tour,
  isOpen,
  onClose,
  mutate,
}) => {
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

  const onSubmit = async (data: GalleryFormData) => {
    try {
      const token = localStorage.getItem("sessionToken");
      if (!token) throw new Error("No session token found");
      await updateCustomTour(tour.objectId, data, token);
      mutate();
      toast.success("Gallery updated successfully");
      onClose();
    } catch {
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <MultiImageUploader name="galleryImageUrls" label="Gallery Images" />
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
