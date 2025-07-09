"use client";

import type React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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

interface Step3BasicInfoProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Step3BasicInfo: React.FC<Step3BasicInfoProps> = ({
  formData,
  setFormData,
}) => {
  const categories = [
    "Historical",
    "Culture",
    "Architecture",
    "Culinary",
    "Guided Tours",
  ];

  const toggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Tell us a bit more
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To which country do you want to make this experience available
          </label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, country: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="turkey">Turkey</SelectItem>
              <SelectItem value="egypt">Egypt</SelectItem>
              <SelectItem value="morocco">Morocco</SelectItem>
              <SelectItem value="jordan">Jordan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tour Cost per Person
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <Input
              type="number"
              className="pl-8"
              value={formData.costPerPerson}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  costPerPerson: e.target.value,
                }))
              }
              placeholder="20"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tour Duration
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Min Duration
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={formData.minDuration}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      minDuration: e.target.value,
                    }))
                  }
                  placeholder="2"
                />
                <span className="text-sm text-gray-500">hours</span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Max Duration
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={formData.maxDuration}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      maxDuration: e.target.value,
                    }))
                  }
                  placeholder="3"
                />
                <span className="text-sm text-gray-500">hours</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select what best describes your tour
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={
                  formData.categories.includes(category) ? "default" : "outline"
                }
                className={`cursor-pointer px-4 py-2 ${
                  formData.categories.includes(category)
                    ? "bg-[#FBB040] hover:bg-orange-400 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3BasicInfo;
