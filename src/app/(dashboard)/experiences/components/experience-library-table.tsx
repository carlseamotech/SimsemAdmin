"use client";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
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
import { useLibraryMeals } from "@/hooks/use-library-meals";
import {
  LibraryTour,
  LibraryMeal,
} from "@/models/library";
import ExperienceLibraryTableSkeleton from "./experience-library-table-skeleton";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ExperienceLibraryProps {
  activeFilter: string;
  searchTerm: string;
}

type CombinedLibraryItem = (LibraryTour | LibraryMeal) & { itemType: string };

const ExperienceLibraryPage: React.FC<ExperienceLibraryProps> = ({
  activeFilter,
  searchTerm,
}) => {
  const {
    libraryTours,
    count: toursCount,
    isLoading: toursLoading,
    page: toursPage,
    limit: toursLimit,
    setPage: setToursPage,
  } = useLibraryTours();
  const {
    meals,
    isLoading: mealsLoading,
  } = useLibraryMeals();
  const router = useRouter();
  const allLibraryItems = useMemo(() => {
    const tours = libraryTours?.map((tour) => ({
      ...tour,
      itemType: "Tour",
    }));
    const mealsItems = meals?.map((meal) => ({
      ...meal,
      itemType: "Dining",
    }));

    return [...(tours || []), ...(mealsItems || [])];
  }, [libraryTours, meals]);

  const getFilteredLibrary = () => {
    let data: CombinedLibraryItem[] = allLibraryItems;

    if (activeFilter !== "all") {
      data = data.filter(
        (item) => item.itemType.toLowerCase() === activeFilter
      );
    }

    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (toursLoading || mealsLoading) {
    return <ExperienceLibraryTableSkeleton />;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Type
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Experience Name
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Cost
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3..5">
              Country
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {getFilteredLibrary().map((experience) => (
            <TableRow
              key={experience.objectId}
              onClick={() =>
                router.push(
                  `/experiences/${experience.objectId}?tab=experience-library`
                )
              }
              className="hover:bg-gray-50 cursor-pointer"
            >
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`rounded-full text-[16px] font-normal ${
                    experience.itemType === "Dining"
                      ? "bg-[#0D2E6140] text-[#0D2E61]"
                      : "bg-[#FBB04040] text-[#F28E33]"
                  }`}
                >
                  {experience.itemType}
                </Badge>
              </TableCell>

              <TableCell className="text-gray-900">{experience.name}</TableCell>
              <TableCell className="text-gray-600">{experience.cost}</TableCell>
              <TableCell className="text-gray-600">
                {experience.country}
              </TableCell>

              <TableCell>
                <div className="flex space-x-2 ">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(
                        `/experiences/${experience.objectId}?tab=experience-library`
                      );
                    }}
                    className="bg-[#0D2E61] hover:bg-blue-900 text-[#FFFFFF] "
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    onClick={(e) => {
                      // ✅ Prevent triggering the TableRow's onClick
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
          {toursPage} of {Math.ceil(toursCount / toursLimit)} pages
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setToursPage(toursPage - 1)}
          disabled={toursPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setToursPage(toursPage + 1)}
          disabled={toursPage === Math.ceil(toursCount / toursLimit)}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ExperienceLibraryPage;
