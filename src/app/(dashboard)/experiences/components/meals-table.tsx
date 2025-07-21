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
import { deleteLibraryMeal } from "@/services/experiences/library";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import toast from "react-hot-toast";

interface MealsTableProps {
  searchTerm: string;
}

const MealsTable: React.FC<MealsTableProps> = ({ searchTerm }) => {
  const { meals, isLoading, mutate } = useLibraryMeals();
  const router = useRouter();
  const [dialog, setDialog] = useState({
    isOpen: false,
    id: "",
  });

  const handleDelete = async () => {
    try {
      await deleteLibraryMeal(dialog.id);
      mutate();
      toast.success("Meal deleted successfully");
    } catch {
      toast.error("Failed to delete meal");
    } finally {
      setDialog({ isOpen: false, id: "" });
    }
  };

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
                  `/library/${meal.objectId}?type=meal`
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
                        `/library/${meal.objectId}/edit?type=meal`
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
                      setDialog({ isOpen: true, id: meal.objectId });
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
      <AlertDialog
        open={dialog.isOpen}
        onOpenChange={() => setDialog({ isOpen: false, id: "" })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              meal.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MealsTable;
