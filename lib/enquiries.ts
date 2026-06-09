import { submitWebsiteSubmission } from "@/lib/websiteSubmissions";

export type BrochureRequestInput = {
  name: string;
  email: string;
  phone: string;
  postalAddress: string;
  preferredHome: string;
  careType: string;
  urgency: string;
  message: string;
};

export type CareCallbackInput = {
  source: string;
  name: string;
  email: string;
  phone: string;
  preferredHome?: string;
  careType?: string;
  urgency?: string;
  message?: string;
};

export type PrintAndPostProvider = {
  sendBrochure(request: BrochureRequestInput): Promise<void>;
};

export type EnquiryProvider = {
  sendCallback(request: CareCallbackInput): Promise<void>;
};

export async function submitBrochureRequest(
  request: BrochureRequestInput,
  provider?: PrintAndPostProvider
) {
  if (provider) {
    await provider.sendBrochure(request);
    return { status: "sent_to_print_provider" as const };
  }

  await submitWebsiteSubmission({
    kind: "brochure_request",
    source: "request-brochure",
    name: request.name,
    email: request.email,
    phone: request.phone,
    preferredHome: request.preferredHome,
    careType: request.careType,
    urgency: request.urgency,
    message: request.message,
    postalAddress: request.postalAddress
  });

  return { status: "sent_to_crm" as const };
}

export async function submitCareCallback(
  request: CareCallbackInput,
  provider?: EnquiryProvider
) {
  if (provider) {
    await provider.sendCallback(request);
    return { status: "sent_to_enquiry_provider" as const };
  }

  await submitWebsiteSubmission({
    kind: request.source === "find-the-right-care" ? "care_guidance" : "care_enquiry",
    source: request.source,
    name: request.name,
    email: request.email,
    phone: request.phone,
    preferredHome: request.preferredHome,
    careType: request.careType,
    urgency: request.urgency,
    message: request.message
  });

  return { status: "sent_to_crm" as const };
}

export function formValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}
