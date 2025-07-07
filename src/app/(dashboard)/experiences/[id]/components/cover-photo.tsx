"use client";
import Image from "next/image";

interface CoverPhotoProps {
  images: string[];
}

export const CoverPhoto: React.FC<CoverPhotoProps> = ({ images }) => {
  const coverImage = images[0];

  if (!coverImage) return null;

  return (
    <div className="drop-shadow-lg rounded-2xl p-6 bg-[#3D3D3D0D] space-y-4">
      <div className="text-[24px] font-bold text-[#0D2E61]">Cover Photo</div>

      <div className="relative w-full h-[312px]">
        <Image
          src={coverImage}
          alt="Cover photo"
          fill
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
};
