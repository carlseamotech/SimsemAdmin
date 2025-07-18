"use client";

import { useState } from "react";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Step1MealName from "./components/step1-meal-name";
import Step2Description from "./components/step2-description";
import Step3Starter from "./components/step3-starter";
import Step4MainDish from "./components/step4-main-dish";
import Step5Dessert from "./components/step5-dessert";
import Step6TellUs from "./components/step6-tell-us";
import Step7CoverPhoto from "./components/step7-cover-photo";
import Step8Summary from "./components/step8-summary";
import { createDiningExperience } from "@/services/experiences/meal";
import { uploadFile } from "@/services/files";
import toast from "react-hot-toast";
import { Dish } from "@/models/library";

export type DishItem = Dish;

export interface DiningFormData {
  name: string;
  description: string;
  country: string;
  city: string;
  cost: string;
  coverPhoto: File | null;
  starter: DishItem[];
  main: DishItem[];
  dessert: DishItem[];
}

const DiningExperiencePage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;
  const [formData, setFormData] = useState<DiningFormData>({
    name: "",
    description: "",
    country: "",
    city: "",
    cost: "",
    coverPhoto: null,
    starter: [],
    main: [],
    dessert: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async () => {
    if (currentStep === 1 && !formData.name) {
      toast.error("Meal name is required");
      return;
    }
    if (currentStep === 2 && !formData.description) {
      toast.error("Description is required");
      return;
    }
    if (
      currentStep === 6 &&
      (!formData.country || !formData.city || !formData.cost)
    ) {
      toast.error("Country, city and cost are required");
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      try {
        let coverImageUrl = "";
        if (formData.coverPhoto) {
          const uploadedFile = await uploadFile(formData.coverPhoto);
          coverImageUrl = uploadedFile.url;
        }

        const courses = [
          { name: "Starter", dishes: formData.starter },
          { name: "Main Dish", dishes: formData.main },
          { name: "Dessert", dishes: formData.dessert },
        ]
          .filter((course) => course.dishes.length > 0)
          .map((course) => JSON.stringify(course));

        const diningData = {
          name: formData.name,
          description: formData.description,
          country: formData.country,
          city: formData.city,
          cost: formData.cost,
          coverImageUrl,
          courses,
          guideId: "kifpSShKKb", // Hardcoded for now
          phone: "+8801703464048",
          countryCode: "+880",
          isActive: true,
          isNotified: false,
          isApproved: false,
          kitchenTimes: [],
          galleryImageUrls: [],
          maxGuest: "1",
        };

        await createDiningExperience(diningData);
        toast.success("Dining experience created successfully");
        router.push("/experiences?tab=experience-library");
      } catch {
        toast.error("Failed to create dining experience");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/experiences?tab=experience-library");
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1MealName formData={formData} setFormData={setFormData} />;
      case 2:
        return (
          <Step2Description formData={formData} setFormData={setFormData} />
        );
      case 3:
        return <Step3Starter formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step4MainDish formData={formData} setFormData={setFormData} />;
      case 5:
        return <Step5Dessert formData={formData} setFormData={setFormData} />;
      case 6:
        return <Step6TellUs formData={formData} setFormData={setFormData} />;
      case 7:
        return (
          <Step7CoverPhoto formData={formData} setFormData={setFormData} />
        );
      case 8:
        return <Step8Summary formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex-1 py-6 px-8 ">
          <div className="bg-white rounded-xl  drop-shadow-lg  flex flex-col ">
            {/* Progress Section */}
            <div className="flex justify-between px-8 py-6">
              <div className="text-[15px] text-[#3D3D3DCC]">
                ADD DINING EXPERIENCE
              </div>

              <div className="text-sm text-gray-500 ">
                Step {currentStep} of {totalSteps}
              </div>
            </div>

            <Progress
              value={progressPercentage}
              className="[&_[data-slot=progress-indicator]]:bg-[#0D2E61] h-[3px]"
            />

            {/* Form Content */}
            <div className=" px-8 py-6 "> {renderStep()}</div>

            {/* Navigation Buttons */}
            <div className="flex justify-between  px-8 py-6 border-t">
              <Button
                variant="outline"
                size="lg"
                onClick={handleBack}
                className="bg-[#3D3D3D80] text-[#FFFFFF] text-[14px]  rounded-lg"
                disabled={isSubmitting}
              >
                Back
              </Button>

              <Button
                onClick={handleNext}
                size="lg"
                className="bg-[#FB8B24] hover:bg-orange-400 text-[#FFFFFF] text-[14px] rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Submitting..."
                  : currentStep === totalSteps
                  ? "Confirm"
                  : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiningExperiencePage;
