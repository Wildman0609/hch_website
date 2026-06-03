import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CalendarDays, Home, Images } from "lucide-react";
import { AdmissionsCTA } from "@/components/AdmissionsCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionIntro } from "@/components/SectionIntro";
import { sortedHomeEvents, type HomeEvent, type HomeEventPhoto } from "@/data/homeEvents";
import { homes, type CareHome } from "@/data/homes";

export const metadata: Metadata = {
  title: "Events & Photos",
  description:
    "See recent activities, celebrations and everyday moments from Hollyman Care Homes across Norfolk."
};

const homesBySlug = new Map(homes.map((home) => [home.slug, home]));
const representedHomes = homes
  .map((home) => ({
    home,
    events: sortedHomeEvents.filter((event) => event.homeSlug === home.slug)
  }))
  .filter((item) => item.events.length > 0);

export default function EventsPage() {
  const totalPhotos = sortedHomeEvents.reduce((count, event) => count + event.photos.length, 0);

  return (
    <>
      <Hero eventCount={sortedHomeEvents.length} photoCount={totalPhotos} />

      <section className="bg-holly-cream py-10 md:py-14">
        <div className="section-shell">
          <div className="grid gap-6 border-y border-holly-ink/10 py-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-holly-leaf shadow-soft">
                <Images aria-hidden size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
                  Life in our homes
                </p>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-holly-ink/72">
                  Activities, visitors, seasonal celebrations and quieter everyday moments
                  all help each home feel familiar. Browse the latest photos or jump straight
                  to a home below.
                </p>
              </div>
            </div>

            <nav aria-label="Homes in this gallery" className="flex flex-wrap gap-3 lg:justify-end">
              {representedHomes.map(({ home, events }) => (
                <Link
                  key={home.slug}
                  href={`#${home.slug}-events`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-holly-ink/10 bg-white px-4 py-2 text-sm font-semibold text-holly-ink transition hover:border-holly-leaf hover:bg-holly-sky"
                >
                  <Home aria-hidden size={16} />
                  {home.shortName}
                  <span className="rounded-full bg-holly-cream px-2 py-0.5 text-xs text-holly-ink/64">
                    {events.length}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="section-shell">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionIntro
              eyebrow="Latest first"
              title="Recent events across the homes"
              text="Photos from recent activities and celebrations, grouped by event and ordered with the most recent moments first."
            />
            <ButtonLink
              href="/contact?reason=viewing"
              variant="outline"
              icon={<ArrowRight aria-hidden size={17} />}
              ctaId="events_gallery_book_viewing"
              className="md:mb-2"
            >
              Book a viewing
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-8">
            {sortedHomeEvents.map((event, index) => (
              <EventCard key={event.id} event={event} priority={index < 2} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-holly-sky py-14 md:py-20">
        <div className="section-shell">
          <SectionIntro
            eyebrow="By home"
            title="Explore events by home"
            text="Each home has its own character, routines and activities. Use these links to move between the photos and the full home pages."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {representedHomes.map(({ home, events }) => (
              <HomeEventSummary key={home.slug} home={home} events={events} />
            ))}
          </div>
        </div>
      </section>

      <AdmissionsCTA
        title="Seen a home you would like to visit?"
        text="Photos can help a home feel familiar, but a viewing lets you meet the team and ask about availability, rooms and care needs."
        ctaPrefix="events_page"
      />
    </>
  );
}

function Hero({ eventCount, photoCount }: { eventCount: number; photoCount: number }) {
  return (
    <section className="relative isolate overflow-hidden bg-holly-ink text-white">
      <Image
        src="/images/events/braydeston-court-seated-sosa.webp"
        alt="Residents gathered for an activity in a Hollyman care home lounge."
        fill
        priority
        loading="eager"
        sizes="100vw"
        className="object-cover opacity-48"
        style={{ objectPosition: "50% 46%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-holly-ink via-holly-ink/82 to-holly-ink/28" />
      <div className="section-shell relative flex min-h-[min(72svh,42rem)] items-center py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20">
            <Images aria-hidden size={17} />
            Events & photos
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            Home life and events
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/86 md:text-xl">
            Recent activities, seasonal celebrations and everyday moments from across the Hollyman homes.
          </p>
          <dl className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 ring-1 ring-white/18">
              <CalendarDays aria-hidden size={16} />
              <dt className="sr-only">Events</dt>
              <dd>{eventCount} events</dd>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 ring-1 ring-white/18">
              <Images aria-hidden size={16} />
              <dt className="sr-only">Photos</dt>
              <dd>{photoCount} selected photos</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, priority }: { event: HomeEvent; priority: boolean }) {
  const home = getEventHome(event);

  return (
    <article
      id={event.id}
      className="overflow-hidden rounded-[1.5rem] border border-holly-ink/10 bg-white shadow-soft"
    >
      <div className="grid gap-0 lg:grid-cols-[1.06fr_0.94fr]">
        <EventPhotoGrid photos={event.photos} priority={priority} />
        <div className="flex flex-col justify-center p-6 md:p-8">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-holly-leaf px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
              {event.homeInitials}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-holly-cream px-3 py-1 text-xs font-semibold text-holly-ink/72">
              <CalendarDays aria-hidden size={14} />
              {event.dateLabel}
            </span>
          </div>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
            {home.name}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-holly-ink md:text-4xl">
            {event.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-holly-ink/72">
            {event.summary}
          </p>
          <Link
            href={`/homes/${home.slug}`}
            className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-holly-leaf hover:text-holly-moss"
          >
            View {home.shortName}
            <ArrowRight aria-hidden size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function EventPhotoGrid({
  photos,
  priority
}: {
  photos: HomeEventPhoto[];
  priority: boolean;
}) {
  return (
    <div className="grid gap-2 bg-holly-ink/5 p-2 sm:grid-cols-2">
      {photos.map((photo, index) => (
        <figure
          key={photo.src}
          className={`relative overflow-hidden rounded-lg bg-holly-ink/10 ${
            index === 0 && photos.length > 1
              ? "aspect-[16/10] sm:col-span-2"
              : "aspect-[4/3]"
          }`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={
              index === 0 && photos.length > 1
                ? "(min-width: 1024px) 53vw, 100vw"
                : "(min-width: 1024px) 26vw, 50vw"
            }
            priority={priority && index === 0}
            className="object-cover"
            style={{ objectPosition: photo.position ?? "50% 50%" }}
          />
        </figure>
      ))}
    </div>
  );
}

function HomeEventSummary({ home, events }: { home: CareHome; events: HomeEvent[] }) {
  const photoCount = events.reduce((count, event) => count + event.photos.length, 0);

  return (
    <article id={`${home.slug}-events`} className="rounded-[1.2rem] bg-white p-6 shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
        {events[0]?.homeInitials}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold text-holly-ink">
        {home.shortName}
      </h2>
      <p className="mt-3 text-sm leading-7 text-holly-ink/68">
        {events.length} event{events.length === 1 ? "" : "s"} and {photoCount} selected photo
        {photoCount === 1 ? "" : "s"} from {home.shortName}.
      </p>
      <Link
        href={`/homes/${home.slug}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-holly-leaf hover:text-holly-moss"
      >
        View home page
        <ArrowRight aria-hidden size={16} />
      </Link>
    </article>
  );
}

function getEventHome(event: HomeEvent) {
  const home = homesBySlug.get(event.homeSlug);

  if (!home) {
    throw new Error(`No home found for event ${event.id}`);
  }

  return home;
}
