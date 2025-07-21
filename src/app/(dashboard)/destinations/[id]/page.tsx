"use client";
import { DestinationDetails, TopCity } from "@/models/destination";
import { useDestinationDetails, useTopCities } from "@/hooks/use-destinations";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function DestinationDetailsPage() {
  const { id } = useParams();
  const {
    destinationDetails,
    isLoading: detailsLoading,
    isError: detailsError,
  } = useDestinationDetails(id as string);
  const { topCities, isLoading: citiesLoading, isError: citiesError } =
    useTopCities(id as string);

  if (detailsLoading || citiesLoading) {
    return <div>Loading...</div>;
  }

  if (detailsError || citiesError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="p-6">
      {destinationDetails?.results.map((detail: DestinationDetails) => (
        <div key={detail.objectId}>
          <h1 className="text-2xl font-bold mb-4">{detail.about}</h1>
          <div className="grid grid-cols-3 gap-4">
            {detail.gallery.map((image: { name: string; url: string }) => (
              <Image
                key={image.name}
                src={image.url}
                alt={image.name}
                width={300}
                height={200}
                className="rounded-md object-cover"
              />
            ))}
          </div>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-8 mb-4">Top Cities</h2>
      <div className="grid grid-cols-4 gap-4">
        {topCities?.results.map((city: TopCity) => (
          <div key={city.objectId} className="border rounded-md p-4">
            <Image
              src={city.image.url}
              alt={city.name}
              width={200}
              height={150}
              className="rounded-md object-cover mb-2"
            />
            <h3 className="font-semibold">{city.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
