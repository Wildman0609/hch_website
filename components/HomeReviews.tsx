import { ExternalLink, MessageSquareText, ShieldCheck, Star } from "lucide-react";
import type { ReactNode } from "react";
import type { CareHome } from "@/data/homes";
import { getCarehomeReviewSource } from "@/data/reviews";

type HomeReviewsProps = {
  home: CareHome;
};

export function HomeReviews({ home }: HomeReviewsProps) {
  const carehomeSource = getCarehomeReviewSource(home.slug);
  const googleReviewsUrl = buildGoogleReviewsUrl(home.mapQuery);

  return (
    <section id="reviews" className="scroll-mt-28 bg-holly-cream py-14 md:py-20">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
              Family reviews
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-holly-ink md:text-5xl">
              Read feedback for {home.shortName}.
            </h2>
            <p className="mt-5 text-lg leading-8 text-holly-ink/75">
              Browse the public review sources families often check when comparing care homes.
            </p>
          </div>
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full border border-holly-leaf/35 bg-white px-5 py-3 text-sm font-semibold text-holly-ink transition hover:border-holly-leaf hover:bg-holly-sky"
            data-cta={`reviews-google-${home.slug}`}
          >
            <ExternalLink aria-hidden size={17} />
            <span>Open Google reviews</span>
          </a>
        </div>

        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          <ReviewSourceCard
            icon={<Star aria-hidden size={24} />}
            source="Google reviews"
            title="Latest Google feedback"
            text="Open the home's Google profile to read current public reviews and ratings."
            href={googleReviewsUrl}
            ctaLabel="View on Google"
            ctaId={`reviews-card-google-${home.slug}`}
          />

          {carehomeSource.widgetHtml ? (
            <article className="min-w-[18rem] snap-start rounded-[1.25rem] border border-holly-ink/10 bg-white p-5 shadow-soft sm:min-w-[24rem] lg:min-w-[30rem]">
              <div
                className="overflow-hidden rounded-[1rem]"
                dangerouslySetInnerHTML={{ __html: carehomeSource.widgetHtml }}
              />
            </article>
          ) : (
            <ReviewSourceCard
              icon={<ShieldCheck aria-hidden size={24} />}
              source="carehome.co.uk"
              title="Independent carehome.co.uk profile"
              text="Read verified carehome.co.uk reviews directly on the home's official profile."
              href={carehomeSource.profileUrl}
              ctaLabel="View on carehome.co.uk"
              ctaId={`reviews-card-carehome-${home.slug}`}
            />
          )}

          <article className="min-w-[18rem] snap-start rounded-[1.25rem] border border-holly-ink/10 bg-holly-ink p-6 text-white shadow-soft sm:min-w-[24rem] lg:min-w-[27rem]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/12 text-holly-leafLight">
              <MessageSquareText aria-hidden size={24} />
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-holly-leafLight">
              All sources
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold leading-tight">
              Speak to the team after reading reviews.
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/76">
              Reviews are useful, but a visit gives you the clearest feel for the home, team and daily routine.
            </p>
            <a
              href={`/contact?reason=viewing&home=${encodeURIComponent(home.name)}`}
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-holly-gold px-5 py-3 text-sm font-semibold text-holly-ink transition hover:bg-[#b77824]"
              data-cta={`reviews-book-viewing-${home.slug}`}
            >
              Book a viewing
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

function ReviewSourceCard({
  icon,
  source,
  title,
  text,
  href,
  ctaLabel,
  ctaId
}: {
  icon: ReactNode;
  source: string;
  title: string;
  text: string;
  href: string;
  ctaLabel: string;
  ctaId: string;
}) {
  return (
    <article className="min-w-[18rem] snap-start rounded-[1.25rem] border border-holly-ink/10 bg-white p-6 shadow-soft sm:min-w-[24rem] lg:min-w-[27rem]">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-holly-sky text-holly-leaf">
        {icon}
      </div>
      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
        {source}
      </p>
      <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-holly-ink">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-holly-ink/72">{text}</p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-holly-leaf/35 px-5 py-3 text-sm font-semibold text-holly-ink transition hover:border-holly-leaf hover:bg-holly-sky"
        data-cta={ctaId}
      >
        <ExternalLink aria-hidden size={16} />
        <span>{ctaLabel}</span>
      </a>
    </article>
  );
}

function buildGoogleReviewsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
