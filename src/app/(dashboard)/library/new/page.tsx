"use client";
import { useSearchParams } from "next/navigation";
import Header from "@/components/common/header";
import { TourForm } from "./components/tour-form";
import { MealForm } from "./components/meal-form";
import { DishForm } from "./components/dish-form";

const NewLibraryItemPage = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const renderForm = () => {
    switch (type) {
      case "tour":
        return <TourForm />;
      case "meal":
        return <MealForm />;
      case "dish":
        return <DishForm />;
      default:
        return <div>Invalid type</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <Header title="Create Library Item" />
        <div className="flex-1 py-6 px-8 ">
          <div className="bg-white rounded-xl  drop-shadow-lg  flex flex-col ">
            <div className="p-8">{renderForm()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLibraryItemPage;
