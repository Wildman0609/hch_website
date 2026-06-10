"use client";

import type { MarketingEventName, MetaEventName } from "@/lib/marketing/events";

export type MarketingEventPayload = {
  event_id?: string;
  event_source?: string;
  page_url?: string;
  page_title?: string;
  care_home_name?: string;
  cta_label?: string;
  cta_id?: string;
  form_type?: string;
  link_url?: string;
  meta_event_name?: MetaEventName;
  interaction_type?: string;
  [key: string]: string | number | boolean | null | undefined;
};

type DataLayerValue =
  | Record<string, string | number | boolean | null | undefined>
  | unknown[];

declare global {
  interface Window {
    dataLayer?: DataLayerValue[];
    gtag?: (...args: unknown[]) => void;
  }
}

const recentEventsStorageKey = "hch_recent_marketing_events";
const maxRecentEvents = 30;

export function trackEvent(
  eventName: MarketingEventName,
  payload: MarketingEventPayload = {}
) {
  if (typeof window === "undefined") return;

  try {
    const event = stripUndefined({
      ...payload,
      event: eventName,
      event_id: payload.event_id || createEventId(eventName),
      event_source: payload.event_source || "website",
      page_url: payload.page_url || window.location.href,
      page_title: payload.page_title || document.title,
      timestamp: new Date().toISOString()
    });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
    storeRecentEvent(event);

    if (process.env.NODE_ENV !== "production") {
      console.info("[HCH tracking]", eventName, event);
    }
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[HCH tracking] Event was not pushed", { eventName, error });
    }
  }
}

export function getRecentMarketingEvents() {
  if (typeof window === "undefined" || process.env.NODE_ENV === "production") {
    return [];
  }

  try {
    const raw = window.sessionStorage.getItem(recentEventsStorageKey);
    return raw ? (JSON.parse(raw) as Array<Record<string, unknown>>) : [];
  } catch {
    return [];
  }
}

function createEventId(eventName: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${eventName}_${crypto.randomUUID()}`;
  }

  return `${eventName}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function stripUndefined(
  input: Record<string, string | number | boolean | null | undefined>
) {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined && value !== "")
  );
}

function storeRecentEvent(event: Record<string, unknown>) {
  if (process.env.NODE_ENV === "production") return;

  try {
    const existing = getRecentMarketingEvents();
    const next = [event, ...existing].slice(0, maxRecentEvents);
    window.sessionStorage.setItem(recentEventsStorageKey, JSON.stringify(next));
  } catch {
    // Debug storage is best-effort only.
  }
}

