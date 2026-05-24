import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  HeartHandshake,
  MapPin,
  Phone,
  Sparkles,
  UserRound,
  UsersRound
} from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { EnquiryForm } from "@/components/EnquiryForm";
import { HomeCard } from "@/components/HomeCard";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionIntro } from "@/components/SectionIntro";
import { getHome, homes } from "@/data/homes";
import { homeSchema } from "@/lib/schema";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return homes.map((home) => ({ slug: home.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const home = getHome(slug);

  if (!home) {
    return {};
  }

  return {
    title: `${home.name} Care Home in ${home.location}`,
    description: `${home.name} is a Hollyman Care Home in ${home.location}. ${home.summary}`
  };
}

export default async function HomeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const home = getHome(slug);

  if (!home) {
    notFound();
  }

  const otherHomes = homes.filter((item) => item.slug !== home.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={homeSchema(home.slug)} />
      <PageHero
        eyebrow={home.location}
        title={`${home.name} care home`}
        text={home.intro}
        image={home.image}
        imageAlt={home.imageAlt}
        ctaLabel="Book a viewing"
        ctaHref={`/contact?reason=viewing&home=${encodeURIComponent(home.name)}`}
      />

      <section className="bg-holly-cream py-14 md:py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-start">
          <div className="rounded-[1.5rem] bg-white p-6 shadow-soft md:p-8">
            <SectionIntro
              eyebrow="About this home"
              title="A setting designed for familiarity, privacy and calm."
              text={home.summary}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {home.highlights.map((highlight) => (
                <div key={highlight} className="rounded-[1.1rem] bg-holly-sky p-5">
                  <p className="font-semibold leading-7 text-holly-ink">{highlight}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h2 className="font-display text-3xl font-semibold text-holly-ink">
                Bedrooms and daily comfort
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {home.roomHighlights.map((item) => (
                  <p key={item} className="rounded-xl border border-holly-ink/10 px-4 py-3 text-sm font-semibold text-holly-ink/75">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-[1.5rem] bg-holly-ink p-6 text-white shadow-soft md:p-8">
            <h2 className="font-display text-3xl font-semibold">Speak to {home.name}</h2>
            <dl className="mt-6 grid gap-5 text-sm">
              <div className="flex gap-3">
                <Phone aria-hidden className="mt-1 text-holly-leafLight" size={19} />
                <div>
                  <dt className="font-semibold text-white">Phone</dt>
                  <dd className="mt-1 text-white/72">{home.phone}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin aria-hidden className="mt-1 text-holly-leafLight" size={19} />
                <div>
                  <dt className="font-semibold text-white">Address</dt>
                  <dd className="mt-1 text-white/72">{home.address.join(", ")}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <UserRound aria-hidden className="mt-1 text-holly-leafLight" size={19} />
                <div>
                  <dt className="font-semibold text-white">Manager</dt>
                  <dd className="mt-1 text-white/72">{home.manager}</dd>
                </div>
              </div>
            </dl>
            <div className="mt-7 grid gap-3">
              <ButtonLink href={home.phoneHref} icon={<Phone aria-hidden size={17} />} ctaId={`home-detail-call-${home.slug}`}>
                Call this home
              </ButtonLink>
              <ButtonLink
                href={`/contact?reason=viewing&home=${encodeURIComponent(home.name)}`}
                variant="secondary"
                icon={<CalendarDays aria-hidden size={17} />}
                ctaId={`home-detail-viewing-${home.slug}`}
              >
                Book a viewing
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-holly-sky py-14 md:py-20">
        <div className="section-shell">
          <SectionIntro
            eyebrow="Meet the team"
            title={`Meet the people at ${home.name}`}
            text={`Led by ${home.manager}, the ${home.shortName} team supports residents with familiar routines, practical reassurance and a calm daily rhythm.`}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="grid gap-6">
              {home.teamMembers.map((member) => (
                <article
                  key={`${member.name}-${member.role}`}
                  className="overflow-hidden rounded-[1.5rem] border border-holly-ink/10 bg-white shadow-soft"
                >
                  <div className="grid gap-0 md:grid-cols-[0.38fr_0.62fr]">
                    <div className="bg-holly-ink p-6 text-white md:p-8">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-holly-leaf text-2xl font-semibold text-white">
                        {getInitials(member.name)}
                      </div>
                      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-holly-leafLight">
                        {member.role}
                      </p>
                      <h3 className="mt-3 font-display text-3xl font-semibold leading-tight">
                        {member.name}
                      </h3>
                      {member.details ? (
                        <dl className="mt-6 grid gap-3">
                          {member.details.map((detail) => (
                            <div key={detail} className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/12">
                              <dt className="sr-only">Profile detail</dt>
                              <dd className="text-sm font-semibold leading-6 text-white/86">{detail}</dd>
                            </div>
                          ))}
                        </dl>
                      ) : null}
                    </div>
                    <div className="p-6 md:p-8">
                      {member.quote ? (
                        <blockquote className="rounded-[1.2rem] bg-holly-cream p-5 font-display text-2xl font-semibold leading-snug text-holly-ink">
                          "{member.quote}"
                        </blockquote>
                      ) : null}
                      <div className={member.quote ? "mt-6 grid gap-4" : "grid gap-4"}>
                        {member.bio.map((paragraph) => (
                          <p key={paragraph} className="text-base leading-8 text-holly-ink/75">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      {member.focusAreas ? (
                        <div className="mt-7">
                          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
                            What they focus on
                          </p>
                          <ul className="mt-4 grid gap-3">
                            {member.focusAreas.map((focus) => (
                              <li key={focus} className="flex gap-3 rounded-xl border border-holly-ink/10 bg-holly-sky px-4 py-3 text-sm font-semibold leading-6 text-holly-ink/78">
                                <Sparkles aria-hidden className="mt-0.5 flex-none text-holly-gold" size={17} />
                                {focus}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      {member.personal ? (
                        <div className="mt-7 rounded-[1.2rem] border border-holly-gold/25 bg-holly-cream p-5">
                          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-rust">
                            A little more about {getFirstName(member.name)}
                          </p>
                          <p className="mt-3 text-sm leading-7 text-holly-ink/72">{member.personal}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="rounded-[1.5rem] bg-holly-ink p-6 text-white shadow-soft md:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-holly-leafLight/18 text-holly-leafLight">
                <HeartHandshake aria-hidden size={28} />
              </div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-holly-leafLight">
                What this means for families
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold leading-tight">
                A team families can get to know.
              </h3>
              <div className="mt-6 grid gap-3">
                {home.teamApproach.map((point) => (
                  <div key={point} className="flex gap-3 rounded-2xl bg-white/9 p-4 ring-1 ring-white/10">
                    <UsersRound aria-hidden className="mt-1 flex-none text-holly-leafLight" size={18} />
                    <p className="text-sm leading-7 text-white/78">{point}</p>
                  </div>
                ))}
              </div>
              <ButtonLink
                href={`/contact?reason=viewing&home=${encodeURIComponent(home.name)}`}
                variant="secondary"
                icon={<ArrowRight aria-hidden size={17} />}
                className="mt-7 w-full"
                ctaId={`meet-team-${home.slug}`}
              >
                Meet the team
              </ButtonLink>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionIntro
            eyebrow="Enquire"
            title={`Ask about ${home.name}`}
            text="You can ask about availability, suitability, care needs, visiting or what to expect from a viewing."
          />
          <EnquiryForm preferredHome={home.name} compactIntro reason={`home-${home.slug}`} />
        </div>
      </section>

      <section className="bg-holly-sky py-14 md:py-20">
        <div className="section-shell">
          <SectionIntro
            eyebrow="Also nearby"
            title="Other Hollyman homes"
            text="If this home is not quite the right location or care fit, the team can help compare options."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {otherHomes.map((item) => (
              <HomeCard key={item.slug} home={item} compact />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getFirstName(name: string) {
  return name.split(" ").filter(Boolean)[0] ?? name;
}
