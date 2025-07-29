"use client";
import React from "react";
import MultiFileUploader from "@/components/common/multi-file-uploader";

const Step5CoverPhoto: React.FC = () => {
  return (
    <MultiFileUploader name="galleryImageUrls" label="Add Photos" />
  );
};

export default Step5CoverPhoto;
