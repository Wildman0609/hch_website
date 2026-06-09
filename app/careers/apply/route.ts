import { NextResponse } from "next/server";
import { formValue } from "@/lib/enquiries";
import { submitWebsiteSubmission } from "@/lib/websiteSubmissions";

export async function POST(request: Request) {
  const formData = await request.formData();

  await submitWebsiteSubmission({
    kind: "careers_application",
    source: formValue(formData, "source") || "careers-application",
    name: formValue(formData, "name"),
    email: formValue(formData, "email"),
    phone: formValue(formData, "phone"),
    preferredHome: formValue(formData, "preferredHome"),
    role: formValue(formData, "role"),
    availability: formValue(formData, "availability"),
    message: formValue(formData, "message")
  });

  const redirectUrl = new URL("/thank-you", request.url);
  redirectUrl.searchParams.set("source", "careers-application");

  return NextResponse.redirect(redirectUrl, { status: 303 });
}
