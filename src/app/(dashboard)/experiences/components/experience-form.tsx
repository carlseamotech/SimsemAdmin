"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useTours } from "@/hooks/use-experiences";
import {
  CreateProposedTourDTO,
  UpdateProposedTourDTO,
} from "@/dtos/experiences";
import { ProposedTour } from "@/models/proposed-tour";
import { Dispatch, SetStateAction, useEffect } from "react";

const experienceSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description is required"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  type: z.enum(["custom", "getaway", "offered"]),
  difficultyLevel: z.string().min(2, "Difficulty level is required"),
  tourDuration: z.string().min(2, "Tour duration is required"),
  cost: z.string().min(1, "Cost is required"),
  tourFeatures: z.array(z.string()).optional(),
  otherTourFeature: z.string().optional(),
  coverImageUrl: z.string().url("Invalid URL"),
  galleryImageUrls: z.array(z.string().url("Invalid URL")).optional(),
  meetingPoint: z.string().min(2, "Meeting point is required"),
  meetingPointLat: z.number(),
  meetingPointLong: z.number(),
  cameraZoom: z.number(),
  tourTimes: z.array(z.string()).optional(),
  tourPackages: z.array(z.string()).optional(),
  pickupPoints: z.array(z.string()).optional(),
  isActive: z.boolean(),
  isApproved: z.boolean(),
  isNotified: z.boolean(),
  phone: z.string(),
  countryCode: z.string(),
  guideId: z.string(),
});

type ExperienceFormData = z.infer<typeof experienceSchema>;

interface ExperienceFormProps {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  experienceToEdit?: ProposedTour | null;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  setShowForm,
  experienceToEdit,
}) => {
  const { createTour, updateTour } = useTours([]);
  const isEditMode = !!experienceToEdit;

  const {
    handleSubmit,
    reset,
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
  });

  useEffect(() => {
    if (isEditMode && experienceToEdit) {
      reset(experienceToEdit);
    } else {
      reset({
        name: "",
        description: "",
        country: "",
        city: "",
        type: "custom",
        difficultyLevel: "",
        tourDuration: "",
        cost: "",
        tourFeatures: [],
        otherTourFeature: "",
        coverImageUrl: "",
        galleryImageUrls: [],
        meetingPoint: "",
        meetingPointLat: 0,
        meetingPointLong: 0,
        cameraZoom: 15,
        tourTimes: [],
        tourPackages: [],
        pickupPoints: [],
        isActive: true,
        isApproved: false,
        isNotified: false,
        phone: "",
        countryCode: "",
        guideId: "",
      });
    }
  }, [isEditMode, experienceToEdit, reset]);

  const handleFormSubmit = async (data: ExperienceFormData) => {
    if (isEditMode && experienceToEdit) {
      const tourData: UpdateProposedTourDTO = data;
      await updateTour(experienceToEdit.objectId, tourData);
    } else {
      const tourData: CreateProposedTourDTO = data;
      await createTour(tourData);
    }
    setShowForm(false);
  };

  return (
    <div className="flex-1 p-6">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-white rounded-2xl drop-shadow-xl flex flex-col gap-6"
      >
        <div className="border-b-2 border-[#0D2E61] p-6">
          <p className="text-[#3D3D3DCC] text-[15px] mb-1">
            {isEditMode ? "EDIT EXPERIENCE" : "ADD NEW EXPERIENCE"}
          </p>
        </div>

        <div className="space-y-6 px-8 pb-8">
          <div className="text-[30px] text-[#0D2E61]">Experience Details</div>
          {/* Add form fields here */}
        </div>

        <div className="flex justify-between space-x-4 pt-6 border-t border-gray-200 p-8">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => setShowForm(false)}
            className="px-6 py-2 text-[16px] bg-[#3D3D3D80] hover:text-white hover:bg-gray-500 text-white h-[48px] rounded-xl"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            size="lg"
            className="px-6 py-2 text-[16px] bg-[#FB8B24] hover:bg-orange-500 text-white h-[48px] rounded-xl"
          >
            {isEditMode ? "Save Changes" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
};