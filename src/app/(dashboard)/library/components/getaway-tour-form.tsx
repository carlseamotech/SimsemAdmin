"use client";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProposedTour } from "@/models/proposed-tour";
import { createGetawayTour, updateGetawayTour } from "@/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CountryDropdown } from "@/components/common/country-dropdown";
import { useEffect } from "react";
import { TrashIcon } from "lucide-react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { ProposedTourDTO } from "@/dtos";

// Schema for the form's internal state, using objects for better UX
const packageSchema = z.object({
  fromPerson: z.string().min(1, "Required"),
  toPerson: z.string().min(1, "Required"),
  cost: z.string().min(1, "Required"),
});

const getawayTourFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  guideId: z.string().min(1, "Guide is required"),
  tourPackages: z.array(packageSchema).optional(),
});

type GetawayTourFormData = z.infer<typeof getawayTourFormSchema>;

interface GetawayTourFormProps {
  tour?: ProposedTour;
}

export const GetawayTourForm: React.FC<GetawayTourFormProps> = ({ tour }) => {
  const router = useRouter();
  const methods = useForm<GetawayTourFormData>({
    resolver: zodResolver(getawayTourFormSchema),
    defaultValues: {
      guideId: "kifpSShKKb", // TODO: Replace with actual guide selection
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset,
  } = methods;

  const {
    fields: packageFields,
    append: appendPackage,
    remove: removePackage,
  } = useFieldArray({
    control,
    name: "tourPackages",
  });

  useEffect(() => {
    if (tour) {
      const parsedData = {
        ...tour,
        tourPackages: (tour.tourPackages || []).map((p) =>
          typeof p === "string" ? JSON.parse(p) : p
        ),
      };
      reset(parsedData);
    }
  }, [tour, reset]);

  const onSubmit: SubmitHandler<GetawayTourFormData> = async (data) => {
    try {
      const transformedData: ProposedTourDTO = {
        ...data,
        type: "getaway",
        tourPackages: data.tourPackages?.map((pkg) => JSON.stringify(pkg)),
      };

      if (tour) {
        await updateGetawayTour(tour.objectId, transformedData);
        toast.success("Getaway tour updated successfully");
      } else {
        await createGetawayTour(transformedData);
        toast.success("Getaway tour created successfully");
      }
      router.push("/experiences?tab=experience-library");
    } catch (error) {
      toast.error("Failed to save getaway tour");
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CountryDropdown control={control} name="country" label="Country" />
        </div>

        {/* Tour Packages */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Tour Packages</h3>
          {packageFields.map((field, index) => (
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
                      <FormLabel>From (pax)</FormLabel>
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
                      <FormLabel>To (pax)</FormLabel>
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
                      <FormLabel>Cost</FormLabel>
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
                onClick={() => removePackage(index)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              appendPackage({ fromPerson: "", toPerson: "", cost: "" })
            }
          >
            Add Package
          </Button>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </FormProvider>
  );
};