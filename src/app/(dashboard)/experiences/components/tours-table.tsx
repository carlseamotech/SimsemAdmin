"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLibraryTours } from "@/hooks/use-experiences";
import ExperienceLibraryTableSkeleton from "./experience-library-table-skeleton";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ToursTableProps {
  searchTerm: string;
}

const ToursTable: React.FC<ToursTableProps> = ({ searchTerm }) => {
  const {
    libraryTours,
    count,
    isLoading,
    page,
    limit,
    setPage,
  } = useLibraryTours();
  const router = useRouter();

  const getFilteredTours = () => {
    return libraryTours.filter(
      (tour) =>
        tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (isLoading) {
    return <ExperienceLibraryTableSkeleton />;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Experience Name
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Cost
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Country
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {getFilteredTours().map((tour) => (
            <TableRow
              key={tour.objectId}
              onClick={() =>
                router.push(
                  `/experiences/${tour.objectId}?tab=experience-library`
                )
              }
              className="hover:bg-gray-50 cursor-pointer"
            >
              <TableCell className="text-gray-900">{tour.name}</TableCell>
              <TableCell className="text-gray-600">{tour.cost}</TableCell>
              <TableCell className="text-gray-600">
                {tour.country}
              </TableCell>

              <TableCell>
                <div className="flex space-x-2 ">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(
                        `/experiences/${tour.objectId}?tab=experience-library`
                      );
                    }}
                    className="bg-[#0D2E61] hover:bg-blue-900 text-[#FFFFFF] "
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    variant="destructive"
                    className="bg-[#9A031E]"
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {page} of {Math.ceil(count / limit)} pages
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(count / limit)}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ToursTable;
