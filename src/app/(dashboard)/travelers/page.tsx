"use client";
import Header from "@/components/common/header";
import { ComingSoon } from "@/components/common/coming-soon";

const TravelersPage = () => {
  return (
    <>
      <Header title="Travelers" />
      <ComingSoon
        title="Travelers Management"
        description="Manage traveler accounts and bookings. This feature is currently in development."
      />
    </>
  );
};

export default TravelersPage;
