"use client";

const DateAndTime = () => {
  return (
    <div className="rounded-2xl p-8 bg-[#3D3D3D0D] flex flex-col gap-6">
      <div className="text-[24px] font-bold text-[#0D2E61]">Date & Time</div>

      <div className="flex flex-row gap-6 flex-wrap">
        <div className="bg-white drop-shadow-xl p-6 rounded-2xl space-y-6 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-12px)]">
          <div className="flex flex-row justify-center items-center">
            <div className="text-[20px] text-[#0D2E61] font-bold">
              Always Available
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateAndTime;
