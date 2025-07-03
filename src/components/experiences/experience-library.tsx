"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ExperienceLibraryProps {
  activeFilter: string;
  searchTerm: string;
}

const experienceLibraryData = [
  {
    id: 1,
    type: "Dining",
    name: "The Ultimate Breakfast at Istanbul",
    cost: "$12.00/Person",
    country: "Turkey",
  },
  {
    id: 2,
    type: "Dining",
    name: "The Ultimate Breakfast at Istanbul",
    cost: "$12.00/Person",
    country: "Turkey",
  },
  {
    id: 3,
    type: "Dining",
    name: "The Ultimate Breakfast at Istanbul",
    cost: "$12.00/Person",
    country: "Turkey",
  },
  {
    id: 4,
    type: "Dining",
    name: "The Ultimate Breakfast at Istanbul",
    cost: "$12.00/Person",
    country: "Turkey",
  },
  {
    id: 5,
    type: "Dining",
    name: "The Ultimate Breakfast at Istanbul",
    cost: "$12.00/Person",
    country: "Turkey",
  },
  {
    id: 6,
    type: "Local Living",
    name: "The Ultimate Breakfast at Istanbul",
    cost: "$12.00/Person",
    country: "Turkey",
  },
];

const ExperienceLibraryPage: React.FC<ExperienceLibraryProps> = ({
  activeFilter,
  searchTerm,
}) => {
  const getFilteredLibrary = () => {
    let data = experienceLibraryData;

    if (activeFilter !== "all" && activeFilter === "dining") {
      data = data.filter((item) => item.type === "Dining");
    } else if (activeFilter === "local-living") {
      data = data.filter((item) => item.type === "Local Living");
    }

    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Type
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Experience Name
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Cost
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Country
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getFilteredLibrary().map((experience) => (
            <TableRow key={experience.id} className="hover:bg-gray-50">
              <TableCell>
                <Badge
                  variant="secondary"
                  className="rounded-full text-[16px] font-normal bg-[#0D2E6140] text-[#0D2E61] "
                >
                  {experience.type}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-900">{experience.name}</TableCell>
              <TableCell className="text-gray-600">{experience.cost}</TableCell>
              <TableCell className="text-gray-600">
                {experience.country}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="bg-[#0D2E61] hover:bg-blue-900 text-[#FFFFFF]"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="bg-[#9A031E]"
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExperienceLibraryPage;
