"use client";

import { useEffect, useId, useState } from "react";
import {
  SPAM_FORM_STARTED_AT_FIELD,
  SPAM_HONEYPOT_FIELD_NAMES
} from "@/lib/spamProtectionFields";

export function SpamTrapFields() {
  const id = useId();
  const [startedAt, setStartedAt] = useState("");

  useEffect(() => {
    setStartedAt(String(Date.now()));
  }, []);

  return (
    <>
      <input
        type="hidden"
        name={SPAM_FORM_STARTED_AT_FIELD}
        value={startedAt}
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
