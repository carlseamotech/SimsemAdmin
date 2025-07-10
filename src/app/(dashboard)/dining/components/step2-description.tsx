"use client";

import type React from "react";
import { Textarea } from "@/components/ui/textarea";
import type { DiningFormData } from "../page";

interface Step2DescriptionProps {
  formData: DiningFormData;
  setFormData: React.Dispatch<React.SetStateAction<DiningFormData>>;
}

const Step2Description: React.FC<Step2DescriptionProps> = ({
  formData,
  setFormData,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[30px] text-[#0D2E61] mb-2">Description</h2>
        <p className="text-[#00000099] text-[15px]">Provide a brief overview</p>
      </div>

      <div>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="We'll pick you up from your hotel in Giza or Cairo downtown at 9am. Then start out tour to visit: Giza Pyramids and Sphinx, the panorama for the best view of the pyramid, Camel Rides (30 minutes), ATV Quad Bikes (60 minutes). Ticket to the whole area of the Pyramids and Sphinx is included.

          After the day trip, we'll transfer you back to your hotel. End of tour."
          rows={8}
          className="w-full text-[18px] focus-visible:ring-[1px] text-[#00000066] py-4 px-4 bg-[#00000008] min-h-[257px]  "
        />
      </div>
    </div>
  );
};

export default Step2Description;
