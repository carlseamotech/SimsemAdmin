"use client";
import { useAuth } from "@/context/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import ProfileImage from "../../../public/common/profile-image.svg";
import { updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const profileSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters"),
  photoURL: z.string().url().optional(),
});

const ProfileForm = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, `profile-images/${user?.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      setValue("photoURL", photoURL);
    }
  };

  const onSubmit = async (data: { displayName: string; photoURL?: string }) => {
    if (user) {
      setIsLoading(true);
      try {
        await updateProfile(user, {
          displayName: data.displayName,
          photoURL: data.photoURL,
        });
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
      <div className="flex items-center space-x-6">
        <Avatar className="h-24 w-24">
          <Image
            src={user?.photoURL || ProfileImage}
            alt="Profile"
            width={96}
            height={96}
            className="rounded-full"
          />
          <AvatarFallback>
            {user?.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="photoURL">Profile Picture</Label>
          <Input id="photoURL" type="file" onChange={handleImageUpload} />
        </div>
      </div>
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
