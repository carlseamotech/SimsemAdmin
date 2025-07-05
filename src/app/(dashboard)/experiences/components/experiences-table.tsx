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
import { useTours } from "@/hooks/use-experiences";
import { Experience } from "@/models/experience";
import { useMemo } from "react";
import ExperiencesTableSkeleton from "./experiences-table-skeleton";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ExperienceProps {
  activeFilter: string;
  searchTerm: string;
}

const ExperiencesPage: React.FC<ExperienceProps> = ({
  activeFilter,
  searchTerm,
}) => {
  const { tours, count, isLoading, page, limit, setPage } = useTours([
    "custom",
    "getaway",
    "offered",
  ]);
  const router = useRouter();

  const allExperiences = useMemo(() => {
    return tours?.map((tour) => ({
      ...tour,
      experienceType: tour.type.charAt(0).toUpperCase() + tour.type.slice(1),
    }));
  }, [tours]);

  const getFilteredExperiences = () => {
    let data: Experience[] = allExperiences || [];

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

  if (isLoading) {
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
            <TableRow
              key={experience.objectId}
              onClick={() =>
                router.push(
                  `/experiences/${experience.objectId}?tab=experiences`
                )
              }
              className="hover:bg-gray-50 cursor-pointer"
            >
              <TableCell className="text-gray-900">{experience.name}</TableCell>
              <TableCell className="text-gray-600">
                {/*{experience.experienceType}*/}
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

              {/* <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={experience.hostImageUrls}
                      alt="Host Image"
                    />
                    <AvatarFallback>{experience.name[0]}</AvatarFallback>
                  </Avatar>

                  <span className="font-medium text-gray-900">
                    {experience.hostname}
                  </span>
                </div>
              </TableCell> */}

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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {page} of {Math.ceil(count / limit)} pages
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(count / limit)}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ExperiencesPage;
