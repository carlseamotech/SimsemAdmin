"use client";
import { useLibraryDishes } from "@/hooks/use-library-dishes";
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

interface DishesTableProps {
  searchTerm: string;
}

const DishesTable: React.FC<DishesTableProps> = ({ searchTerm }) => {
  const { dishes, isLoading } = useLibraryDishes(searchTerm);
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dishes.map((dish) => (
          <TableRow key={dish.objectId}>
            <TableCell>{dish.name}</TableCell>
            <TableCell>
              <Button
                onClick={() =>
                  router.push(`/library/${dish.objectId}/edit?type=dish`)
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

export default DishesTable;
