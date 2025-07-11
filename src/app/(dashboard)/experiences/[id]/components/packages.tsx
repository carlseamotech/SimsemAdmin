"use client";

import XCloseIcon from "../../../../../../public/experience/xclose-icon.svg";
import Image from "next/image";

interface Package {
  fromPerson: string;
  toPerson: string;
  cost: string;
  actualCost: string;
}

interface PackagesProps {
  packages: string[];
}

export const Packages: React.FC<PackagesProps> = ({ packages }) => {
  const parsedPackages: Package[] = packages.map((pkg) => JSON.parse(pkg));

  return (
    <div className="rounded-2xl p-8 bg-[#3D3D3D0D] flex flex-col gap-6">
      <div className="text-[24px] font-bold text-[#0D2E61]">
        Pricing Package
      </div>

      <div className="flex flex-row gap-6 flex-wrap">
        {parsedPackages.map((pkg, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-xl p-6 rounded-2xl space-y-6 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-12px)]"
          >
            <div className="flex flex-row justify-between items-center">
              <div className="text-[20px] text-[#0D2E61] font-bold">
                {pkg.fromPerson}-{pkg.toPerson} People
              </div>

              <Image
                src={XCloseIcon}
                alt="Close"
                className="object-contain cursor-pointer"
                width={20}
                height={20}
              />
            </div>

            <p className="text-[#3D3D3DB2] font-bold text-[19px]">
              ${pkg.actualCost}/ person
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
