import Header from "@/components/common/header";
import { ComingSoon } from "@/components/common/coming-soon";

const PaymentsPage = () => {
  return (
    <>
      <Header title="Payments" />
      <ComingSoon
        title="Payment Management"
        description="Handle payments, refunds, and financial reporting. Coming soon!"
      />
    </>
  );
};

export default PaymentsPage;
