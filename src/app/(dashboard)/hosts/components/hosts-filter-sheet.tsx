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
import { useCountries } from "@/hooks/use-countries";

interface HostsFilterSheetProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  hostId: string;
  setHostId: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
}

export const HostsFilterSheet: React.FC<HostsFilterSheetProps> = ({
  searchTerm: initialSearchTerm,
  setSearchTerm,
  hostId: initialHostId,
  setHostId,
  email: initialEmail,
  setEmail,
  country: initialCountry,
  setCountry,
  onApply: onApplyProp,
  onClear: onClearProp,
}) => {
  const [searchTerm, setLocalSearchTerm] = useState(initialSearchTerm);
  const [hostId, setLocalHostId] = useState(initialHostId);
  const [email, setLocalEmail] = useState(initialEmail);
  const [country, setLocalCountry] = useState(initialCountry);
  const { countries } = useCountries();

  useEffect(() => {
    setLocalSearchTerm(initialSearchTerm);
    setLocalHostId(initialHostId);
    setLocalEmail(initialEmail);
    setLocalCountry(initialCountry);
  }, [initialSearchTerm, initialHostId, initialEmail, initialCountry]);

  const handleApply = () => {
    setSearchTerm(searchTerm);
    setHostId(hostId);
    setEmail(email);
    setCountry(country);
    onApplyProp();
  };

  const handleClear = () => {
    setLocalSearchTerm("");
    setLocalHostId("");
    setLocalEmail("");
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
          <SheetTitle>Filter Hosts</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 p-4">
          <Input
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
          />
          <Input
            placeholder="Host ID"
            value={hostId}
            onChange={(e) => setLocalHostId(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setLocalEmail(e.target.value)}
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
                .map((c: Country) => (
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
