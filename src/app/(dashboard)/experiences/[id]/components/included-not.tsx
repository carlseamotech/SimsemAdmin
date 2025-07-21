"use client";
import Image from "next/image";
import CheckIcon from "../../../../../../public/experience/check-icon.svg";
import XIcon from "../../../../../../public/experience/x-icon.svg";

interface WhatsIncludedNotProps {
  inclusions: string[];
  exclusions: string[];
}

export const WhatsIncludedNot: React.FC<WhatsIncludedNotProps> = ({
  inclusions,
  exclusions,
}) => {
  return (
    <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-6">
      <div className="text-[24px] font-bold text-[#0D2E61]">
        What’s Included, What’s Not
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <ul className="space-y-2">
            {inclusions.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-[#3D3D3D]"
              >
                <Image src={CheckIcon} alt=" CheckIcon w-5 h-5 " />
                <span className="text-[18px] text-[#3D3D3D]">{item}</span>
              </li>
            ))}
          </ul>

          <ul className="space-y-2">
            {exclusions.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-[#3D3D3D]"
              >
                <Image src={XIcon} alt=" XIcon " className="w-5 h-5 " />

                <span className="text-[18px] text-[#3D3D3D]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
