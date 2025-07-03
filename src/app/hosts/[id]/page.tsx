"use client";
import { useParams } from "next/navigation";

// mock data (or fetch from API)
const hosts = [
  { id: "1", name: "Ahmed Habib" },
  { id: "2", name: "Sophia" },
  { id: "3", name: "Daneesh" },
  { id: "4", name: "Layla Noor" },
];

const HostSummaryPage = () => {
  const { id } = useParams();

  const host = hosts.find((h) => h.id === id);

  if (!host) {
    return <div className="p-6 text-red-500">Host not found.</div>;
  }

  return (
    <div className="p-6 bg-red-500">
      <h1 className="text-2xl font-bold">Host Summary</h1>
      <p className="mt-4">ID: {host.id}</p>
      <p>Name: {host.name}</p>
    </div>
  );
};

export default HostSummaryPage;
