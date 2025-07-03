import { z } from "zod";

export const hostSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  status: z.string(),
  about: z.string().min(10, "About section must be at least 10 characters"),
  contact: z.object({
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
  }),
  language: z.object({
    firstLanguage: z.string().min(1, "First language is required"),
    languageLevel: z.enum(["Beginner", "Intermediate", "Advance", "Native"]),
  }),
  paymentInfo: z.object({
    bankName: z.string().min(2, "Bank name is required"),
    bankAddress: z.string().min(5, "Bank address is required"),
    iban: z.string().min(15, "IBAN must be at least 15 characters"),
    swiftBankCode: z
      .string()
      .min(8, "Swift code must be at least 8 characters"),
    yourName: z.string().min(2, "Name is required"),
    phoneNumber: z.string().min(10, "Phone number is required"),
    yourAddress: z.string().min(5, "Address is required"),
  }),
});

export type HostFormData = z.infer<typeof hostSchema>;
