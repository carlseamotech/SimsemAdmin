"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { ArrowLeft } from "lucide-react";
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
import Header from "@/components/common/header";

interface DishFormProps {
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

const PromotionFormPage: React.FC<DishFormProps> = ({ setShowForm }) => {
  const [formData, setFormData] = useState({
    promotionName: "",
    promotionDetails: "",
    for: "",
    promotionCode: "",
    quantity: "",
    expirationDate: "",
    discount: "",
  });

  const handleFormSubmit = () => {
    console.log("Promotion form submitted:", formData);
    setShowForm(false);
    setFormData({
      promotionName: "",
      promotionDetails: "",
      for: "",
      promotionCode: "",
      quantity: "",
      expirationDate: "",
      discount: "",
    });
  };

  return (
    <>
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg border 0 p-8 flex flex-col gap-6  ">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">ADD NEW PROMOTION</p>
                <div className="text-2xl font-bold text-slate-800">
                  Promotion Details
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Label
                htmlFor="promotionName"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Promotion Name
              </Label>
              <Input
                id="promotionName"
                value={formData.promotionName}
                onChange={(e) =>
                  setFormData({ ...formData, promotionName: e.target.value })
                }
                placeholder="FirstBooking"
                className="bg-gray-50 border-gray-200 h-12"
              />
            </div>

            <div>
              <Label
                htmlFor="promotionDetails"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Promotion Details
              </Label>

              <Textarea
                id="promotionDetails"
                value={formData.promotionDetails}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    promotionDetails: e.target.value,
                  })
                }
                placeholder="For all first bookings"
                className="bg-gray-50 border-gray-200 min-h-[100px] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="for"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  For
                </Label>
                <Select
                  value={formData.for}
                  onValueChange={(value) =>
                    setFormData({ ...formData, for: value })
                  }
                >
                  <SelectTrigger className="bg-gray-50 border-gray-200 h-12">
                    <SelectValue placeholder="New users" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-users">New users</SelectItem>
                    <SelectItem value="all-users">All users</SelectItem>
                    <SelectItem value="kids">Kids</SelectItem>
                    <SelectItem value="all-tours">All Tours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="promotionCode"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Promotion Code
                </Label>
                <Input
                  id="promotionCode"
                  value={formData.promotionCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      promotionCode: e.target.value,
                    })
                  }
                  placeholder="first-booking"
                  className="bg-gray-50 border-gray-200 h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <Label
                  htmlFor="quantity"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  placeholder="15"
                  className="bg-gray-50 border-gray-200 h-12"
                />
              </div>

              <div>
                <Label
                  htmlFor="expirationDate"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Expiration Date
                </Label>
                <Input
                  id="expirationDate"
                  type="date"
                  value={formData.expirationDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expirationDate: e.target.value,
                    })
                  }
                  className="bg-gray-50 border-gray-200 h-12"
                />
              </div>

              <div>
                <Label
                  htmlFor="discount"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Discount
                </Label>
                <Select
                  value={formData.discount}
                  onValueChange={(value) =>
                    setFormData({ ...formData, discount: value })
                  }
                >
                  <SelectTrigger className="bg-gray-50 border-gray-200 h-12">
                    <SelectValue placeholder="10%" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5%">5%</SelectItem>
                    <SelectItem value="10%">10%</SelectItem>
                    <SelectItem value="15%">15%</SelectItem>
                    <SelectItem value="20%">20%</SelectItem>
                    <SelectItem value="25%">25%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setShowForm(false)}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleFormSubmit}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromotionFormPage;
