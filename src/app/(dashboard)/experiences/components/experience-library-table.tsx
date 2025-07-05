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
import { LibraryTour, LibraryMeal } from "@/models/library";
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
    libraryMeals,
    count: mealsCount,
    isLoading: mealsLoading,
    page: mealsPage,
    limit: mealsLimit,
    setPage: setMealsPage,
  } = useLibraryMeals();
  const router = useRouter();
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
                    experience.itemType === "Meal"
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {activeFilter === "all" || activeFilter === "tour"
            ? `${toursPage} of ${Math.ceil(toursCount / toursLimit)} pages`
            : `${mealsPage} of ${Math.ceil(mealsCount / mealsLimit)} pages`}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            activeFilter === "all" || activeFilter === "tour"
              ? setToursPage(toursPage - 1)
              : setMealsPage(mealsPage - 1)
          }
          disabled={
            activeFilter === "all" || activeFilter === "tour"
              ? toursPage === 1
              : mealsPage === 1
          }
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            activeFilter === "all" || activeFilter === "tour"
              ? setToursPage(toursPage + 1)
              : setMealsPage(mealsPage + 1)
          }
          disabled={
            activeFilter === "all" || activeFilter === "tour"
              ? toursPage === Math.ceil(toursCount / toursLimit)
              : mealsPage === Math.ceil(mealsCount / mealsLimit)
          }
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ExperienceLibraryPage;
