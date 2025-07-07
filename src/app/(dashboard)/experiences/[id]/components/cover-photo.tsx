"use client";
import Image from "next/image";

interface CoverPhotoProps {
  cover: string;
}

export const CoverPhoto: React.FC<CoverPhotoProps> = ({ cover }) => {
  return (
    <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-4">
      <div className="text-[24px] font-bold text-[#0D2E61]">Cover Photo</div>

      {/* This wrapper ensures responsive ratio */}
      <div className="relative w-full aspect-[887/312] rounded-lg overflow-hidden">
        <Image src={cover} alt="Cover photo" fill className="object-cover" />
      </div>
    </div>
  );
};
