"use client";

import { CountryDropdown } from "@/components/common/country-dropdown";
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
import { Controller } from "react-hook-form";
import { HostFormData } from "./host-scema";
import { useCountries } from "@/hooks/use-countries";
import { LanguageDropdown } from "@/components/common/language-dropdown";
import { useLanguages } from "@/hooks/use-languages";

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
    control,
    watch,
    formState: { errors },
  } = form;

  const { countries } = useCountries();
  const { languages } = useLanguages();
  const countryId = watch("country");
  const countryName =
    countries.find((c) => c.objectId === countryId)?.name || countryId;

  const firstLanguageId = watch("firstLanguage");
  const firstLanguageName =
    languages.find((l) => l.objectId === firstLanguageId)?.name ||
    firstLanguageId;

  const secondLanguageId = watch("secondLanguage");
  const secondLanguageName =
    languages.find((l) => l.objectId === secondLanguageId)?.name ||
    secondLanguageId;

  const thirdLanguageId = watch("thirdLanguage");
  const thirdLanguageName =
    languages.find((l) => l.objectId === thirdLanguageId)?.name ||
    thirdLanguageId;

  const contactFields = [
    { key: "city", label: "City", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "phone", label: "Phone Number", type: "tel" },
  ] as const;

  const levels = ["Beginner", "Intermediate", "Advanced", "Native"] as const;

  const getErrorMessage = (
    error:
      | FieldError
      | Merge<FieldError, FieldErrorsImpl<HostFormData>>
      | undefined
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
            <div
              className={`gap-2 flex ${isEditing ? "flex-col" : "flex-row"}`}
            >
              <Label className="text-[20px] text-[#3D3D3D]">Country:</Label>
              {isEditing ? (
                <CountryDropdown
                  control={control}
                  name="country"
                  label=""
                />
              ) : (
                <span className="text-[20px] font-bold text-[#3D3D3D]">
                  {countryName}
                </span>
              )}
            </div>
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
                      {...register(key)}
                      className=" bg-white h-[59px] rounded-xl  focus-visible:ring-0"
                    />
                    {getErrorMessage(errors[key]) && (
                      <p className="text-red-500 text-sm mt-1 ">
                        {getErrorMessage(errors[key])}
                      </p>
                    )}
                  </div>
                ) : (
                  <span className={` text-[20px] font-bold text-[#3D3D3D] `}>
                    {watch(key)}
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
            {/* First Language */}
            <div className="grid grid-cols-4 gap-2">
              <Label className="text-[20px] text-[#3D3D3D] col-span-2 md:col-span-1 ">
                First Language:
              </Label>
              {isEditing ? (
                <div className="col-span-2 md:col-span-3">
                  <LanguageDropdown
                    control={control}
                    name="firstLanguage"
                    label=""
                  />
                  {getErrorMessage(errors.firstLanguage) && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.firstLanguage)}
                    </p>
                  )}
                </div>
              ) : (
                <span className=" text-[20px] font-bold text-[#3D3D3D]">
                  {firstLanguageName}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2 ">
              <Label className="text-[20px] text-[#3D3D3D] col-span-2 md:col-span-1">
                Language Level:
              </Label>
              {isEditing ? (
                <div className="col-span-2 md:col-span-3">
                  <Controller
                    name="firstLanguageLevel"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
                    )}
                  />
                  {getErrorMessage(errors.firstLanguageLevel) && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.firstLanguageLevel)}
                    </p>
                  )}
                </div>
              ) : (
                <span className=" text-[20px] font-bold text-[#3D3D3D]">
                  {watch("firstLanguageLevel")}
                </span>
              )}
            </div>

            {/* Second Language */}
            <div className="grid grid-cols-4 gap-2">
              <Label className="text-[20px] text-[#3D3D3D] col-span-2 md:col-span-1 ">
                Second Language:
              </Label>
              {isEditing ? (
                <div className="col-span-2 md:col-span-3">
                  <LanguageDropdown
                    control={control}
                    name="secondLanguage"
                    label=""
                  />
                </div>
              ) : (
                <span className=" text-[20px] font-bold text-[#3D3D3D]">
                  {secondLanguageName}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2 ">
              <Label className="text-[20px] text-[#3D3D3D] col-span-2 md:col-span-1">
                Language Level:
              </Label>
              {isEditing ? (
                <div className="col-span-2 md:col-span-3">
                  <Controller
                    name="secondLanguageLevel"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
                    )}
                  />
                </div>
              ) : (
                <span className=" text-[20px] font-bold text-[#3D3D3D]">
                  {watch("secondLanguageLevel")}
                </span>
              )}
            </div>

            {/* Third Language */}
            <div className="grid grid-cols-4 gap-2">
              <Label className="text-[20px] text-[#3D3D3D] col-span-2 md:col-span-1 ">
                Third Language:
              </Label>
              {isEditing ? (
                <div className="col-span-2 md:col-span-3">
                  <LanguageDropdown
                    control={control}
                    name="thirdLanguage"
                    label=""
                  />
                </div>
              ) : (
                <span className=" text-[20px] font-bold text-[#3D3D3D]">
                  {thirdLanguageName}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2 ">
              <Label className="text-[20px] text-[#3D3D3D] col-span-2 md:col-span-1">
                Language Level:
              </Label>
              {isEditing ? (
                <div className="col-span-2 md:col-span-3">
                  <Controller
                    name="thirdLanguageLevel"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onValue-change={field.onChange}
                        defaultValue={field.value}
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
                    )}
                  />
                </div>
              ) : (
                <span className=" text-[20px] font-bold text-[#3D3D3D]">
                  {watch("thirdLanguageLevel")}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

