"use client";
import CheckIcon from "../../../../../../public/experience/check-icon.svg";
import XCloseIcon from "../../../../../../public/experience/xclose-icon.svg";
import Image from "next/image";

interface ChildPollicyRequirementsProps {
  cost: string;
}
export const ChildPollicyRequirements: React.FC<
  ChildPollicyRequirementsProps
> = ({ cost }) => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="rounded-2xl p-8  bg-[#3D3D3D0D]  flex flex-col gap-6">
        <div className="text-[24px] font-bold text-[#0D2E61]">
          Children Policy
        </div>

        <div className="flex flex-wrap gap-4">
          <Image src={CheckIcon} alt="check icon" className="object-contain" />

          <span className="text-[#3D3D3D]  text-[18px]">
            Children are allowed
          </span>
        </div>

        <div className="bg-white drop-shadow-xl p-6 rounded-2xl space-y-6">
          <div className="flex flex-row justify-between items-center">
            <div className="text-[20px] text-[#0D2E61] font-bold">Children</div>

            <Image
              src={XCloseIcon}
              alt="xclose icon"
              className="object-contain"
            />
          </div>

          <p className="text-[#3D3D3DB2] font-bold text-[19px] ">
            ${cost}/ person
          </p>
        </div>
      </div>

      <div className=" rounded-2xl p-8  bg-[#3D3D3D0D]  flex flex-col gap-6">
        <div className="text-[24px] font-bold text-[#0D2E61]">
          Guest Requirements
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-[#3D3D3D] text-[20px]">Minimum Age:</span>
          <span className="text-[#000000B2]  text-[20px] font-bold ">18</span>
        </div>
      </div>
    </div>
  );
};
