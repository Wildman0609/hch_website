import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  HeartHandshake,
  Images,
  MapPin,
  Phone,
  ClipboardList,
  UserRound,
  UsersRound
} from "lucide-react";
import { AdmissionsCTA } from "@/components/AdmissionsCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { EnquiryForm } from "@/components/EnquiryForm";
import { HomeCard } from "@/components/HomeCard";
import { HomePhotoGallery } from "@/components/HomePhotoGallery";
import { HomeReviews } from "@/components/HomeReviews";
import { JsonLd } from "@/components/JsonLd";
import { ManagerProfile } from "@/components/ManagerProfile";
import { PageHero } from "@/components/PageHero";
import { QualityRatings } from "@/components/QualityRatings";
import { SectionIntro } from "@/components/SectionIntro";
import { sortedHomeEvents, type HomeEvent, type HomeEventPhoto } from "@/data/homeEvents";
import {
  getHome,
  homes,
  type CareHome,
  type CareHomeHistory,
  type CareHomeHistoryImage
} from "@/data/homes";
import { faqSchema, homeSchema } from "@/lib/schema";

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
  const homeEvents = sortedHomeEvents.filter((event) => event.homeSlug === home.slug);
  const deputies = home.deputies.filter((deputy) => deputy.name || deputy.photo);
  const homeTrackingSlug = home.slug.replaceAll("-", "_");

  return (
    <>
      <JsonLd data={[...homeSchema(home.slug), faqSchema(home.familyFaqs, `${home.slug}-family-faqs`)]} />
      <PageHero
        eyebrow={home.location}
        title={`${home.name} care home`}
        text={home.intro}
        image={home.image}
        imageAlt={home.imageAlt}
        ctaLabel="Book a viewing"
        ctaHref={`/contact?reason=viewing&home=${encodeURIComponent(home.name)}`}
        primaryCtaId={`call_home_page_${homeTrackingSlug}`}
        secondaryCtaId={`book_viewing_home_page_${homeTrackingSlug}`}
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
              <ButtonLink href={home.phoneHref} icon={<Phone aria-hidden size={17} />} ctaId={`call_home_page_${homeTrackingSlug}`}>
                Call this home
              </ButtonLink>
              <ButtonLink
                href={`/contact?reason=viewing&home=${encodeURIComponent(home.name)}`}
                variant="secondary"
                icon={<CalendarDays aria-hidden size={17} />}
                ctaId={`book_viewing_home_page_${homeTrackingSlug}`}
              >
                Book a viewing
              </ButtonLink>
              <ButtonLink
                href={`/contact?reason=availability&home=${encodeURIComponent(home.name)}`}
                variant="outline"
                ctaId={`ask_availability_home_page_${homeTrackingSlug}`}
                className="border-white/30 bg-white text-holly-ink"
              >
                Ask about availability
              </ButtonLink>
              <ButtonLink
                href={`/request-brochure?home=${encodeURIComponent(home.name)}`}
                variant="outline"
                ctaId={`request_brochure_home_page_${homeTrackingSlug}`}
                className="border-white/30 bg-white text-holly-ink"
              >
                Request a brochure by post
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>

      <QualityRatings home={home} />

      <HomePhotoGallery homeName={home.name} images={home.gallery} />

      <HomeFitSection home={home} />

      <AdmissionsCTA
        title={`Want to know if ${home.name} could be right?`}
        text="Speak to the team about availability, suitability, viewing times or a printed brochure. You can start with a few questions."
        homeName={home.name}
        ctaPrefix={`home_${homeTrackingSlug}`}
      />

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
              <ManagerProfile
                key={`${member.name}-${member.role}`}
                person={member}
                ctaHref={`/contact?reason=viewing&home=${encodeURIComponent(home.name)}`}
                ctaId={`meet_manager_${homeTrackingSlug}`}
              />
            ))}

            {deputies.length > 0 ? (
              <div className="border-t border-holly-ink/10 pt-10">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
                    Deputy team
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-holly-ink">
                    Deputies at {home.shortName}
                  </h3>
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {deputies.map((deputy, index) => (
                    <ManagerProfile
                      key={`${deputy.role}-${index}`}
                      person={deputy}
                      variant="card"
                    />
                  ))}
                </div>
              </div>
            ) : null}

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

      {homeEvents.length > 0 ? <HomeLifeSection home={home} events={homeEvents} /> : null}

      <VisitingFaqSection home={home} />

      <section className="bg-white py-14 md:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionIntro
            eyebrow="Enquire"
            title={`Ask about ${home.name}`}
            text="You can ask about availability, suitability, care needs, visiting or what to expect from a viewing."
          />
          <EnquiryForm
            preferredHome={home.name}
            compactIntro
            reason={`home-${home.slug}`}
            actionPath="/thank-you/general-enquiry"
            submitCtaId={`home_${homeTrackingSlug}_enquiry_submit`}
          />
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

function HomeFitSection({ home }: { home: CareHome }) {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <SectionIntro
            eyebrow="Feel and fit"
            title={`What ${home.name} feels like before you visit.`}
            text="Families often need more than a list of facilities. These notes help you picture the home, who it may suit and what to ask next."
          />
          <div className="mt-8 grid gap-4">
            {home.feelsLike.map((point) => (
              <div key={point} className="rounded-[1.2rem] bg-holly-sky p-5">
                <div className="flex gap-3">
                  <HeartHandshake aria-hidden className="mt-1 flex-none text-holly-leaf" size={20} />
                  <p className="font-semibold leading-7 text-holly-ink">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <article className="rounded-[1.4rem] border border-holly-ink/10 bg-holly-cream p-6 shadow-soft">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-holly-leaf">
              <CheckCircle2 aria-hidden size={22} />
            </div>
            <h2 className="font-display text-3xl font-semibold text-holly-ink">
              Who this home may suit
            </h2>
            <ul className="mt-5 grid gap-3">
              {home.maySuit.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-semibold leading-7 text-holly-ink/74">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-holly-leaf" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[1.4rem] bg-holly-ink p-6 text-white shadow-soft">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-holly-leafLight">
              <ClipboardList aria-hidden size={23} />
            </div>
            <h2 className="font-display text-3xl font-semibold">Care types available</h2>
            <ul className="mt-5 grid gap-3">
              {home.careTypes.map((item) => (
                <li key={item} className="rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white/82">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

function VisitingFaqSection({ home }: { home: CareHome }) {
  return (
    <section className="bg-holly-cream py-14 md:py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="grid gap-5">
          <SectionIntro
            eyebrow="Visiting and local area"
            title={`Planning a first visit to ${home.name}.`}
            text={home.visiting.summary}
          />
          <article className="rounded-[1.25rem] bg-white p-6 shadow-soft">
            <div className="flex gap-4">
              <MapPin aria-hidden className="mt-1 flex-none text-holly-leaf" size={22} />
              <div>
                <h2 className="font-display text-2xl font-semibold text-holly-ink">
                  Local area context
                </h2>
                <p className="mt-3 text-sm leading-7 text-holly-ink/72">{home.localArea}</p>
              </div>
            </div>
          </article>
          <article className="rounded-[1.25rem] bg-white p-6 shadow-soft">
            <div className="flex gap-4">
              <CalendarDays aria-hidden className="mt-1 flex-none text-holly-leaf" size={22} />
              <div>
                <h2 className="font-display text-2xl font-semibold text-holly-ink">
                  Visiting and parking
                </h2>
                <p className="mt-3 text-sm leading-7 text-holly-ink/72">{home.visiting.parking}</p>
                <p className="mt-3 text-sm leading-7 text-holly-ink/72">{home.visiting.firstViewing}</p>
              </div>
            </div>
          </article>
        </div>

        <div>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-holly-leaf shadow-soft">
              <CircleHelp aria-hidden size={21} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
                Family questions
              </p>
              <h2 className="font-display text-3xl font-semibold text-holly-ink">
                What families usually ask us
              </h2>
            </div>
          </div>
          <div className="grid gap-3">
            {home.familyFaqs.map((faq) => (
              <details key={faq.question} className="group rounded-[1.15rem] bg-white p-5 shadow-soft">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <span className="font-semibold leading-7 text-holly-ink">{faq.question}</span>
                  <span className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-holly-sky text-holly-leaf transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-holly-ink/72">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeLifeSection({ home, events }: { home: CareHome; events: HomeEvent[] }) {
  const photos = events.flatMap((event) => event.photos).slice(0, 3);
  const latestEvent = events[0];
  const eventLabel = `${events.length} recent event${events.length === 1 ? "" : "s"}`;

  return (
    <section className="bg-holly-cream py-14 md:py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <SectionIntro
            eyebrow={`Life at ${home.shortName}`}
            title={`See daily life and events at ${home.name}`}
            text={`${home.shortName} has photos from ${eventLabel}, including ${latestEvent.title}. These moments help show the atmosphere families can expect when they visit.`}
          />
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={`/contact?reason=viewing&home=${encodeURIComponent(home.name)}`}
              icon={<CalendarDays aria-hidden size={17} />}
              ctaId={`home_life_viewing_${home.slug.replaceAll("-", "_")}`}
            >
              Book a viewing
            </ButtonLink>
            <ButtonLink
              href={`/events#${home.slug}-events`}
              variant="outline"
              icon={<Images aria-hidden size={17} />}
              ctaId={`home_life_events_${home.slug.replaceAll("-", "_")}`}
            >
              More photos
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {photos.map((photo, index) => (
            <HomeLifePhoto key={photo.src} photo={photo} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeLifePhoto({
  photo,
  featured
}: {
  photo: HomeEventPhoto;
  featured: boolean;
}) {
  return (
    <figure className={featured ? "sm:col-span-2" : undefined}>
      <div
        className={`relative overflow-hidden rounded-[1.25rem] bg-holly-ink shadow-soft ${
          featured ? "aspect-[16/9]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={featured ? "(min-width: 1024px) 40rem, 100vw" : "(min-width: 640px) 20rem, 100vw"}
          className="object-cover"
          style={{ objectPosition: photo.position ?? "50% 50%" }}
        />
      </div>
    </figure>
  );
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
