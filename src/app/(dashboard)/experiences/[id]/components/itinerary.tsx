"use client";
import Image from "next/image";
import InfoIcon from "../../../../../../public/experience/itenerary-icon.svg";

interface ItineraryItem {
  day: string;
  title: string;
  description: string;
}

interface ItineraryProps {
  itinerary: ItineraryItem[];
}

export const Itinerary: React.FC<ItineraryProps> = ({ itinerary }) => {
  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-6">
      <h3 className="text-[24px] font-bold text-[#0D2E61] mb-6">
        Our Detailed Itinerary
      </h3>

      <div className="relative">
        {itinerary.map((item, index) => {
          const isLast = index === itinerary.length - 1;

          return (
            <div
              key={index}
              className="relative flex items-start pb-8 last:pb-0 gap-4"
            >
              {!isLast && (
                <div className="absolute left-[22px] top-8 w-0.5 h-full bg-gray-300 -translate-x-0.5" />
              )}

              <div className="relative z-10 flex items-center justify-center w-[43px] h-[43px]">
                <Image src={InfoIcon} alt="Info icon" />
              </div>

              <div className="flex-1 min-w-0 space-y-2 pt-2">
                <div className="text-[20px] font-bold text-[#3D3D3D]">
                  <p className="font-bold">
                    {item.day}: {item.title}
                  </p>
                </div>

                <div className="text-[18px] text-[#3D3D3D]">
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
