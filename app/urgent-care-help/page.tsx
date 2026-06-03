import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2, Phone, Send } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { EnquiryForm } from "@/components/EnquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionIntro } from "@/components/SectionIntro";
import { urgentScenarios } from "@/data/admissions";
import { homes } from "@/data/homes";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "I Need Help Now",
  description:
    "Urgent care home guidance for families in Norfolk when a parent can no longer cope at home, hospital discharge is approaching, dementia has worsened, respite is needed or safety concerns have increased."
};

export default function UrgentCareHelpPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "I Need Help Now",
          url: `${site.url}/urgent-care-help`,
          about: "Urgent care home guidance for families in Norfolk",
          mainEntity: {
            "@type": "FAQPage",
            mainEntity: urgentScenarios.map((scenario) => ({
              "@type": "Question",
              name: scenario,
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "Call Hollyman Care Homes or request a callback so the team can understand what has changed, where care may be needed and which practical next step is safest."
              }
            }))
          }
        }}
      />
      <PageHero
        eyebrow="Urgent family help"
        title="If care suddenly feels urgent, start with a calm conversation."
        text="You may be dealing with discharge, falls, dementia changes, carer burnout or a parent who can no longer cope at home. You do not need the right words before you call."
        image="/images/family-care.jpg"
        imageAlt="An older person holding a telephone, representing urgent family care conversations."
        ctaLabel="Request a callback"
        ctaHref="#urgent-callback"
        primaryCtaId="urgent_help_page_call"
        secondaryCtaId="urgent_help_page_callback"
      />

      <section className="bg-holly-cream py-14 md:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionIntro
              eyebrow="When families call"
              title="You might be here because something has changed."
              text="These situations are common. The first conversation is about understanding the practical picture, not judging whether you should have called sooner."
            />
            <div className="mt-8 grid gap-3">
              {urgentScenarios.map((scenario) => (
                <div key={scenario} className="flex gap-3 rounded-[1.1rem] bg-white p-4 shadow-soft">
                  <AlertTriangle aria-hidden className="mt-0.5 flex-none text-holly-gold" size={20} />
                  <p className="font-semibold leading-7 text-holly-ink">{scenario}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[1.5rem] bg-holly-ink p-6 text-white shadow-soft md:p-8">
            <h2 className="font-display text-3xl font-semibold">
              What to have ready if you can
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/74">
              It is fine if you do not have everything. These details just help the team understand where to begin.
            </p>
            <ul className="mt-6 grid gap-4">
              {[
                "Where your loved one is now: home, hospital or another setting",
                "What changed today or this week",
                "Whether dementia, falls, mobility or night-time safety are involved",
                "Which area or home would keep visiting easiest",
                "Whether you need permanent care, respite or are unsure"
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-white/78">
                  <CheckCircle2 aria-hidden className="mt-1 flex-none text-holly-leafLight" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <ButtonLink
                href={site.phoneHref}
                variant="secondary"
                icon={<Phone aria-hidden size={17} />}
                ctaId="urgent_help_page_call_panel"
              >
                Call us today
              </ButtonLink>
              <ButtonLink
                href="#urgent-callback"
                variant="outline"
                icon={<Send aria-hidden size={17} />}
                className="border-white/30 bg-white text-holly-ink"
                ctaId="urgent_help_page_callback_panel"
              >
                Request callback
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>

      <section id="urgent-callback" className="bg-white py-14 md:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionIntro
              eyebrow="Request a callback"
              title="Tell us enough to start the right conversation."
              text="Please avoid sensitive medical detail in the form. If the situation is immediate, call rather than waiting for a form response."
            />
            <div className="mt-7 rounded-[1.2rem] bg-holly-sky p-5">
              <h2 className="font-display text-2xl font-semibold text-holly-ink">
                Homes families usually ask about
              </h2>
              <ul className="mt-4 grid gap-2 text-sm leading-7 text-holly-ink/72">
                {homes.map((home) => (
                  <li key={home.slug}>
                    <strong>{home.name}</strong>: {home.location}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <EnquiryForm
            urgency="urgent"
            reason="urgent-help"
            compactIntro
            actionPath="/thank-you/urgent-help-request"
            submitLabel="Request urgent callback"
            submitCtaId="urgent_help_request_submit"
          />
        </div>
      </section>
    </>
  );
}
