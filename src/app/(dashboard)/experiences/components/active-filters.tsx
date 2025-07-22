"use client";

import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  filters: {
    experienceId: string;
    hostId: string;
    country: string;
  };
  onClear: (filterName: "experienceId" | "hostId" | "country") => void;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onClear,
}) => {
  const activeFilters = Object.entries(filters).filter(
    ([, value]) => value !== ""
  );

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 py-2">
      <span className="text-sm font-medium">Active Filters:</span>
      {activeFilters.map(([key, value]) => (
        <Badge key={key} variant="secondary" className="flex items-center gap-1">
          <span>
            {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}: {value}
          </span>
          <button onClick={() => onClear(key as "experienceId" | "hostId" | "country")}>
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
};