"use client";
import ClockIcon from "../../../../../public/experience/clock-icon.svg";
import LocationIcon from "../../../../../public/experience/location-icon.svg";
import cover from "../../../../../public/dining-test.png";
import CheckIcon from "../../../../../public/experience/check-icon.svg";
import XIcon from "../../../../../public/experience/x-icon.svg";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FormData {
  country: string;
  costPerPerson: string;
  minDuration: string;
  maxDuration: string;
  categories: string[];
  description: string;
  coverPhoto: File | null;
  included: string[];
  notIncluded: string[];
  tourName: string;
}

interface Step6SummaryProps {
  formData: FormData;
}

const Step6Summary: React.FC<Step6SummaryProps> = ({ formData }) => {
  const includedItems = [
    "Local tour guide",
    "Entrance fees",
    "Bottled water",
    "Transportation during tour",
  ];

  const excludedItems = ["Meals and drinks", "History", "Architecture"];

  const tourFeatures = [
    "Culture",
    "Gratuities",
    "Shopping",
    "Outdoor",
    "Workshop",
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <h1 className="text-[30px] text-[#0D2E61] capitalize">
          Local Living Tour Summary
        </h1>

        <p className="text-[#000000B2] text-[17px] ">
          Review all the tour details and click confirm
        </p>
      </div>

      <div className="m space-y-8 shadow-lg   drop-shadow-lg rounded-2xl p-8">
        <div className=" border-b rounded-none shadow-none flex justify-between items-center py-6">
          <div>
            <h1 className="text-[15px] text-[#3D3D3DCC]">TOUR NAME</h1>
            <p className="text-[#0D2E61] text-[30px] font-bold ">
              A walk through my campus
            </p>
          </div>

          <Button className="h-[64px] bg-[#FB8B24] hover:bg-orange-400 font-bold text-white text-[22px] cursor-pointer rounded-full">
            $30.00/ Person
          </Button>
        </div>

        <div className=" flex flex-col gap-8 ">
          {/* about the toour */}
          <div className=" rounded-2xl p-6  bg-[#3D3D3D0D]  flex flex-col gap-6">
            <div className="text-[24px] font-bold text-[#0D2E61]">
              About the tour
            </div>

            <div>
              <p className="text-[#3D3D3D] text-[18px] ">
                {/* {formData.description} */}
                We’ll pick you up from your hotel in Giza or Cairo downtown at
                9am. Then start out tour to visit: Giza Pyramids and Sphinx, the
                panorama fot the best view of the pyramid, Came Rides (30
                minutes), ATV Quad Bikes (60 minutes). Ticket to the whole area
                of the Pyramids and Sphinx is included. After the day trip,
                we’ll transfer you back to your hotel. End of tour.
              </p>
            </div>

            <div className="grid grid-cols-3 items-center w-full lg:w-3/3 h-[55px]">
              <div className="border-y p-4 border-[#3D3D3D1A] flex flex-row items- center justify-center gap-2 h-full ">
                <Image
                  src={LocationIcon}
                  alt="location icon"
                  className="object-contain"
                />

                <span className="text-[#3D3D3D] font-bold text-[15px] capitalize truncate space-x-1">
                  <span className="text-[#0D2E61] text-[15px] ">Country:</span>
                  <span>
                    {/* {formData.city},  
                  {formData.country}*/}
                    Istanbul, Turkey
                  </span>
                </span>
              </div>

              <div className="border-y border-l p-4 border-[#3D3D3D1A]  text-[#3D3D3D]  flex flex-row items-center justify-center gap-2 h-full  ">
                <Image
                  src={ClockIcon}
                  alt="clock icon"
                  className="object-contain"
                />

                <span className="text-[#3D3D3D] font-bold text-[15px] capitalize truncate space-x-1">
                  <span className="text-[#0D2E61] text-[15px] ">Duration:</span>
                  <span> 2-3 Hours</span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 ">
              {tourFeatures.map((feature) => (
                <Badge
                  key={feature}
                  className="text-[15px] text-[#3D3D3D] bg-[#0D2E610D] rounded-full px-4 py-1.5"
                >
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* coverr photo */}
          <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-4">
            <div className="text-[24px] font-bold text-[#0D2E61]">
              Cover Photo
            </div>

            {/* This wrapper ensures responsive ratio */}
            <div className="relative w-full aspect-[887/312] rounded-lg overflow-hidden">
              <Image
                src={cover}
                alt="Cover photo"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* WhatsIncludedNot */}
          <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-6">
            <div className="text-[24px] font-bold text-[#0D2E61]">
              What’s Included, What’s Not
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <ul className="space-y-2">
                  {includedItems.map((item, index) => (
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
                  {excludedItems.map((item, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default Step6Summary;
