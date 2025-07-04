"use client";

import Header from "@/components/common/header";
import ProfileForm from "@/components/profile/profile-form";

const ProfilePage = () => {
  return (
    <>
      <Header title="Profile" />
      <div className="flex-1 py-6 px-8">
        <ProfileForm />
      </div>
    </>
  );
};

export default ProfilePage;
