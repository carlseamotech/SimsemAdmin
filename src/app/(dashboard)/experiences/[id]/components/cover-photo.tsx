"use client";
import Image from "next/image";

interface CoverPhotoProps {
  cover: string;
}

export const CoverPhoto: React.FC<CoverPhotoProps> = ({ cover }) => {
  return (
    <div className="relative w-full aspect-[887/312] rounded-lg overflow-hidden">
      {cover ? (
        <Image src={cover} alt="Cover photo" fill className="object-cover" />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200">
          <p className="text-gray-500">No cover photo</p>
        </div>
      )}
    </div>
  );
};
