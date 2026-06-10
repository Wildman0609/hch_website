import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { FormSuccessTracking } from "@/components/marketing/FormSuccessTracking";
import { thankYouContent, type ThankYouType } from "@/data/admissions";
import { site } from "@/data/site";

type PageProps = {
  params: Promise<{ type: string }>;
  searchParams?: Promise<{
    submitted?: string;
    event_id?: string;
    form_type?: string;
    care_home_name?: string;
  }>;
};

const thankYouTypes = Object.keys(thankYouContent) as ThankYouType[];

export function generateStaticParams() {
  return thankYouTypes.map((type) => ({ type }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;

  if (!isThankYouType(type)) {
    return {};
  }

  return {
    title: thankYouContent[type].title,
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function SpecificThankYouPage({ params, searchParams }: PageProps) {
  const { type } = await params;
  const trackingParams = searchParams ? await searchParams : {};

  if (!isThankYouType(type)) {
    notFound();
  }

  const content = thankYouContent[type];

  return (
    <section className="bg-holly-cream py-20 md:py-28">
      <FormSuccessTracking
        thankYouType={type}
        submitted={trackingParams.submitted === "1"}
        eventId={trackingParams.event_id}
        formType={trackingParams.form_type}
        careHomeName={trackingParams.care_home_name}
      />
      <div className="section-shell">
        <div className="mx-auto max-w-3xl rounded-[1.6rem] bg-white p-8 text-center shadow-soft md:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-holly-sky text-holly-leaf">
            <CheckCircle2 aria-hidden size={30} />
          </div>
          <h1 className="font-display text-4xl font-semibold text-holly-ink md:text-5xl">
            {content.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-holly-ink/72">{content.text}</p>
          <ul className="mt-7 grid gap-3 text-left">
            {content.nextSteps.map((step) => (
              <li key={step} className="rounded-xl bg-holly-sky px-4 py-3 text-sm font-semibold leading-6 text-holly-ink/76">
                {step}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={site.phoneHref} icon={<Phone aria-hidden size={18} />} ctaId={content.ctaId}>
              Call {site.phone}
            </ButtonLink>
            <ButtonLink
              href={content.secondaryHref}
              variant="outline"
              ctaId={`thank_you_${type}_secondary`}
            >
              {content.secondaryLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function isThankYouType(type: string): type is ThankYouType {
  return thankYouTypes.includes(type as ThankYouType);
}
