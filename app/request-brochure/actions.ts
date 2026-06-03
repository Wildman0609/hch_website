"use server";

import { redirect } from "next/navigation";
import { formValue, submitBrochureRequest } from "@/lib/enquiries";

export async function requestPrintedBrochure(formData: FormData) {
  await submitBrochureRequest({
    name: formValue(formData, "name"),
    email: formValue(formData, "email"),
    phone: formValue(formData, "phone"),
    postalAddress: formValue(formData, "postalAddress"),
    preferredHome: formValue(formData, "preferredHome"),
    careType: formValue(formData, "careType"),
    urgency: formValue(formData, "urgency"),
    message: formValue(formData, "message")
  });

  redirect("/thank-you/brochure-request");
}
