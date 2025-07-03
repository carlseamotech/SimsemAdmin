"use client";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowLeft,
  Upload,
} from "lucide-react";
import Header from "@/components/common/header";
import { Badge } from "@/components/ui/badge";
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
    <div>
      <div className="flex-1 py-6 px-8">
        <div className="rounded-2xl px-10 py-8 bg-white  drop-shadow-lg">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Offered Dished
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="dishName">Dish Name</Label>
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
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="dishType">Dish Type</Label>
                <Select
                  value={dishFormData.dishType}
                  onValueChange={(value) =>
                    setDishFormData({ ...dishFormData, dishType: value })
                  }
                >
                  <SelectTrigger className="mt-1">
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
                <Label htmlFor="dishCourse">Dish Course</Label>
                <Select
                  value={dishFormData.dishCourse}
                  onValueChange={(value) =>
                    setDishFormData({ ...dishFormData, dishCourse: value })
                  }
                >
                  <SelectTrigger className="mt-1">
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
                <Label htmlFor="country">Country</Label>
                <Select
                  value={dishFormData.country}
                  onValueChange={(value) =>
                    setDishFormData({ ...dishFormData, country: value })
                  }
                >
                  <SelectTrigger className="mt-1">
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
                <Label htmlFor="ingredients">Ingredients</Label>
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
                  className="mt-1 min-h-[120px]"
                />
              </div>
            </div>

            <div>
              <Label>Dish Photo</Label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Upload or drag photo here</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <Button variant="outline" onClick={() => setShowDishForm(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleDishFormSubmit}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishFormPage;
