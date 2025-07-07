"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/common/header";
import { useTour } from "@/hooks/use-tour";
import { Gallery } from "./components/gallery";
import { Packages } from "./components/packages";
import { useHost } from "@/hooks/use-hosts";
import { TourTimes } from "./components/tour-times";
import { Button } from "@/components/ui/button";
import { CoverPhoto } from "./components/cover-photo";

const ExperienceDetailsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const { id } = useParams();
  const { tour } = useTour(id as string);
  const { host } = useHost(tour?.guideId || "");

  if (!tour) {
    return (
      <>
        <Header
          //showBackButton={tab === "experience-library"}
          showBackButton
          onBack={() => router.back()}
        />
        <div className=" py-6 px-8">Tour not found</div>
      </>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <Header showBackButton onBack={() => router.back()} />

        <div className="flex-1 py-6 px-8 ">
          <div className="bg-white rounded-xl  drop-shadow-lg  flex flex-col ">
            <div className="text-[15px] border-b-2 border-[#0D2E61] text-[#3D3D3DCC] px-8 py-4 pb-6">
              PROPOSED EXPERIENCE
            </div>

            <div className=" space-y-8 px-8 py-6">
              <h1 className="text-[30px] text-[#0D2E61] capitalize">
                {tour.name} Summary
              </h1>

              <p className="text-[#000000B2] text-[17px] ">
                Review all the Hosts details and click confirm
              </p>
            </div>

            <div className="m-8 space-y-8 shadow-lg   drop-shadow-lg rounded-2xl p-8">
              <div className=" border-b rounded-none shadow-none flex justify-between items-center py-6">
                <div>
                  <h1 className="text-[15px] text-[#3D3D3DCC]">MEAL NAME</h1>
                  <p className="text-[#0D2E61] text-[30px] font-bold ">
                    The Ultimate Breakfast at Istanbul
                  </p>
                </div>

                <Button className="h-[64px] bg-[#FB8B24] hover:bg-orange-400 font-bold text-white text-[22px] cursor-pointer rounded-full">
                  $30.00/ Person
                </Button>
              </div>

              <div className=" flex flex-col gap-8 ">
                <div className="drop-shadow-lg rounded-2xl p-6  bg-[#3D3D3D0D]  flex flex-col gap-12">
                  <div className="text-[24px] font-bold text-[#0D2E61]">
                    About the tour
                  </div>

                  <div>
                    <p className="text-[#3D3D3D] text-[18px] ">
                      {tour.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 items-center w-1/2">
                    <div className="border-y p-4 border-[#3D3D3D1A] flex flex-row items-center justify-center space-x-1">
                      <p className="text-[#3D3D3D] font-bold text-[15px] capitalize">
                        {tour.tourDuration}
                      </p>
                      <p className="text-[#3D3D3D]  text-[15px]">Duration</p>
                    </div>

                    <div className="border p-4 border-[#3D3D3D1A] flex items-center justify-center text-[#3D3D3D] font-bold text-[15px]">
                      {tour.city}, {tour.country}
                    </div>
                    <div className="border-y p-4 border-[#3D3D3D1A] flex items-center justify-center text-[#3D3D3D] font-bold text-[15px]">
                      {tour.difficultyLevel}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 ">
                    {tour.tourFeatures.map((feature) => (
                      <Badge
                        key={feature}
                        className="text-[15px] text-[#3D3D3D] bg-[#0D2E610D] rounded-full px-4 py-1.5"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <CoverPhoto images={tour.galleryImageUrls} />

                <Gallery images={tour.galleryImageUrls} />

                <TourTimes tourTimes={tour.tourTimes} />

                <div className="drop-shadow-lg rounded-2xl p-8  bg-[#3D3D3D0D] ">
                  {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="text-lg font-bold mb-2">Details</h3>
                        <p>
                          <strong>Host:</strong> {host?.name || "N/A"}
                        </p>
                        <p>
                          <strong>Country:</strong> {tour.country}
                        </p>
                        <p>
                          <strong>City:</strong> {tour.city}
                        </p>
                        <p>
                          <strong>Duration:</strong> {tour.tourDuration}
                        </p>
                        <p>
                          <strong>Difficulty:</strong> {tour.difficultyLevel}
                        </p>
                        <p>
                          <strong>Cost:</strong> ${tour.cost}
                        </p>
                        <p>
                          <strong>Phone:</strong> {tour.phone}
                        </p>
                        <p>
                          <strong>Country Code:</strong> {tour.countryCode}
                        </p>
                        <p>
                          <strong>Status:</strong>
                          <Badge
                            variant={tour.isActive ? "default" : "destructive"}
                            className={
                              tour.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {tour.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </p>
                        <p>
                          <strong>Approval Status:</strong>{" "}
                          <Badge
                            variant={
                              tour.isApproved ? "default" : "destructive"
                            }
                            className={
                              tour.isApproved
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {tour.isApproved ? "Approved" : "Not Approved"}
                          </Badge>
                        </p>
                      </div>
                      <Packages packages={tour.tourPackages} />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailsPage;
