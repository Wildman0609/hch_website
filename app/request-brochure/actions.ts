"use server";

import { redirect } from "next/navigation";
import { formValue, submitBrochureRequest } from "@/lib/enquiries";
import { trackedThankYouUrl } from "@/lib/marketing/serverTracking";
import { spamProtectionFromFormData } from "@/lib/spamProtection";

export async function requestPrintedBrochure(formData: FormData) {
  const preferredHome = formValue(formData, "preferredHome");

  await submitBrochureRequest(
    {
      name: formValue(formData, "name"),
      email: formValue(formData, "email"),
      phone: formValue(formData, "phone"),
      postalAddress: formValue(formData, "postalAddress"),
      preferredHome,
      careType: formValue(formData, "careType"),
      urgency: formValue(formData, "urgency"),
      message: formValue(formData, "message")
    },
    undefined,
    spamProtectionFromFormData(formData)
  );

  redirect(trackedThankYouUrl("brochure-request", {
    formType: "brochure request",
    careHomeName: preferredHome
  }));
}
