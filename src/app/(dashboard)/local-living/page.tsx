"use client";
import { useState } from "react";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              ADD LOCAL LIVING EXPERIENCE
            </span>
            <span className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Form Content */}
        <Card className="mb-6">
          <CardContent className="p-8">{renderStep()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            className="px-8 bg-transparent"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-[#FB8B24] hover:bg-orange-400 text-white px-8"
          >
            {currentStep === totalSteps ? "Continue" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocalLivingExperiencePage;
