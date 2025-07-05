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
import { DocumentUploadSection } from "@/app/(dashboard)/hosts/components/document-section";
import { ContactLanguageSection } from "@/app/(dashboard)/hosts/components/contact-section";
import { PaymentInfoDisplaySection } from "@/app/(dashboard)/hosts/components/payment-display-section";
import { DeleteHostDialog } from "@/app/(dashboard)/hosts/components/delete-host-dialog";
import {
  HostFormData,
  hostSchema,
} from "@/app/(dashboard)/hosts/components/host-scema";
import { useHost } from "@/hooks/use-hosts";
import { Skeleton } from "@/components/ui/skeleton";
import { UpdateHostDTO } from "@/services/hosts";

const HostSummaryPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { host, hostPayment, isLoading, updateHost } = useHost(
    id as string
  );

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
                          variant="default"
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

              {/* Host Status Section */}
              <Card className={`bg-[#3D3D3D0D]  border-none p-0 `}>
                <CardContent className="p-6 ">
                  <h3 className="text-[24px] font-bold text-[#0D2E61] mb-5">
                    Host Status
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[#3D3D3DCC] text-[15px]">
                        Tour Guide
                      </p>
                      <p className="text-[18px] font-bold text-[#0D2E61]">
                        {host.isTourGuide ? "Yes" : "No"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#3D3D3DCC] text-[15px]">
                        Family Host
                      </p>
                      <p className="text-[18px] font-bold text-[#0D2E61]">
                        {host.isFamilyHost ? "Yes" : "No"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#3D3D3DCC] text-[15px]">
                        Local Seller
                      </p>
                      <p className="text-[18px] font-bold text-[#0D2E61]">
                        {host.isLocalSeller ? "Yes" : "No"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#3D3D3DCC] text-[15px]">Rating</p>
                      <p className="text-[18px] font-bold text-[#0D2E61]">
                        {host.rating}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#3D3D3DCC] text-[15px]">
                        Tours Completed
                      </p>
                      <p className="text-[18px] font-bold text-[#0D2E61]">
                        {host.toursCompleted}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#3D3D3DCC] text-[15px]">
                        Food Served
                      </p>
                      <p className="text-[18px] font-bold text-[#0D2E61]">
                        {host.foodServed}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#3D3D3DCC] text-[15px]">
                        Last Active
                      </p>
                      <p className="text-[18px] font-bold text-[#0D2E61]">
                        {new Date(host.lastActive.iso).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#3D3D3DCC] text-[15px]">
                        Profile Complete
                      </p>
                      <p className="text-[18px] font-bold text-[#0D2E61]">
                        {host.isProfileComplete ? "Yes" : "No"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#3D3D3DCC] text-[15px]">
                        Active Status
                      </p>
                      <p className="text-[18px] font-bold text-[#0D2E61]">
                        {host.isActive ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Document */}
              <DocumentUploadSection
                isEditing={isEditing}
                idBackFileUrl={host.idBackFileUrl}
                idFrontFileUrl={host.idFrontFileUrl}
              />

              {/* Contact & Language */}
              <ContactLanguageSection form={form} isEditing={isEditing} />

              <div className="flex justify-between pt-4">
                {!isEditing ? (
                  <>
                    <div className="space-x-3">
                      <Button
                        type="button"
                        size="lg"
                        variant="outline"
                        onClick={() => router.back()}
                        disabled={isSubmitting}
                        className="text-[17px] font-bold"
                      >
                        Decline
                      </Button>
                      <DeleteHostDialog
                        hostId={host.objectId}
                        hostName={host.name}
                        hostPhone={host.phone}
                      />
                    </div>
                    <div className="space-x-3">
                      <Button
                        size="lg"
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        disabled={isSubmitting}
                        className="text-[17px] font-bold bg-[#3D3D3D4D] text-[#000000B2]"
                      >
                        Edit
                      </Button>
                      <Button
                        size="lg"
                        type="button"
                        className="text-[17px] font-bold bg-[#FB8B24] text-[#FFFFFF] hover:bg-orange-500"
                        onClick={handleApprove}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Approving..." : "Approve"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-end w-full space-x-3">
                    <Button
                      size="lg"
                      type="button"
                      variant="outline"
                      onClick={() => {
                        form.reset(host);
                        setIsEditing(false);
                      }}
                      disabled={isSubmitting}
                      className="text-[17px] font-bold bg-[#3D3D3D4D] text-[#000000B2]"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="lg"
                      type="submit"
                      className="text-[17px] font-bold bg-[#FB8B24] text-[#FFFFFF] hover:bg-orange-500"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save"}
                    </Button>
                  </div>
                )}
              </div>
            </form>

            {/* Payment Info */}
            {hostPayment && !isEditing && (
              <div className="pt-6">
                <PaymentInfoDisplaySection
                  hostId={id as string}
                  payment={hostPayment}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HostSummaryPage;
