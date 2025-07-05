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
import { ProposedTour } from "@/models/proposed-tour";
import { useMemo, useState } from "react";
import ExperiencesTableSkeleton from "./experiences-table-skeleton";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHosts } from "@/hooks/use-hosts";
import { ConfirmationDialog } from "@/components/common/confirmation-dialog";

interface ExperienceProps {
  activeFilter: string;
  searchTerm: string;
  onEdit: (experience: ProposedTour) => void;
}

const ExperiencesPage: React.FC<ExperienceProps> = ({
  activeFilter,
  searchTerm,
  onEdit,
}) => {
  const { tours, count, isLoading, page, limit, setPage, deleteTour } =
    useTours(["custom", "getaway", "offered"]);
  const { hosts } = useHosts();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState<string | null>(
    null
  );

  const handleDeleteClick = (id: string) => {
    setExperienceToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (experienceToDelete) {
      deleteTour(experienceToDelete);
      setExperienceToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const allExperiences = useMemo(() => {
    return tours?.map((tour) => {
      const host = hosts?.find((h) => h.objectId === tour.guideId);
      return {
        ...tour,
        experienceType: tour.type.charAt(0).toUpperCase() + tour.type.slice(1),
        hostName: host?.name || "N/A",
      };
    });
  }, [tours, hosts]);

  const getFilteredExperiences = () => {
    let data: (ProposedTour & { hostName: string })[] = allExperiences || [];

    if (activeFilter === "for-approval") {
      data = data.filter((item) => "isApproved" in item && !item.isApproved);
    } else if (activeFilter === "active" || activeFilter === "inactive") {
      data = data.filter(
        (item) =>
          "isActive" in item &&
          (activeFilter === "active" ? item.isActive : !item.isActive)
      );
    }

    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.hostName.toLowerCase().includes(searchTerm.toLowerCase())
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
              className="hover:bg-gray-50 cursor-pointer"
            >
              <TableCell
                className="text-gray-900"
                onClick={() =>
                  router.push(
                    `/experiences/${experience.objectId}?tab=experiences`
                  )
                }
              >
                {experience.name}
              </TableCell>
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
                {experience.hostName}
              </TableCell>

              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="bg-[#0D2E61] hover:bg-blue-900 text-[#FFFFFF]"
                    onClick={() => onEdit(experience)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="bg-[#9A031E]"
                    onClick={() => handleDeleteClick(experience.objectId)}
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
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Are you sure you want to delete this experience?"
        description="This action will mark the experience as inactive and cannot be undone."
      />
    </div>
  );
};

export default ExperiencesPage;
