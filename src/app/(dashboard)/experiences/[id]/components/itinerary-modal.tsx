"use client";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  FormProvider,
  FieldErrors,
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

const itineraryItemSchema = z.object({
  day: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
});

const itinerarySchema = z.object({
  itinerary: z.array(itineraryItemSchema),
});

type ItineraryFormData = z.infer<typeof itinerarySchema>;

interface ItineraryModalProps {
  tour: ProposedTour;
  isOpen: boolean;
  onClose: () => void;
}

export const ItineraryModal: React.FC<ItineraryModalProps> = ({
  tour,
  isOpen,
  onClose,
}) => {
  const { updateTour, mutate } = useTour(tour.objectId);
  const methods = useForm<ItineraryFormData>({
    resolver: zodResolver(itinerarySchema),
    defaultValues: {
      itinerary: [],
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
    name: "itinerary",
  });

  useEffect(() => {
    if (isOpen && tour?.itinerary) {
      try {
        const parsedItinerary = tour.itinerary
          .map((item) => {
            if (typeof item === "string") {
              try {
                return JSON.parse(item);
              } catch (error) {
                console.error("Failed to parse itinerary item:", error);
                return null;
              }
            }
            return item;
          })
          .filter(Boolean);
        reset({ itinerary: parsedItinerary });
      } catch (error) {
        console.error("Failed to process itinerary:", error);
        reset({ itinerary: [] });
      }
    } else if (isOpen) {
      reset({ itinerary: [] });
    }
  }, [isOpen, tour, reset]);

  const onFormError = (errors: FieldErrors<ItineraryFormData>) => {
    logger.warn("Form validation errors:", errors);
  };

  const onSubmit: SubmitHandler<ItineraryFormData> = async (data) => {
    logger.info("Submitting form data:", data);
    try {
      const transformedData = {
        itinerary: data.itinerary.map((item) => JSON.stringify(item)),
      };

      await updateTour({ ...transformedData, type: tour.type });
      mutate();
      onClose();
      toast.success("Itinerary updated successfully");
    } catch (error) {
      logger.error("API submission failed:", error);
      toast.error("Failed to update itinerary");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Itinerary</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit, onFormError)} className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-2">
                <FormField
                  control={control}
                  name={`itinerary.${index}.day`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Day" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`itinerary.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`itinerary.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
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
              onClick={() => append({ day: "", title: "", description: "" })}
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