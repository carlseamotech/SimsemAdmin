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
import { usePromoCodes } from "@/hooks/use-promo-codes";
import { PromoCode } from "@/models/promo-code";
import Image from "next/image";
import EditIcon from "../../../public/common/edit-icon.svg";
import TrashIcon from "../../../public/common/trash-con.svg";
import PromotionsTableSkeleton from "./promotions-table-skeleton";

interface ManagePromotionsProps {
  searchTerm: string;
  onEdit: (promo: PromoCode) => void;
}

const ManagePromotionsPage: React.FC<ManagePromotionsProps> = ({
  searchTerm,
  onEdit,
}) => {
  const { promoCodes, isLoading, deletePromoCode } = usePromoCodes();

  const filteredPromotions = promoCodes?.filter(
    (promo: PromoCode) =>
      promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <PromotionsTableSkeleton />;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-[12px] text-[#101018] p-3.5">
              Promo Name
            </TableHead>
            <TableHead className="font-semibold text-[12px] text-[#101018] p-3.5">
              Description
            </TableHead>
            <TableHead className="font-semibold text-[12px] text-[#101018] p-3.5">
              For
            </TableHead>
            <TableHead className="font-semibold text-[12px] text-[#101018] p-3.5">
              Code
            </TableHead>
            <TableHead className="font-semibold text-[12px] text-[#101018] p-3.5">
              Quantity
            </TableHead>
            <TableHead className="font-semibold text-[12px] text-[#101018] p-3.5">
              Remaining
            </TableHead>
            <TableHead className="font-semibold text-[12px] text-[#101018] p-3.5">
              Expiry
            </TableHead>
            <TableHead className="font-semibold text-[12px] text-[#101018] p-3.5">
              Discount
            </TableHead>
            <TableHead className="font-semibold text-[12px] text-[#101018] p-3.5">
              Status
            </TableHead>
            <TableHead className="font-semibold text-[12px] text-[#101018] p-3.5">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPromotions?.map((promo) => (
            <TableRow key={promo.objectId} className="hover:bg-gray-50">
              <TableCell className="text-[14px] text-[#707070]">
                {promo.name}
              </TableCell>
              <TableCell className="text-[14px] text-[#707070] max-w-xs truncate">
                {promo.description}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-[#3D3D3D1A] text-[14px] text-[#707070] rounded-full capitalize"
                >
                  {promo.serviceType}
                </Badge>
              </TableCell>
              <TableCell className="text-[#0D2E61] text-[14px] font-bold">
                {promo.code}
              </TableCell>
              <TableCell className="text-[14px] text-[#707070]">
                {promo.quantity}
              </TableCell>
              <TableCell className="text-[14px] text-[#707070]">
                {promo.remaining}
              </TableCell>
              <TableCell className="text-[14px] text-[#707070]">
                {new Date(promo.expiryDate.iso).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-[14px] font-bold text-[#707070]">
                {promo.discountType === "amount" ? "$" : ""}
                {promo.discount}
                {promo.discountType === "percentage" ? "%" : ""}
              </TableCell>
              <TableCell>
                <Badge
                  variant={promo.isActive ? "default" : "destructive"}
                  className={
                    promo.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {promo.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-gray-600 hover:text-gray-900"
                    onClick={() => onEdit(promo)}
                  >
                    <Image src={EditIcon} alt="EditIcon" className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-gray-600 hover:text-red-600"
                    onClick={() => deletePromoCode(promo.objectId)}
                  >
                    <Image
                      src={TrashIcon}
                      alt="TrashIcon"
                      className="w-4 h-4"
                    />
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

export default ManagePromotionsPage;
