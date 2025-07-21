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
import Image from "next/image";
import { TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one file to upload.");
      return;
    }

    setIsSubmitting(true);
    try {
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadFile(file).then((res) => res.url))
      );
      await updateCustomTour(tour.objectId, {
        galleryImageUrls: [...tour.galleryImageUrls, ...uploadedUrls],
      });
      mutate();
      setFiles([]);
      toast.success("Images uploaded successfully");
    } catch {
      toast.error("Failed to upload images");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!imageToDelete) return;

    try {
      const updatedUrls = tour.galleryImageUrls.filter(
        (url) => url !== imageToDelete
      );
      await updateCustomTour(tour.objectId, {
        galleryImageUrls: updatedUrls,
      });
      mutate();
      setImageToDelete(null);
      toast.success("Image deleted successfully");
    } catch {
      toast.error("Failed to delete image");
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Gallery</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {(tour.galleryImageUrls || []).map((url) => (
                <div key={url} className="relative">
                  <Image
                    src={url}
                    alt="Gallery image"
                    width={150}
                    height={150}
                    className="rounded-md"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1"
                    onClick={() => setImageToDelete(url)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Input type="file" multiple onChange={handleFileChange} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={isSubmitting}>
              {isSubmitting ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={!!imageToDelete}
        onOpenChange={() => setImageToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              image.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
