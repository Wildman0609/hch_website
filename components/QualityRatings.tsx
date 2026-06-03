import { BusFront, CarFront, ExternalLink, FileText, ShowerHead, ShieldCheck } from "lucide-react";
import { CqcWidget } from "@/components/CqcWidget";
import type { CareHome } from "@/data/homes";

type QualityRatingsProps = {
  home: CareHome;
};

export function QualityRatings({ home }: QualityRatingsProps) {
  const ratingClassName = getRatingClassName(home.regulatory.cqcRating);

  return (
    <section className="bg-holly-sky py-14 md:py-20">
      <div className="section-shell">
        <div className="mb-9 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
              Quality and regulation
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-holly-ink md:text-5xl">
              Official ratings and practical visiting details.
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-8 text-holly-ink/72">
            The CQC widget below is the official location widget for {home.name}. Families can also review local authority PAMMS information where a public report is available.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[1.4rem] border border-holly-ink/10 bg-white p-5 shadow-soft md:p-6">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
                  Care Quality Commission
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold text-holly-ink">
                  CQC rating
                </h3>
              </div>
              <span className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${ratingClassName}`}>
                Overall: {home.regulatory.cqcRating}
              </span>
            </div>
            <div className="overflow-hidden rounded-[1rem] border border-holly-ink/10 bg-holly-cream p-3">
              <CqcWidget locationId={home.regulatory.cqcLocationId} />
            </div>
            <a
              href={home.regulatory.cqcUrl}
              target="_blank"
              rel="noreferrer"
              data-cta={`cqc_profile_${home.slug.replaceAll("-", "_")}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-holly-leaf hover:text-holly-moss"
            >
              Open official CQC profile
              <ExternalLink aria-hidden size={16} />
            </a>
          </article>

          <div className="grid gap-5">
            <article className="rounded-[1.4rem] border border-holly-ink/10 bg-white p-5 shadow-soft md:p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-holly-sky text-holly-leaf">
                <ShieldCheck aria-hidden size={23} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
                PAMMS
              </p>
              <h3 className="mt-2 font-display text-3xl font-semibold text-holly-ink">
                {home.regulatory.pamms ? `PAMMS: ${home.regulatory.pamms.rating}` : "PAMMS report"}
              </h3>
              {home.regulatory.pamms ? (
                <>
                  <p className="mt-3 text-sm leading-7 text-holly-ink/72">
                    Public PAMMS assessment completed {home.regulatory.pamms.assessmentDate}.
                  </p>
                  <a
                    href={home.regulatory.pamms.reportUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cta={`pamms_report_${home.slug.replaceAll("-", "_")}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-holly-leaf hover:text-holly-moss"
                  >
                    Read PAMMS report
                    <FileText aria-hidden size={16} />
                  </a>
                </>
              ) : (
                <p className="mt-3 text-sm leading-7 text-holly-ink/72">
                  Add the latest PAMMS report URL in the home data when available. The CQC widget remains the official rating display for this home.
                </p>
              )}
            </article>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: CarFront,
                  label: "Parking",
                  text: "Ample on-site parking"
                },
                {
                  icon: BusFront,
                  label: "Bus routes",
                  text: "Served by local bus routes"
                },
                {
                  icon: ShowerHead,
                  label: "Rooms",
                  text: "En-suite rooms available"
                }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.label} className="rounded-[1.1rem] bg-holly-ink p-4 text-white shadow-soft">
                    <Icon aria-hidden className="text-holly-leafLight" size={22} />
                    <h3 className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-holly-leafLight">
                      {item.label}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-white/84">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getRatingClassName(rating: CareHome["regulatory"]["cqcRating"]) {
  if (rating === "Good" || rating === "Outstanding") {
    return "bg-holly-leaf text-white";
  }

  if (rating === "Requires improvement") {
    return "bg-holly-gold/18 text-holly-rust ring-1 ring-holly-gold/35";
  }

  return "bg-holly-ink text-white";
}
