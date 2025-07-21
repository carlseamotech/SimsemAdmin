"use client";
import { useState } from "react";
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
import { uploadFile } from "@/services/files";
import toast from "react-hot-toast";

interface CoverPhotoModalProps {
  tour: ProposedTour;
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
}

export const CoverPhotoModal: React.FC<CoverPhotoModalProps> = ({
  tour,
  isOpen,
  onClose,
  mutate,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    setIsSubmitting(true);
    try {
      const uploadedFile = await uploadFile(file);
      await updateCustomTour(tour.objectId, {
        coverImageUrl: uploadedFile.url,
      });
      mutate();
      onClose();
      toast.success("Cover photo updated successfully");
    } catch {
      toast.error("Failed to update cover photo");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Cover Photo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
