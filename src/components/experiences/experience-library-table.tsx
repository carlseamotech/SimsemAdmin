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
import { useLibraryTours, useLibraryMeals } from "@/hooks/use-experiences";
import { LibraryTour, LibraryMeal } from "@/models/experience";
import ExperienceLibraryTableSkeleton from "./experience-library-table-skeleton";

interface ExperienceLibraryProps {
  activeFilter: string;
  searchTerm: string;
}

type CombinedLibraryItem = (LibraryTour | LibraryMeal) & { itemType: string };

const ExperienceLibraryPage: React.FC<ExperienceLibraryProps> = ({
  activeFilter,
  searchTerm,
}) => {
  const { libraryTours, isLoading: toursLoading } = useLibraryTours();
  const { libraryMeals, isLoading: mealsLoading } = useLibraryMeals();

  const allLibraryItems = useMemo(() => {
    const tours = libraryTours?.map((tour) => ({
      ...tour,
      itemType: "Tour",
    }));
    const meals = libraryMeals?.map((meal) => ({
      ...meal,
      itemType: "Meal",
    }));

    return [...(tours || []), ...(meals || [])];
  }, [libraryTours, libraryMeals]);

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
            <TableRow key={experience.objectId} className="hover:bg-gray-50">
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`rounded-full text-[16px] font-normal ${
                    experience.itemType === "Meal"
                      ? "bg-[#0D2E6140] text-[#0D2E61]"
                      : "bg-[#FBB04040] text-[#F28E33]"
                  }`}
                >
                  {experience.itemType}
                </Badge>
              </TableCell>

              <TableCell className="text-gray-900">
                {experience.name}
              </TableCell>
              <TableCell className="text-gray-600">
                {experience.cost}
              </TableCell>
              <TableCell className="text-gray-600">
                {experience.country}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="bg-[#0D2E61] hover:bg-blue-900 text-[#FFFFFF]"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
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
    </div>
  );
};

export default ExperienceLibraryPage;

