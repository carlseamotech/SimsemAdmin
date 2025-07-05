"use client";

interface ItineraryProps {
  items: { schedule: string; activity: string; description: string }[];
}

export const Itinerary: React.FC<ItineraryProps> = ({ items }) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-2">Itinerary</h3>
      <div className="space-y-4">
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