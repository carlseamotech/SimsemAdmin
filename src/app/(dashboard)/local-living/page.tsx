"use client";
import { useState } from "react";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// Import step components
import Step1TourName from "./components/step1-tour-name";
import Step2Description from "./components/step2-description";
import Step4Inclusions from "./components/step4-inclusions";
import Step6Summary from "./components/step6-summary";
import Step3BasicInfo from "./components/step3-basic-info";
import Step5CoverPhoto from "./components/step5-cover-photo";

interface FormData {
  country: string;
  costPerPerson: string;
  minDuration: string;
  maxDuration: string;
  categories: string[];
  description: string;
  coverPhoto: File | null;
  included: string[];
  notIncluded: string[];
  tourName: string;
}

const LocalLivingExperiencePage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const [formData, setFormData] = useState<FormData>({
    country: "",
    costPerPerson: "",
    minDuration: "",
    maxDuration: "",
    categories: [],
    description: "",
    coverPhoto: null,
    included: [],
    notIncluded: [],
    tourName: "",
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      console.log("Form submitted:", formData);
      router.push("/experiences?tab=experience-library");
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
        return <Step1TourName formData={formData} setFormData={setFormData} />;
      case 2:
        return (
          <Step2Description formData={formData} setFormData={setFormData} />
        );
      case 3:
        return <Step3BasicInfo formData={formData} setFormData={setFormData} />;
      case 4:
        return (
          <Step4Inclusions formData={formData} setFormData={setFormData} />
        );
      case 5:
        return (
          <Step5CoverPhoto formData={formData} setFormData={setFormData} />
        );
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
      </div>
    </div>
  );
};

export default LocalLivingExperiencePage;
