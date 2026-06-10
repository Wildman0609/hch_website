import type { Metadata } from "next";
import { CheckCircle2, CircleAlert, LockKeyhole, Tag } from "lucide-react";
import { RecentTestEvents } from "@/components/marketing/RecentTestEvents";
import { conversionEventNames, marketingEventDefinitions } from "@/lib/marketing/events";

export const metadata: Metadata = {
  title: "Marketing Tracking",
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = "force-dynamic";

export default function MarketingDashboardPage() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  const hasDashboardPassword = Boolean(process.env.MARKETING_DASHBOARD_PASSWORD?.trim());

  const checklist = [
    {
      label: "Google Tag Manager",
      status: gtmId ? "Configured" : "Missing",
      ok: Boolean(gtmId),
      detail: gtmId ? `Container ${gtmId}` : "Set NEXT_PUBLIC_GTM_ID in Vercel."
    },
    {
      label: "Meta Pixel foundation",
      status: metaPixelId ? "Configured" : "Missing",
      ok: Boolean(metaPixelId),
      detail: metaPixelId ? `Pixel ID ${maskId(metaPixelId)}` : "Set NEXT_PUBLIC_META_PIXEL_ID for GTM mapping."
    },
    {
      label: "Consent Mode v2",
      status: "Implemented",
      ok: true,
      detail: "Default denied, then updated from the cookie banner."
    },
    {
      label: "Dashboard protection",
      status: hasDashboardPassword ? "Configured" : "Missing",
      ok: hasDashboardPassword,
      detail: "Basic Auth is enforced by middleware."
    }
  ];

  return (
    <section className="bg-holly-cream py-12 md:py-16">
      <div className="section-shell">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
              Internal
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-holly-ink md:text-5xl">
              Marketing tracking dashboard
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-holly-ink/72">
              Phase 1 status for consent, GTM, Meta mapping and website lead events.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-holly-ink/10 bg-white px-4 py-2 text-sm font-semibold text-holly-ink shadow-soft">
            <LockKeyhole aria-hidden size={16} />
            Protected
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          {checklist.map((item) => (
            <article key={item.label} className="rounded-[1rem] border border-holly-ink/10 bg-white p-5 shadow-soft">
              <div className={item.ok ? "text-holly-leaf" : "text-holly-rust"}>
                {item.ok ? <CheckCircle2 aria-hidden size={24} /> : <CircleAlert aria-hidden size={24} />}
              </div>
              <h2 className="mt-4 text-base font-semibold text-holly-ink">{item.label}</h2>
              <p className="mt-1 text-sm font-semibold text-holly-ink/72">{item.status}</p>
              <p className="mt-3 text-sm leading-6 text-holly-ink/62">{item.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[1rem] border border-holly-ink/10 bg-white p-5 shadow-soft md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Tag aria-hidden className="text-holly-leaf" size={20} />
              <h2 className="font-display text-2xl font-semibold text-holly-ink">
                Tracked conversion events
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.12em] text-holly-ink/55">
                  <tr>
                    <th className="whitespace-nowrap px-3 py-2">Event</th>
                    <th className="px-3 py-2">Description</th>
                    <th className="whitespace-nowrap px-3 py-2">Meta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-holly-ink/10">
                  {marketingEventDefinitions
                    .filter((event) => conversionEventNames.includes(event.eventName))
                    .map((event) => (
                      <tr key={event.eventName}>
                        <td className="whitespace-nowrap px-3 py-3 font-mono text-xs font-semibold text-holly-ink">
                          {event.eventName}
                        </td>
                        <td className="px-3 py-3 text-holly-ink/70">{event.description}</td>
                        <td className="whitespace-nowrap px-3 py-3 text-holly-ink/70">
                          {event.metaEventName ?? "-"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[1rem] border border-holly-ink/10 bg-white p-5 shadow-soft md:p-6">
            <h2 className="font-display text-2xl font-semibold text-holly-ink">
              Recent test events
            </h2>
            <div className="mt-4">
              <RecentTestEvents />
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-[1rem] border border-holly-ink/10 bg-white p-5 shadow-soft md:p-6">
          <h2 className="font-display text-2xl font-semibold text-holly-ink">
            Recommended GTM event setup
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {marketingEventDefinitions.map((event) => (
              <article key={event.eventName} className="rounded-[0.9rem] bg-holly-sky p-4">
                <h3 className="font-mono text-sm font-semibold text-holly-ink">{event.eventName}</h3>
                <p className="mt-2 text-sm leading-6 text-holly-ink/70">{event.description}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-holly-ink/50">
                  Payload
                </p>
                <p className="mt-1 text-sm leading-6 text-holly-ink/70">
                  {event.primaryPayload.join(", ")}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function maskId(value: string) {
  if (value.length <= 6) return value;
  return `${value.slice(0, 4)}...${value.slice(-3)}`;
}

