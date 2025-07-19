"use client";
import { useState } from "react";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";

// Import step components
import Step1TourName from "./components/step1-tour-name";
import Step2Description from "./components/step2-description";
import Step4Inclusions from "./components/step4-inclusions";
import Step6Summary from "./components/step6-summary";
import Step3BasicInfo from "./components/step3-basic-info";
import Step5CoverPhoto from "./components/step5-cover-photo";

import { FormData } from "./components/types";
import { createCustomTour } from "@/services/experiences/custom-tour";
import { uploadFile } from "@/services/files";
import toast from "react-hot-toast";

const LocalLivingExperiencePage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const methods = useForm<FormData>({
    defaultValues: {
      country: "",
      cost: "",
      city: "",
      difficultyLevel: "Basic",
      coverImageUrl: "",
      galleryImageUrls: [],
      guideId: "kifpSShKKb", // Hardcoded for now
      description: "",
      tourFeatures: [],
      cameraZoom: 15,
      type: "custom",
      meetingPointLat: 23.764437246189587,
      meetingPoint:
        "Kha 190 (3rd floor) Bir Uttom Rofiqul, Jahurul Islam Ave, ঢাকা 1212, Bangladesh",
      phone: "+8801703464048",
      countryCode: "+880",
      name: "",
      meetingPointLong: 90.4352742433548,
      tourTimes: [],
      tourDuration: "",
      inclusions: [],
      exclusions: [],
      itinerary: {},
      thingsToKnow: [],
      whatToExpect: "",
    },
  });
  const { watch, trigger, handleSubmit } = methods;
  const formData = watch();

  const handleNext = async () => {
    let isValid = true;
    if (currentStep === 1) {
      isValid = await trigger("name");
    }
    if (currentStep === 3) {
      isValid = await trigger(["country", "cost", "tourDuration"]);
    }

    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit(async (data) => {
        try {
          const uploadedImageUrls = await Promise.all(
            data.galleryImageUrls.map(async (url) => {
              const response = await fetch(url);
              const blob = await response.blob();
              const file = new File([blob], "image.jpg", { type: "image/jpeg" });
              const uploadedFile = await uploadFile(file);
              return uploadedFile.url;
            })
          );

          const tourData = {
            ...data,
            coverImageUrl: uploadedImageUrls[0] || "",
            galleryImageUrls: uploadedImageUrls,
          };
          await createCustomTour(tourData);
          toast.success("Local living experience created successfully");
          router.push("/experiences?tab=experience-library");
        } catch {
          toast.error("Failed to create local living experience");
        }
      })();
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
        return <Step1TourName />;
      case 2:
        return <Step2Description />;
      case 3:
        return <Step3BasicInfo />;
      case 4:
        return <Step4Inclusions />;
      case 5:
        return <Step5CoverPhoto />;
      case 6:
        return <Step6Summary formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <Header />

        <FormProvider {...methods}>
          <div className="flex-1 py-6 px-8 ">
            <div className="bg-white rounded-xl  drop-shadow-lg  flex flex-col ">
              {/* Progress Section */}
              <div className="flex justify-between px-8 py-6">
                <div className="text-[15px] text-[#3D3D3DCC] uppercase">
                  Add Local Living experience
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
                  className="bg-[#3D3D3D80] text-[#FFFFFF] text-[14px] px-8 rounded-lg"
                >
                  Back
                </Button>

                <Button
                  onClick={handleNext}
                  size="lg"
                  className="bg-[#FB8B24] hover:bg-orange-400 text-[#FFFFFF] text-[14px] px-8 rounded-lg"
                >
                  {currentStep === totalSteps ? "Confirm" : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default LocalLivingExperiencePage;
