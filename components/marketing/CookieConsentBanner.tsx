"use client";

import { useEffect, useState } from "react";
import { Check, Settings, X } from "lucide-react";
import { trackEvent } from "@/lib/marketing/tracking";

type ConsentChoice = {
  analytics: boolean;
  marketing: boolean;
  savedAt: string;
};

type ConsentState = {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
};

const consentStorageKey = "hch_cookie_consent_v1";

export function CookieConsentBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [isManaging, setIsManaging] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = readSavedConsent();
    if (saved) {
      setAnalytics(saved.analytics);
      setMarketing(saved.marketing);
      updateGoogleConsent(saved, false);
      return;
    }

    setIsOpen(true);
  }, []);

  useEffect(() => {
    function openPreferences(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const trigger = target.closest("[data-cookie-preferences-trigger]");
      if (!trigger) return;

      event.preventDefault();
      const saved = readSavedConsent();
      setAnalytics(saved?.analytics ?? false);
      setMarketing(saved?.marketing ?? false);
      setIsManaging(true);
      setIsOpen(true);
    }

    document.addEventListener("click", openPreferences);
    return () => document.removeEventListener("click", openPreferences);
  }, []);

  if (!isOpen) return null;

  function saveChoice(next: Omit<ConsentChoice, "savedAt">) {
    const choice: ConsentChoice = {
      ...next,
      savedAt: new Date().toISOString()
    };

    setAnalytics(choice.analytics);
    setMarketing(choice.marketing);
    writeSavedConsent(choice);
    updateGoogleConsent(choice, true);
    setIsOpen(false);
    setIsManaging(false);
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-holly-ink/10 bg-white shadow-lift"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
    >
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
        <div>
          <h2 id="cookie-consent-title" className="font-display text-2xl font-semibold text-holly-ink">
            Cookie preferences
          </h2>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-holly-ink/70">
            We use essential cookies to run the site. With your permission, analytics and advertising cookies help us understand enquiries and improve care-home marketing without sending personal form details to Google or Meta.
          </p>

          {isManaging ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ConsentToggle
                label="Analytics"
                description="Measures visits and lead events, including GA4 events configured in GTM."
                checked={analytics}
                onChange={setAnalytics}
              />
              <ConsentToggle
                label="Advertising"
                description="Allows ads measurement and remarketing tags configured in GTM."
                checked={marketing}
                onChange={setMarketing}
              />
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
          {isManaging ? (
            <button
              type="button"
              onClick={() => saveChoice({ analytics, marketing })}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-holly-leaf px-5 py-3 text-sm font-semibold text-white transition hover:bg-holly-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-holly-gold"
            >
              <Check aria-hidden size={17} />
              Save choices
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsManaging(true)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-holly-leaf/35 bg-white px-5 py-3 text-sm font-semibold text-holly-ink transition hover:border-holly-leaf hover:bg-holly-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-holly-leaf"
            >
              <Settings aria-hidden size={17} />
              Manage choices
            </button>
          )}
          <button
            type="button"
            onClick={() => saveChoice({ analytics: false, marketing: false })}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-holly-ink/15 bg-white px-5 py-3 text-sm font-semibold text-holly-ink transition hover:bg-holly-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-holly-leaf"
          >
            <X aria-hidden size={17} />
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => saveChoice({ analytics: true, marketing: true })}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-holly-leaf px-5 py-3 text-sm font-semibold text-white transition hover:bg-holly-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-holly-gold"
          >
            <Check aria-hidden size={17} />
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

function ConsentToggle({
  label,
  description,
  checked,
  onChange
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer gap-3 rounded-[1rem] border border-holly-ink/10 bg-holly-cream p-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-5 w-5 accent-holly-leaf"
      />
      <span>
        <span className="block text-sm font-semibold text-holly-ink">{label}</span>
        <span className="mt-1 block text-sm leading-6 text-holly-ink/68">{description}</span>
      </span>
    </label>
  );
}

function readSavedConsent() {
  try {
    const raw = window.localStorage.getItem(consentStorageKey);
    return raw ? (JSON.parse(raw) as ConsentChoice) : null;
  } catch {
    return null;
  }
}

function writeSavedConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(consentStorageKey, JSON.stringify(choice));
  } catch {
    // Consent still updates for the current page even if storage is unavailable.
  }
}

function updateGoogleConsent(choice: ConsentChoice, shouldTrack: boolean) {
  const consentState = toConsentState(choice);

  if (window.gtag) {
    window.gtag("consent", "update", consentState);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["consent", "update", consentState]);
  }

  if (shouldTrack) {
    trackEvent("consent_update", {
      ...consentState,
      consent_saved_at: choice.savedAt
    });
  }
}

function toConsentState(choice: Pick<ConsentChoice, "analytics" | "marketing">): ConsentState {
  return {
    analytics_storage: choice.analytics ? "granted" : "denied",
    ad_storage: choice.marketing ? "granted" : "denied",
    ad_user_data: choice.marketing ? "granted" : "denied",
    ad_personalization: choice.marketing ? "granted" : "denied"
  };
}
