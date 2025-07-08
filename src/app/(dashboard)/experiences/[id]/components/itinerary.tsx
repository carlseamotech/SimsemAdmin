"use client";
import Image from "next/image";
import InfoIcon from "../../../../../../public/experience/itenerary-icon.svg";

interface TourTime {
  date: string;
  isEnabled: boolean;
  repetition: string;
  time: string;
  times: { end: string; start: string }[];
  yearMonth: string;
}

interface TourTimesProps {
  tourTimes: string[];
}

export const Itinerary: React.FC<TourTimesProps> = ({ tourTimes }) => {
  const parsedTourTimes: TourTime[] = tourTimes.map((time) => JSON.parse(time));

  return (
    <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-6">
      <h3 className="text-[24px] font-bold text-[#0D2E61] mb-6">
        Our Detailed Itinerary
      </h3>

      <div className="relative">
        {parsedTourTimes.map((time, index) => {
          const isLast = index === parsedTourTimes.length - 1;

          return (
            <div
              key={index}
              className="relative flex items-start pb-8 last:pb-0 gap-4"
            >
              {/* Timeline line (hide if last item) */}
              {!isLast && (
                <div className="absolute left-[22px] top-8 w-0.5 h-full bg-gray-300 -translate-x-0.5" />
              )}

              {/* Indicator Icon */}
              <div className="relative z-10 flex items-center justify-center w-[43px] h-[43px]">
                <Image src={InfoIcon} alt="Info icon" />
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0 space-y-2 pt-2">
                <div className="text-[20px] font-bold text-[#3D3D3D]">
                  <p className="font-bold">{time.date}</p>
                </div>

                <div className="text-[18px] text-[#3D3D3D]">
                  {time.times.map((t, i) => (
                    <p key={i}>
                      {t.start} - {t.end}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
