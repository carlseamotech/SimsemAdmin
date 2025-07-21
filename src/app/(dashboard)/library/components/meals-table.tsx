"use client";
import { useLibraryMeals } from "@/hooks/use-library-meals";
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

interface MealsTableProps {
  searchTerm: string;
}

const MealsTable: React.FC<MealsTableProps> = ({ searchTerm }) => {
  const { meals, isLoading } = useLibraryMeals(searchTerm);
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
        {meals.map((meal) => (
          <TableRow key={meal.objectId}>
            <TableCell>{meal.name}</TableCell>
            <TableCell>{meal.country}</TableCell>
            <TableCell>
              <Button
                onClick={() =>
                  router.push(`/library/${meal.objectId}/edit?type=meal`)
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

export default MealsTable;
