"use client";
import { useLibraryItem } from "@/hooks/use-library-item";
import Header from "@/components/common/header";
import { ExperienceDetailsSkeleton } from "@/app/(dashboard)/experiences/[id]/components/experience-details-skeleton";
import { TourForm } from "./components/tour-form";
import { MealForm } from "./components/meal-form";
import { DishForm } from "./components/dish-form";
import { GetawayTourForm } from "../../components/getaway-tour-form";
import { LibraryTour, LibraryMeal, LibraryDish } from "@/models/library";
import { ProposedTour } from "@/models/proposed-tour";

const LibraryItemEditPage = () => {
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

  const renderForm = () => {
    switch (type) {
      case "tour":
        return <TourForm tour={item as LibraryTour} />;
      case "meal":
        return <MealForm meal={item as LibraryMeal} />;
      case "dish":
        return <DishForm dish={item as LibraryDish} />;
      case "getaway":
        return <GetawayTourForm tour={item as unknown as ProposedTour} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 py-6 px-8 ">
          <div className="bg-white rounded-xl  drop-shadow-lg  flex flex-col ">
            <div className="p-8">{renderForm()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryItemEditPage;
