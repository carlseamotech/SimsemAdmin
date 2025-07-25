"use client";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProposedTour } from "@/models/proposed-tour";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { z } from "zod";
import { TrashIcon } from "lucide-react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useTour } from "@/hooks/use-tour";
import logger from "@/lib/logger";

const thingToKnowSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
});

const thingsToKnowSchema = z.object({
  thingsToKnow: z.array(thingToKnowSchema),
});

type ThingsToKnowFormData = z.infer<typeof thingsToKnowSchema>;

interface ThingsToKnowModalProps {
  tour: ProposedTour;
  isOpen: boolean;
  onClose: () => void;
}

export const ThingsToKnowModal: React.FC<ThingsToKnowModalProps> = ({
  tour,
  isOpen,
  onClose,
}) => {
  const { updateTour, mutate } = useTour(tour.objectId);
  const methods = useForm<ThingsToKnowFormData>({
    resolver: zodResolver(thingsToKnowSchema),
    defaultValues: {
      thingsToKnow: [],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "thingsToKnow",
  });

  useEffect(() => {
    if (isOpen && tour?.thingsToKnow) {
      try {
        const parsedThingsToKnow = tour.thingsToKnow
          .map((item) => {
            if (typeof item === "string") {
              try {
                return JSON.parse(item);
              } catch (error) {
                console.error("Failed to parse thing to know:", error);
                return null;
              }
            }
            return item;
          })
          .filter(Boolean);
        reset({ thingsToKnow: parsedThingsToKnow });
      } catch (error) {
        console.error("Failed to process things to know:", error);
        reset({ thingsToKnow: [] });
      }
    } else if (isOpen) {
      reset({ thingsToKnow: [] });
    }
  }, [isOpen, tour, reset]);

  const onFormError = (errors: any) => {
    logger.warn("Form validation errors:", errors);
  };

  const onSubmit: SubmitHandler<ThingsToKnowFormData> = async (data) => {
    logger.info("Submitting form data:", data);
    try {
      const transformedData = {
        thingsToKnow: data.thingsToKnow.map((item) => JSON.stringify(item)),
      };

      await updateTour({ ...transformedData, type: tour.type });
      mutate();
      onClose();
      toast.success("Things to Know updated successfully");
    } catch (error) {
      logger.error("API submission failed:", error);
      toast.error("Failed to update Things to Know");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Things to Know</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit, onFormError)} className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-start gap-4">
                <FormField
                  control={control}
                  name={`thingsToKnow.${index}.title`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input {...field} placeholder="Title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`thingsToKnow.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Textarea {...field} placeholder="Description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => append({ title: "", description: "" })}
            >
              Add Item
            </Button>
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
