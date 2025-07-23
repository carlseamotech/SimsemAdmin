"use client";
import { useAuth } from "@/context/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { updateProfileSchema, UpdateProfileDTO } from "@/dtos/profile";
import { updateProfile } from "@/services/profile";
import SingleImageUploader from "@/components/common/single-image-uploader";

const ProfileForm = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileDTO>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  const onSubmit = async (data: UpdateProfileDTO) => {
    if (user) {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("sessionToken");
        if (!token) throw new Error("No session token found");
        await updateProfile(user.uid, data, token);
        toast.success("Profile updated successfully!");
      } catch (error) {
        toast.error("Failed to update profile.");
        console.error("Error updating profile:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SingleImageUploader name="photoURL" label="Profile Picture" />
      <div className="space-y-2">
        <Label htmlFor="displayName">Name</Label>
        <Input id="displayName" {...register("displayName")} />
        {errors.displayName && (
          <p className="text-red-500">{errors.displayName.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Save"}
      </Button>
    </form>
  );
};

export default ProfileForm;
