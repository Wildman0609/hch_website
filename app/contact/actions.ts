"use server";

import { redirect } from "next/navigation";
import { formValue } from "@/lib/enquiries";
import { trackedThankYouUrl } from "@/lib/marketing/serverTracking";
import { spamProtectionFromFormData } from "@/lib/spamProtection";
import { submitWebsiteSubmission } from "@/lib/websiteSubmissions";

const thankYouTypes = [
  "general-enquiry",
  "viewing-request",
  "urgent-help-request"
] as const;

type EnquiryThankYouType = (typeof thankYouTypes)[number];

function isThankYouType(value: string): value is EnquiryThankYouType {
  return thankYouTypes.includes(value as EnquiryThankYouType);
}

function resolveThankYouType(formData: FormData): EnquiryThankYouType {
  const explicit = formValue(formData, "thankYouType");
  if (isThankYouType(explicit)) return explicit;

  const source = formValue(formData, "source").toLowerCase();
  const urgency = formValue(formData, "urgency").toLowerCase();
  if (source.includes("viewing") || urgency.includes("viewing")) return "viewing-request";
  if (source.includes("urgent") || urgency.includes("urgent")) return "urgent-help-request";
  return "general-enquiry";
}

function resolveFormType(formData: FormData, thankYouType: EnquiryThankYouType) {
  if (thankYouType === "viewing-request") return "book a viewing";
  if (thankYouType === "urgent-help-request") return "care enquiry";

  const source = formValue(formData, "source").toLowerCase();
  if (source.includes("home-") || source.includes("service-")) return "care enquiry";
  if (source === "contact") return "contact form";
  return "general enquiry";
}

export async function submitCareEnquiry(formData: FormData) {
  const thankYouType = resolveThankYouType(formData);
  const formType = resolveFormType(formData, thankYouType);
  const preferredHome = formValue(formData, "preferredHome");
  const spamProtection = spamProtectionFromFormData(formData);

  await submitWebsiteSubmission({
    kind: "care_enquiry",
    source: formValue(formData, "source") || "website-enquiry",
    name: formValue(formData, "name"),
    email: formValue(formData, "email"),
    phone: formValue(formData, "phone"),
    preferredHome,
    careType: formValue(formData, "careType"),
    urgency: formValue(formData, "urgency"),
    message: formValue(formData, "message"),
    pageUrl: spamProtection.pageUrl
  }, { spamProtection });

  redirect(trackedThankYouUrl(thankYouType, {
    formType,
    careHomeName: preferredHome
  }));
}
