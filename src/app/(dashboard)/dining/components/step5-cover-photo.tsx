"use client";
import SingleFileUploader from "@/components/common/single-file-uploader";

const Step5CoverPhoto = () => {
  return (
    <div className="space-y-4">
      <SingleFileUploader name="coverImageUrl" label="Cover Photo" accept="image/*" />
    </div>
  );
};

export default Step5CoverPhoto;