import type { Metadata } from "next";
import { CheckCircle2, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { thankYouContent, type ThankYouType } from "@/data/admissions";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Thank You",
  robots: {
    index: false,
    follow: false
  }
};

type ThankYouPageProps = {
  searchParams: Promise<{
    source?: string;
  }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const isCareersApplication = params.source === "careers-application";
  const thankYouType: ThankYouType = "general-enquiry";
  const content = thankYouContent[thankYouType];

  return (
    <section className="bg-holly-cream py-20 md:py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl rounded-[1.6rem] bg-white p-8 text-center shadow-soft md:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-holly-sky text-holly-leaf">
            <CheckCircle2 aria-hidden size={30} />
          </div>
          <h1 className="font-display text-4xl font-semibold text-holly-ink md:text-5xl">
            {isCareersApplication
              ? "Thank you. We have received your application."
              : content.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-holly-ink/72">
            {isCareersApplication
              ? "A member of the Hollyman team can follow up with you about current vacancies and next steps."
              : content.text}
          </p>
          {!isCareersApplication ? (
            <ul className="mt-7 grid gap-3 text-left">
              {content.nextSteps.map((step) => (
                <li key={step} className="rounded-xl bg-holly-sky px-4 py-3 text-sm font-semibold leading-6 text-holly-ink/76">
                  {step}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={site.phoneHref} icon={<Phone aria-hidden size={18} />} ctaId={isCareersApplication ? "thank_you_careers_call" : content.ctaId}>
              Call {site.phone}
            </ButtonLink>
            <ButtonLink
              href={isCareersApplication ? "/careers" : content.secondaryHref}
              variant="outline"
              ctaId={isCareersApplication ? "thank_you_careers" : `thank_you_${params.source ?? "general"}_secondary`}
            >
              {isCareersApplication ? "Back to careers" : content.secondaryLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
