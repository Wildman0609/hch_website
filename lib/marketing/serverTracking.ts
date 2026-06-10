import { randomUUID } from "node:crypto";
import type { ThankYouType } from "@/data/admissions";

export type TrackedThankYouOptions = {
  formType: string;
  careHomeName?: string;
};

export function trackedThankYouUrl(
  thankYouType: ThankYouType,
  { formType, careHomeName }: TrackedThankYouOptions
) {
  const params = new URLSearchParams({
    submitted: "1",
    event_id: `${thankYouType}_${randomUUID()}`,
    form_type: formType
  });

  if (careHomeName) {
    params.set("care_home_name", careHomeName);
  }

  return `/thank-you/${thankYouType}?${params.toString()}`;
}

