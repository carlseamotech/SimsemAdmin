"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "./types";
import { useState } from "react";
import Image from "next/image";

const Step5CoverPhoto = () => {
  const { register } = useFormContext<FormData>();
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="coverImageUrl" className="text-2xl font-bold">Cover Photo</Label>
        <Input
          id="coverImageUrl"
          type="file"
          accept="image/*"
          {...register("coverImageUrl")}
          onChange={handleFileChange}
          className="mt-2"
        />
      </div>
      {preview && (
        <div className="mt-4">
          <Label>Image Preview:</Label>
          <div className="relative w-full h-64 mt-2 border rounded-lg overflow-hidden">
            <Image
              src={preview}
              alt="Cover photo preview"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Step5CoverPhoto;
