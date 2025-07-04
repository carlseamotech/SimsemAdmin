"use client";
import { Dispatch, SetStateAction, useState } from "react";
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
        <div className="bg-white rounded-2xl drop-shadow-xl  flex flex-col gap-6  ">
          <div className="border-b-2 border-[#0D2E61] p-6">
            <p className=" text-[#3D3D3DCC] text-[15px] mb-1">
              ADD NEW PROMOTION
            </p>
          </div>

          <div className="space-y-6 px-8 pb-8">
            <div className="text-[30px] text-[#0D2E61]">Promotion Details</div>
            <div>
              <Label
                htmlFor="promotionName"
                className="text-[20px] font-semibold text-[#000000B2] mb-2 block"
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
                className="bg-[#00000008] h-[59px] text-[19px] text-[#000000B2]  rounded-xl p-6 border-0 focus-visible:ring-1"
              />
            </div>

            <div>
              <Label
                htmlFor="promotionDetails"
                className="text-[20px] font-semibold text-[#000000B2] mb-2 block"
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
                className="bg-[#00000008]  text-[19px] text-[#000000B2]  rounded-xl p-6 border-0 focus-visible:ring-1 min-h-[130px] "
              />
            </div>

            <div className="grid grid-cols-2 gap-6 space-y-8">
              <div>
                <Label
                  htmlFor="for"
                  className="text-[20px] font-semibold text-[#000000B2] mb-2 block"
                >
                  For
                </Label>
                <Select
                  value={formData.for}
                  onValueChange={(value) =>
                    setFormData({ ...formData, for: value })
                  }
                >
                  <SelectTrigger className="bg-[#00000008] py-[29px] rounded-xl w-full">
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
                  className="text-[20px] font-semibold text-[#000000B2] mb-2 block"
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
                  className="bg-[#00000008] h-[59px] text-[19px] text-[#000000B2]  rounded-xl p-6 border-0 focus-visible:ring-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 space-y-8">
              <div>
                <Label
                  htmlFor="quantity"
                  className="text-[20px] font-semibold text-[#000000B2] mb-2 block"
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
                  className="bg-[#00000008] h-[59px] text-[19px] text-[#000000B2]  rounded-xl p-6 border-0 focus-visible:ring-1"
                />
              </div>

              <div>
                <Label
                  htmlFor="expirationDate"
                  className="text-[20px] font-semibold text-[#000000B2] mb-2 block"
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
                  className="bg-[#00000008] h-[59px] text-[19px] text-[#000000B2]  rounded-xl p-6 border-0 focus-visible:ring-1"
                />
              </div>

              <div>
                <Label
                  htmlFor="discount"
                  className="text-[20px] font-semibold text-[#000000B2] mb-2 block"
                >
                  Discount
                </Label>
                <Select
                  value={formData.discount}
                  onValueChange={(value) =>
                    setFormData({ ...formData, discount: value })
                  }
                >
                  <SelectTrigger className="bg-[#00000008] py-[30px] rounded-xl w-full">
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

          <div className="flex justify-between space-x-4  pt-6 border-t border-gray-200 p-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowForm(false)}
              className="px-6 py-2 text-[16px] bg-[#3D3D3D80] hover:text-[#FFFFFF] hover:bg-gray-500 text-[#FFFFFF] h-[48px] rounded-xl "
            >
              Cancel
            </Button>

            <Button
              size="lg"
              onClick={handleFormSubmit}
              className="px-6 py-2 text-[16px] bg-[#FB8B24] hover:bg-orange-500 text-[#FFFFFF] h-[48px] rounded-xl"
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
