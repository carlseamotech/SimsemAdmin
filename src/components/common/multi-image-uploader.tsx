"use client";
import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import Image from "next/image";
import { X, Loader2 } from "lucide-react";
import { uploadFile } from "@/services/files";
import toast from "react-hot-toast";
import UploadIcon from "../../../public/common/upload-cloud-icon.svg";

interface MultiImageUploaderProps {
  name: string;
  label: string;
  maxFiles?: number;
}

const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  name,
  label,
  maxFiles = 10,
}) => {
  const { control } = useFormContext();
  const {
    field: { value: imageUrls = [], onChange },
  } = useController({ name, control });
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      if (imageUrls.length + files.length > maxFiles) {
        toast.error(`You can only upload a maximum of ${maxFiles} images.`);
        return;
      }
      setIsUploading(true);
      try {
        const token = localStorage.getItem("sessionToken");
        if (!token) throw new Error("No session token found");

        const uploadPromises = Array.from(files).map((file) =>
          uploadFile(file, token)
        );
        const uploadedFiles = await Promise.all(uploadPromises);
        const newImageUrls = uploadedFiles.map((file) => file.url);
        onChange([...imageUrls, ...newImageUrls]);
        toast.success("Images uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload images.");
        console.error("Error uploading files:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemovePhoto = (urlToRemove: string) => {
    const newImageUrls = imageUrls.filter((url: string) => url !== urlToRemove);
    onChange(newImageUrls);
  };

  return (
    <div className="space-y-6">
      <div className="text-[30px] text-[#0D2E61]">{label}</div>
      <div className="grid grid-cols-3 gap-4">
        {imageUrls.map((url: string, index: number) => (
          <div key={index} className="relative h-40 rounded-lg overflow-hidden">
            <Image
              src={url}
              alt={`Preview ${index}`}
              fill
              className="object-cover"
            />
            <button
              onClick={() => handleRemovePhoto(url)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        {imageUrls.length < maxFiles && (
          <div className="relative border-2 border-dashed bg-[#00000008] rounded-lg h-40 text-center flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id={`photo-upload-${name}`}
              disabled={isUploading}
            />
            <label
              htmlFor={`photo-upload-${name}`}
              className={`cursor-pointer flex flex-col justify-center items-center gap-4 ${
                isUploading ? "opacity-50" : ""
              }`}
            >
              {isUploading ? (
                <Loader2 className="w-12 h-12 animate-spin" />
              ) : (
                <Image
                  src={UploadIcon}
                  alt="Upload Icon"
                  className="w-[46px] h-[46px]"
                />
              )}
              <p className="text-[#3D3D3D] text-[15px] font-bold">
                {isUploading ? "Uploading..." : "Upload or drag photos here"}
              </p>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiImageUploader;