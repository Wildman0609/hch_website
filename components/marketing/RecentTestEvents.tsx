"use client";

import { useEffect, useState } from "react";
import { getRecentMarketingEvents } from "@/lib/marketing/tracking";

export function RecentTestEvents() {
  const [events, setEvents] = useState<Array<Record<string, unknown>>>([]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      setEvents(getRecentMarketingEvents());
    }
  }, []);

  if (process.env.NODE_ENV === "production") {
    return (
      <p className="text-sm leading-6 text-holly-ink/68">
        Recent test events are shown only in development builds to avoid storing diagnostics for visitors.
      </p>
    );
  }

  if (events.length === 0) {
    return (
      <p className="text-sm leading-6 text-holly-ink/68">
        No test events have been recorded in this browser session yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-[0.12em] text-holly-ink/55">
          <tr>
            <th className="whitespace-nowrap px-3 py-2">Event</th>
            <th className="whitespace-nowrap px-3 py-2">Context</th>
            <th className="whitespace-nowrap px-3 py-2">Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-holly-ink/10">
          {events.map((event) => (
            <tr key={String(event.event_id ?? event.timestamp)}>
              <td className="whitespace-nowrap px-3 py-3 font-semibold text-holly-ink">
                {String(event.event ?? "")}
              </td>
              <td className="px-3 py-3 text-holly-ink/70">
                {[event.care_home_name, event.cta_label, event.form_type].filter(Boolean).join(" / ") || "-"}
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-holly-ink/60">
                {String(event.timestamp ?? "")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

