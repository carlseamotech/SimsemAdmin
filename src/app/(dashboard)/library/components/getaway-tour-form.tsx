"use client";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createGetawayTourSchema,
  CreateGetawayTourDTO,
} from "@/dtos/experiences/create-getaway-tour.dto";
import {
  updateGetawayTourSchema,
  UpdateGetawayTourDTO,
} from "@/dtos/experiences/update-getaway-tour.dto";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProposedTour } from "@/models/proposed-tour";
import { createGetawayTour, updateGetawayTour } from "@/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CountryDropdown } from "@/components/common/country-dropdown";

interface GetawayTourFormProps {
  tour?: ProposedTour;
}

export const GetawayTourForm: React.FC<GetawayTourFormProps> = ({ tour }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<CreateGetawayTourDTO | UpdateGetawayTourDTO>({
    resolver: zodResolver(
      tour ? updateGetawayTourSchema : createGetawayTourSchema
    ),
    defaultValues: tour ? { ...tour, type: "getaway" } : { type: "getaway" },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tourPackages",
  });

  const onSubmit: SubmitHandler<
    CreateGetawayTourDTO | UpdateGetawayTourDTO
  > = async (data) => {
    try {
      if (tour) {
        await updateGetawayTour(tour.objectId, data as UpdateGetawayTourDTO);
        toast.success("Getaway tour updated successfully");
      } else {
        await createGetawayTour(data as CreateGetawayTourDTO);
        toast.success("Getaway tour created successfully");
      }
      router.push("/experiences?tab=experience-library");
    } catch {
      toast.error("Failed to save getaway tour");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <Input id="description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="city">City</label>
        <Input id="city" {...register("city")} />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <CountryDropdown control={control} name="country" label="Country" />
        {errors.country && (
          <p className="text-red-500">{errors.country.message}</p>
        )}
      </div>
      <div>
        <label>Tour Packages</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-4">
            <Input
              {...register(`tourPackages.${index}.fromPerson`)}
              placeholder="From Person"
            />
            <Input
              {...register(`tourPackages.${index}.toPerson`)}
              placeholder="To Person"
            />
            <Input
              {...register(`tourPackages.${index}.cost`)}
              placeholder="Cost"
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => append({ fromPerson: "", toPerson: "", cost: "" })}
        >
          Add Package
        </Button>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};
