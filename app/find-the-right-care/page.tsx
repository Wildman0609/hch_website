import type { Metadata } from "next";
import { CheckCircle2, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { FindCareAssessment } from "@/components/FindCareAssessment";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionIntro } from "@/components/SectionIntro";
import { familyReassurance } from "@/data/admissions";
import { site } from "@/data/site";
import { requestCareGuidanceCallback } from "./actions";

export const metadata: Metadata = {
  title: "Find the Right Care",
  description:
    "Use a simple guided journey to decide what to ask Hollyman Care Homes about, including residential care, dementia care, respite, urgent care and viewing requests in Norfolk."
};

export default function FindTheRightCarePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Find the Right Care",
          url: `${site.url}/find-the-right-care`,
          description:
            "A guided care enquiry journey for families considering care homes in Norfolk."
        }}
      />
      <PageHero
        eyebrow="Find the right care"
        title="Start with what has changed, then speak to someone."
        text="Answer a few practical questions to shape the next conversation. This tool does not make clinical decisions or replace a care assessment."
        image="/images/care-community.webp"
        imageAlt="Residents and team members spending time together in a Hollyman care home."
        ctaLabel="I need help now"
        ctaHref="/urgent-care-help"
        primaryCtaId="find_care_page_call"
        secondaryCtaId="find_care_page_urgent_help"
      />

      <section className="bg-holly-cream py-14 md:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <SectionIntro
              eyebrow="Guided journey"
              title="A safe starting point for families who feel unsure."
              text="You may not know whether to ask about residential care, dementia care, respite or urgent support. The result simply suggests what may be worth discussing with the team."
            />
            <div className="mt-8 rounded-[1.25rem] bg-white p-5 shadow-soft">
              <h2 className="font-display text-2xl font-semibold text-holly-ink">
                What this will ask
              </h2>
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-holly-ink/72">
                {[
                  "Who you are looking for care for",
                  "Whether the need is urgent",
                  "Preferred area or home",
                  "Whether dementia is involved",
                  "Permanent care, respite or unsure",
                  "Current setting, such as home or hospital",
                  "Mobility, falls or safety concerns",
                  "Best contact details if you request a callback"
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 aria-hidden className="mt-1 flex-none text-holly-leaf" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 rounded-[1.25rem] bg-holly-ink p-5 text-white shadow-soft">
              <h2 className="font-display text-2xl font-semibold">Need help now?</h2>
              <p className="mt-2 text-sm leading-7 text-white/72">
                If discharge, falls, carer burnout or safety is immediate, call rather than working through the journey.
              </p>
              <ButtonLink
                href={site.phoneHref}
                variant="secondary"
                icon={<Phone aria-hidden size={17} />}
                className="mt-5"
                ctaId="find_care_sidebar_call"
              >
                Call {site.phone}
              </ButtonLink>
            </div>
          </div>

          <FindCareAssessment action={requestCareGuidanceCallback} />
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="section-shell">
          <SectionIntro
            align="center"
            eyebrow="Family reassurance"
            title="You can ask before you know the answer."
            text="These are the worries families often carry into the first conversation."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {familyReassurance.map((item) => (
              <article key={item.question} className="rounded-[1.25rem] border border-holly-ink/10 bg-holly-sky p-5">
                <h2 className="font-display text-2xl font-semibold text-holly-ink">
                  {item.question}
                </h2>
                <p className="mt-3 text-sm leading-7 text-holly-ink/72">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
