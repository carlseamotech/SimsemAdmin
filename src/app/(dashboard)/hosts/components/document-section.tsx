"use client";
import { useState } from "react";
import UploadIcon from "../../../../../public/common/upload-cloud-icon.svg";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { HiOutlineX } from "react-icons/hi";

interface DocumentUploadSectionProps {
  isEditing: boolean;
  idFrontFileUrl?: string;
  idBackFileUrl?: string;
}

export function DocumentUploadSection({
  isEditing,
  idFrontFileUrl,
  idBackFileUrl,
}: DocumentUploadSectionProps) {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [certificateImage, setCertificateImage] = useState<File | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const renderUploadBox = (
    label: string,
    image: File | null,
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    imageUrl?: string
  ) => (
    <div className="rounded-lg text-center w-full mx-auto relative">
      <label className="bg-[#00000008] rounded-lg mb-4  w-full aspect-[5/2]  flex items-center justify-center border-2 border-dashed border-gray-100 hover:border-gray-300 transition-colors cursor-pointer overflow-hidden relative">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setImage)}
          className="hidden"
          disabled={!isEditing}
        />

        {image ? (
          <>
            <Image
              src={URL.createObjectURL(image)}
              alt={label}
              layout="fill"
              objectFit="cover"
            />
            {isEditing && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // prevent triggering file input
                  setImage(null);
                }}
                className="absolute top-2 right-2 bg-[#F63838] rounded-full w-7 h-7 flex items-center justify-center text-white "
              >
                <HiOutlineX />
              </button>
            )}
          </>
        ) : imageUrl ? (
          <Image
            src={imageUrl}
            alt={label}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src={UploadIcon}
              alt="Upload Icon"
              className="w-[46px] h-[46px]"
            />
            <p className="text-[15px] font-bold text-[#3D3D3D]">
              Upload or drag here
            </p>
          </div>
        )}
      </label>
      <p className="text-[20px] text-[#3D3D3D] font-medium">{label}</p>
    </div>
  );

  return (
    <>
      {/* ID Card */}
      <Card className="bg-[#3D3D3D0D] border-none p-0 ">
        <CardContent className="p-6">
          <h3 className="text-[24px] font-bold text-[#0D2E61] mb-3">ID Card</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderUploadBox(
              "Front Side",
              frontImage,
              setFrontImage,
              idFrontFileUrl
            )}
            {renderUploadBox(
              "Back Side",
              backImage,
              setBackImage,
              idBackFileUrl
            )}
          </div>
        </CardContent>
      </Card>

      {/* Certificate */}
      <Card className="bg-[#3D3D3D0D] border-none p-0">
        <CardContent className="p-6">
          <h3 className="text-[24px] font-bold text-[#0D2E61] mb-3">
            Certificate
          </h3>
          {renderUploadBox(
            "Certificate",
            certificateImage,
            setCertificateImage
          )}
        </CardContent>
      </Card>
    </>
  );
}

// "use client";
// import UploadIcon from "../../../public/experience-icons/upload-cloud-icon.svg";
// import { Card, CardContent } from "@/components/ui/card";
// import { Upload, Eye } from "lucide-react";
// import Image from "next/image";

// interface DocumentUploadSectionProps {
//   isEditing: boolean;
// }

// export function DocumentUploadSection({
//   isEditing,
// }: DocumentUploadSectionProps) {
//   return (
//     <>
//       {/* ID Card */}
//       <Card className="bg-[#3D3D3D0D]  border-none p-0 ">
//         <CardContent className="p-6 ">
//           <h3 className="text-[24px] font-bold text-[#0D2E61] mb-3">ID Card</h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className=" rounded-lg">
//               <div className="bg-[#00000008] p-4 rounded-lg mb-4 min-h-[250px] flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
//                 <div className=" flex flex-col justify-center items-center gap-2">
//                   <Image
//                     src={UploadIcon}
//                     alt="Upload Icon"
//                     className="w-[46px] -[46px]"
//                   />
//                   <p className="text-[15px] font-bold text-[#3D3D3D]">
//                     Upload or drag here
//                   </p>
//                 </div>
//               </div>
//               <p className="text-[20px] text-[#3D3D3D] font-medium">
//                 Front Side
//               </p>
//             </div>

//             <div className=" rounded-lg ">
//               <div className="bg-[#00000008] p-4 rounded-lg mb-4 min-h-[250px] flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
//                 <div className=" flex flex-col justify-center items-center gap-2">
//                   <Image
//                     src={UploadIcon}
//                     alt="Upload Icon"
//                     className="w-[46px] -[46px]"
//                   />
//                   <p className="text-[15px] font-bold text-[#3D3D3D]">
//                     Upload or drag here
//                   </p>
//                 </div>
//               </div>

//               <p className="text-[20px] text-[#3D3D3D] font-medium">
//                 Back Side
//               </p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Certificate */}
//       <Card className="bg-[#3D3D3D0D]  border-none p-0 ">
//         <CardContent className="p-6">
//           <h3 className="text-[24px] font-bold text-[#0D2E61] mb-3">
//             Certificate
//           </h3>
//           <div className="  rounded-lg">
//             <div className="bg-[#00000008] p-4 rounded-lg mb-4 min-h-[250px] flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
//               <div className=" flex flex-col justify-center items-center gap-2">
//                 <Image
//                   src={UploadIcon}
//                   alt="Upload Icon"
//                   className="w-[46px] -[46px]"
//                 />
//                 <p className="text-[15px] font-bold text-[#3D3D3D]">
//                   Upload or drag here
//                 </p>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </>
//   );
// }
