"use client";
import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { uploadFile } from "@/services/files";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ProfileImage from "../../../public/common/profile-image.svg";

interface SingleImageUploaderProps {
  name: string;
  label: string;
}

const SingleImageUploader: React.FC<SingleImageUploaderProps> = ({
  name,
  label,
}) => {
  const { control } = useFormContext();
  const {
    field: { value: imageUrl, onChange },
  } = useController({ name, control });
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const token = localStorage.getItem("sessionToken");
        if (!token) throw new Error("No session token found");

        const uploadedFile = await uploadFile(file, token);
        onChange(uploadedFile.url);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload image.");
        console.error("Error uploading file:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="flex items-center space-x-6">
      <Avatar className="h-24 w-24">
        {isUploading ? (
          <div className="flex items-center justify-center h-full w-full">
            <Loader2 className="w-12 h-12 animate-spin" />
          </div>
        ) : (
          <Image
            src={imageUrl || ProfileImage}
            alt="Profile"
            width={96}
            height={96}
            className="rounded-full"
          />
        )}
        <AvatarFallback>
          {name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col space-y-2">
        <Label htmlFor={`photo-upload-${name}`}>{label}</Label>
        <Input
          id={`photo-upload-${name}`}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </div>
    </div>
  );
};

export default SingleImageUploader;
