"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import UploadIcon from "../../../public/experience-icons/upload-cloud-icon.svg";
import Image from "next/image";

interface DishFormProps {
  setShowDishForm: Dispatch<SetStateAction<boolean>>;
}

const DishFormPage: React.FC<DishFormProps> = ({ setShowDishForm }) => {
  const [dishFormData, setDishFormData] = useState({
    dishName: "",
    dishType: "",
    dishCourse: "",
    country: "",
    ingredients: "",
  });

  const handleDishFormSubmit = () => {
    // Handle form submission
    console.log("Dish form submitted:", dishFormData);
    setShowDishForm(false);
    setDishFormData({
      dishName: "",
      dishType: "",
      dishCourse: "",
      country: "",
      ingredients: "",
    });
  };

  return (
    <>
      <div className="flex-1 p-6 ">
        <div className="bg-white rounded-lg border 0 p-8 flex flex-col gap-6  ">
          <div className="  border-b pb-4">
            <div className="text-2xl font-bold text-slate-800">
              Offered Dished
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="dishName"
                  className="text-sm font-medium text-gray-700 mb-2"
                >
                  Dish Name
                </Label>
                <Input
                  id="dishName"
                  value={dishFormData.dishName}
                  onChange={(e) =>
                    setDishFormData({
                      ...dishFormData,
                      dishName: e.target.value,
                    })
                  }
                  placeholder="Tabbouleh"
                  className="bg-[#00000008] border-[#0000000D]  h-[49px]"
                />
              </div>

              <div>
                <Label
                  htmlFor="dishCourse"
                  className="text-sm font-medium text-gray-700 mb-2   "
                >
                  Dish Course
                </Label>

                <Select
                  value={dishFormData.dishCourse}
                  onValueChange={(value) =>
                    setDishFormData({ ...dishFormData, dishCourse: value })
                  }
                >
                  <SelectTrigger
                    size="default"
                    className="bg-[#00000008] border-[#0000000D]  w-full cursor-pointer p-6"
                  >
                    <SelectValue placeholder="Main Course" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="appetizer">Appetizer</SelectItem>
                    <SelectItem value="main-course">Main Course</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="ingredients"
                  className="text-sm font-medium text-gray-700 mb-2 "
                >
                  Ingredients
                </Label>
                <Textarea
                  id="ingredients"
                  value={dishFormData.ingredients}
                  onChange={(e) =>
                    setDishFormData({
                      ...dishFormData,
                      ingredients: e.target.value,
                    })
                  }
                  placeholder="Short-grain rice, Onion, Garlic cloves, A mix of herbs and spices (black pepper, cumin, dried coriander, turmeric)"
                  className="bg-[#00000008] border-[#0000000D]  min-h-[163px] resize-none"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="dishType"
                  className="text-sm font-medium text-gray-700 mb-2"
                >
                  Dish Type
                </Label>
                <Select
                  value={dishFormData.dishType}
                  onValueChange={(value) =>
                    setDishFormData({ ...dishFormData, dishType: value })
                  }
                >
                  <SelectTrigger className="bg-[#00000008] border-[#0000000D]  w-full cursor-pointer p-6">
                    <SelectValue placeholder="Vegetarian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="country"
                  className="text-sm font-medium text-gray-700 mb-2 "
                >
                  Country
                </Label>
                <Select
                  value={dishFormData.country}
                  onValueChange={(value) =>
                    setDishFormData({ ...dishFormData, country: value })
                  }
                >
                  <SelectTrigger className="bg-[#00000008] border-[#0000000D]  w-full cursor-pointer p-6">
                    <SelectValue placeholder="Turkey" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="turkey">Turkey</SelectItem>
                    <SelectItem value="jordan">Jordan</SelectItem>
                    <SelectItem value="egypt">Egypt</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Dish Photo
                </Label>
                <div className="border-2 border-dashed  bg-[#00000008] border-[#0000000D]  rounded-lg gap-2  text-center hover:border-gray-400 transition-colors min-h-[163px] flex flex-col items-center justify-center">
                  <Image
                    src={UploadIcon}
                    alt="Upload Icon"
                    className="w-[46px] -[46px]"
                  />
                  <p className="text-[#3D3D3D] text-[15px] font-bold ">
                    Upload or drag photo here
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between space-x-4  pt-3.5 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setShowDishForm(false)}
              className="px-5 py-2.5 bg-[#D9D9D9] hover:bg-gray-200 text-[#3D3D3D] border-gray-300"
            >
              Cancel
            </Button>

            <Button
              onClick={handleDishFormSubmit}
              className="px-5 py-2.5 bg-[#FB8B24] hover:bg-orange-600 text-[#FFFFFF] "
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DishFormPage;
