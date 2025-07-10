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
import { Badge } from "@/components/ui/badge";

interface FormData {
  country: string;
  costPerPerson: string;
  minDuration: string;
  maxDuration: string;
  categories: string[];
  description: string;
  coverPhoto: File | null;
  included: string[];
  notIncluded: string[];
  tourName: string;
}

interface Step3BasicInfoProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Step3BasicInfo: React.FC<Step3BasicInfoProps> = ({
  formData,
  setFormData,
}) => {
  const categories = [
    "Historical",
    "Culture",
    "Architecture",
    "Culinary",
    "Guided Tours",
  ];

  const toggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-[30px]  text-[#0D2E61] ">Tell us a bit more</h2>

      <div className="space-y-6  ">
        <div className="flex flex-row gap-4">
          <div className="space-y-6 w-full">
            <div className="w-1/2 ">
              <label className="block text-[20px] font-bold text-[#000000B2] mb-2">
                To which country do you want to make this experience available
              </label>

              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, country: value }))
                }
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

            <div className="w-1/2 ">
              <label className="block text-[20px] font-bold text-[#000000B2] mb-2">
                Tour Cost per Person
              </label>

              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[19px]  text-[#000000B2] ">
                  $
                </div>

                <Input
                  type="number"
                  value={formData.costPerPerson}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      costPerPerson: e.target.value,
                    }))
                  }
                  placeholder="20"
                  className="bg-[#00000008]  placeholder:text-[19px] md:text-[19px]  text-[#000000B2] h-[59px] rounded-xl  focus-visible:ring-0 pl-7"
                />
              </div>
            </div>
          </div>

          <div />
        </div>

        <div>
          <label className="block text-[20px] font-bold text-[#000000B2] mb-2">
            Tour Duration
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-[14px] font-semibold text-[#000000B2] mb-1">
                Min Duration
              </label>

              <div className="flex items-center ">
                <Input
                  type="number"
                  value={formData.minDuration}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      minDuration: e.target.value,
                    }))
                  }
                  className="bg-[#00000008]  placeholder:text-[19px] md:text-[19px]  text-[#000000B2]  h-[59px] rounded-xl  focus-visible:ring-0"
                  placeholder="2"
                />
                <div className="text-sm absolute right-10 ">hours</div>
              </div>
            </div>

            <div className="relative">
              <label className="block text-[14px] font-semibold text-[#000000B2] mb-1">
                Max Duration
              </label>

              <div className="flex items-center ">
                <Input
                  type="number"
                  value={formData.maxDuration}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      maxDuration: e.target.value,
                    }))
                  }
                  placeholder="3"
                  className="bg-[#00000008]  placeholder:text-[19px] md:text-[19px]  text-[#000000B2]  h-[59px] rounded-xl  focus-visible:ring-0"
                />
                <span className="text-sm absolute right-10 text-gray-500">
                  hours
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[20px] font-bold text-[#000000B2] mb-2">
            Select what best describes your tour
          </label>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={
                  formData.categories.includes(category) ? "default" : "outline"
                }
                className={`cursor-pointer px-6 py-2 h-[59px] text-[19px] font-normal rounded-2xl ${
                  formData.categories.includes(category)
                    ? "bg-[#FEC540] hover:bg-yellow-500 text-white"
                    : "bg-[#00000008] hover:bg-gray-200 text-[#000000B2]"
                }`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3BasicInfo;
