"use client";

import type React from "react";
import { Upload } from "lucide-react";

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

interface Step5CoverPhotoProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Step5CoverPhoto: React.FC<Step5CoverPhotoProps> = ({
  formData,
  setFormData,
}) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, coverPhoto: file }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Add a Cover Photo
        </h2>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          id="photo-upload"
        />
        <label htmlFor="photo-upload" className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600">Upload or drag photo here</p>
        </label>
        {formData.coverPhoto && (
          <p className="mt-2 text-sm text-green-600">
            Photo uploaded: {formData.coverPhoto.name}
          </p>
        )}
      </div>
    </div>
  );
};

export default Step5CoverPhoto;
