"use client";

import React from "react";
import Image from "next/image";
import { X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import PlusIcon from "../../../../../public/experience/plus.svg";
import XCancelIcon from "../../../../../public/experience/xcancel.svg";
import Dining from "../../../../../public/dining-test.png";
import Living from "../../../../../public/living-test.png";

interface OfferExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfferExperienceModal: React.FC<OfferExperienceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedType, setSelectedType] = React.useState<
    "local-living" | "dining" | null
  >(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedType) {
      onClose();

      // ✅ navigate based on selected type
      if (selectedType === "local-living") {
        router.push("/local-living");
      } else if (selectedType === "dining") {
        router.push("/dining");
      }
    }
  };

  const handleCancel = () => {
    setSelectedType(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="md:max-w-6xl p-0 rounded-2xl gap-4 "
      >
        <DialogHeader className="py-6 px-4 md:px-8 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[25px] font-semibold text-[#0D2E61]">
              Offer a New Experience
            </DialogTitle>

            <button onClick={onClose} className="cursor-pointer">
              <Image src={XCancelIcon} alt="CancelIcon" />
            </button>
          </div>
        </DialogHeader>

        <div className="px-4 md:px-8 space-y-6">
          <div className="text-[15px] text-[#3D3D3D] ">
            Add more experiences to the Library
          </div>

          <div className="grid grid-cols-4 gap-6 ">
            <Card
              className={`cursor-pointer transition-all duration-200  p-0 h-full shadow-md shadow-[#FB8B24]/20  ${
                selectedType === "local-living" ? "ring-1 ring-[#FB8B24]" : ""
              }`}
              onClick={() => setSelectedType("local-living")}
            >
              <CardContent className="p-4 space-y-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                  <Image
                    src={Living}
                    alt="Local Living Experience"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12  rounded-full flex items-center justify-center">
                      <Image src={PlusIcon} alt="plus" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[18px] text-[#0D2E61]  ">
                    Local Living Experience
                  </h3>
                  <p className="text-[14px] text-[#3D3D3D] leading-relaxed line-clamp-3 md:line-clamp-none">
                    Offer an activity limited to a few hours within a day such
                    as cooking workshops, a walk in your neighborhood, or even
                    just a visit to your local coffee shop.
                  </p>
                  <p className="text-[14px] text-[#3D3D3D]">
                    The sky is the limit!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Dining Experience Card */}
            <Card
              className={`cursor-pointer transition-all duration-200  p-0 h-full shadow-md shadow-[#FB8B24]/20 rounded-2xl  ${
                selectedType === "dining" ? "ring-1 ring-[#FB8B24]" : ""
              }`}
              onClick={() => setSelectedType("dining")}
            >
              <CardContent className="p-4 space-y-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                  <Image
                    src={Dining}
                    alt="Dining Experience"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12  rounded-full flex items-center justify-center">
                      <Image src={PlusIcon} alt="plus" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[18px] text-[#0D2E61]">
                    Local Living Experience
                  </h3>
                  <p className="text-[14px] text-[#3D3D3D] leading-relaxed line-clamp-3 md:line-clamp-none">
                    Cook and serve authentic local dishes to travelers in your
                    home or take them to your favorite restaurants!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3  border-t py-6 px-4 md:px-8 ">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="px-6 bg-transparent"
          >
            Cancel
          </Button>

          <Button
            onClick={handleContinue}
            disabled={!selectedType}
            className="bg-[#FB8B24] hover:bg-orange-400 text-white px-6"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
