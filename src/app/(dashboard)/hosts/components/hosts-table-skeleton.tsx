import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function HostsTableSkeleton() {
  return (
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
            Country
          </TableHead>
          <TableHead className="font-semibold text-[16px] text-[#101018] p-3.5">
            Status
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[200px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-[100px] rounded-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
