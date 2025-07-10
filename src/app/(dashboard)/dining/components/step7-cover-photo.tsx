"use client";

import type React from "react";
import { Upload } from "lucide-react";
import type { DiningFormData } from "../page";
import Image from "next/image";

interface Step7CoverPhotoProps {
  formData: DiningFormData;
  setFormData: React.Dispatch<React.SetStateAction<DiningFormData>>;
}

const Step7CoverPhoto: React.FC<Step7CoverPhotoProps> = ({
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
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-blue-900 mb-2">
            Add a Cover Photo
          </h2>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center">
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
    </>
  );
};

export default Step7CoverPhoto;
{
  /* <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-4">
  <div className="text-[24px] font-bold text-[#0D2E61]">Cover Photo</div>

  <div className="relative w-full aspect-[887/312] rounded-lg overflow-hidden">
    <Image src={cover} alt="Cover photo" fill className="object-cover" />
  </div>
</div> */
}
