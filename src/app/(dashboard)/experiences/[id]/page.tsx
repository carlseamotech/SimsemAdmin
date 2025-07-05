"use client";
import Header from "@/components/common/header";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const ExperienceIdPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab");

  if (!id) return <div>Missing ID</div>;
  if (!tab) return <div>Missing tab context</div>;

  const showBack =
    tab === "experience-library" ||
    tab === "dish-library" ||
    tab === "experiences";

  return (
    <>
      <div>
        <Header showBackButton={showBack} onBack={() => router.back()} />
      </div>

      {tab === "experiences" && <>exp {id}</>}
      {tab === "experience-library" && <>exp library {id}</>}
      {tab === "dish-library" && <>dishsssss library {id}</>}
    </>
  );
};

export default ExperienceIdPage;
