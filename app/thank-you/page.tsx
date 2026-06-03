import type { Metadata } from "next";
import { CheckCircle2, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
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
              : "Thank you. We have received your enquiry."}
          </h1>
          <p className="mt-5 text-lg leading-8 text-holly-ink/72">
            {isCareersApplication
              ? "A member of the Hollyman team can follow up with you about current vacancies and next steps."
              : "A member of the Hollyman team can follow up with you. If your situation is urgent, please call now so the team can understand what has changed."}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={site.phoneHref} icon={<Phone aria-hidden size={18} />} ctaId="thank-you-call">
              Call {site.phone}
            </ButtonLink>
            <ButtonLink
              href={isCareersApplication ? "/careers" : "/find-your-home"}
              variant="outline"
              ctaId={isCareersApplication ? "thank-you-careers" : "thank-you-find-home"}
            >
              {isCareersApplication ? "Back to careers" : "View homes"}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
