"use client";

import { useEffect } from "react";
import type { ThankYouType } from "@/data/admissions";
import type { MarketingEventName, MetaEventName } from "@/lib/marketing/events";
import { trackEvent } from "@/lib/marketing/tracking";

type FormSuccessTrackingProps = {
  thankYouType: ThankYouType;
  submitted: boolean;
  eventId?: string;
  formType?: string;
  careHomeName?: string;
};

const trackedSubmissionStoragePrefix = "hch_tracked_submission_";

export function FormSuccessTracking({
  thankYouType,
  submitted,
  eventId,
  formType,
  careHomeName
}: FormSuccessTrackingProps) {
  useEffect(() => {
    if (!submitted || !eventId) return;
    if (hasTrackedSubmission(eventId)) return;

    const eventName = eventNameForThankYou(thankYouType);
    trackEvent(eventName, {
      event_id: eventId,
      form_type: formType || defaultFormType(thankYouType),
      care_home_name: careHomeName,
      meta_event_name: metaEventForThankYou(thankYouType),
      interaction_type: "form_submit"
    });

    markSubmissionTracked(eventId);
  }, [careHomeName, eventId, formType, submitted, thankYouType]);

  return null;
}

function eventNameForThankYou(thankYouType: ThankYouType): MarketingEventName {
  if (thankYouType === "brochure-request") return "brochure_request";
  if (thankYouType === "viewing-request") return "viewing_request";
  return "lead_form_submit";
}

function metaEventForThankYou(thankYouType: ThankYouType): MetaEventName {
  if (thankYouType === "viewing-request") return "Schedule";
  return "Lead";
}

function defaultFormType(thankYouType: ThankYouType) {
  if (thankYouType === "brochure-request") return "brochure request";
  if (thankYouType === "viewing-request") return "book a viewing";
  if (thankYouType === "find-care-result") return "care enquiry";
  if (thankYouType === "urgent-help-request") return "care enquiry";
  return "general enquiry";
}

function hasTrackedSubmission(eventId: string) {
  try {
    return window.sessionStorage.getItem(`${trackedSubmissionStoragePrefix}${eventId}`) === "1";
  } catch {
    return false;
  }
}

function markSubmissionTracked(eventId: string) {
  try {
    window.sessionStorage.setItem(`${trackedSubmissionStoragePrefix}${eventId}`, "1");
  } catch {
    // Deduplication is best-effort only.
  }
}

