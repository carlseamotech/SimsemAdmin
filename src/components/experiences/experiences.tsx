"use client";
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

interface ExperienceProps {
  activeFilter: string;
  searchTerm: string;
}

// Sample data
const experiencesData = [
  {
    id: 1,
    type: "Dining",
    name: "The Ultimate Breakfast at Istanbul",
    cost: "$30.00/Person",
    country: "Turkey",
    status: "active",
  },
  {
    id: 2,
    type: "Local Living",
    name: "A walk through my campus",
    cost: "$20.00/Person",
    country: "Turkey",
    status: "active",
  },
  {
    id: 3,
    type: "Local Living",
    name: "A walk through my campus",
    cost: "$30.00/Person",
    country: "Turkey",
    status: "inactive",
  },
  {
    id: 4,
    type: "Dining",
    name: "The Ultimate Breakfast at Istanbul",
    cost: "$20.00/Person",
    country: "Turkey",
    status: "for-approval",
  },
  {
    id: 5,
    type: "Local Living",
    name: "A walk through my campus",
    cost: "$15.00/Person",
    country: "Turkey",
    status: "active",
  },
];

const ExperiencesPage: React.FC<ExperienceProps> = ({
  activeFilter,
  searchTerm,
}) => {
  // Filter functions
  const getFilteredExperiences = () => {
    let data = experiencesData;

    if (activeFilter !== "all") {
      if (activeFilter === "dining") {
        data = data.filter((item) => item.type === "Dining");
      } else if (activeFilter === "local-living") {
        data = data.filter((item) => item.type === "Local Living");
      } else if (activeFilter === "for-approval") {
        data = data.filter((item) => item.status === "for-approval");
      } else if (activeFilter === "active") {
        data = data.filter((item) => item.status === "active");
      } else if (activeFilter === "inactive") {
        data = data.filter((item) => item.status === "inactive");
      }
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
            <TableHead className="font-semibold  text-[16px] text-[#101018]">
              Type
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018]">
              Experience Name
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018]">
              Cost
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018]">
              Country
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getFilteredExperiences().map((experience) => (
            <TableRow key={experience.id} className="hover:bg-gray-50">
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`rounded-full text-[16px] font-normal  ${
                    experience.type === "Dining"
                      ? "bg-[#0D2E6140] text-[#0D2E61] "
                      : "bg-[#FBB04040] text-[#F28E33] "
                  }`}
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

export default ExperiencesPage;
