import { CalendarDays, FileText, Phone, Send } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/data/site";

type AdmissionsCTAProps = {
  title: string;
  text: string;
  homeName?: string;
  ctaPrefix: string;
  className?: string;
};

export function AdmissionsCTA({
  title,
  text,
  homeName,
  ctaPrefix,
  className = ""
}: AdmissionsCTAProps) {
  const homeQuery = homeName ? `&home=${encodeURIComponent(homeName)}` : "";
  const brochureQuery = homeName ? `?home=${encodeURIComponent(homeName)}` : "";

  return (
    <section className={`bg-holly-ink py-10 text-white md:py-12 ${className}`}>
      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-base leading-7 text-white/74">{text}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[34rem]">
            <ButtonLink
              href={site.phoneHref}
              icon={<Phone aria-hidden size={17} />}
              ctaId={`${ctaPrefix}_call`}
            >
              Call us today
            </ButtonLink>
            <ButtonLink
              href={`/contact?reason=viewing${homeQuery}`}
              variant="secondary"
              icon={<CalendarDays aria-hidden size={17} />}
              ctaId={`${ctaPrefix}_book_viewing`}
            >
              Book a viewing
            </ButtonLink>
            <ButtonLink
              href={`/contact?reason=callback${homeQuery}`}
              variant="outline"
              icon={<Send aria-hidden size={17} />}
              className="border-white/30 bg-white text-holly-ink"
              ctaId={`${ctaPrefix}_callback`}
            >
              Request a callback
            </ButtonLink>
            <ButtonLink
              href={`/request-brochure${brochureQuery}`}
              variant="outline"
              icon={<FileText aria-hidden size={17} />}
              className="border-white/30 bg-white text-holly-ink"
              ctaId={`${ctaPrefix}_brochure`}
            >
              Request a brochure
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
