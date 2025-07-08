"use client";

interface ItineraryProps {
  items: { schedule: string; activity: string; description: string }[];
}

export const Itinerary: React.FC<ItineraryProps> = ({ items }) => {
  return (
    <div className="rounded-2xl p-6  bg-[#3D3D3D0D] space-y-4">
      <div className="text-[24px] font-bold text-[#0D2E61]">Itinerary</div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <p className="font-bold">{item.schedule}</p>
            <p className="font-semibold">{item.activity}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
