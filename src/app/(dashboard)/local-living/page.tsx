"use client";
import { useState } from "react";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";

// Import step components
import Step1SelectHost from "./components/step1-select-host";
import Step2TourName from "./components/step2-tour-name";
import Step3Description from "./components/step3-description";
import Step4BasicInfo from "./components/step4-basic-info";
import Step5Inclusions from "./components/step5-inclusions";
import Step6CoverPhoto from "./components/step6-cover-photo";
import Step7Summary from "./components/step7-summary";

import { FormData } from "./components/types";
import { createCustomTour } from "@/services/experiences/custom-tour";
import { uploadFile } from "@/services/files";
import toast from "react-hot-toast";

const LocalLivingExperiencePage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const methods = useForm<FormData>({
    defaultValues: {
      country: "",
      city: "",
      difficultyLevel: "Basic",
      coverImageUrl: "",
      galleryImageUrls: [],
      guideId: "",
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
      itinerary: [],
      thingsToKnow: [],
      whatToExpect: "",
      tourPackages: [],
    },
  });
  const { watch, trigger, handleSubmit } = methods;
  const formData = watch();

  const handleNext = async () => {
    let isValid = true;
    if (currentStep === 1) {
      isValid = await trigger("guideId");
    }
    if (currentStep === 2) {
      isValid = await trigger("name");
    }
    if (currentStep === 4) {
      isValid = await trigger([
        "country",
        "tourDuration",
        "tourPackages",
      ]);
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
          console.log("Submitting data:", data);
          const uploadedImageUrls = await Promise.all(
            data.galleryImageUrls.map(async (url) => {
              if (url.startsWith("blob:")) {
                const response = await fetch(url);
                const blob = await response.blob();
                const file = new File([blob], "image.jpg", {
                  type: "image/jpeg",
                });
                const uploadedFile = await uploadFile(file);
                return uploadedFile.url;
              }
              return url;
            })
          );

          const tourData = {
            ...data,
            coverImageUrl: uploadedImageUrls[0] || "",
            galleryImageUrls: uploadedImageUrls,
            itinerary: data.itinerary.map((item) => JSON.stringify(item)),
            thingsToKnow: data.thingsToKnow.map((item) => JSON.stringify(item)),
            tourPackages: data.tourPackages.map((item) => JSON.stringify(item)),
          };
          
          console.log("Payload to be sent to API:", tourData);
          await createCustomTour(tourData);
          toast.success("Local living experience created successfully");
          router.push("/experiences?tab=experience-library");
        } catch (error) {
          console.error("Failed to create local living experience:", error);
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
        return <Step1SelectHost />;
      case 2:
        return <Step2TourName />;
      case 3:
        return <Step3Description />;
      case 4:
        return <Step4BasicInfo />;
      case 5:
        return <Step5Inclusions />;
      case 6:
        return <Step6CoverPhoto />;
      case 7:
        return <Step7Summary formData={formData} />;
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
