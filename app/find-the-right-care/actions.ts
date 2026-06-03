"use server";

import { redirect } from "next/navigation";
import { formValue, submitCareCallback } from "@/lib/enquiries";

export async function requestCareGuidanceCallback(formData: FormData) {
  await submitCareCallback({
    source: "find-the-right-care",
    name: formValue(formData, "name"),
    email: formValue(formData, "email"),
    phone: formValue(formData, "phone"),
    preferredHome: formValue(formData, "preferredHome"),
    careType: formValue(formData, "careType"),
    urgency: formValue(formData, "urgency"),
    message: formValue(formData, "message")
  });

  redirect("/thank-you/find-care-result");
}
