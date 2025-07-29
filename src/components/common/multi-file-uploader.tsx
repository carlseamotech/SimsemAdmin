
"use client";
import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import Image from "next/image";
import { X, Loader2 } from "lucide-react";
import { uploadFile } from "@/services/files";
import { uploadToBunny } from "@/services/bunny";
import toast from "react-hot-toast";
import UploadIcon from "../../../public/common/upload-cloud-icon.svg";

interface MultiFileUploaderProps {
  name: string;
  label: string;
  maxFiles?: number;
  accept?: string;
}

const MultiFileUploader: React.FC<MultiFileUploaderProps> = ({
  name,
  label,
  maxFiles = 10,
  accept = "image/*",
}) => {
  const { control } = useFormContext();
  const {
    field: { value: fileUrls = [], onChange },
  } = useController({ name, control });
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      if (fileUrls.length + files.length > maxFiles) {
        toast.error(`You can only upload a maximum of ${maxFiles} files.`);
        return;
      }
      setIsUploading(true);
      try {
        const token = localStorage.getItem("sessionToken");
        if (!token) throw new Error("No session token found");

        const uploadPromises = Array.from(files).map((file) => {
          if (file.type.startsWith("video/")) {
            return uploadToBunny(file);
          } else {
            return uploadFile(file, token);
          }
        });

        const uploadedFiles = await Promise.all(uploadPromises);
        const newFileUrls = uploadedFiles.map((file) => file.url);
        onChange([...fileUrls, ...newFileUrls]);
        toast.success("Files uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload files.");
        console.error("Error uploading files:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemovePhoto = (urlToRemove: string) => {
    const newFileUrls = fileUrls.filter((url: string) => url !== urlToRemove);
    onChange(newFileUrls);
  };

  const isVideo = (url: string) => {
    return url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg");
  };

  return (
    <div className="space-y-6">
      <div className="text-[30px] text-[#0D2E61]">{label}</div>
      <div className="grid grid-cols-3 gap-4">
        {fileUrls.map((url: string, index: number) => (
          <div key={index} className="relative h-40 rounded-lg overflow-hidden">
            {isVideo(url) ? (
              <video src={url} controls className="w-full h-full object-cover" />
            ) : (
              <Image
                src={url}
                alt={`Preview ${index}`}
                fill
                className="object-cover"
              />
            )}
            <button
              onClick={() => handleRemovePhoto(url)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        {fileUrls.length < maxFiles && (
          <div className="relative border-2 border-dashed bg-[#00000008] rounded-lg h-40 text-center flex items-center justify-center">
            <input
              type="file"
              accept={accept}
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id={`file-upload-${name}`}
              disabled={isUploading}
            />
            <label
              htmlFor={`file-upload-${name}`}
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
                {isUploading ? "Uploading..." : "Upload or drag files here"}
              </p>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiFileUploader;
