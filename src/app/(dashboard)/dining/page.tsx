"use client";
import { useState } from "react";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { FormData } from "./components/types";
import { createDiningExperience } from "@/services/experiences/meal";
import { uploadFile } from "@/services/files";
import toast from "react-hot-toast";
import Step1SelectHost from "./components/step1-select-host";
import Step2MealName from "./components/step2-meal-name";
import Step3BasicInfo from "./components/step3-basic-info";
import Step4Menu from "./components/step4-menu";
import Step5CoverPhoto from "./components/step5-cover-photo";
import Step6ThingsToKnow from "./components/step6-things-to-know";
import Step7Summary from "./components/step7-summary";

const CreateDiningExperiencePage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const methods = useForm<FormData>({
    defaultValues: {
      name: "",
      country: "",
      city: "",
      hostId: "",
      coverImageUrl: "",
      thingsToKnow: [],
      courses: [],
      cameraZoom: 15,
      meetingPointLat: 0,
      meetingPoint: "",
      phone: "",
      maxGuest: "",
      mealDuration: "",
      meetingPointLong: 0,
      isCustomMeal: true,
      isActive: true,
      kitchenTimes: [],
      cost: "",
    },
  });

  const { watch, trigger, handleSubmit } = methods;
  const formData = watch();

  const handleNext = async () => {
    let isValid = true;
    if (currentStep === 1) isValid = await trigger("hostId");
    if (currentStep === 2) isValid = await trigger("name");
    if (currentStep === 3) isValid = await trigger(["country", "city", "mealDuration"]);

    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit(async (data) => {
        try {
          const coverImageFile = data.coverImageUrl
            ? await (await fetch(data.coverImageUrl)).blob()
            : null;
          const coverImageUrl = coverImageFile
            ? (
                await uploadFile(
                  new File([coverImageFile], "cover.jpg", { type: "image/jpeg" })
                )
              ).url
            : "";

          const diningData = {
            ...data,
            coverImageUrl,
            thingsToKnow: data.thingsToKnow.map((item) => JSON.stringify(item)),
            courses: data.courses.map((item) => JSON.stringify(item)),
          };

          await createDiningExperience(diningData);
          toast.success("Dining experience created successfully");
          router.push("/experiences?tab=experience-library");
        } catch (error) {
          console.error("Failed to create dining experience:", error);
          toast.error("Failed to create dining experience");
        }
      })();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/dining");
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1SelectHost />;
      case 2:
        return <Step2MealName />;
      case 3:
        return <Step3BasicInfo />;
      case 4:
        return <Step4Menu />;
      case 5:
        return <Step5CoverPhoto />;
      case 6:
        return <Step6ThingsToKnow />;
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
              <div className="flex justify-between px-8 py-6">
                <div className="text-[15px] text-[#3D3D3DCC] uppercase">
                  Add Dining Experience
                </div>
                <div className="text-sm text-gray-500 ">
                  Step {currentStep} of {totalSteps}
                </div>
              </div>
              <Progress
                value={progressPercentage}
                className="[&_[data-slot=progress-indicator]]:bg-[#0D2E61] h-[3px]"
              />
              <div className=" px-8 py-6 "> {renderStep()}</div>
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

export default CreateDiningExperiencePage;
