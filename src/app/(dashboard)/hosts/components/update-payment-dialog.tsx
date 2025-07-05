"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useHost } from "@/hooks/use-hosts";
import { HostPayment } from "@/models/host";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const paymentSchema = z.object({
  type: z.string().min(1, "Type is required"),
  fullName: z.string().min(1, "Full name is required"),
  address: z.string().min(1, "Address is required"),
  bankName: z.string().min(1, "Bank name is required"),
  iban: z.string().min(1, "IBAN is required"),
  swiftOrBic: z.string().min(1, "SWIFT/BIC is required"),
  bankAddress: z.string().min(1, "Bank address is required"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface UpdatePaymentDialogProps {
  hostId: string;
  payment: HostPayment;
}

export const UpdatePaymentDialog = ({
  hostId,
  payment,
}: UpdatePaymentDialogProps) => {
  const [open, setOpen] = useState(false);
  const { updateHostPayment } = useHost(hostId);

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      type: payment.type || "IBAN",
      fullName: payment.fullName || "",
      address: payment.address || "",
      bankName: payment.bankName || "",
      iban: payment.iban || "",
      swiftOrBic: payment.swiftOrBic || "",
      bankAddress: payment.bankAddress || "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: PaymentFormData) => {
    try {
      await updateHostPayment(payment.objectId, data);
      toast.success("Payment information updated successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error updating payment info:", error);
      toast.error("Failed to update payment information.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Update Payment Info</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Payment Information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" {...register("fullName")} />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register("address")} />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="bankName">Bank Name</Label>
            <Input id="bankName" {...register("bankName")} />
            {errors.bankName && (
              <p className="text-red-500 text-sm">{errors.bankName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="iban">IBAN</Label>
            <Input id="iban" {...register("iban")} />
            {errors.iban && (
              <p className="text-red-500 text-sm">{errors.iban.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="swiftOrBic">SWIFT/BIC</Label>
            <Input id="swiftOrBic" {...register("swiftOrBic")} />
            {errors.swiftOrBic && (
              <p className="text-red-500 text-sm">
                {errors.swiftOrBic.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="bankAddress">Bank Address</Label>
            <Input id="bankAddress" {...register("bankAddress")} />
            {errors.bankAddress && (
              <p className="text-red-500 text-sm">
                {errors.bankAddress.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
