"use client";
import { useForm, SubmitHandler } from "react-hook-form";
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
import {
  createGetawayTour,
  updateGetawayTour,
} from "@/services/experiences/getaway-tour";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface GetawayTourFormProps {
  tour?: ProposedTour;
}

export const GetawayTourForm: React.FC<GetawayTourFormProps> = ({ tour }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateGetawayTourDTO | UpdateGetawayTourDTO>({
    resolver: zodResolver(
      tour ? updateGetawayTourSchema : createGetawayTourSchema
    ),
    defaultValues: tour || {},
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
    } catch (error) {
      toast.error("Failed to save getaway tour");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title">Title</label>
        <Input id="title" {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
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
        <Input id="country" {...register("country")} />
        {errors.country && (
          <p className="text-red-500">{errors.country.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <Input id="price" type="number" {...register("price")} />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};
