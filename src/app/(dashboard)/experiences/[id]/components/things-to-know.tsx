"use client";

import Image from "next/image";
import InfoIcon from "../../../../../../public/hosts-icons/payment-icon.svg";

interface ThingToKnow {
  title: string;
  description: string;
}

interface ThingsToKnowProps {
  thingsToKnow: ThingToKnow[];
}

const ThingsToKnow: React.FC<ThingsToKnowProps> = ({ thingsToKnow }) => {
  return (
    <div className="relative">
      {thingsToKnow.map((item, index) => {
        const isLast = index === thingsToKnow.length - 1;

        return (
          <div
            key={`${item.title}-${index}`}
            className="relative flex items-start pb-8 last:pb-0 gap-4"
          >
            {/* Timeline line (hide if last item) */}
            {!isLast && (
              <div className="absolute left-[22px] top-8 w-0.5 h-full bg-gray-300 -translate-x-0.5" />
            )}

            {/* Indicator Icon */}
            <div className="relative z-10 flex items-center justify-center w-[43px] h-[43px]">
              <Image src={InfoIcon} alt="Info icon" />
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0 space-y-2 pt-2">
              <div className="text-[18px] font-bold text-[#3D3D3D]">
                {item.title}
              </div>
              <div className="text-[18px] text-[#3D3D3D]">
                {item.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ThingsToKnow;
