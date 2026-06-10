"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  careHomeFromPathname,
  careHomeFromTrackingSlug,
  findCareHomeByName
} from "@/lib/marketing/careHomes";
import type { MarketingEventName, MetaEventName } from "@/lib/marketing/events";
import { trackEvent } from "@/lib/marketing/tracking";

let lastTrackedPageKey = "";

export function MarketingTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const pageKey = pathname || "/";
    if (pageKey === lastTrackedPageKey) return;
    lastTrackedPageKey = pageKey;

    const timeout = window.setTimeout(() => {
      const currentHome = careHomeFromPathname(pageKey);
      if (currentHome) {
        trackEvent("home_page_view", {
          care_home_name: currentHome.name,
          meta_event_name: "ViewContent"
        });
        return;
      }

      if (pageKey === "/contact") {
        trackEvent("contact_page_view", {
          meta_event_name: "Contact"
        });
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    function handleTrackedClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const element = target.closest<HTMLElement>("a[href], button[data-cta], [data-track-event]");
      if (!element || element.closest("[data-tracking-ignore]")) return;

      const href = getHref(element);
      const ctaId = element.dataset.cta;
      const ctaLabel = getLabel(element);
      const careHomeName = inferCareHomeName(element, href, ctaId);
      const basePayload = {
        cta_id: ctaId,
        cta_label: ctaLabel,
        care_home_name: careHomeName,
        link_url: href
      };

      const eventName = resolveClickEvent(element, href, ctaId, ctaLabel);
      if (!eventName) return;

      trackEvent(eventName, {
        ...basePayload,
        meta_event_name: metaEventForClick(eventName),
        interaction_type: "cta_click"
      });
    }

    document.addEventListener("click", handleTrackedClick, { capture: true });
    return () => document.removeEventListener("click", handleTrackedClick, { capture: true });
  }, []);

  return null;
}

function resolveClickEvent(
  element: HTMLElement,
  href: string | undefined,
  ctaId: string | undefined,
  ctaLabel: string
): MarketingEventName | null {
  const explicit = element.dataset.trackEvent as MarketingEventName | undefined;
  if (explicit) return explicit;

  const combined = `${href ?? ""} ${ctaId ?? ""} ${ctaLabel}`.toLowerCase();
  if (href?.startsWith("tel:")) return "phone_click";
  if (href?.startsWith("mailto:")) return "email_click";
  if (isDirectionsLink(combined)) return "directions_click";
  if (isBookViewingCta(combined)) return "book_viewing_click";
  if (isBrochureCta(combined)) return "brochure_cta_click";
  if (isEnquiryCta(combined)) return "enquiry_cta_click";

  return null;
}

function metaEventForClick(eventName: MarketingEventName): MetaEventName | undefined {
  if (eventName === "book_viewing_click") return "Schedule";
  if (eventName === "brochure_cta_click") return "Lead";
  if (eventName === "phone_click" || eventName === "email_click" || eventName === "directions_click") {
    return "Contact";
  }
  if (eventName === "enquiry_cta_click") return "Contact";
  return undefined;
}

function getHref(element: HTMLElement) {
  if (element instanceof HTMLAnchorElement) return element.href;
  return element.getAttribute("href") || undefined;
}

function getLabel(element: HTMLElement) {
  const ariaLabel = element.getAttribute("aria-label");
  const text = ariaLabel || element.textContent || "";
  return text.replace(/\s+/g, " ").trim().slice(0, 140);
}

function inferCareHomeName(
  element: HTMLElement,
  href: string | undefined,
  ctaId: string | undefined
) {
  const explicit = element.dataset.careHome || element.closest<HTMLElement>("[data-care-home]")?.dataset.careHome;
  if (explicit) return explicit;

  const currentHome = careHomeFromPathname(window.location.pathname);
  if (currentHome) return currentHome.name;

  if (href) {
    const homeFromHref = inferCareHomeFromHref(href);
    if (homeFromHref) return homeFromHref;
  }

  if (ctaId) {
    return careHomeFromTrackingSlug(ctaId)?.name;
  }

  return undefined;
}

function inferCareHomeFromHref(href: string) {
  try {
    const url = new URL(href, window.location.origin);
    const homeParam = url.searchParams.get("home");
    if (homeParam) return findCareHomeByName(homeParam)?.name || homeParam;

    const pathHome = careHomeFromPathname(url.pathname);
    if (pathHome) return pathHome.name;

  } catch {
    return undefined;
  }

  return undefined;
}

function isDirectionsLink(value: string) {
  return (
    value.includes("directions") ||
    value.includes("get direction") ||
    value.includes("google.com/maps/dir") ||
    (value.includes("google.com/maps") && value.includes("directions"))
  );
}

function isBookViewingCta(value: string) {
  return value.includes("book_viewing") || value.includes("book a viewing") || value.includes("request viewing");
}

function isBrochureCta(value: string) {
  return value.includes("brochure") || value.includes(".pdf");
}

function isEnquiryCta(value: string) {
  return (
    value.includes("enquiry") ||
    value.includes("callback") ||
    value.includes("availability") ||
    value.includes("urgent_help") ||
    value.includes("urgent help") ||
    value.includes("send enquiry")
  );
}
