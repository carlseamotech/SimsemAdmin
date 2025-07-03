"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  UseFormReturn,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import { HostFormData } from "./host-scema";

interface ContactLanguageSectionProps {
  form: UseFormReturn<HostFormData>;
  isEditing: boolean;
}

export function ContactLanguageSection({
  form,
  isEditing,
}: ContactLanguageSectionProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const contact = watch("contact");
  const language = watch("language");

  const contactFields = [
    { key: "city", label: "City", type: "text" },
    { key: "country", label: "Country", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "phone", label: "Phone Number", type: "tel" },
  ] as const;

  const languages = ["English", "Turkish", "Arabic", "Spanish", "French"];
  const levels = ["Beginner", "Intermediate", "Advance", "Native"] as const;

  const getErrorMessage = (
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  ): string => {
    return typeof error?.message === "string" ? error.message : "";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Contact */}
      <Card className="bg-[#3D3D3D0D] border-none p-0">
        <CardContent className="p-6">
          <h3 className="text-[24px] font-bold text-[#0D2E61] mb-3">Contact</h3>

          <div className="space-y-4">
            {contactFields.map(({ key, label, type }) => (
              <div
                className={`gap-2 flex ${
                  isEditing ? "  flex-col" : " flex-row"
                }`}
                key={key}
              >
                <Label className="text-[20px] text-[#3D3D3D] ">{label}:</Label>

                {isEditing ? (
                  <div>
                    <Input
                      type={type}
                      {...register(`contact.${key}`)}
                      className=" bg-white h-[59px] rounded-xl  focus-visible:ring-0"
                    />
                    {getErrorMessage(errors.contact?.[key]) && (
                      <p className="text-red-500 text-sm mt-1 ">
                        {getErrorMessage(errors.contact?.[key])}
                      </p>
                    )}
                  </div>
                ) : (
                  <span className={` text-[20px] font-bold text-[#3D3D3D] `}>
                    {contact?.[key]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Language */}
      <Card className="bg-[#3D3D3D0D] border-none p-0">
        <CardContent className="p-6">
          <h3 className="text-[24px] font-bold text-[#0D2E61] mb-3">
            Language
          </h3>
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2">
              <Label className="text-[20px] text-[#3D3D3D] col-span-2 md:col-span-1 ">
                First Language:
              </Label>

              {isEditing ? (
                <div className="col-span-2 md:col-span-3">
                  <Select
                    value={language.firstLanguage}
                    onValueChange={(value) =>
                      setValue("language.firstLanguage", value)
                    }
                  >
                    <SelectTrigger className="cursor-pointer w-full bg-white py-7 rounded-xl">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>

                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {getErrorMessage(errors.language?.firstLanguage) && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.language?.firstLanguage)}
                    </p>
                  )}
                </div>
              ) : (
                <span className=" text-[20px] font-bold text-[#3D3D3D]">
                  {language.firstLanguage}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2 ">
              <Label className="text-[20px] text-[#3D3D3D] col-span-2 md:col-span-1">
                Language Level:
              </Label>

              {isEditing ? (
                <div className="col-span-2 md:col-span-3">
                  <Select
                    value={language.languageLevel}
                    onValueChange={(
                      value: HostFormData["language"]["languageLevel"]
                    ) => setValue("language.languageLevel", value)}
                  >
                    <SelectTrigger className="cursor-pointer w-full bg-white py-7 rounded-xl">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>

                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {getErrorMessage(errors.language?.languageLevel) && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.language?.languageLevel)}
                    </p>
                  )}
                </div>
              ) : (
                <span className=" text-[20px] font-bold text-[#3D3D3D]">
                  {language.languageLevel}
                </span>
              )}
            </div>

            {isEditing && (
              <div>
                <span className="text-[#FB8B24] text-[20px] font-medium cursor-pointer hover:underline">
                  +Add Language
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
