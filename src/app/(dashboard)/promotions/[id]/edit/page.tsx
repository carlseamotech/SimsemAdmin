"use client";
import { useParams } from "next/navigation";
import { usePromoCode } from "@/hooks/use-promo-code";
import PromotionForm from "@/app/(dashboard)/promotions/components/promotion-form";
import { PromotionFormSkeleton } from "@/app/(dashboard)/promotions/components/promotion-form-skeleton";
import Header from "@/components/common/header";

const EditPromotionPage = () => {
  const { id } = useParams();
  const { promoCode, isLoading } = usePromoCode(id as string);

  if (isLoading) {
    return <PromotionFormSkeleton />;
  }

  return (
    <>
      <Header title="Edit Promotion" />
      <PromotionForm promoToEdit={promoCode} />
    </>
  );
};

export default EditPromotionPage;
