"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UseFormReturn } from "react-hook-form";
import { HostFormData } from "./host-scema";
import Image from "next/image";
import PaymentIcon from "../../../../../public/hosts-icons/payment-icon.svg";

import { UpdatePaymentDialog } from "./update-payment-dialog";
import { HostPayment } from "@/models/host";

interface PaymentInfoSectionProps {
  form: UseFormReturn<HostFormData>;
  isEditing: boolean;
  hostId: string;
  payment: HostPayment;
}

export function PaymentInfoSection({
  form,
  isEditing,
  hostId,
  payment,
}: PaymentInfoSectionProps) {
  const {
    register,
    formState: { errors },
  } = form;

  const paymentFields = [
    { key: "bankName", label: "Bank Name", icon: PaymentIcon },
    { key: "bankAddress", label: "Bank Address", icon: PaymentIcon },
    { key: "iban", label: "IBAN", icon: PaymentIcon },
    { key: "swiftOrBic", label: "Swift or Bic", icon: PaymentIcon },
    { key: "fullName", label: "Full Name", icon: PaymentIcon },
    { key: "address", label: "Address", icon: PaymentIcon },
  ] as const;
  return (
    <Card className="bg-[#3D3D3D0D] border-none p-0">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[24px] font-bold text-[#0D2E61]">
            Payment Info
          </h3>
          {!isEditing && (
            <UpdatePaymentDialog hostId={hostId} payment={payment} />
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {isEditing ? (
            paymentFields.map(({ key, label }) => (
              <div key={key} className="space-y-2">
                <Label className="text-[20px] font-bold text-[#000000B2]">
                  {label}:
                </Label>
                <div>
                  <Input
                    className="bg-white p-4 h-[59px] rounded-xl border-0 focus-visible:ring-1"
                    {...register(`paymentInfo.${key}`)}
                  />
                  {errors.paymentInfo?.[key] && (
                    <p className="text-red-500 text-sm">
                      {
                        (errors.paymentInfo?.[key] as { message?: string })
                          ?.message
                      }
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>
              <div className="relative">
                {paymentFields.map((field, index) => {
                  const IconComponent = field.icon;
                  const isLast = index === paymentFields.length - 1;
                  const value = payment[field.key];

                  return (
                    <div
                      key={field.key}
                      className="relative flex items-start pb-8 last:pb-0 gap-4"
                    >
                      {/* Timeline line */}
                      {!isLast && (
                        <div className="absolute left-[22px] top-8 w-0.5 h-full bg-gray-300 -translate-x-0.5" />
                      )}

                      {/* Icon */}
                      <div className="relative z-10 flex items-center justify-center w-[43px] h-[43px]">
                        <Image
                          src={IconComponent}
                          alt={`${field.label} icon`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="text-[18px] font-bold text-[#3D3D3D]">
                          {field.label}
                        </div>

                        <div className="text-[18px] text-[#3D3D3D]">
                          {value || "—"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
