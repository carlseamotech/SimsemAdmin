"use client";

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

export const TourTimes: React.FC<TourTimesProps> = ({ tourTimes }) => {
  const parsedTourTimes: TourTime[] = tourTimes.map((time) => JSON.parse(time));

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-2">Tour Times</h3>
      <div className="space-y-4">
        {parsedTourTimes.map((time, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <p className="font-bold">{time.date}</p>
            {time.times.map((t, i) => (
              <p key={i}>
                {t.start} - {t.end}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};