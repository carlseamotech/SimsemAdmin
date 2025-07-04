"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { HostFormData, hostSchema } from "./host-scema";

export function useHostForm(initialData: HostFormData) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<HostFormData>({
    resolver: zodResolver(hostSchema),
    defaultValues: initialData,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    form.reset(initialData);
    setIsEditing(false);
  };

  const handleSave = async (data: HostFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically save to your backend
      console.log("Saving data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      console.log("Approving host");
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error("Error approving host:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDecline = async () => {
    setIsSubmitting(true);
    try {
      console.log("Declining host");
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error("Error declining host:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isEditing,
    isSubmitting,
    handleEdit,
    handleCancel,
    handleSave,
    handleApprove,
    handleDecline,
  };
}
