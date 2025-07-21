"use client";
import { LibraryMeal } from "@/models/library";

interface MealDetailsProps {
  meal: LibraryMeal;
}

export const MealDetails: React.FC<MealDetailsProps> = ({ meal }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{meal.name}</h1>
      <p>{meal.description}</p>
      <p>
        <strong>Country:</strong> {meal.country}
      </p>
      <p>
        <strong>Cost:</strong> {meal.cost}
      </p>
      <div>
        <strong>Dishes:</strong>
        <ul>
          {meal.dishIds?.map((dishId, index) => (
            <li key={index}>{dishId}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
