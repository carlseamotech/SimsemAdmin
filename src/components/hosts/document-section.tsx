"use client";
import UploadIcon from "../../../public/experience-icons/upload-cloud-icon.svg";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Eye } from "lucide-react";
import Image from "next/image";

interface DocumentUploadSectionProps {
  isEditing: boolean;
}

export function DocumentUploadSection({
  isEditing,
}: DocumentUploadSectionProps) {
  return (
    <>
      {/* ID Card */}
      <Card className="bg-[#3D3D3D0D]  border-none p-0 ">
        <CardContent className="p-6 ">
          <h3 className="text-[24px] font-bold text-[#0D2E61] mb-3">ID Card</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className=" rounded-lg">
              <div className="bg-[#00000008] p-4 rounded-lg mb-4 min-h-[250px] flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
                <div className=" flex flex-col justify-center items-center gap-2">
                  <Image
                    src={UploadIcon}
                    alt="Upload Icon"
                    className="w-[46px] -[46px]"
                  />
                  <p className="text-[15px] font-bold text-[#3D3D3D]">
                    Upload or drag here
                  </p>
                </div>
              </div>
              <p className="text-[20px] text-[#3D3D3D] font-medium">
                Front Side
              </p>
            </div>

            <div className=" rounded-lg ">
              <div className="bg-[#00000008] p-4 rounded-lg mb-4 min-h-[250px] flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
                <div className=" flex flex-col justify-center items-center gap-2">
                  <Image
                    src={UploadIcon}
                    alt="Upload Icon"
                    className="w-[46px] -[46px]"
                  />
                  <p className="text-[15px] font-bold text-[#3D3D3D]">
                    Upload or drag here
                  </p>
                </div>
              </div>

              <p className="text-[20px] text-[#3D3D3D] font-medium">
                Back Side
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificate */}
      <Card className="bg-[#3D3D3D0D]  border-none p-0 ">
        <CardContent className="p-6">
          <h3 className="text-[24px] font-bold text-[#0D2E61] mb-3">
            Certificate
          </h3>
          <div className="  rounded-lg">
            <div className="bg-[#00000008] p-4 rounded-lg mb-4 min-h-[250px] flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
              <div className=" flex flex-col justify-center items-center gap-2">
                <Image
                  src={UploadIcon}
                  alt="Upload Icon"
                  className="w-[46px] -[46px]"
                />
                <p className="text-[15px] font-bold text-[#3D3D3D]">
                  Upload or drag here
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
