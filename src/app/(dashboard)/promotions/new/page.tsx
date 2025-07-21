"use client";
import PromotionFormPage from "@/app/(dashboard)/promotions/components/promotion-form";
import Header from "@/components/common/header";

const NewPromotionPage = () => {
  return (
    <>
      <Header title="Add New Promotion" />
      <PromotionFormPage />
    </>
  );
};

export default NewPromotionPage;
