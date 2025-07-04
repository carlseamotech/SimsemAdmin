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
import { Edit, Trash2 } from "lucide-react";
import EditIcon from "../../../public/common/edit-icon.svg";
import TrashIcon from "../../../public/common/trash-con.svg";
import Image from "next/image";

interface ManagePromotionsProps {
  searchTerm: string;
}

const promotionsData = [
  {
    id: 1,
    promoName: "First Purchase",
    description: "All new users",
    for: "All Tours",
    code: "new-user",
    quantity: "Unlimited",
    remaining: "Unlimited",
    expiry: "Never",
    discount: "10%",
  },
  {
    id: 2,
    promoName: "Kids Discount",
    description: "All kids",
    for: "Kids",
    code: "kids-01",
    quantity: "15",
    remaining: "10",
    expiry: "2025-01-31",
    discount: "15%",
  },
];

const ManagePromotionsPage: React.FC<ManagePromotionsProps> = ({
  searchTerm,
}) => {
  const filteredPromotions = promotionsData.filter(
    (promo) =>
      promo.promoName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold  text-[12px] text-[#101018] p-3.5">
              Promo Name
            </TableHead>
            <TableHead className="font-semibold  text-[12px] text-[#101018] p-3.5">
              Description
            </TableHead>
            <TableHead className="font-semibold  text-[12px] text-[#101018] p-3.5">
              For
            </TableHead>
            <TableHead className="font-semibold  text-[12px] text-[#101018] p-3.5">
              Code
            </TableHead>
            <TableHead className="font-semibold  text-[12px] text-[#101018] p-3.5">
              Quantity
            </TableHead>
            <TableHead className="font-semibold  text-[12px] text-[#101018] p-3.5">
              Remaining
            </TableHead>
            <TableHead className="font-semibold  text-[12px] text-[#101018] p-3.5">
              Expiry
            </TableHead>
            <TableHead className="font-semibold  text-[12px] text-[#101018] p-3.5">
              Discount
            </TableHead>
            <TableHead className="font-semibold  text-[12px] text-[#101018] p-3.5">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPromotions.map((promo) => (
            <TableRow key={promo.id} className="hover:bg-gray-50">
              <TableCell className="text-[14px] text-[#707070]">
                {promo.promoName}
              </TableCell>
              <TableCell className="text-[14px] text-[#707070]">
                {promo.description}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-[#3D3D3D1A] text-[14px] text-[#707070] rounded-full"
                >
                  {promo.for}
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
                {promo.expiry}
              </TableCell>
              <TableCell className="text-[14px] font-bold text-[#707070]">
                {promo.discount}
              </TableCell>

              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-gray-600 hover:text-gray-900"
                  >
                    <Image src={EditIcon} alt="EditIcon " className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-gray-600 hover:text-red-600"
                  >
                    <Image
                      src={TrashIcon}
                      alt="TrashIcon "
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
