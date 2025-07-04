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
import {
  useCustomTours,
  useGetawayTours,
  useOfferedTours,
} from "@/hooks/use-experiences";
import { Experience, GetawayTour, OfferedTour } from "@/models/experience";
import { useMemo } from "react";
import ExperiencesTableSkeleton from "./experiences-table-skeleton";

interface ExperienceProps {
  activeFilter: string;
  searchTerm: string;
}

type CombinedExperience = (Experience | GetawayTour | OfferedTour) & {
  experienceType: string;
};

const ExperiencesPage: React.FC<ExperienceProps> = ({
  activeFilter,
  searchTerm,
}) => {
  const { customTours, isLoading: customLoading } = useCustomTours();
  const { getawayTours, isLoading: getawayLoading } = useGetawayTours();
  const { offeredTours, isLoading: offeredLoading } = useOfferedTours();

  const allExperiences = useMemo(() => {
    const custom = customTours?.map((tour) => ({
      ...tour,
      experienceType: "Custom",
    }));
    const getaway = getawayTours?.map((tour) => ({
      ...tour,
      experienceType: "Getaway",
    }));
    const offered = offeredTours?.map((tour) => ({
      ...tour,
      experienceType: "Offered",
    }));

    return [...(custom || []), ...(getaway || []), ...(offered || [])];
  }, [customTours, getawayTours, offeredTours]);

  const getFilteredExperiences = () => {
    let data: CombinedExperience[] = allExperiences;

    if (activeFilter === "for-approval") {
      data = data.filter((item) => "isApproved" in item && !item.isApproved);
    } else if (activeFilter === "active" || activeFilter === "inactive") {
      data = data.filter(
        (item) =>
          "isActive" in item &&
          (activeFilter === "active" ? item.isActive : !item.isActive)
      );
    }

    return data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const isApprovalVisible =
    activeFilter === "all" || activeFilter === "for-approval";
  const isStatusVisible =
    activeFilter === "all" ||
    activeFilter === "active" ||
    activeFilter === "inactive";

  if (customLoading || getawayLoading || offeredLoading) {
    return <ExperiencesTableSkeleton />;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Tour Name
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Experience Type
            </TableHead>
            {isApprovalVisible && (
              <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
                Approval Status
              </TableHead>
            )}
            {isStatusVisible && (
              <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
                Status
              </TableHead>
            )}
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Host
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {getFilteredExperiences().map((experience) => (
            <TableRow key={experience.objectId} className="hover:bg-gray-50">
              <TableCell className="text-gray-900">
                {experience.name}
              </TableCell>
              <TableCell className="text-gray-600">
                {experience.experienceType}
              </TableCell>

              {isApprovalVisible && "isApproved" in experience && (
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`rounded-full text-[16px] font-normal ${
                      experience.isApproved
                        ? "bg-[#C9E8E8] text-[#105352]"
                        : "bg-[#FFF3DD] text-[#AA8345]"
                    }`}
                  >
                    {experience.isApproved ? "Approved" : "For Approval"}
                  </Badge>
                </TableCell>
              )}

              {isStatusVisible && "isActive" in experience && (
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`rounded-full text-[16px] font-normal ${
                      experience.isActive
                        ? "bg-[#C9E8E8] text-[#105352]"
                        : "bg-[#F3F3F3] text-[#333333]"
                    }`}
                  >
                    {experience.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
              )}

              <TableCell className="text-gray-600">
                {experience.guideId}
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

