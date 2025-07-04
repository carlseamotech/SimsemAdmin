"use client";
import Header from "@/components/common/header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ProfileImage from "../../../../../public/common/profile-image.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { DocumentUploadSection } from "@/components/hosts/document-section";
import { ContactLanguageSection } from "@/components/hosts/contact-section";
import { PaymentInfoSection } from "@/components/hosts/payment-section";
import { HostFormData, hostSchema } from "@/components/hosts/host-scema";
import { useHost } from "@/hooks/use-hosts";
import { Skeleton } from "@/components/ui/skeleton";
import { UpdateHostDTO } from "@/services/hosts";

const HostSummaryPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { host, isLoading, updateHost } = useHost(id as string);

  const form = useForm<HostFormData>({
    resolver: zodResolver(hostSchema),
  });

  useEffect(() => {
    if (host) {
      form.reset(host);
    }
  }, [host, form]);

  if (isLoading) {
    return (
      <>
        <Header showBackButton onBack={() => router.back()} />
        <div className="flex-1 py-6 px-8">
          <div className="bg-white rounded-xl drop-shadow-lg flex flex-col gap-4 p-8">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="space-y-6 pt-8">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!host) {
    return <div className="p-6 text-red-500">Host not found.</div>;
  }

  const handleSave = async (data: HostFormData) => {
    setIsSubmitting(true);
    try {
      const updateDto: UpdateHostDTO = {
        name: data.name,
        about: data.about,
        city: data.city,
        country: data.country,
        email: data.email,
        phone: data.phone,
        firstLanguage: data.firstLanguage,
        firstLanguageLevel: data.firstLanguageLevel,
        secondLanguage: data.secondLanguage,
        secondLanguageLevel: data.secondLanguageLevel,
        thirdLanguage: data.thirdLanguage,
        thirdLanguageLevel: data.thirdLanguageLevel,
      };
      await updateHost(updateDto);
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
      await updateHost({ isVerified: true });
    } catch (error) {
      console.error("Error approving host:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const {
    watch,
    register,
    formState: { errors },
  } = form;
  const name = watch("name");
  const about = watch("about");

  return (
    <>
      {/* Header */}
      <Header showBackButton onBack={() => router.back()} />

      <div className="flex-1 py-6 px-8 ">
        <div className="bg-white rounded-xl  drop-shadow-lg  flex flex-col gap-4  ">
          <div className="text-[15px] border-b-2 border-[#0D2E61] text-[#3D3D3DCC] px-8 py-4 pb-6">
            HOSTS DETAILS
          </div>

          <div className="px-8 space-y-6">
            <h1 className="text-[30px] text-[#0D2E61] ">Hosts Summary</h1>

            <p className="text-[#000000B2] text-[17px] ">
              Review all the Hosts details and click confirm
            </p>
          </div>

          <div className="p-8">
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="space-y-6"
            >
              {/* Host Profile */}
              <Card className=" border-x-0 border-t-0 rounded-none shadow-none">
                <CardContent>
                  <div className="flex flex-col items-start gap-8">
                    <div className="flex flex-row items-center gap-6">
                      <Image
                        src={host.imageUrl || ProfileImage}
                        alt="Host Avatar"
                        width={80}
                        height={80}
                        className="rounded-full border object-cover"
                      />

                      {isEditing && (
                        <Button
                          variant="normal"
                          className="text-[#FFFFFF] flex items-center justify-center w-[132px] h-[30px] text-[13px] bg-[#5F0F40] rounded-full"
                        >
                          CHANGE PHOTO
                        </Button>
                      )}
                    </div>

                    <div>
                      <p className="text-[#3D3D3DCC] text-[15px]">Host Name</p>
                      <p className="text-[30px] font-bold text-[#0D2E61]">
                        {name}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About Section */}
              <Card className={`bg-[#3D3D3D0D]  border-none p-0 `}>
                <CardContent className="p-6 ">
                  <h3 className="text-[24px] font-bold text-[#0D2E61] mb-5">
                    About the Host
                  </h3>

                  {isEditing ? (
                    <div>
                      <Textarea
                        {...register("about")}
                        className="min-h-[100px] bg-[#FFFFFF] "
                        placeholder="Tell us about yourself..."
                      />
                      {errors.about && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.about.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-[#3D3D3D] text-[18px] leading-relaxed">
                      {about}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Document */}
              <DocumentUploadSection isEditing={isEditing} />

              {/* Contact & Language */}
              <ContactLanguageSection form={form} isEditing={isEditing} />

              {/* Payment  */}
              <PaymentInfoSection form={form} isEditing={isEditing} />

              {/* Action Buttons */}
              <div
                className={`flex  pt-4 ${
                  isEditing ? "justify-end" : "justify-between"
                }`}
              >
                {!isEditing && (
                  <Button
                    type="button"
                    size="lg"
                    variant="normal"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                    className={`text-[17px] font-bold  bg-[#9A031E] text-white  `}
                  >
                    Decline
                  </Button>
                )}

                <div className="space-x-3 ">
                  <Button
                    size="lg"
                    type="button"
                    variant={isEditing ? "normal" : "outline"}
                    onClick={() =>
                      isEditing
                        ? (form.reset(host), setIsEditing(false))
                        : setIsEditing(true)
                    }
                    disabled={isSubmitting}
                    className="text-[17px] font-bold bg-[#3D3D3D4D] text-[#000000B2]"
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>

                  <Button
                    size="lg"
                    type={isEditing ? "submit" : "button"}
                    className="text-[17px] font-bold  bg-[#FB8B24] text-[#FFFFFF]  hover:bg-orange-500"
                    onClick={!isEditing ? handleApprove : undefined}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Saving..."
                      : isEditing
                      ? "Save & Approve"
                      : "Approve"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostSummaryPage;
