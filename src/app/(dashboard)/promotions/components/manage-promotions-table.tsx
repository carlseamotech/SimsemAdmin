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
import EditIcon from "../../../../../public/common/edit-icon.svg";
import TrashIcon from "../../../../../public/common/trash-con.svg";
import PromotionsTableSkeleton from "./promotions-table-skeleton";
import { useState } from "react";
import { ConfirmationDialog } from "@/components/common/confirmation-dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ManagePromotionsProps {
  searchTerm: string;
  onEdit: (promo: PromoCode) => void;
}

const ManagePromotionsPage: React.FC<ManagePromotionsProps> = ({
  searchTerm,
  onEdit,
}) => {
  const {
    promoCodes,
    count,
    isLoading,
    deletePromoCode,
    page,
    limit,
    setPage,
  } = usePromoCodes();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [promoToDelete, setPromoToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setPromoToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (promoToDelete) {
      deletePromoCode(promoToDelete);
      setPromoToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const filteredPromotions = promoCodes?.filter(
    (promo: PromoCode) =>
      promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.country.toLowerCase().includes(searchTerm.toLowerCase())
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
              For
            </TableHead>
            <TableHead className="font-semibold text-[12px] text-[#101018] p-3.5">
              Country
            </TableHead>
            <TableHead className="font-semibold text-[12px] text-[#101018] p-3.5">
              Code
            </TableHead>
            <TableHead className="font-semibold text-[12px] text-[#101018] p-3.5">
              Discount
            </TableHead>
            <TableHead className="font-semibold text-[12px] text-[#101018] p-3.5">
              Expiry
            </TableHead>
            <TableHead className="font-semibold text-[12px] text-[#101018] p-3.5">
              Created At
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
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`${
                    promo.serviceType === "tour"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  } text-[14px] rounded-full capitalize`}
                >
                  {promo.serviceType}
                </Badge>
              </TableCell>
              <TableCell className="text-[14px] text-[#707070]">
                {promo.country}
              </TableCell>
              <TableCell className="text-[#0D2E61] text-[14px] font-bold">
                {promo.code}
              </TableCell>
              <TableCell className="text-[14px] font-bold text-[#707070]">
                {promo.discount}
                {promo.discountType === "percentage" ? "%" : "$"}
              </TableCell>
              <TableCell className="text-[14px] text-[#707070]">
                {new Date(promo.expiryDate.iso).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-[14px] text-[#707070]">
                {new Date(promo.createdAt).toLocaleDateString()}
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
                    onClick={() => handleDeleteClick(promo.objectId)}
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
        title="Are you sure you want to delete this promotion?"
        description="This action cannot be undone."
      />
    </div>
  );
};

export default ManagePromotionsPage;
