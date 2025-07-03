"use client";

import { useState } from "react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Sample data
const experiencesData = [
  {
    id: 1,
    type: "Dining",
    name: "The Ultimate Breakfast at Istanbul",
    cost: "$30.00/Person",
    country: "Turkey",
    status: "active",
  },
  {
    id: 2,
    type: "Local Living",
    name: "A walk through my campus",
    cost: "$20.00/Person",
    country: "Turkey",
    status: "active",
  },
  {
    id: 3,
    type: "Local Living",
    name: "A walk through my campus",
    cost: "$30.00/Person",
    country: "Turkey",
    status: "inactive",
  },
  {
    id: 4,
    type: "Dining",
    name: "The Ultimate Breakfast at Istanbul",
    cost: "$20.00/Person",
    country: "Turkey",
    status: "for-approval",
  },
  {
    id: 5,
    type: "Local Living",
    name: "A walk through my campus",
    cost: "$15.00/Person",
    country: "Turkey",
    status: "active",
  },
];

const experienceLibraryData = [
  {
    id: 1,
    type: "Dining",
    name: "The Ultimate Breakfast at Istanbul",
    cost: "$12.00/Person",
    country: "Turkey",
  },
  {
    id: 2,
    type: "Dining",
    name: "The Ultimate Breakfast at Istanbul",
    cost: "$12.00/Person",
    country: "Turkey",
  },
  {
    id: 3,
    type: "Dining",
    name: "The Ultimate Breakfast at Istanbul",
    cost: "$12.00/Person",
    country: "Turkey",
  },
  {
    id: 4,
    type: "Dining",
    name: "The Ultimate Breakfast at Istanbul",
    cost: "$12.00/Person",
    country: "Turkey",
  },
  {
    id: 5,
    type: "Dining",
    name: "The Ultimate Breakfast at Istanbul",
    cost: "$12.00/Person",
    country: "Turkey",
  },
];

const dishLibraryData = [
  {
    id: 1,
    dishType: "Vegan",
    dishName: "Tabbouleh",
    ingredients: "Food 1, Ingredient 1, Ingredien...",
    course: "Main Course",
    country: "Turkey",
  },
  {
    id: 2,
    dishType: "Vegetarian",
    dishName: "Mashi",
    ingredients: "Food 1, Ingredient 1, Ingredien...",
    course: "Appetizer",
    country: "Jordan",
  },
  {
    id: 3,
    dishType: "Meat",
    dishName: "Qatayef",
    ingredients: "Food 1, Ingredient 1, Ingredien...",
    course: "Dessert",
    country: "Turkey",
  },
  {
    id: 4,
    dishType: "Meat",
    dishName: "Meal 1",
    ingredients: "Food 1, Ingredient 1, Ingredien...",
    course: "Dessert",
    country: "Turkey",
  },
  {
    id: 5,
    dishType: "Meat",
    dishName: "Meal 2",
    ingredients: "Food 1, Ingredient 1, Ingredien...",
    course: "Appetizer",
    country: "Turkey",
  },
];

export default function ExperiencesPage() {
  const [activeTab, setActiveTab] = useState("experiences");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDishForm, setShowDishForm] = useState(false);
  const [dishFormData, setDishFormData] = useState({
    dishName: "",
    dishType: "",
    dishCourse: "",
    country: "",
    ingredients: "",
  });

  // Filter functions
  const getFilteredExperiences = () => {
    let data = experiencesData;

    if (activeFilter !== "all") {
      if (activeFilter === "dining") {
        data = data.filter((item) => item.type === "Dining");
      } else if (activeFilter === "local-living") {
        data = data.filter((item) => item.type === "Local Living");
      } else if (activeFilter === "for-approval") {
        data = data.filter((item) => item.status === "for-approval");
      } else if (activeFilter === "active") {
        data = data.filter((item) => item.status === "active");
      } else if (activeFilter === "inactive") {
        data = data.filter((item) => item.status === "inactive");
      }
    }

    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getFilteredLibrary = () => {
    let data = experienceLibraryData;

    if (activeFilter !== "all" && activeFilter === "dining") {
      data = data.filter((item) => item.type === "Dining");
    }

    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getFilteredDishes = () => {
    return dishLibraryData.filter(
      (item) =>
        item.dishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

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

  const getButtonText = () => {
    if (activeTab === "dish-library") return "Add a new dish";
    return "Add new experience";
  };

  const getFilterButtons = () => {
    if (activeTab === "experiences") {
      return [
        "all",
        "dining",
        "local-living",
        "for-approval",
        "active",
        "inactive",
      ];
    } else if (activeTab === "experience-library") {
      return ["all", "dining", "local-living"];
    }
    return ["all"];
  };

  const getFilterLabel = (filter: string) => {
    const labels: { [key: string]: string } = {
      all: "All",
      dining: "Dining",
      "local-living": "Local Living",
      "for-approval": "For Approval",
      active: "Active",
      inactive: "Inactive",
    };
    return labels[filter] || filter;
  };

  if (showDishForm) {
    return (
      <>
        <Header title="Experiences" />
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDishForm(false)}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
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
      </>
    );
  }

  return (
    <>
      <Header title="Experiences" />
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Tabs and Add Button */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-auto"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="experiences"
                    className="data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900"
                  >
                    Experiences
                  </TabsTrigger>
                  <TabsTrigger
                    value="experience-library"
                    className="data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900"
                  >
                    Experience Library
                  </TabsTrigger>
                  <TabsTrigger
                    value="dish-library"
                    className="data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900"
                  >
                    Dish Library
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => {
                  if (activeTab === "dish-library") {
                    setShowDishForm(true);
                  }
                }}
              >
                {getButtonText()}
              </Button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getFilterButtons().map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(filter)}
                    className={
                      activeFilter === filter
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-white hover:bg-gray-50"
                    }
                  >
                    {getFilterLabel(filter)}
                  </Button>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>1 - 10 of 52</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 bg-transparent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 bg-transparent"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 bg-transparent"
                >
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Table Content */}
          {activeTab === "experiences" && (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">
                    Type
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Experience Name
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Cost
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Country
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getFilteredExperiences().map((experience) => (
                  <TableRow key={experience.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          experience.type === "Dining"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-orange-100 text-orange-800 hover:bg-orange-100"
                        }
                      >
                        {experience.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-900">
                      {experience.name}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {experience.cost}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {experience.country}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-slate-800 hover:bg-slate-900 text-white"
                        >
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {activeTab === "experience-library" && (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">
                    Type
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Experience Name
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Cost
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Country
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getFilteredLibrary().map((experience) => (
                  <TableRow key={experience.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                      >
                        {experience.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-900">
                      {experience.name}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {experience.cost}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {experience.country}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-slate-800 hover:bg-slate-900 text-white"
                        >
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {activeTab === "dish-library" && (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">
                    Dish Type
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Dish Name
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Ingredients
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Course
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Country
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getFilteredDishes().map((dish) => (
                  <TableRow key={dish.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          dish.dishType === "Vegan"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : dish.dishType === "Vegetarian"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {dish.dishType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-900">
                      {dish.dishName}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {dish.ingredients}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {dish.course}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {dish.country}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-slate-800 hover:bg-slate-900 text-white"
                        >
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
}
