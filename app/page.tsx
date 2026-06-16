import Image from "next/image";
import { ArrowRight, CalendarDays, FileText, HeartHandshake, Home, Images, Phone } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { EnquiryForm } from "@/components/EnquiryForm";
import { HomeCard } from "@/components/HomeCard";
import { JsonLd } from "@/components/JsonLd";
import { SectionIntro } from "@/components/SectionIntro";
import { ServiceCard } from "@/components/ServiceCard";
import { TrustBlocks } from "@/components/TrustBlocks";
import { UrgentPathways } from "@/components/UrgentPathways";
import { homes } from "@/data/homes";
import { reassurancePoints, site } from "@/data/site";
import { services } from "@/data/services";
import { submitCareEnquiry } from "@/app/contact/actions";
import { homeSchema, servicesSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[...homeSchema(), servicesSchema()]} />
      <Hero />
      <QuickConversionLinks />

      <section className="bg-holly-cream py-14 md:py-20">
        <div className="section-shell">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionIntro
              eyebrow="Find your nearest home"
              title="Four Norfolk homes, each with its own character."
              text="From village greens to peaceful gardens, each Hollyman home has a local feel and a team ready to help families make sense of the next step."
            />
            <ButtonLink
              href="/find-your-home"
              variant="outline"
              icon={<ArrowRight aria-hidden size={17} />}
              ctaId="homepage_all_homes"
              className="whitespace-nowrap md:mb-2"
            >
              Compare homes
            </ButtonLink>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {homes.map((home) => (
              <HomeCard key={home.slug} home={home} compact />
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-holly-ink/10 pt-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
                Life in our homes
              </p>
              <p className="mt-2 text-sm leading-7 text-holly-ink/70">
                Activities, visitors and seasonal moments help families see the character of each home.
              </p>
            </div>
            <ButtonLink
              href="/events"
              variant="plain"
              icon={<Images aria-hidden size={17} />}
              ctaId="homepage_events"
              className="w-fit px-0"
            >
              See life in our homes
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="soft-band py-14 md:py-20">
        <div className="section-shell">
          <SectionIntro
            align="center"
            eyebrow="Why families call Hollyman"
            title="Warm, local care without a corporate feel."
            text="Choosing care for a parent can feel heavy. The first job of the website is to make the next conversation feel possible."
          />
          <div className="mt-10">
            <TrustBlocks />
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="section-shell">
          <SectionIntro
            eyebrow="Care services"
            title="Support shaped around changing needs."
            text="The group offers residential, dementia, respite and palliative care. If you are not sure which applies, the team can help you talk it through."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-holly-cream py-14 md:py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionIntro
              eyebrow="Not sure what care you need?"
              title="Start with what has changed."
              text="A fall, a hospital stay, memory changes or carer exhaustion can all lead families here. You do not need the perfect wording before you speak to us."
            />
            <div className="mt-8 grid gap-4">
              {reassurancePoints.map((point) => (
                <div key={point.title} className="rounded-[1.2rem] bg-white p-5 shadow-soft">
                  <h3 className="font-semibold text-holly-ink">{point.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-holly-ink/70">{point.text}</p>
                </div>
              ))}
            </div>
          </div>
          <UrgentPathways />
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[1.6rem] bg-holly-ink shadow-soft">
            <Image
              src="/images/care-community.webp"
              alt="Residents and team members spending time together inside a Hollyman care home."
              width={1200}
              height={800}
              className="aspect-[4/3] w-full object-cover opacity-88"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-holly-ink to-transparent p-7 text-white">
              <p className="max-w-md text-lg font-semibold">
                Family involvement, familiar routines and everyday dignity are at the heart of the care approach.
              </p>
            </div>
          </div>
          <EnquiryForm
            action={submitCareEnquiry}
            reason="homepage"
            submitCtaId="homepage_enquiry_submit"
          />
        </div>
      </section>
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-9rem)] overflow-hidden bg-holly-ink text-white">
      <Image
        src="/images/hero-care.webp"
        alt="A Hollyman team member smiling with a resident during an activity."
        fill
        priority
        loading="eager"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-holly-ink via-holly-ink/78 to-holly-ink/20" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,37,42,0.18),rgba(23,37,42,0.3))]" />
      <div className="section-shell relative flex min-h-[calc(100svh-9rem)] items-center py-16">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20">
            <HeartHandshake aria-hidden size={17} />
            Family-run care homes across Norfolk
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] md:text-6xl lg:text-7xl">
            Calm, local care for the person you love.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/86 md:text-xl">
            Hollyman Care Homes supports older people and families across the Norfolk Broads with residential, dementia, respite and palliative care.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={site.phoneHref}
              icon={<Phone aria-hidden size={18} />}
              className="text-base"
              ctaId="homepage_hero_call"
            >
              Call now: {site.phone}
            </ButtonLink>
            <ButtonLink
              href="/care-home-vacancies-norfolk"
              variant="secondary"
              icon={<Home aria-hidden size={18} />}
              className="text-base"
              ctaId="homepage_hero_check_availability"
            >
              Check availability
            </ButtonLink>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-6 text-white/72">
            You can call just to ask questions. No pressure, no jargon, and no need to know the exact care type before you speak to us.
          </p>
        </div>
      </div>
    </section>
  );
}

function QuickConversionLinks() {
  const actions = [
    {
      title: "Check availability",
      text: "Ask about current rooms, viewings and next steps.",
      href: "/care-home-vacancies-norfolk",
      ctaId: "homepage_check_availability",
      icon: Home
    },
    {
      title: "I need help now",
      text: "For discharge, falls, dementia changes or carer burnout.",
      href: "/urgent-care-help",
      ctaId: "homepage_urgent_help",
      icon: HeartHandshake
    },
    {
      title: "Book a viewing",
      text: "Visit a home, meet the team and ask practical questions.",
      href: "/contact?reason=viewing",
      ctaId: "homepage_book_viewing",
      icon: CalendarDays
    },
    {
      title: "Request a brochure",
      text: "Ask for printed information for your family notes.",
      href: "/request-brochure",
      ctaId: "homepage_request_brochure",
      icon: FileText
    }
  ];

  return (
    <section className="bg-white py-6">
      <div className="section-shell">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                data-cta={action.ctaId}
                className="group flex min-h-[9rem] gap-4 rounded-[1.2rem] border border-holly-ink/10 bg-holly-cream p-5 transition hover:-translate-y-0.5 hover:bg-holly-sky hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-holly-leaf"
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white text-holly-leaf shadow-soft">
                  <Icon aria-hidden size={21} />
                </span>
                <span>
                  <span className="block font-display text-2xl font-semibold leading-tight text-holly-ink">
                    {action.title}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-holly-ink/68">
                    {action.text}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
