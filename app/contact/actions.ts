"use server";

import { redirect } from "next/navigation";
import { formValue } from "@/lib/enquiries";
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

export async function submitCareEnquiry(formData: FormData) {
  const thankYouType = resolveThankYouType(formData);

  await submitWebsiteSubmission({
    kind: "care_enquiry",
    source: formValue(formData, "source") || "website-enquiry",
    name: formValue(formData, "name"),
    email: formValue(formData, "email"),
    phone: formValue(formData, "phone"),
    preferredHome: formValue(formData, "preferredHome"),
    careType: formValue(formData, "careType"),
    urgency: formValue(formData, "urgency"),
    message: formValue(formData, "message")
  });

  redirect(`/thank-you/${thankYouType}`);
}
