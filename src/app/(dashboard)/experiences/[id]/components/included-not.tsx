"use client";
import { CheckCircle, XCircle } from "lucide-react"; // You can also use any other icon set

export const WhatsIncludedNot = () => {
  const includedItems = [
    "Local tour guide",
    "Entrance fees",
    "Bottled water",
    "Transportation during tour",
  ];

  const excludedItems = [
    "Meals and drinks",
    "Gratuities",
    "Hotel pickup and drop-off",
  ];

  return (
    <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-6">
      <div className="text-[24px] font-bold text-[#0D2E61]">
        What’s Included, What’s Not
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-[#0D2E61] mb-4">
            Included
          </h3>
          <ul className="space-y-2">
            {includedItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-[#3D3D3D]"
              >
                <CheckCircle className="text-[#6CBF84] w-5 h-5" />
                <span className="text-[15px]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#0D2E61] mb-4">
            Not Included
          </h3>
          <ul className="space-y-2">
            {excludedItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-[#3D3D3D]"
              >
                <XCircle className="text-[#FF5A5F] w-5 h-5" />
                <span className="text-[15px]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
