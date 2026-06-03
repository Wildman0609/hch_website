import type { Metadata } from "next";
import { FileText, Phone } from "lucide-react";
import { BrochureContactNotes, BrochureRequestForm } from "@/components/BrochureRequestForm";
import { ButtonLink } from "@/components/ButtonLink";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionIntro } from "@/components/SectionIntro";
import { site } from "@/data/site";
import { requestPrintedBrochure } from "./actions";

export const metadata: Metadata = {
  title: "Request a Printed Brochure",
  description:
    "Request a printed Hollyman Care Homes brochure by post for homes in Acle, Potter Heigham, Martham and Brundall."
};

type BrochurePageProps = {
  searchParams: Promise<{
    home?: string;
    care?: string;
  }>;
};

export default async function RequestBrochurePage({ searchParams }: BrochurePageProps) {
  const params = await searchParams;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Request a printed care home brochure",
          url: `${site.url}/request-brochure`,
          about: "Printed care home brochure requests for Hollyman Care Homes"
        }}
      />
      <PageHero
        eyebrow="Brochure by post"
        title="Request a printed brochure for your family."
        text="If you want something to read, share or keep with your notes, request a printed brochure for one of our Norfolk care homes."
        image="/images/broadlands-park-archive-brochure.jpg"
        imageAlt="A Hollyman Care Homes brochure with photographs of rooms and gardens."
        ctaLabel="Find the right care"
        ctaHref="/find-the-right-care"
        primaryCtaId="request_brochure_page_call"
        secondaryCtaId="request_brochure_page_find_care"
      />

      <section className="bg-holly-cream py-14 md:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <BrochureRequestForm
            action={requestPrintedBrochure}
            preferredHome={params.home}
            preferredCare={params.care}
          />
          <div>
            <SectionIntro
              eyebrow="What happens next"
              title="Brochures support the conversation. They do not replace it."
              text="Printed information can help families compare homes, but a call or viewing is usually the quickest way to understand availability, suitability and next steps."
            />
            <div className="mt-7">
              <BrochureContactNotes />
            </div>
            <div className="mt-7 rounded-[1.25rem] bg-holly-ink p-6 text-white shadow-soft">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-holly-leafLight">
                <FileText aria-hidden size={24} />
              </div>
              <h2 className="font-display text-3xl font-semibold">
                Need the answer sooner?
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/74">
                If care is urgent, a phone call is better than waiting for post.
              </p>
              <ButtonLink
                href={site.phoneHref}
                variant="secondary"
                icon={<Phone aria-hidden size={17} />}
                className="mt-6"
                ctaId="request_brochure_urgent_call"
              >
                Call {site.phone}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
