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
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DishLibraryProps {
  searchTerm: string;
}

const DishLibraryPage: React.FC<DishLibraryProps> = ({ searchTerm }) => {
  const {
    libraryDishes,
    count,
    isLoading,
    page,
    limit,
    setPage,
  } = useLibraryDishes();
  const router = useRouter();

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
            <TableRow
              key={dish.objectId}
              onClick={() =>
                router.push(`/experiences/${dish.objectId}?tab=dish-library`)
              }
              className="hover:bg-gray-50 cursor-pointer"
            >
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
              <TableCell className="text-gray-600 max-w-[200px] truncate  ">
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

export default DishLibraryPage;
