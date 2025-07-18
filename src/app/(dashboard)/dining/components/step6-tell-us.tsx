"use client";

import type React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DiningFormData } from "../page";

interface Step6TellUsProps {
  formData: DiningFormData;
  setFormData: React.Dispatch<React.SetStateAction<DiningFormData>>;
}

const Step6TellUs: React.FC<Step6TellUsProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-[30px]  text-[#0D2E61] ">Tell us a bit more</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-[20px] font-bold text-[#000000B2] mb-2">
            Country
          </label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, country: value }))
            }
            value={formData.country}
          >
            <SelectTrigger className="w-full text-[19px]  text-[#000000B2]  bg-[#00000008] py-7 rounded-xl mr-4">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="turkey">Turkey</SelectItem>
              <SelectItem value="egypt">Egypt</SelectItem>
              <SelectItem value="morocco">Morocco</SelectItem>
              <SelectItem value="jordan">Jordan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="block text-[20px] font-bold text-[#000000B2] mb-2">
            City
          </label>
          <Input
            value={formData.city}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, city: e.target.value }))
            }
            placeholder="Enter city"
            className="bg-[#00000008]  placeholder:text-[19px] md:text-[19px]  text-[#000000B2] h-[59px] rounded-xl  focus-visible:ring-0"
          />
        </div>
      </div>

      <div className="w-1/2 pr-2">
        <label className="block text-[20px] font-bold text-[#000000B2] mb-2">
          Cost per Person
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[19px]  text-[#000000B2] ">
            $
          </div>
          <Input
            type="number"
            value={formData.cost}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                cost: e.target.value,
              }))
            }
            placeholder="20"
            className="bg-[#00000008]  placeholder:text-[19px] md:text-[19px]  text-[#000000B2] h-[59px] rounded-xl  focus-visible:ring-0 pl-7"
          />
        </div>
      </div>
    </div>
  );
};

export default Step6TellUs;
