"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MultiImageUploader from "@/components/common/multi-image-uploader";
import { useHost } from "@/hooks/use-hosts";
import toast from "react-hot-toast";
import { UpdateHostInfoDTO } from "@/dtos";
import { useEffect } from "react";

const documentSchema = z.object({
  documentUrl: z.array(z.string()).min(1, "Please upload a document."),
});

type DocumentFormData = z.infer<typeof documentSchema>;

interface SingleDocumentModalProps {
  hostId: string;
  documentType: keyof UpdateHostInfoDTO;
  documentLabel: string;
  currentUrl?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SingleDocumentModal: React.FC<SingleDocumentModalProps> = ({
  hostId,
  documentType,
  documentLabel,
  currentUrl,
  isOpen,
  onClose,
}) => {
  const { updateHost, mutate } = useHost(hostId);

  const methods = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isOpen) {
      reset({ documentUrl: currentUrl ? [currentUrl] : [] });
    }
  }, [isOpen, currentUrl, reset]);

  const onSubmit = async (data: DocumentFormData) => {
    try {
      const updateDto: Partial<UpdateHostInfoDTO> = {
        [documentType]: data.documentUrl[0],
      };
      await updateHost(updateDto);
      mutate();
      toast.success(`${documentLabel} updated successfully`);
      onClose();
    } catch {
      toast.error(`Failed to update ${documentLabel}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {documentLabel}</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <MultiImageUploader
              name="documentUrl"
              label=""
              maxFiles={1}
            />
            <DialogFooter>
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
