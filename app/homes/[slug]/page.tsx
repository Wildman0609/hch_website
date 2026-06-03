import Image from "next/image";
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
import { HomeReviews } from "@/components/HomeReviews";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionIntro } from "@/components/SectionIntro";
import {
  getHome,
  homes,
  type CareHomeHistory,
  type CareHomeHistoryImage,
  type DeputyProfile,
  type TeamMember
} from "@/data/homes";
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

      {home.history ? <HistorySection history={home.history} /> : null}

      <section className="bg-white py-14 md:py-20">
        <div className="section-shell">
          <SectionIntro
            eyebrow="Meet the team"
            title={`Meet the people at ${home.name}`}
            text={`Led by ${home.manager}, the ${home.shortName} team supports residents with familiar routines, practical reassurance and a calm daily rhythm.`}
          />

          <div className="mt-10 grid gap-12">
            {home.teamMembers.map((member) => (
              <article
                key={`${member.name}-${member.role}`}
                className="grid gap-8 lg:grid-cols-[minmax(16rem,22rem)_1fr] lg:items-start"
              >
                <ProfilePhoto person={member} />

                <div>
                  <div className="flex flex-col gap-4 border-b border-holly-ink/10 pb-6 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
                        {member.role}
                      </p>
                      <h3 className="mt-3 font-display text-4xl font-semibold leading-tight text-holly-ink md:text-5xl">
                        {member.name}
                      </h3>
                    </div>
                    <ButtonLink
                      href={`/contact?reason=viewing&home=${encodeURIComponent(home.name)}`}
                      variant="outline"
                      icon={<ArrowRight aria-hidden size={17} />}
                      className="w-fit"
                      ctaId={`meet-manager-${home.slug}`}
                    >
                      Book a viewing
                    </ButtonLink>
                  </div>

                  {member.quote ? (
                    <blockquote className="mt-6 border-l-4 border-holly-gold pl-5 font-display text-2xl font-semibold leading-snug text-holly-ink md:text-3xl">
                      "{member.quote}"
                    </blockquote>
                  ) : null}

                  {member.details ? (
                    <dl className="mt-6 flex flex-wrap gap-3">
                      {member.details.map((detail) => (
                        <div key={detail} className="rounded-full bg-holly-sky px-4 py-2">
                          <dt className="sr-only">Profile detail</dt>
                          <dd className="text-sm font-semibold text-holly-ink/76">{detail}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  <div className="mt-6 grid gap-4">
                    {member.bio.map((paragraph) => (
                      <p key={paragraph} className="max-w-4xl text-base leading-8 text-holly-ink/76">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {member.focusAreas ? (
                    <div className="mt-8">
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
                        What {getFirstName(member.name)} focuses on
                      </p>
                      <ul className="mt-4 grid gap-4 md:grid-cols-3">
                        {member.focusAreas.map((focus) => (
                          <li key={focus} className="border-t border-holly-ink/12 pt-4 text-sm font-semibold leading-7 text-holly-ink/76">
                            <Sparkles aria-hidden className="mb-3 text-holly-gold" size={18} />
                            {focus}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {member.personal ? (
                    <div className="mt-8 rounded-[1.2rem] bg-holly-cream p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-rust">
                        A little more about {getFirstName(member.name)}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-holly-ink/72">{member.personal}</p>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}

            <div className="border-t border-holly-ink/10 pt-10">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
                    Deputy team
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-holly-ink">
                    Deputies at {home.shortName}
                  </h3>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-holly-ink/68">
                  These spaces are ready for two deputy photos and short biographies once the names and copy are confirmed.
                </p>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {home.deputies.map((deputy, index) => (
                  <DeputyCard key={`${deputy.role}-${index}`} deputy={deputy} index={index} />
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-holly-ink p-6 text-white shadow-soft md:p-8">
              <div className="grid gap-8 lg:grid-cols-[0.5fr_1fr] lg:items-start">
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-holly-leafLight/18 text-holly-leafLight">
                    <HeartHandshake aria-hidden size={28} />
                  </div>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-holly-leafLight">
                    What this means for families
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold leading-tight">
                    A team families can get to know.
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {home.teamApproach.map((point) => (
                    <div key={point} className="border-t border-white/18 pt-4">
                      <UsersRound aria-hidden className="mb-3 text-holly-leafLight" size={18} />
                      <p className="text-sm leading-7 text-white/78">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeReviews home={home} />

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

function getFirstName(name: string) {
  return name.split(" ").filter(Boolean)[0] ?? name;
}

function HistorySection({ history }: { history: CareHomeHistory }) {
  const [featuredImage, ...supportingImages] = history.images;

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <SectionIntro eyebrow="History" title={history.title} text={history.intro} />

          <div className="mt-7 grid gap-4">
            {history.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-holly-ink/76">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 border-l-4 border-holly-gold pl-5">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-rust">
              From the original brochure
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {history.brochureDetails.map((detail) => (
                <li key={detail} className="flex gap-3 text-sm font-semibold leading-7 text-holly-ink/74">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-holly-leaf" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-5">
          {featuredImage ? (
            <HistoryArchiveImage image={featuredImage} priority />
          ) : null}

          {supportingImages.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {supportingImages.map((image) => (
                <HistoryArchiveImage key={image.src} image={image} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function HistoryArchiveImage({
  image,
  priority = false
}: {
  image: CareHomeHistoryImage;
  priority?: boolean;
}) {
  const isWide = image.shape === "wide";

  return (
    <figure className={isWide ? "md:col-span-2" : undefined}>
      <div
        className={`relative overflow-hidden rounded-[1.25rem] border border-holly-ink/10 bg-white shadow-soft ${
          isWide ? "aspect-[40/9]" : "aspect-[3/2]"
        }`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={isWide ? "(min-width: 1024px) 52rem, 100vw" : "(min-width: 768px) 26rem, 100vw"}
          className="object-cover"
          priority={priority}
        />
      </div>
      <figcaption className="mt-3 text-sm leading-6 text-holly-ink/66">
        {image.caption}
      </figcaption>
    </figure>
  );
}

function ProfilePhoto({ person }: { person: TeamMember }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-holly-ink p-4 shadow-soft">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.15rem] bg-holly-cream">
        {person.photo ? (
          <Image
            src={person.photo}
            alt={person.photoAlt ?? `${person.name}, ${person.role}`}
            fill
            sizes="(min-width: 1024px) 22rem, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center text-holly-ink/68">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-holly-leaf shadow-soft">
              <UserRound aria-hidden size={44} />
            </div>
            <div>
              <p className="font-semibold text-holly-ink">Photo coming soon</p>
              <p className="mt-2 text-sm leading-6">Portrait space for {person.name}</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-4 px-2 pt-4 text-white">
        <div>
          <p className="text-sm font-semibold">{person.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-holly-leafLight">
            {person.role}
          </p>
        </div>
      </div>
    </div>
  );
}

function DeputyCard({ deputy, index }: { deputy: DeputyProfile; index: number }) {
  const name = deputy.name ?? `Deputy ${index + 1}`;

  return (
    <article className="grid gap-5 rounded-[1.25rem] border border-holly-ink/10 bg-holly-cream p-4 shadow-soft sm:grid-cols-[9rem_1fr]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] bg-white">
        {deputy.photo ? (
          <Image
            src={deputy.photo}
            alt={deputy.photoAlt ?? `${name}, ${deputy.role}`}
            fill
            sizes="9rem"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-3 text-center text-holly-ink/62">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-holly-sky text-holly-leaf">
              <UserRound aria-hidden size={28} />
            </div>
            <p className="text-xs font-semibold leading-5">Photo to add</p>
          </div>
        )}
      </div>
      <div className="py-1">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-holly-leaf">
          {deputy.role}
        </p>
        <h4 className="mt-2 font-display text-2xl font-semibold text-holly-ink">
          {name}
        </h4>
        <p className="mt-3 text-sm leading-7 text-holly-ink/70">{deputy.bio}</p>
      </div>
    </article>
  );
}
