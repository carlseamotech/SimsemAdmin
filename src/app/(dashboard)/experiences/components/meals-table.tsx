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
import { useLibraryMeals } from "@/hooks/use-library-meals";
import ExperienceLibraryTableSkeleton from "./experience-library-table-skeleton";
import { useRouter } from "next/navigation";

interface MealsTableProps {
  searchTerm: string;
}

const MealsTable: React.FC<MealsTableProps> = ({ searchTerm }) => {
  const { meals, isLoading } = useLibraryMeals();
  const router = useRouter();

  const getFilteredMeals = () => {
    return meals.filter(
      (meal) =>
        meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.country.toLowerCase().includes(searchTerm.toLowerCase())
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
          {getFilteredMeals().map((meal) => (
            <TableRow
              key={meal.objectId}
              onClick={() =>
                router.push(
                  `/experiences/${meal.objectId}?tab=experience-library`
                )
              }
              className="hover:bg-gray-50 cursor-pointer"
            >
              <TableCell className="text-gray-900">{meal.name}</TableCell>
              <TableCell className="text-gray-600">{meal.cost}</TableCell>
              <TableCell className="text-gray-600">
                {meal.country}
              </TableCell>

              <TableCell>
                <div className="flex space-x-2 ">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(
                        `/experiences/${meal.objectId}?tab=experience-library`
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
    </div>
  );
};

export default MealsTable;
