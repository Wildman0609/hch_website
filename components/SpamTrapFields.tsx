"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  SPAM_FORM_INTERACTED_AT_FIELD,
  SPAM_FORM_STARTED_AT_FIELD,
  SPAM_HONEYPOT_FIELD_NAMES,
  SPAM_PAGE_URL_FIELD
} from "@/lib/spamProtectionFields";

export function SpamTrapFields() {
  const id = useId();
  const interactionFieldRef = useRef<HTMLInputElement>(null);
  const [startedAt, setStartedAt] = useState("");
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setStartedAt(String(Date.now()));
    setPageUrl(window.location.href.slice(0, 500));
  }, []);

  useEffect(() => {
    const interactionField = interactionFieldRef.current;
    const form = interactionField?.form;
    if (!interactionField || !form) return;

    const markInteraction = () => {
      if (!interactionField.value) {
        interactionField.value = String(Date.now());
      }
    };

    form.addEventListener("focusin", markInteraction, true);
    form.addEventListener("input", markInteraction, true);
    form.addEventListener("change", markInteraction, true);
    form.addEventListener("pointerdown", markInteraction, true);
    form.addEventListener("keydown", markInteraction, true);

    return () => {
      form.removeEventListener("focusin", markInteraction, true);
      form.removeEventListener("input", markInteraction, true);
      form.removeEventListener("change", markInteraction, true);
      form.removeEventListener("pointerdown", markInteraction, true);
      form.removeEventListener("keydown", markInteraction, true);
    };
  }, []);

  return (
    <>
      <input
        type="hidden"
        name={SPAM_FORM_STARTED_AT_FIELD}
        value={startedAt}
        readOnly
      />
      <input
        ref={interactionFieldRef}
        type="hidden"
        name={SPAM_FORM_INTERACTED_AT_FIELD}
        defaultValue=""
        readOnly
      />
      <input
        type="hidden"
        name={SPAM_PAGE_URL_FIELD}
        value={pageUrl}
        readOnly
      />
      <div className="hidden" aria-hidden="true">
        {SPAM_HONEYPOT_FIELD_NAMES.map((fieldName) => (
          <label key={fieldName} htmlFor={`${id}-${fieldName}`}>
            Leave this field empty
            <input
              id={`${id}-${fieldName}`}
              name={fieldName}
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        ))}
      </div>
    </>
  );
}
