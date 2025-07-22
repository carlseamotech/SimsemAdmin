"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Country } from "@/models/country";
import { useState, useEffect } from "react";

interface ExperiencesFilterSheetProps {
  experienceId: string;
  setExperienceId: (value: string) => void;
  hostId: string;
  setHostId: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
  countries: Country[];
  onApply: () => void;
  onClear: () => void;
}

export const ExperiencesFilterSheet: React.FC<
  ExperiencesFilterSheetProps
> = ({
  experienceId: initialExperienceId,
  setExperienceId,
  hostId: initialHostId,
  setHostId,
  country: initialCountry,
  setCountry,
  countries,
  onApply: onApplyProp,
  onClear: onClearProp,
}) => {
  const [experienceId, setLocalExperienceId] = useState(initialExperienceId);
  const [hostId, setLocalHostId] = useState(initialHostId);
  const [country, setLocalCountry] = useState(initialCountry);

  useEffect(() => {
    setLocalExperienceId(initialExperienceId);
    setLocalHostId(initialHostId);
    setLocalCountry(initialCountry);
  }, [initialExperienceId, initialHostId, initialCountry]);

  const handleApply = () => {
    setExperienceId(experienceId);
    setHostId(hostId);
    setCountry(country);
    onApplyProp();
  };

  const handleClear = () => {
    setLocalExperienceId("");
    setLocalHostId("");
    setLocalCountry("");
    onClearProp();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8 bg-transparent border-none"
        >
          <Filter className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Experiences</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 p-4">
          <Input
            placeholder="Experience ID"
            value={experienceId}
            onChange={(e) => setLocalExperienceId(e.target.value)}
          />
          <Input
            placeholder="Host ID"
            value={hostId}
            onChange={(e) => setLocalHostId(e.target.value)}
          />
          <Select
            value={country}
            onValueChange={(value) =>
              setLocalCountry(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countries
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((c) => (
                  <SelectItem key={c.objectId} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <SheetFooter>
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
          <SheetClose asChild>
            <Button onClick={handleApply}>Apply</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};