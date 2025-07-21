"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CreateLibraryItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateLibraryItemModal: React.FC<CreateLibraryItemModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Library Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Button onClick={() => router.push("/library/new?type=tour")}>
            Create Tour
          </Button>
          <Button onClick={() => router.push("/library/new?type=meal")}>
            Create Meal
          </Button>
          <Button onClick={() => router.push("/library/new?type=dish")}>
            Create Dish
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
