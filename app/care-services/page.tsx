import type { Metadata } from "next";
import { ArrowRight, HelpCircle } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { HomeCard } from "@/components/HomeCard";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionIntro } from "@/components/SectionIntro";
import { ServiceCard } from "@/components/ServiceCard";
import { UrgentPathways } from "@/components/UrgentPathways";
import { homes } from "@/data/homes";
import { services } from "@/data/services";
import { servicesSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Care Services",
  description:
    "Residential, dementia, respite and palliative care services from Hollyman Care Homes in Norfolk."
};

export default function CareServicesPage() {
  return (
    <>
      <JsonLd data={servicesSchema()} />
      <PageHero
        eyebrow="Our care"
        title="Care that starts with the person, not the category."
        text="Every family arrives with a different story. Explore the main care services, or contact the team if you need help working out what fits."
        image="/images/care-community.webp"
        imageAlt="Residents and team members spending time together at a Hollyman care home."
        ctaLabel="Ask what care fits"
        ctaHref="/contact?reason=care-guidance"
      />

      <section className="bg-holly-cream py-14 md:py-20">
        <div className="section-shell">
          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionIntro
            eyebrow="Care guidance"
            title="If the situation has changed quickly, start here."
            text="Families often need reassurance before they need a brochure. These two routes help people who either need urgent support or want to visit before deciding."
          />
          <UrgentPathways />
        </div>
      </section>

      <section className="bg-holly-sky py-14 md:py-20">
        <div className="section-shell">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionIntro
              eyebrow="Where care is provided"
              title="Homes across Norfolk."
              text="Care availability and suitability should always be checked with the team."
            />
            <ButtonLink
              href="/find-your-home"
              variant="outline"
              icon={<ArrowRight aria-hidden size={17} />}
              className="md:mb-2"
              ctaId="care-services-find-home"
            >
              Find your home
            </ButtonLink>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {homes.map((home) => (
              <HomeCard key={home.slug} home={home} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-holly-ink py-14 text-white md:py-20">
        <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-holly-leafLight">
              <HelpCircle aria-hidden size={18} />
              Not sure?
            </p>
            <h2 className="font-display text-3xl font-semibold md:text-5xl">
              You can call before you know the answer.
            </h2>
          </div>
          <ButtonLink href="/contact?reason=care-guidance" variant="secondary" ctaId="care-services-guidance">
            Ask for guidance
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
