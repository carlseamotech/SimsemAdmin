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
            <TableHead className="font-semibold  text-[16px] text-[#101018] p-3.5">
              Promo Name
            </TableHead>
            <TableHead className="font-semibold  text-[16px] text-[#101018] p-3.5">
              Description
            </TableHead>
            <TableHead className="font-semibold  text-[16px] text-[#101018] p-3.5">
              For
            </TableHead>
            <TableHead className="font-semibold  text-[16px] text-[#101018] p-3.5">
              Code
            </TableHead>
            <TableHead className="font-semibold  text-[16px] text-[#101018] p-3.5">
              Quantity
            </TableHead>
            <TableHead className="font-semibold  text-[16px] text-[#101018] p-3.5">
              Remaining
            </TableHead>
            <TableHead className="font-semibold  text-[16px] text-[#101018] p-3.5">
              Expiry
            </TableHead>
            <TableHead className="font-semibold  text-[16px] text-[#101018] p-3.5">
              Discount
            </TableHead>
            <TableHead className="font-semibold  text-[16px] text-[#101018] p-3.5">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPromotions.map((promo) => (
            <TableRow key={promo.id} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">
                {promo.promoName}
              </TableCell>
              <TableCell className="text-gray-600">
                {promo.description}
              </TableCell>
              <TableCell className="text-gray-600">{promo.for}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                >
                  {promo.code}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-600">{promo.quantity}</TableCell>
              <TableCell className="text-gray-600">{promo.remaining}</TableCell>
              <TableCell className="text-gray-600">{promo.expiry}</TableCell>
              <TableCell className="text-gray-600">{promo.discount}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-gray-600 hover:text-gray-900"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
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
