"use client";
import React from "react";
import UploadIcon from "../../../../../public/common/upload-cloud-icon.svg";
import Image from "next/image";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FormData } from "./types";

const Step5CoverPhoto: React.FC = () => {
  const { watch, setValue } = useFormContext<FormData>();
  const galleryImageUrls = watch("galleryImageUrls") || [];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const newImageUrls = newFiles.map((file) => URL.createObjectURL(file));
      setValue("galleryImageUrls", [...galleryImageUrls, ...newImageUrls]);
    }
  };

  const handleRemovePhoto = (urlToRemove: string) => {
    const newImageUrls = galleryImageUrls.filter((url) => url !== urlToRemove);
    setValue("galleryImageUrls", newImageUrls);
  };

  return (
    <div className="space-y-6">
      <div className="text-[30px] text-[#0D2E61]">Add Photos</div>

      <div className="grid grid-cols-3 gap-4">
        {galleryImageUrls.map((url, index) => (
          <div key={index} className="relative h-40 rounded-lg overflow-hidden">
            <Image src={url} alt={`Preview ${index}`} fill className="object-cover" />
            <button
              onClick={() => handleRemovePhoto(url)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        <div className="relative border-2 border-dashed bg-[#00000008] rounded-lg h-40 text-center flex items-center justify-center">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="photo-upload"
          />
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
              Upload or drag photos here
            </p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Step5CoverPhoto;
