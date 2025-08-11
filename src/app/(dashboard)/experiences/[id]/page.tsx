"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/common/header";
import { useTour } from "@/hooks/use-tour";
import { Gallery } from "./components/gallery";
import { Button } from "@/components/ui/button";
import { CoverPhoto } from "./components/cover-photo";
import ClockIcon from "../../../../../public/experience/clock-icon.svg";
import LocationIcon from "../../../../../public/experience/location-icon.svg";
import FrameIcon from "../../../../../public/experience/frame-icon.svg";
import Image from "next/image";
import { TourMenu } from "./components/tour-menu";
import { useState } from "react";
import ThingsToKnow from "./components/things-to-know";
import { WhatsIncludedNot } from "./components/included-not";
import { Itinerary, ItineraryItem } from "./components/itinerary";
import { ChildPollicyRequirements } from "./components/pollicy-requirements";
import { Packages } from "./components/packages";
import WhereToMeet from "./components/meet";
import DateAndTime from "./components/dateandtime";
import { ExperienceDetailsSkeleton } from "./components/experience-details-skeleton";
import { useMemo } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AboutTourModal } from "./components/about-tour-modal";
import { CoverPhotoModal } from "./components/cover-photo-modal";
import { GalleryModal } from "./components/gallery-modal";
import { WhatToExpectModal } from "./components/what-to-expect-modal";
import { PackagesModal } from "./components/packages-modal";
import { WhereToMeetModal } from "./components/where-to-meet-modal";
import { DateAndTimeModal } from "./components/date-and-time-modal";
import { InclusionsExclusionsModal } from "./components/inclusions-exclusions-modal";
import { ThingsToKnowModal } from "./components/things-to-know-modal";
import { ItineraryModal } from "./components/itinerary-modal";
import toast from "react-hot-toast";

const difficultyLevels = ["Basic", "Intermediate", "Advanced"];

const ExperienceDetailsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const { id } = useParams();
  const { tour, isLoading, updateTour } = useTour(id as string);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isCoverPhotoModalOpen, setIsCoverPhotoModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isWhatToExpectModalOpen, setIsWhatToExpectModalOpen] = useState(false);
  const [isPackagesModalOpen, setIsPackagesModalOpen] = useState(false);
  const [isWhereToMeetModalOpen, setIsWhereToMeetModalOpen] = useState(false);
  const [isDateAndTimeModalOpen, setIsDateAndTimeModalOpen] = useState(false);
  const [
    isInclusionsExclusionsModalOpen,
    setIsInclusionsExclusionsModalOpen,
  ] = useState(false);
  const [isThingsToKnowModalOpen, setIsThingsToKnowModalOpen] = useState(false);
  const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);
  const [dialog, setDialog] = useState({
    isOpen: false,
    action: "",
  });

  const handleApprove = async () => {
    if (!tour) return;
    try {
      await updateTour({ isApproved: true, type: tour.type });
      toast.success("Experience approved successfully");
    } catch {
      toast.error("Failed to approve experience");
    } finally {
      setDialog({ isOpen: false, action: "" });
    }
  };

  const handleDecline = async () => {
    if (!tour) return;
    try {
      await updateTour({ isApproved: false, type: tour.type });
      toast.success("Experience declined successfully");
    } catch {
      toast.error("Failed to decline experience");
    } finally {
      setDialog({ isOpen: false, action: "" });
    }
  };

  const parsedItinerary = useMemo(() => {
    if (!tour?.itinerary) return [];
    return tour.itinerary
      .map((item) => {
        try {
          return typeof item === "string" ? JSON.parse(item) : item;
        } catch {
          toast.error("Failed to parse itinerary item");
          return null;
        }
      })
      .filter(Boolean) as ItineraryItem[];
  }, [tour?.itinerary]);

  if (isLoading) {
    return <ExperienceDetailsSkeleton />;
  }

  if (!tour) {
    return (
      <>
        <Header
          showBackButton={tab === "experience-library"}
          onBack={() => router.back()}
        />
        <div className=" py-6 px-8">Tour not found</div>
      </>
    );
  }

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex flex-col">
          <Header
            showBackButton={tab === "experience-library"}
            onBack={() => router.back()}
          />

          <div className="flex-1 py-6 px-8 ">
            <div className="bg-white rounded-xl  drop-shadow-lg  flex flex-col ">
              <div className="text-[15px] border-b-2 border-[#0D2E61] text-[#3D3D3DCC] px-8 py-4 pb-6">
                PROPOSED EXPERIENCE
              </div>

              <div className=" space-y-8 px-8 py-6">
                <div className="flex items-center gap-4">
                  <h1 className="text-[30px] text-[#0D2E61] capitalize">
                    {tour.name} Summary
                  </h1>
                  <Badge
                    className={`${
                      tour.isApproved ? "bg-green-500" : "bg-red-500"
                    } text-white`}
                  >
                    {tour.isApproved ? "Approved" : "Not Approved"}
                  </Badge>
                  <Badge
                    className={`${
                      tour.isActive ? "bg-green-500" : "bg-red-500"
                    } text-white`}
                  >
                    {tour.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <p className="text-[#000000B2] text-[17px] ">
                  Review all the Hosts details and click confirm
                </p>
              </div>

              <div className="m-8 space-y-8 shadow-lg   drop-shadow-lg rounded-2xl p-8">
                <div className=" border-b rounded-none shadow-none flex justify-between items-center py-6">
                  <div>
                    <h1 className="text-[15px] text-[#3D3D3DCC]">
                      {tab === "experience-library"
                        ? ` MEAL NAME`
                        : `TOUR NAME`}
                    </h1>
                    <p className="text-[#0D2E61] text-[30px] font-bold ">
                      {tour.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Experience ID: {tour.objectId}
                    </p>
                  </div>

                  <Button className="h-[64px] bg-[#FB8B24] hover:bg-orange-400 font-bold text-white text-[22px] cursor-pointer rounded-full">
                    ${tour.cost}/ Person
                  </Button>
                </div>

                <div className=" flex flex-col gap-8 ">
                  {/* about the toour */}
                  <div className=" rounded-2xl p-6  bg-[#3D3D3D0D]  flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <div className="text-[24px] font-bold text-[#0D2E61]">
                        About the tour
                      </div>
                      <Button
                        size="lg"
                        type="button"
                        variant="outline"
                        onClick={() => setIsAboutModalOpen(true)}
                        className="text-[17px] font-bold bg-[#3D3D3D4D] text-[#000000B2]"
                      >
                        Edit
                      </Button>
                    </div>

                    <div>
                      <p className="text-[#3D3D3D] text-[18px] ">
                        {tour.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 items-center w-full lg:w-1/2 h-[55px]">
                      <div className="border-y p-4 border-[#3D3D3D1A] flex flex-row items-center justify-center gap-2 h-full ">
                        <Image
                          src={ClockIcon}
                          alt="clock icon"
                          className="object-contain"
                        />

                        <span className="text-[#3D3D3D] font-bold text-[15px] capitalize truncate space-x-1">
                          <span> {tour.tourDuration} </span>
                          <span className="text-[#3D3D3D] text-[15px] ">
                            Duration
                          </span>
                        </span>
                      </div>

                      <div className="border p-4 border-[#3D3D3D1A]  text-[#3D3D3D]  flex flex-row items-center justify-center gap-2 h-full  ">
                        <Image
                          src={LocationIcon}
                          alt="location icon"
                          className="object-contain"
                        />
                        <span className="font-bold text-[15px] truncate">
                          {tour.city}, {tour.country}
                        </span>
                      </div>

                      <div className="border-y p-4 border-[#3D3D3D1A] flex flex-row items-center justify-center gap-2  h-full ">
                        <Image
                          src={FrameIcon}
                          alt="frame icon"
                          className="object-contain"
                        />
                        <span className="text-[#3D3D3D] font-bold text-[15px] truncate">
                          {tour.difficultyLevel}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 ">
                      {tour.tourFeatures?.map((feature: string) => (
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
                    <div className="flex justify-between items-center">
                      <div className="text-[24px] font-bold text-[#0D2E61]">
                        Cover Photo
                      </div>
                      <Button
                        size="lg"
                        type="button"
                        variant="outline"
                        onClick={() => setIsCoverPhotoModalOpen(true)}
                        className="text-[17px] font-bold bg-[#3D3D3D4D] text-[#000000B2]"
                      >
                        Edit
                      </Button>
                    </div>
                    <CoverPhoto cover={tour.coverImageUrl} />
                  </div>

                  {/* gallery */}
                  <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-[24px] font-bold text-[#0D2E61]">
                        Gallery
                      </div>
                      <Button
                        size="lg"
                        type="button"
                        variant="outline"
                        onClick={() => setIsGalleryModalOpen(true)}
                        className="text-[17px] font-bold bg-[#3D3D3D4D] text-[#000000B2]"
                      >
                        Edit
                      </Button>
                    </div>
                    <Gallery images={tour.galleryImageUrls || []} />
                  </div>

                  {/* whats to expect */}
                  <div className="rounded-2xl p-6  bg-[#3D3D3D0D]  flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <div className="text-[24px] font-bold text-[#0D2E61]">
                        What to expect
                      </div>
                      <Button
                        size="lg"
                        type="button"
                        variant="outline"
                        onClick={() => setIsWhatToExpectModalOpen(true)}
                        className="text-[17px] font-bold bg-[#3D3D3D4D] text-[#000000B2]"
                      >
                        Edit
                      </Button>
                    </div>

                    <div>
                      <p className="text-[#000000B2]  text-[18px] ">
                        {tour.whatToExpect}
                      </p>
                    </div>
                  </div>

                  {/* child policy & guest requirements */}
                  <ChildPollicyRequirements cost={tour.cost} />

                  <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-[24px] font-bold text-[#0D2E61]">
                        Pricing Package
                      </div>
                      <Button
                        size="lg"
                        type="button"
                        variant="outline"
                        onClick={() => setIsPackagesModalOpen(true)}
                        className="text-[17px] font-bold bg-[#3D3D3D4D] text-[#000000B2]"
                      >
                        Edit
                      </Button>
                    </div>
                    <Packages packages={tour.tourPackages || []} />
                  </div>

                  <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-[24px] font-bold text-[#0D2E61]">
                        Where to Meet
                      </div>
                      <Button
                        size="lg"
                        type="button"
                        variant="outline"
                        onClick={() => setIsWhereToMeetModalOpen(true)}
                        className="text-[17px] font-bold bg-[#3D3D3D4D] text-[#000000B2]"
                      >
                        Edit
                      </Button>
                    </div>
                    <WhereToMeet
                      meetingPoint={tour.meetingPoint}
                      lat={tour.meetingPointLat}
                      lng={tour.meetingPointLong}
                    />
                  </div>

                  <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-[24px] font-bold text-[#0D2E61]">
                        Date & Time
                      </div>
                      <Button
                        size="lg"
                        type="button"
                        variant="outline"
                        onClick={() => setIsDateAndTimeModalOpen(true)}
                        className="text-[17px] font-bold bg-[#3D3D3D4D] text-[#000000B2]"
                      >
                        Edit
                      </Button>
                    </div>
                    <DateAndTime tourTimes={tour.tourTimes || []} />
                  </div>

                  {/* things to know */}
                  <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-[24px] font-bold text-[#0D2E61]">
                        Things to Know
                      </div>
                      <Button
                        size="lg"
                        type="button"
                        variant="outline"
                        onClick={() => setIsThingsToKnowModalOpen(true)}
                        className="text-[17px] font-bold bg-[#3D3D3D4D] text-[#000000B2]"
                      >
                        Edit
                      </Button>
                    </div>
                    <ThingsToKnow thingsToKnow={tour.thingsToKnow || []} />
                  </div>

                  {/* WhatsIncludedNot */}
                  <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-[24px] font-bold text-[#0D2E61]">
                        What’s Included, What’s Not
                      </div>
                      <Button
                        size="lg"
                        type="button"
                        variant="outline"
                        onClick={() => setIsInclusionsExclusionsModalOpen(true)}
                        className="text-[17px] font-bold bg-[#3D3D3D4D] text-[#000000B2]"
                      >
                        Edit
                      </Button>
                    </div>
                    <WhatsIncludedNot
                      inclusions={tour.inclusions || []}
                      exclusions={tour.exclusions || []}
                    />
                  </div>

                  {/* tour menu */}
                  <TourMenu courses={tour.courses || []} />

                  <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-[24px] font-bold text-[#0D2E61]">
                        Our Detailed Itinerary
                      </div>
                      <Button
                        size="lg"
                        type="button"
                        variant="outline"
                        onClick={() => setIsItineraryModalOpen(true)}
                        className="text-[17px] font-bold bg-[#3D3D3D4D] text-[#000000B2]"
                      >
                        Edit
                      </Button>
                    </div>
                    <Itinerary itinerary={parsedItinerary} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* button */}
          <div className="flex justify-between p-8 border-t">
            <div className="space-x-3">
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={() =>
                  setDialog({ isOpen: true, action: "decline" })
                }
                className="text-[17px] font-bold bg-[#9A031E] text-white"
              >
                Decline
              </Button>
            </div>
            <div className="space-x-3">
              <Button
                size="lg"
                type="button"
                className="text-[17px] font-bold bg-[#FB8B24] text-[#FFFFFF] hover:bg-orange-500"
                onClick={() =>
                  setDialog({ isOpen: true, action: "approve" })
                }
              >
                Approve
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AlertDialog
        open={dialog.isOpen}
        onOpenChange={(isOpen) => setDialog({ ...dialog, isOpen })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to {dialog.action} this experience. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={
                dialog.action === "approve" ? handleApprove : handleDecline
              }
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AboutTourModal
        tour={tour}
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        difficultyLevels={difficultyLevels}
      />
      <CoverPhotoModal
        tour={tour}
        isOpen={isCoverPhotoModalOpen}
        onClose={() => setIsCoverPhotoModalOpen(false)}
      />
      <GalleryModal
        tour={tour}
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
      />
      <WhatToExpectModal
        tour={tour}
        isOpen={isWhatToExpectModalOpen}
        onClose={() => setIsWhatToExpectModalOpen(false)}
      />
      <PackagesModal
        tour={tour}
        isOpen={isPackagesModalOpen}
        onClose={() => setIsPackagesModalOpen(false)}
      />
      <WhereToMeetModal
        tour={tour}
        isOpen={isWhereToMeetModalOpen}
        onClose={() => setIsWhereToMeetModalOpen(false)}
      />
      <DateAndTimeModal
        tour={tour}
        isOpen={isDateAndTimeModalOpen}
        onClose={() => setIsDateAndTimeModalOpen(false)}
      />
      <InclusionsExclusionsModal
        tour={tour}
        isOpen={isInclusionsExclusionsModalOpen}
        onClose={() => setIsInclusionsExclusionsModalOpen(false)}
      />
      <ThingsToKnowModal
        tour={tour}
        isOpen={isThingsToKnowModalOpen}
        onClose={() => setIsThingsToKnowModalOpen(false)}
      />
      <ItineraryModal
        tour={tour}
        isOpen={isItineraryModalOpen}
        onClose={() => setIsItineraryModalOpen(false)}
      />
    </>
  );
};

export default ExperienceDetailsPage;
