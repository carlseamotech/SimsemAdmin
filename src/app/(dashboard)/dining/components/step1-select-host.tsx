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
  const selectedHostId = watch("hostId");

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#0D2E61]">Select a Host</h2>
      <p className="text-gray-500">
        Search for a host by name to associate them with this dining
        experience.
      </p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="host-search" className="text-lg font-semibold">
            Host Name
          </Label>
          <Command className="mt-2">
            <CommandInput
              id="host-search"
              placeholder="Search by name..."
              value={search}
              onValueChange={setSearch}
              className="text-base"
            />
            <CommandList>
              {isLoading && <CommandEmpty>Loading hosts...</CommandEmpty>}
              <CommandEmpty>No hosts found.</CommandEmpty>
              <CommandGroup>
                {hosts.map((host) => (
                  <CommandItem
                    key={host.objectId}
                    onSelect={() => {
                      setValue("hostId", host.objectId);
                      setSearch(host.name);
                    }}
                    className="cursor-pointer"
                  >
                    {host.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        {selectedHostId && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold">
              Selected Host:{" "}
              <span className="font-normal">
                {hosts.find((h) => h.objectId === selectedHostId)?.name}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step1SelectHost;
