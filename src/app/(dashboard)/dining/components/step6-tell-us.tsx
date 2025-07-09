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
      <div>
        <h2 className="text-2xl font-semibold text-blue-900 mb-2">
          Tell us a bit more
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To which country do you want to make this experience available
          </label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, country: value }))
            }
          >
            <SelectTrigger className="w-full">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meal Cost per Person
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <Input
              type="number"
              className="pl-8"
              value={formData.costPerPerson}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  costPerPerson: e.target.value,
                }))
              }
              placeholder="20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step6TellUs;
