"use client";
import React from "react";
import UploadIcon from "../../../../../public/common/upload-cloud-icon.svg";
import Image from "next/image";
import { X } from "lucide-react"; // You can also use plain text like ✕
import type { DiningFormData } from "../page";

interface Step7CoverPhotoProps {
  formData: DiningFormData;
  setFormData: React.Dispatch<React.SetStateAction<DiningFormData>>;
}

const Step7CoverPhoto: React.FC<Step7CoverPhotoProps> = ({
  formData,
  setFormData,
}) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, coverPhoto: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, coverPhoto: null }));
    setPreviewUrl(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-[30px] text-[#0D2E61]">Add a Cover Photo</div>

      <div className="relative border-2 border-dashed bg-[#00000008] rounded-lg h-[189px] overflow-hidden text-center flex items-center justify-center">
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          id="photo-upload"
        />

        {/* Show uploaded image */}
        {previewUrl ? (
          <>
            <Image
              src={previewUrl}
              alt="Cover Preview"
              fill
              className="object-cover"
            />

            {/* X button to remove */}
            <button
              onClick={handleRemovePhoto}
              className="absolute top-3 right-3 bg-red-600 cursor-pointer rounded-full p-1 hover:bg-white"
            >
              <X className="w-4 h-4 hover:text-black" />
            </button>
          </>
        ) : (
          // Upload prompt
          <label
            htmlFor="photo-upload"
            className="cursor-pointer flex flex-col justify-center items-center gap-4"
          >
            <Image
              src={UploadIcon}
              alt="Upload Icon"
              className="w-[46px] h-[46px]"
            />
            <p className="text-[#3D3D3D] text-[15px] font-bold">
              Upload or drag photo here
            </p>
          </label>
        )}
      </div>
    </div>
  );
};

export default Step7CoverPhoto;
