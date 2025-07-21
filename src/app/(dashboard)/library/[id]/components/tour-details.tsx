"use client";
import { LibraryTour } from "@/models/library";

interface TourDetailsProps {
  tour: LibraryTour;
}

export const TourDetails: React.FC<TourDetailsProps> = ({ tour }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{tour.name}</h1>
      <p>{tour.description}</p>
      <p>
        <strong>Country:</strong> {tour.country}
      </p>
      <p>
        <strong>Cost:</strong> {tour.cost}
      </p>
      <p>
        <strong>Duration:</strong> {tour.minDuration} - {tour.maxDuration}{" "}
        {tour.timeUnit}
      </p>
      <p>
        <strong>Feature:</strong> {tour.feature}
      </p>
      <div>
        <strong>Requirements:</strong>
        <ul>
          {tour.requirements?.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
