"use client";

const WhereToMeet = () => {
  const pickupOptions = [
    {
      label: "Pick up in any hotel",
      value: "Turkey Hotel",
    },
    {
      label: "Pick up in any airport",
      value: "Turkey Airport",
    },
    {
      label: "Pick up from a specific location",
      value: "Turkey",
    },
  ];

  return (
    <div className="rounded-2xl p-8 bg-[#3D3D3D0D] flex flex-col gap-6">
      <div className="text-[24px] font-bold text-[#0D2E61]">Where to Meet</div>

      <div className="flex flex-col gap-3 flex-wrap">
        {pickupOptions.map((option, idx) => (
          <div key={idx} className="flex w-full  items-center gap-4 mb-3">
            <div className="text-[18px] text-[#000000B2] w-1/5">
              {option.label}
            </div>

            <div className="bg-[#0D2E610D] w-4/5 text-center rounded-full py-2 px-6 font-bold text-[#3D3D3D] text-[18px]">
              {option.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhereToMeet;
