"use client";
import Image from "next/image";

interface GalleryProps {
  images: string[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const validImages = (images || []).filter(Boolean);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {validImages.length > 0 ? (
        validImages.map((image, index) => (
          <div key={index} className=" relative aspect-211/227 gap-2 ">
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl "
            />
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No gallery images.
        </div>
      )}
    </div>
  );
};
