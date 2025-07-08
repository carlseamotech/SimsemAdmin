"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import InfoIcon from "../../../../../../public/hosts-icons/payment-icon.svg";

const ThingsToKnow = () => {
  const thingsToKnow = [
    {
      name: "Cancellation Policy",
      description:
        "Free cancellation up to 24 hours before the experience starts.",
    },
    {
      name: "What to Bring",
      description: "Comfortable walking shoes, water bottle, and camera.",
    },
    {
      name: "What to Bring",
      description: "Comfortable walking shoes, water bottle, and camera.",
    },
    {
      name: "What to Bring",
      description: "Comfortable walking shoes, water bottle, and camera.",
    },
    {
      name: "What to Bring",
      description: "Comfortable walking shoes, water bottle, and camera.",
    },
  ];

  return (
    <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-6">
      <h3 className="text-[24px] font-bold text-[#0D2E61] mb-6">
        Things to Know
      </h3>

      <div className="relative">
        {thingsToKnow.map((item, index) => {
          const isLast = index === thingsToKnow.length - 1;

          return (
            <div
              key={`${item.name}-${index}`}
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
                  {item.name}
                </div>
                <div className="text-[18px] text-[#3D3D3D]">
                  {item.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThingsToKnow;
