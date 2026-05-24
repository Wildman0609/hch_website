import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionIntro } from "@/components/SectionIntro";

export const metadata: Metadata = {
  title: "Fees & Funding Guidance",
  description:
    "Clear, neutral guidance on care home fees and funding routes for families considering Hollyman Care Homes in Norfolk."
};

const fundingRoutes = [
  {
    title: "Private funding",
    text: "Many families pay privately for residential or respite care. Fees depend on the home, room, care needs and assessment, so they should be discussed directly with the team."
  },
  {
    title: "Local authority support",
    text: "If circumstances change, Norfolk County Council adult social care can advise on care needs assessments and financial assessment. Eligibility rules and thresholds can change."
  },
  {
    title: "Third-party contributions",
    text: "Sometimes called a top-up fee, this may be relevant where a family chooses accommodation above the amount a local authority will fund. Always seek clear written advice before agreeing."
  },
  {
    title: "NHS Continuing Healthcare",
    text: "Some people with a primary health need may be assessed for NHS Continuing Healthcare. This is a separate process from local authority social care funding."
  }
];

export default function FeesFundingPage() {
  return (
    <>
      <PageHero
        eyebrow="Fees and funding"
        title="Clear guidance before big decisions."
        text="Care funding can feel confusing. This page keeps to the main routes families ask about and points you to official advice for the details."
        image="/images/norfolk-broads.jpg"
        imageAlt="A peaceful Norfolk Broads waterway."
        ctaLabel="Ask about fees"
        ctaHref="/contact?reason=fees"
      />

      <section className="bg-holly-cream py-14 md:py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionIntro
            eyebrow="What to expect"
            title="Fees are personal to the home, room and assessed care need."
            text="The current Hollyman site does not publish live prices, so this rebuild avoids invented fees. Families should contact the team for current availability, room options and an accurate discussion."
          />
          <div className="grid gap-4">
            {fundingRoutes.map((route) => (
              <article key={route.title} className="rounded-[1.25rem] bg-white p-6 shadow-soft">
                <h2 className="font-display text-2xl font-semibold text-holly-ink">
                  {route.title}
                </h2>
                <p className="mt-3 leading-7 text-holly-ink/72">{route.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="rounded-[1.5rem] bg-holly-sky p-6 md:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-holly-leaf">
              <FileText aria-hidden size={23} />
            </div>
            <h2 className="font-display text-3xl font-semibold text-holly-ink">
              Helpful questions to ask
            </h2>
            <ul className="mt-6 grid gap-3 text-holly-ink/75">
              <li>What is included in the quoted weekly fee?</li>
              <li>How are changing needs reviewed?</li>
              <li>What happens if savings reduce over time?</li>
              <li>Who should be involved before signing an agreement?</li>
              <li>Can we have the fee and terms in writing?</li>
            </ul>
          </div>
          <aside className="rounded-[1.5rem] border border-holly-ink/10 bg-white p-6 shadow-soft md:p-8">
            <h2 className="font-display text-3xl font-semibold text-holly-ink">
              Official guidance
            </h2>
            <p className="mt-3 leading-7 text-holly-ink/70">
              Funding rules are outside Hollyman Care Homes' control and can change. Use official sources and independent advice for financial decisions.
            </p>
            <div className="mt-6 grid gap-3">
              <OfficialLink href="https://www.gov.uk/guidance/care-and-support-statutory-guidance">
                GOV.UK care and support statutory guidance
              </OfficialLink>
              <OfficialLink href="https://www.england.nhs.uk/healthcare/">
                NHS Continuing Healthcare
              </OfficialLink>
              <OfficialLink href="https://www.norfolk.gov.uk/article/41854/If-we-contribute-to-your-care-costs">
                Norfolk County Council paying for care
              </OfficialLink>
            </div>
            <ButtonLink href="/contact?reason=fees" className="mt-7" ctaId="fees-contact">
              Ask Hollyman about fees
            </ButtonLink>
          </aside>
        </div>
      </section>
    </>
  );
}

function OfficialLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-between gap-3 rounded-xl border border-holly-ink/10 px-4 py-3 text-sm font-semibold text-holly-ink transition hover:bg-holly-sky"
    >
      <span>{children}</span>
      <ExternalLink aria-hidden size={16} />
    </Link>
  );
}
