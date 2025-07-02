import { Header } from "@/components/common/header";
import { ComingSoon } from "@/components/common/coming-soon";

export default function PromotionsPage() {
  return (
    <>
      <Header title="Promotions" />
      <ComingSoon
        title="Promotions & Campaigns"
        description="Create and manage promotional campaigns to boost bookings. Coming soon!"
      />
    </>
  );
}
