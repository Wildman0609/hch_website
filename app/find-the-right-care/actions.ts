"use server";

import { redirect } from "next/navigation";
import { formValue, submitCareCallback } from "@/lib/enquiries";
import { trackedThankYouUrl } from "@/lib/marketing/serverTracking";
import { spamProtectionFromFormData } from "@/lib/spamProtection";

export async function requestCareGuidanceCallback(formData: FormData) {
  const preferredHome = formValue(formData, "preferredHome");

  await submitCareCallback(
    {
      source: "find-the-right-care",
      name: formValue(formData, "name"),
      email: formValue(formData, "email"),
      phone: formValue(formData, "phone"),
      preferredHome,
      careType: formValue(formData, "careType"),
      urgency: formValue(formData, "urgency"),
      message: formValue(formData, "message")
    },
    undefined,
    spamProtectionFromFormData(formData)
  );

  redirect(trackedThankYouUrl("find-care-result", {
    formType: "care enquiry",
    careHomeName: preferredHome
  }));
}
