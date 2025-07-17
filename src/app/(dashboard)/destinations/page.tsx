"use client";
import { useDestinations } from "@/hooks/use-destinations";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DestinationsPage() {
  const { destinations, isLoading, isError } = useDestinations();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Destinations</h1>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {destinations?.map((destination) => (
              <TableRow
                key={destination.objectId}
                onClick={() => router.push(`/destinations/${destination.objectId}`)}
                className="cursor-pointer"
              >
                <TableCell>
                  <Image
                    src={destination.image.url}
                    alt={destination.name}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell>{destination.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
