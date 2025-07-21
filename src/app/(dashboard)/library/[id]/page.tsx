"use client";
import { useLibraryItem } from "@/hooks/use-library-item";
import Header from "@/components/common/header";
import { ExperienceDetailsSkeleton } from "@/app/(dashboard)/experiences/[id]/components/experience-details-skeleton";
import { TourDetails } from "./components/tour-details";
import { MealDetails } from "./components/meal-details";
import { DishDetails } from "./components/dish-details";
import { LibraryTour, LibraryMeal, LibraryDish } from "@/models/library";

const LibraryItemPage = () => {
  const { item, isLoading, type } = useLibraryItem();

  if (isLoading) {
    return <ExperienceDetailsSkeleton />;
  }

  if (!item) {
    return (
      <>
        <Header />
        <div className=" py-6 px-8">Item not found</div>
      </>
    );
  }

  const renderDetails = () => {
    switch (type) {
      case "tour":
        return <TourDetails tour={item as LibraryTour} />;
      case "meal":
        return <MealDetails meal={item as LibraryMeal} />;
      case "dish":
        return <DishDetails dish={item as LibraryDish} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <Header title="Library Item Details" />
        <div className="flex-1 py-6 px-8 ">
          <div className="bg-white rounded-xl  drop-shadow-lg  flex flex-col ">
            <div className="p-8">{renderDetails()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryItemPage;
