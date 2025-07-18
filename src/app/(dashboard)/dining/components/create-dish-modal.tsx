import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useLibraryDishes } from "@/hooks/use-experiences";
import toast from "react-hot-toast";
import { uploadFile } from "@/services/files";
import { DishItem } from "../page";

interface CreateDishModalProps {
  onDishCreated: (dish: DishItem) => void;
  course: "starter" | "main" | "dessert";
}

export const CreateDishModal = ({
  onDishCreated,
  course,
}: CreateDishModalProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [type, setType] = useState<"vegetarian" | "meat" | "vegan">(
    "vegetarian"
  );
  const [country, setCountry] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { createLibraryDish } = useLibraryDishes();

  const handleSubmit = async () => {
    if (!name || !ingredients || !country || !imageFile) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const uploadedImage = await uploadFile(imageFile);
      const newDish = await createLibraryDish({
        name,
        ingredients,
        type,
        country,
        course,
        image: {
          __type: "File",
          name: uploadedImage.name,
          url: uploadedImage.url,
        },
      });
      onDishCreated({
        id: newDish.objectId,
        name: newDish.name,
        description: "",
        image: newDish.image,
        mealType: newDish.type as "vegetarian" | "meat" | "vegan",
        ingredients: newDish.ingredients,
        type: newDish.course,
      });
      toast.success("Dish created successfully");
      setOpen(false);
    } catch {
      toast.error("Failed to create dish");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer border-2 border-dashed border-[#0F4C5C] bg-[#F8F8F8] hover:border-cyan-600 rounded-2xl transition-colors">
          <CardContent className="p-0 h-full">
            <div className="aspect-[4/4] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <Plus className="h-12 w-12 text-[#0F4C5C] mb-2" />
                <p className="text-[15px] text-[#3D3D3D] text-center px-4">
                  Create your own dish
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new dish</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Dish name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            placeholder="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <Select
            onValueChange={(value: "vegetarian" | "meat" | "vegan") =>
              setType(value)
            }
            value={type}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="meat">Meat</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setCountry} value={country}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Turkey">Turkey</SelectItem>
              <SelectItem value="Egypt">Egypt</SelectItem>
              <SelectItem value="Morocco">Morocco</SelectItem>
              <SelectItem value="Jordan">Jordan</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="file"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Dish"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
