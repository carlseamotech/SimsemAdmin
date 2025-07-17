"use client";
import Header from "@/components/common/header";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import TestImage from "../../../public/dining-test.png";
import { useAuth } from "@/context/auth";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/hooks/use-dashboard";
import { ProposedTour } from "@/models/proposed-tour";
import { Meal } from "@/models/meal";
import { ExperienceCardSkeleton } from "@/components/common/experience-card-skeleton";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();
  const { tours, meals, isLoading, isError } = useDashboard();

  const localliving = tours
  const dining = meals;

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <Header title={`Hello, ${user?.displayName || "User"}`} />

      {/* Local Living Experience */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-[#3D3D3D] text-[20px] font-bold">
            Local Living Experiences
          </div>

          <Button
            variant="default"
            size="sm"
            className={`rounded-full border-none text-[16px]  font-normal h-[39px] px-4 bg-[#FBB040] hover:bg-orange-400 text-white `}
          >
            Add new experience
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 7 }).map((_, index) => (
              <ExperienceCardSkeleton key={index} />
            ))
          ) : (
            <>
              {localliving && localliving.length !== 0 && (
                <Card className="cursor-pointer  bg-white  rounded-2xl transition-colors">
                  <CardContent className="p-0 h-full">
                    {/* Fixed aspect ratio container */}
                    <div className="aspect-[4/5] flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center">
                        <Plus className="h-14 w-14 text-[#0F4C5C] mb-2" />
                        <p className="text-[18px] text-[#0D2E61] text-center uppercase px-4">
                          Add A new experience
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {localliving &&
                localliving.map((localliving: ProposedTour, id) => (
                  <Card
                    key={id}
                    onClick={() =>
                      router.push(`/experiences/${localliving.objectId}`)
                    }
                    className={`cursor-pointer p-0 transition-all duration-200 hover:shadow-md`}
                  >
                    <CardContent className="p-4 ">
                      {/* Fixed aspect ratio container */}
                      <div className="aspect-[4/5] flex flex-col gap-4">
                        {/* Image section */}
                        <div className="flex-[3] relative overflow-hidden">
                          <Image
                            src={
                              localliving.coverImageUrl ||
                              TestImage ||
                              "/placeholder.svg?height=200&width=300"
                            }
                            alt={localliving.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {/* Content section */}
                        <div className="flex-[2]  flex flex-col justify-start">
                          <h4 className=" text-[#0D2E61] text-[18px] mb-1 truncate">
                            {localliving.name}
                          </h4>
                          <p className="text-[14px] text-[#3D3D3D] leading-relaxed line-clamp-2">
                            {localliving.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </>
          )}
        </div>
      </div>

      {/* Dinning Experience */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-[#3D3D3D] text-[20px] font-bold">
            Dining Experiences
          </div>

          {/* <Button
            variant="default"
            size="sm"
            className={`rounded-full border-none text-[16px]  font-normal h-[39px] px-4 bg-[#FBB040] hover:bg-orange-400 text-white `}
          >
            Add new experience
          </Button> */}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ExperienceCardSkeleton key={index} />
            ))
          ) : (
            <>
              {dining && dining.length === 0 && (
                <Card className="cursor-pointer bg-white  rounded-2xl transition-colors">
                  <CardContent className="p-0 h-full">
                    {/* Fixed aspect ratio container */}
                    <div className="aspect-[4/5] flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center">
                        <Plus className="h-14 w-14 text-[#0F4C5C] mb-2" />
                        <p className="text-[18px] text-[#0D2E61] text-center uppercase px-4">
                          Add A new experience
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {dining &&
                dining.map((dining: Meal, id) => (
                  <Card
                    key={id}
                    onClick={() => router.push(`/dining/${dining.objectId}`)}
                    className={`cursor-pointer p-0 transition-all duration-200 hover:shadow-md`}
                  >
                    <CardContent className="p-4 ">
                      {/* Fixed aspect ratio container */}
                      <div className="aspect-[4/5] flex flex-col gap-4">
                        {/* Image section */}
                        <div className="flex-[3] relative overflow-hidden">
                          <Image
                            src={
                              dining.coverImageUrl ||
                              TestImage ||
                              "/placeholder.svg?height=200&width=300"
                            }
                            alt={dining.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {/* Content section */}
                        <div className="flex-[2]  flex flex-col justify-start">
                          <h4 className=" text-[#0D2E61] text-[18px] mb-1 truncate">
                            {dining.name}
                          </h4>
                          <p className="text-[14px] text-[#3D3D3D] leading-relaxed line-clamp-2">
                            {dining.name}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
