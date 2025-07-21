"use client";
import { useLibraryTours } from "@/hooks/use-library-tours";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ToursTableProps {
  searchTerm: string;
}

const ToursTable: React.FC<ToursTableProps> = ({ searchTerm }) => {
  const { tours, isLoading } = useLibraryTours(searchTerm);
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tours.map((tour) => (
          <TableRow key={tour.objectId}>
            <TableCell>{tour.name}</TableCell>
            <TableCell>{tour.country}</TableCell>
            <TableCell>
              <Button
                onClick={() =>
                  router.push(`/library/${tour.objectId}/edit?type=tour`)
                }
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ToursTable;
