import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { EnquiryForm } from "@/components/EnquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionIntro } from "@/components/SectionIntro";
import { getService, services } from "@/data/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.summary
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
          provider: { "@id": "https://www.hollymancarehomes.co.uk/#organization" },
          areaServed: "Norfolk"
        }}
      />
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        text={service.headline}
        image={service.image}
        imageAlt={service.imageAlt}
        ctaLabel="Talk to us about this care"
        ctaHref={`/contact?care=${encodeURIComponent(service.title)}`}
      />

      <section className="bg-holly-cream py-14 md:py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro
            eyebrow="How it works"
            title="Care is shaped around the person and reviewed as needs change."
            text={service.summary}
          />
          <div className="grid gap-4">
            {service.sections.map((section) => (
              <article key={section.title} className="rounded-[1.25rem] bg-white p-6 shadow-soft">
                <h2 className="font-display text-2xl font-semibold text-holly-ink">
                  {section.title}
                </h2>
                <p className="mt-3 leading-7 text-holly-ink/72">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionIntro
              eyebrow="Who this may suit"
              title="This page is a starting point, not a diagnosis."
              text="A proper care conversation should consider the person's needs, preferences, risks, family situation and current professional advice."
            />
            <ul className="mt-8 grid gap-3">
              {service.suitedTo.map((item) => (
                <li key={item} className="flex gap-3 rounded-[1.1rem] bg-holly-sky p-4 text-holly-ink">
                  <CheckCircle2 aria-hidden className="mt-0.5 flex-none text-holly-leaf" size={20} />
                  <span className="font-semibold leading-7">{item}</span>
                </li>
              ))}
            </ul>
            <ButtonLink
              href="/fees-funding"
              variant="outline"
              className="mt-7"
              ctaId={`service-funding-${service.slug}`}
            >
              Read fees and funding guidance
            </ButtonLink>
          </div>
          <EnquiryForm careType={service.title} compactIntro reason={`service-${service.slug}`} />
        </div>
      </section>
    </>
  );
}
