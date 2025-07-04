"use client";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { acceptInvite } from "@/services/teams";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const acceptInviteSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const AcceptInvitePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(acceptInviteSchema),
  });

  const onSubmit = async (data: { password: string }) => {
    if (token) {
      setIsLoading(true);
      try {
        await acceptInvite(token, data.password);
        toast.success("Invitation accepted successfully!");
        router.push("/");
      } catch (error) {
        toast.error("Failed to accept invitation.");
        console.error("Error accepting invite:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!token) {
    return <div>Invalid invite token.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Accept Invitation</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className="mt-1"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              "Accept Invitation"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AcceptInvitePage;
