"use client";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/common/header";
import { useTour } from "@/hooks/use-tour";
import { Gallery } from "./components/gallery";
import { Packages } from "./components/packages";
import { useHost } from "@/hooks/use-hosts";
import { TourTimes } from "./components/tour-times";
import { ExperiencesTableSkeleton } from "../components/experiences-table-skeleton";

const ExperienceDetailsPage = () => {
  const { id } = useParams();
  const { tour, isLoading } = useTour(id as string);
  const { host } = useHost(tour?.guideId || "");

  if (isLoading) {
    return <ExperiencesTableSkeleton />;
  }

  if (!tour) {
    return <div>Tour not found</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <Header title={tour.name} />
        <div className="flex-1 py-6 px-8">
          <div className=" bg-white  drop-shadow-lg rounded-2xl px-16 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">{tour.name}</h2>
                <p className="text-gray-600 mb-4">{tour.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tour.tourFeatures.map((feature) => (
                    <Badge key={feature}>{feature}</Badge>
                  ))}
                </div>
                <Gallery images={tour.galleryImageUrls} />
                <TourTimes tourTimes={tour.tourTimes} />
              </div>
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
                    <strong>Status:</strong>{" "}
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
                      variant={tour.isApproved ? "default" : "destructive"}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailsPage;