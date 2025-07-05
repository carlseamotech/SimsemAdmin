"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useHost } from "@/hooks/use-hosts";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface DeleteHostDialogProps {
  hostId: string;
  hostName: string;
  hostPhone: string;
}

export const DeleteHostDialog = ({
  hostId,
  hostName,
  hostPhone,
}: DeleteHostDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteHost } = useHost(hostId);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteHost(hostPhone);
      toast.success(`Host "${hostName}" has been deleted.`);
      setOpen(false);
      router.push("/hosts");
    } catch (error) {
      console.error("Error deleting host:", error);
      toast.error("Failed to delete host.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="lg" className="text-[17px] font-bold">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this host?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the host
            &quot;{hostName}&quot; and all associated data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
