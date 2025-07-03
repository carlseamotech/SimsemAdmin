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

const experiencesData = [
  {
    id: 1,
    type: "Dining",
    tourname: "The Ultimate Breakfast at Istanbul",
    profile: "Turkey",
    host: "Ahmed Habib",
    status: "active",
    approvalStatus: "For Approval",
  },
  {
    id: 2,
    type: "Local Living",
    tourname: "A walk through my campus",
    profile: "Turkey",
    host: "Ahmed Habib",
    status: "inactive",
    approvalStatus: "Approved",
  },
  {
    id: 3,
    type: "Local Living",
    tourname: "A walk through my campus",
    profile: "Turkey",
    host: "Ahmed Habib",
    status: "inactive",
    approvalStatus: "For Approval",
  },
  {
    id: 4,
    type: "Dining",
    tourname: "The Ultimate Breakfast at Istanbul",
    profile: "Turkey",
    host: "Ahmed Habib",
    status: "active",
    approvalStatus: "Approved",
  },
  {
    id: 5,
    type: "Local Living",
    tourname: "A walk through my campus",
    profile: "Turkey",
    host: "Ahmed Habib",
    status: "active",
    approvalStatus: "Rejected",
  },
  {
    id: 6,
    type: "Local Living",
    tourname: "A walk through my campus",
    profile: "Turkey",
    host: "Ahmed Habib",
    status: "active",
    approvalStatus: "Approved",
  },
];

const ExperiencesPage: React.FC<ExperienceProps> = ({
  activeFilter,
  searchTerm,
}) => {
  const getFilteredExperiences = () => {
    let data = experiencesData;

    if (activeFilter === "for-approval") {
      data = data.filter((item) => item.approvalStatus === "For Approval");
    } else if (activeFilter === "active" || activeFilter === "inactive") {
      data = data.filter((item) => item.status === activeFilter);
    }

    return data.filter((item) =>
      item.tourname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const isApprovalVisible =
    activeFilter === "all" || activeFilter === "for-approval";
  const isStatusVisible =
    activeFilter === "all" ||
    activeFilter === "active" ||
    activeFilter === "inactive";

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
            <TableRow key={experience.id} className="hover:bg-gray-50">
              <TableCell className="text-gray-900">
                {experience.tourname}
              </TableCell>
              <TableCell className="text-gray-600">{experience.type}</TableCell>

              {isApprovalVisible && (
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`rounded-full text-[16px] font-normal ${
                      experience.approvalStatus === "Approved"
                        ? "bg-[#C9E8E8] text-[#105352]"
                        : experience.approvalStatus === "For Approval"
                        ? "bg-[#FFF3DD] text-[#AA8345]"
                        : "bg-[#3D3D3D1A] text-[#000000B2]"
                    }`}
                  >
                    {experience.approvalStatus}
                  </Badge>
                </TableCell>
              )}

              {isStatusVisible && (
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`rounded-full text-[16px] font-normal ${
                      experience.status === "active"
                        ? "bg-[#C9E8E8] text-[#105352]"
                        : experience.status === "inactive"
                        ? "bg-[#F3F3F3] text-[#333333]"
                        : "bg-[#E2E2E2] text-[#777777]"
                    }`}
                  >
                    {experience.status.charAt(0).toUpperCase() +
                      experience.status.slice(1)}
                  </Badge>
                </TableCell>
              )}

              <TableCell className="text-gray-600">{experience.host}</TableCell>

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
