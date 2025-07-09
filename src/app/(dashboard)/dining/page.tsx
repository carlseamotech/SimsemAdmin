"use client";

import { useState } from "react";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Step1MealName from "./components/step1-meal-name";
import Step2Description from "./components/step2-description";
import Step3Starter from "./components/step3-starter";
import Step4MainDish from "./components/step4-main-dish";
import Step5Dessert from "./components/step5-dessert";
import Step6TellUs from "./components/step6-tell-us";
import Step7CoverPhoto from "./components/step7-cover-photo";
import Step8Summary from "./components/step8-summary";

interface DishItem {
  id: string;
  name: string;
  description: string;
  image: string;
  mealType: "vegetarian" | "meat" | "vegan";
}

interface DiningFormData {
  mealName: string;
  description: string;
  selectedStarter: DishItem | null;
  selectedMainDish: DishItem | null;
  selectedDessert: DishItem | null;
  country: string;
  costPerPerson: string;
  coverPhoto: File | null;
}

const DiningExperiencePage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;
  const [formData, setFormData] = useState<DiningFormData>({
    mealName: "",
    description: "",
    selectedStarter: null,
    selectedMainDish: null,
    selectedDessert: null,
    country: "",
    costPerPerson: "",
    coverPhoto: null,
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      console.log("Dining experience submitted:", formData);
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              ADD DINING EXPERIENCE
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
            {currentStep === totalSteps ? "Confirm" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiningExperiencePage;

// Export types for components
export type { DishItem, DiningFormData };
