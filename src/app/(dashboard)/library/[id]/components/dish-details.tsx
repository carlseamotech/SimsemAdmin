"use client";
import { LibraryDish } from "@/models/library";

interface DishDetailsProps {
  dish: LibraryDish;
}

export const DishDetails: React.FC<DishDetailsProps> = ({ dish }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{dish.name}</h1>
      <p>
        <strong>Ingredients:</strong> {dish.ingredients}
      </p>
      <p>
        <strong>Country:</strong> {dish.country}
      </p>
      <p>
        <strong>Type:</strong> {dish.type}
      </p>
      <p>
        <strong>Course:</strong> {dish.course}
      </p>
    </div>
  );
};
