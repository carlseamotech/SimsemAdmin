"use client";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
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

const packageSchema = z.object({
  fromPerson: z.string().min(1, "Required"),
  toPerson: z.string().min(1, "Required"),
  cost: z.string().min(1, "Required"),
});

const packagesSchema = z.object({
  tourPackages: z.array(packageSchema),
});

type PackagesFormData = z.infer<typeof packagesSchema>;

interface PackagesModalProps {
  tour: ProposedTour;
  isOpen: boolean;
  onClose: () => void;
}

export const PackagesModal: React.FC<PackagesModalProps> = ({
  tour,
  isOpen,
  onClose,
}) => {
  const { updateTour, mutate } = useTour(tour.objectId);
  const methods = useForm<PackagesFormData>({
    resolver: zodResolver(packagesSchema),
    defaultValues: {
      tourPackages: [],
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
    name: "tourPackages",
  });

  useEffect(() => {
    if (isOpen && tour?.tourPackages) {
      try {
        const parsedPackages = tour.tourPackages
          .map((pkg) => {
            if (typeof pkg === "string") {
              try {
                return JSON.parse(pkg);
              } catch (error) {
                console.error("Failed to parse package:", error);
                return null; // Skip invalid JSON
              }
            }
            return pkg; // Already an object
          })
          .filter(Boolean); // Remove nulls from parsing errors
        reset({ tourPackages: parsedPackages });
      } catch (error) {
        console.error("Failed to process tour packages:", error);
        reset({ tourPackages: [] });
      }
    } else if (isOpen) {
      reset({ tourPackages: [] });
    }
  }, [isOpen, tour, reset]);

  const onFormError = (errors: any) => {
    logger.warn("Form validation errors:", errors);
  };

  const onSubmit: SubmitHandler<PackagesFormData> = async (data) => {
    logger.info("Submitting form data:", data);
    try {
      const transformedData = {
        tourPackages: data.tourPackages.map((pkg) => JSON.stringify(pkg)),
      };

      await updateTour({ ...transformedData, type: tour.type });
      mutate();
      onClose();
      toast.success("Packages updated successfully");
    } catch (error) {
      logger.error("API submission failed:", error);
      toast.error("Failed to update packages");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Pricing Packages</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit, onFormError)} className="space-y-6">
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-end gap-4 p-4 border rounded-lg"
                >
                  <div className="grid grid-cols-2 gap-4 flex-grow">
                    <FormField
                      control={control}
                      name={`tourPackages.${index}.fromPerson`}
                      render={({ field }) => (
                        <FormItem>
                          <Label>From (pax)</Label>
                          <FormControl>
                            <Input {...field} placeholder="e.g., 1" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`tourPackages.${index}.toPerson`}
                      render={({ field }) => (
                        <FormItem>
                          <Label>To (pax)</Label>
                          <FormControl>
                            <Input {...field} placeholder="e.g., 4" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`tourPackages.${index}.cost`}
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <Label>Cost</Label>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                $
                              </span>
                              <Input
                                {...field}
                                placeholder="e.g., 100"
                                className="pl-7"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={() => append({ fromPerson: "", toPerson: "", cost: "" })}
            >
              Add Package
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