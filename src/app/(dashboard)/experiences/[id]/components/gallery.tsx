"use client";
import Image from "next/image";

interface GalleryProps {
  images: string[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className="rounded-2xl p-6  bg-[#3D3D3D0D] space-y-4">
      <div className="text-[24px] font-bold text-[#0D2E61]">Gallery</div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className=" relative aspect-211/227 gap-2 ">
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl "
            />
          </div>
        ))}
      </div>
    </div>
  );
};
