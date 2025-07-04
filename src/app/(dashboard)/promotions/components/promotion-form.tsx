"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  promotionSchema,
  PromotionFormData,
} from "../../../../lib/promotion-validation";
import { usePromoCodes } from "@/hooks/use-promo-codes";
import { CreatePromoCodeDTO, UpdatePromoCodeDTO } from "@/dtos/promo-code";
import { PromoCode } from "@/models/promo-code";

interface PromotionFormProps {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  promoToEdit?: PromoCode | null;
}

const PromotionFormPage: React.FC<PromotionFormProps> = ({
  setShowForm,
  promoToEdit,
}) => {
  const { createPromoCode, updatePromoCode } = usePromoCodes();
  const isEditMode = !!promoToEdit;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PromotionFormData>({
    resolver: zodResolver(promotionSchema),
  });

  useEffect(() => {
    if (isEditMode && promoToEdit) {
      reset({
        name: promoToEdit.name,
        description: promoToEdit.description,
        code: promoToEdit.code,
        country: promoToEdit.country,
        discount: promoToEdit.discount,
        discountType: promoToEdit.discountType,
        expiryDate: new Date(promoToEdit.expiryDate.iso)
          .toISOString()
          .split("T")[0],
        quantity: promoToEdit.quantity,
        serviceType: promoToEdit.serviceType,
        isActive: promoToEdit.isActive,
      });
    } else {
      reset({
        name: "",
        description: "",
        code: "",
        country: "",
        discount: 0,
        discountType: "percentage",
        expiryDate: "",
        quantity: 1,
        serviceType: "tour",
        isActive: true,
      });
    }
  }, [isEditMode, promoToEdit, reset]);

  const handleFormSubmit = async (data: PromotionFormData) => {
    const commonData = {
      ...data,
      isActive: data.isActive ?? true,
      expiryDate: {
        __type: "Date" as const,
        iso: new Date(data.expiryDate).toISOString(),
      },
    };

    if (isEditMode && promoToEdit) {
      const promoCodeData: UpdatePromoCodeDTO = commonData;
      await updatePromoCode(promoToEdit.objectId, promoCodeData);
    } else {
      const promoCodeData: CreatePromoCodeDTO = commonData;
      await createPromoCode(promoCodeData);
    }
    setShowForm(false);
  };

  return (
    <div className="flex-1 p-6">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-white rounded-2xl drop-shadow-xl flex flex-col gap-6"
      >
        <div className="border-b-2 border-[#0D2E61] p-6">
          <p className="text-[#3D3D3DCC] text-[15px] mb-1">
            {isEditMode ? "EDIT PROMOTION" : "ADD NEW PROMOTION"}
          </p>
        </div>

        <div className="space-y-6 px-8 pb-8">
          <div className="text-[30px] text-[#0D2E61]">Promotion Details</div>
          <div>
            <Label
              htmlFor="name"
              className="text-[20px] font-semibold text-[#000000B2] mb-2 block"
            >
              Promotion Name
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="e.g. First Booking Discount"
              className="bg-[#00000008] h-[59px] text-[19px] text-[#000000B2] rounded-xl p-6 border-0 focus-visible:ring-1"
            />
            {errors.name && (
              <p className="text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor="description"
              className="text-[20px] font-semibold text-[#000000B2] mb-2 block"
            >
              Promotion Details
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="e.g. For all first-time bookings"
              className="bg-[#00000008] text-[19px] text-[#000000B2] rounded-xl p-6 border-0 focus-visible:ring-1 min-h-[130px]"
            />
            {errors.description && (
              <p className="text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="serviceType"
                className="text-[20px] font-semibold text-[#000000B2] mb-2 block"
              >
                For
              </Label>
              <Controller
                name="serviceType"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-[#00000008] h-[59px] text-[19px] text-[#000000B2] rounded-xl p-6 border-0 focus-visible:ring-1">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tour">Tour</SelectItem>
                      <SelectItem value="meal">Meal</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.serviceType && (
                <p className="text-red-500 mt-1">
                  {errors.serviceType.message}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="country"
                className="text-[20px] font-semibold text-[#000000B2] mb-2 block"
              >
                Country
              </Label>
              <Input
                id="country"
                {...register("country")}
                placeholder="e.g. Egypt"
                className="bg-[#00000008] h-[59px] text-[19px] text-[#000000B2] rounded-xl p-6 border-0 focus-visible:ring-1"
              />
              {errors.country && (
                <p className="text-red-500 mt-1">{errors.country.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label
              htmlFor="promotionCode"
              className="text-[20px] font-semibold text-[#000000B2] mb-2 block"
            >
              Promotion Code
            </Label>
            <Input
              id="promotionCode"
              {...register("code")}
              placeholder="e.g. FIRSTBOOKING10"
              className="bg-[#00000008] h-[59px] text-[19px] text-[#000000B2] rounded-xl p-6 border-0 focus-visible:ring-1"
            />
            {errors.code && (
              <p className="text-red-500 mt-1">{errors.code.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label
                htmlFor="quantity"
                className="text-[20px] font-semibold text-[#000000B2] mb-2 block"
              >
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                {...register("quantity")}
                placeholder="e.g. 100"
                className="bg-[#00000008] h-[59px] text-[19px] text-[#000000B2] rounded-xl p-6 border-0 focus-visible:ring-1"
              />
              {errors.quantity && (
                <p className="text-red-500 mt-1">{errors.quantity.message}</p>
              )}
            </div>
            <div>
              <Label
                htmlFor="expirationDate"
                className="text-[20px] font-semibold text-[#000000B2] mb-2 block"
              >
                Expiration Date
              </Label>
              <Input
                id="expirationDate"
                type="date"
                {...register("expiryDate")}
                className="bg-[#00000008] h-[59px] text-[19px] text-[#000000B2] rounded-xl p-6 border-0 focus-visible:ring-1"
              />
              {errors.expiryDate && (
                <p className="text-red-500 mt-1">{errors.expiryDate.message}</p>
              )}
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-grow">
                <Label
                  htmlFor="discount"
                  className="text-[20px] font-semibold text-[#000000B2] mb-2 block"
                >
                  Discount
                </Label>
                <Input
                  id="discount"
                  type="number"
                  {...register("discount")}
                  placeholder="e.g. 10"
                  className="bg-[#00000008] h-[59px] text-[19px] text-[#000000B2] rounded-xl p-6 border-0 focus-visible:ring-1"
                />
              </div>
              <Controller
                name="discountType"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-[#00000008] h-[59px] w-[120px] text-[19px] text-[#000000B2] rounded-xl p-6 border-0 focus-visible:ring-1">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">%</SelectItem>
                      <SelectItem value="amount">$</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {errors.discount && (
              <p className="text-red-500 mt-1">{errors.discount.message}</p>
            )}
            {errors.discountType && (
              <p className="text-red-500 mt-1">{errors.discountType.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between space-x-4 pt-6 border-t border-gray-200 p-8">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => setShowForm(false)}
            className="px-6 py-2 text-[16px] bg-[#3D3D3D80] hover:text-white hover:bg-gray-500 text-white h-[48px] rounded-xl"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            size="lg"
            className="px-6 py-2 text-[16px] bg-[#FB8B24] hover:bg-orange-500 text-white h-[48px] rounded-xl"
          >
            {isEditMode ? "Save Changes" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PromotionFormPage;
