"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

interface HostsTableProps {
  searchTerm: string;
  activeFilter: string;
}

export const HostsTable: React.FC<HostsTableProps> = ({
  searchTerm,
  activeFilter,
}) => {
  const { hosts, count, isLoading, page, limit, setPage } = useHosts();
  const router = useRouter();

  const filteredHosts = hosts?.filter((host: Host) => {
    const matchesSearch =
      host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.country.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "for-approval")
      return matchesSearch && !host.isVerified;
    if (activeFilter === "approved") return matchesSearch && host.isVerified;

    return matchesSearch;
  });

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
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredHosts?.map((host: Host) => (
            <TableRow
              key={host.objectId}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => router.push(`/hosts/${host.objectId}`)}
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
              <TableCell>{host.email}</TableCell>
              <TableCell>{host.objectId}</TableCell>
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