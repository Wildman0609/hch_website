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

  return { status: "queued_for_manual_follow_up" as const };
}

export async function submitCareCallback(
  request: CareCallbackInput,
  provider?: EnquiryProvider
) {
  if (provider) {
    await provider.sendCallback(request);
    return { status: "sent_to_enquiry_provider" as const };
  }

  return { status: "queued_for_manual_follow_up" as const };
}

export function formValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}
