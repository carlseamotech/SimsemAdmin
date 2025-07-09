"use client";

import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

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

interface Step6SummaryProps {
  formData: FormData;
}

const Step6Summary: React.FC<Step6SummaryProps> = ({ formData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Local Living Tour Summary
        </h2>
        <p className="text-gray-600">
          Review all the tour details and click confirm
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-blue-900">
                {formData.tourName || "Tour Name"}
              </h3>
            </div>
            <Badge className="bg-[#FB8B24] text-white px-3 py-1">
              ${formData.costPerPerson || "0"}.00/ Person
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">About the tour</h4>
              <p className="text-gray-600 text-sm">
                {formData.description || "No description provided"}
              </p>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">🌍</span>
                <span>
                  <strong>Country:</strong> {formData.country || "Not selected"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">⏱️</span>
                <span>
                  <strong>Duration:</strong> {formData.minDuration || "0"}-
                  {formData.maxDuration || "0"} hours
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.categories.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>

            {formData.coverPhoto && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Cover Photo</h4>
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">
                    Photo: {formData.coverPhoto.name}
                  </span>
                </div>
              </div>
            )}

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                What's Included, What's Not
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  {formData.included.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div>
                  {formData.notIncluded.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <X className="h-4 w-4 text-red-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step6Summary;
