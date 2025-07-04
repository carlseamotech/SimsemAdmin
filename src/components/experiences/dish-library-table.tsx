"use client";
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
import { useLibraryDishes } from "@/hooks/use-experiences";
import DishLibraryTableSkeleton from "./dish-library-table-skeleton";

interface DishLibraryProps {
  searchTerm: string;
}

const DishLibraryPage: React.FC<DishLibraryProps> = ({ searchTerm }) => {
  const { libraryDishes, isLoading } = useLibraryDishes();

  const getFilteredDishes = () => {
    if (!libraryDishes) return [];
    return libraryDishes.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (isLoading) {
    return <DishLibraryTableSkeleton />;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold  text-[16px] text-[#101018] p-3.5">
              Dish Type
            </TableHead>
            <TableHead className="font-semibold  text-[16px] text-[#101018] p-3.5">
              Dish Name
            </TableHead>
            <TableHead className="font-semibold  text-[16px] text-[#101018] p-3.5">
              Ingredients
            </TableHead>
            <TableHead className="font-semibold  text-[16px] text-[#101018] p-3.5">
              Course
            </TableHead>
            <TableHead className="font-semibold  text-[16px] text-[#101018] p-3.5">
              Country
            </TableHead>
            <TableHead className="font-semibold  text-[16px] text-[#101018] p-3.5">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getFilteredDishes().map((dish) => (
            <TableRow key={dish.objectId} className="hover:bg-gray-50">
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`rounded-full text-[16px] font-normal  ${
                    dish.type === "Vegan"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : dish.type === "Vegetarian"
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }`}
                >
                  {dish.type}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-900">{dish.name}</TableCell>
              <TableCell className="text-gray-600">
                {dish.ingredients}
              </TableCell>
              <TableCell className="text-gray-600">{dish.course}</TableCell>
              <TableCell className="text-gray-600">{dish.country}</TableCell>
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

export default DishLibraryPage;
