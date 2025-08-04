"use client";
import { ChevronLeft, ChevronRight, Copy, Edit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useHosts } from "@/hooks/use-hosts";
import { Host } from "@/models/host";
import { useRouter } from "next/navigation";
import { HostsTableSkeleton } from "@/app/(dashboard)/hosts/components/hosts-table-skeleton";
import { copyToClipboard } from "@/lib/copy-to-clipboard";

interface HostsTableProps {
  searchTerm: string;
  activeFilter: string;
  hostId: string;
  email: string;
  country: string;
}

export const HostsTable: React.FC<HostsTableProps> = ({
  searchTerm,
  activeFilter,
  hostId,
  email,
  country,
}) => {
  const { hosts, count, isLoading, page, limit, setPage } = useHosts(
    searchTerm,
    hostId,
    email,
    country,
    activeFilter
  );
  const router = useRouter();

  if (isLoading) {
    return <HostsTableSkeleton />;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Host
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Phone Number
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Email Address
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              ID
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Country
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Status
            </TableHead>
            <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {hosts?.map((host: Host) => (
            <TableRow
              key={host.objectId}
              className="hover:bg-gray-50"
            >
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={host.imageUrl} alt="Host Image" />
                    <AvatarFallback>{host.name[0]}</AvatarFallback>
                  </Avatar>

                  <span className="font-medium text-gray-900">
                    {host.name}
                  </span>
                </div>
              </TableCell>
              <TableCell>{host.phone}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span>{host.email}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(host.email, "Email");
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span>{host.objectId}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(host.objectId, "Host ID");
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{host.country}</TableCell>
              <TableCell>
                <Badge
                  variant={host.isVerified ? "default" : "secondary"}
                  className={`rounded-full text-[16px] font-normal ${
                    host.isVerified
                      ? "bg-[#C9E8E8] text-[#105352] hover:bg-teal-100"
                      : "bg-[#FFF3DD] text-[#AA8345] hover:bg-orange-100"
                  }`}
                >
                  {host.isVerified ? "Approved" : "For Approval"}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/hosts/${host.objectId}`);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
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