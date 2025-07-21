"use client";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useHosts } from "@/hooks/use-hosts";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormData } from "./types";

const Step1SelectHost = () => {
  const { setValue, watch } = useFormContext<FormData>();
  const [search, setSearch] = useState("");
  const { hosts, isLoading } = useHosts(search);
  const selectedHostId = watch("guideId");

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="host-search">Search for a host</Label>
        <Command>
          <CommandInput
            id="host-search"
            placeholder="Search by name..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {isLoading && <CommandEmpty>Loading...</CommandEmpty>}
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {hosts.map((host) => (
                <CommandItem
                  key={host.objectId}
                  onSelect={() => {
                    setValue("guideId", host.objectId);
                    setSearch("");
                  }}
                >
                  {host.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      {selectedHostId && (
        <div>
          <p>
            Selected Host:{" "}
            {hosts.find((h) => h.objectId === selectedHostId)?.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default Step1SelectHost;
