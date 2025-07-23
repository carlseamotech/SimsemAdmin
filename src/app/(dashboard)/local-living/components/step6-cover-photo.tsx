"use client";
import React from "react";
import MultiImageUploader from "@/components/common/multi-image-uploader";

const Step5CoverPhoto: React.FC = () => {
  return (
    <MultiImageUploader name="galleryImageUrls" label="Add Photos" />
  );
};

export default Step5CoverPhoto;
