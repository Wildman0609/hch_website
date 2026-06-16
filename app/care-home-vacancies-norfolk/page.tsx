import type { Metadata } from "next";
import { ArrowRight, CalendarDays, CheckCircle2, Home, MapPin, Phone, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { EnquiryForm } from "@/components/EnquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { SectionIntro } from "@/components/SectionIntro";
import { submitCareEnquiry } from "@/app/contact/actions";
import { homes } from "@/data/homes";
import { site } from "@/data/site";
import { faqSchema, homeSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Care Home Availability in Norfolk",
  description:
    "Ask about care home availability, urgent admissions and viewings at family-run Hollyman Care Homes across Acle, Upton, Brundall, Martham and Potter Heigham."
};

const availabilityFaqs = [
  {
    question: "Do Hollyman Care Homes currently have rooms available?",
    answer:
      "Availability can change quickly, so the quickest route is to call or send an enquiry. The team can talk through current room options, viewing times and whether a home may suit your loved one's needs."
  },
  {
    question: "Can you help if care is needed urgently?",
    answer:
      "Yes. If the situation involves discharge, a fall, a sudden change in dementia needs or carer exhaustion, call the team so they can explain the practical next step."
  },
  {
    question: "Which areas do the homes cover?",
    answer:
      "The homes support families around Upton and Acle, Brundall, Martham, Potter Heigham, Great Yarmouth routes and the wider Norfolk Broads area."
  },
  {
    question: "Do you offer nursing care?",
    answer:
      "Hollyman Care Homes focuses on residential, dementia, respite and palliative care. If nursing needs are part of the picture, the team can still listen and explain whether a Hollyman home may be appropriate."
  }
];

const reasons = [
  "You are looking for a care home bed now or in the next few weeks.",
  "You want to book a viewing before making a family decision.",
  "You are comparing residential, dementia, respite or palliative care options.",
  "You need guidance after a hospital stay, fall or change at home."
];

const supportSteps = [
  {
    title: "Tell us what has changed",
    text: "Share the area, timescale, care needs and whether the move is urgent."
  },
  {
    title: "Check suitable homes",
    text: "The team can explain which homes may fit and what availability/viewing options look like."
  },
  {
    title: "Arrange the next step",
    text: "That may be a call back, viewing, assessment conversation or a brochure for family notes."
  }
];

export default function CareHomeVacanciesNorfolkPage() {
  return (
    <>
      <JsonLd data={[...homeSchema(), faqSchema(availabilityFaqs, "care-home-availability-faq")]} />
      <Hero />
      <section className="bg-white py-12 md:py-16">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionIntro
              eyebrow="Availability and viewings"
              title="A focused route for families ready to talk."
              text="If you are ready to ask about rooms, viewings or a possible move, start here and the team can guide you through the next practical step."
            />
            <div className="mt-8 grid gap-3">
              {reasons.map((reason) => (
                <div
                  key={reason}
                  className="flex gap-3 rounded-[1.1rem] border border-holly-ink/10 bg-holly-cream p-4"
                >
                  <CheckCircle2 aria-hidden className="mt-0.5 flex-none text-holly-leaf" size={20} />
                  <p className="text-sm leading-6 text-holly-ink/76">{reason}</p>
                </div>
              ))}
            </div>
          </div>
          <div id="availability-enquiry" className="scroll-mt-24">
            <EnquiryForm
              action={submitCareEnquiry}
              reason="care-home-availability-norfolk"
              urgency="weeks"
              compactIntro
              submitLabel="Check availability"
              submitCtaId="availability_page_form_submit"
            />
          </div>
        </div>
      </section>

      <section className="bg-holly-cream py-14 md:py-20">
        <div className="section-shell">
          <SectionIntro
            eyebrow="Norfolk homes"
            title="Care homes families are searching for around the Broads."
            text="Homes are close to local searches around Acle, Upton, Brundall, Martham, Potter Heigham, Great Yarmouth routes and the surrounding Norfolk area."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {homes.map((home) => (
              <article key={home.slug} className="rounded-[1.25rem] bg-white p-5 shadow-soft">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-holly-ink">
                      {home.name}
                    </h2>
                    <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-holly-leaf">
                      <MapPin aria-hidden size={16} />
                      {home.location}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-holly-ink/72">{home.summary}</p>
                  </div>
                  {home.capacity ? (
                    <p className="w-fit rounded-full bg-holly-sky px-3 py-1 text-xs font-semibold text-holly-ink">
                      {home.capacity}
                    </p>
                  ) : null}
                </div>
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-holly-ink/72">
                  {home.careTypes.slice(0, 3).map((careType) => (
                    <li key={careType} className="flex gap-2">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-holly-leaf" />
                      {careType}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink
                    href={home.phoneHref}
                    icon={<Phone aria-hidden size={17} />}
                    ctaId={`availability_call_${home.slug.replaceAll("-", "_")}`}
                  >
                    Call home
                  </ButtonLink>
                  <ButtonLink
                    href={`/contact?reason=viewing&home=${encodeURIComponent(home.name)}`}
                    variant="outline"
                    icon={<CalendarDays aria-hidden size={17} />}
                    ctaId={`availability_viewing_${home.slug.replaceAll("-", "_")}`}
                  >
                    Book viewing
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionIntro
            eyebrow="What happens next"
            title="A short call can save a lot of uncertainty."
            text="Families often arrive after searching broad phrases like care homes near me, care homes Norfolk or care homes Great Yarmouth. The useful next step is to match area, needs and timescale."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {supportSteps.map((step, index) => (
              <article key={step.title} className="rounded-[1.2rem] border border-holly-ink/10 bg-holly-sky p-5">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-holly-leaf shadow-soft">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                <h2 className="font-display text-xl font-semibold text-holly-ink">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-holly-ink/70">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-holly-ink py-12 text-white md:py-14">
        <div className="section-shell grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leafLight">
              Ready to check?
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight md:text-4xl">
              Call now or send the availability form.
            </h2>
            <p className="mt-3 text-base leading-7 text-white/74">
              The team can talk through rooms, viewings and whether a Hollyman home may suit your loved one.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={site.phoneHref}
              icon={<Phone aria-hidden size={17} />}
              ctaId="availability_footer_call"
            >
              Call {site.phone}
            </ButtonLink>
            <ButtonLink
              href="#availability-enquiry"
              variant="secondary"
              icon={<ArrowRight aria-hidden size={17} />}
              ctaId="availability_footer_form"
            >
              Check availability
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-holly-ink text-white">
      <div className="absolute inset-0 bg-[url('/images/home-broadlands.webp')] bg-cover bg-center opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-r from-holly-ink via-holly-ink/86 to-holly-ink/45" />
      <div className="section-shell relative grid min-h-[calc(100svh-9rem)] gap-10 py-14 md:py-20 lg:grid-cols-[1fr_0.72fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20">
            <Home aria-hidden size={17} />
            Care home availability in Norfolk
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
            Need a care home bed, viewing or urgent advice?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/86 md:text-xl">
            Speak to Hollyman Care Homes about residential, dementia, respite and palliative care across Upton, Acle, Brundall, Martham and Potter Heigham.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={site.phoneHref}
              icon={<Phone aria-hidden size={18} />}
              className="text-base"
              ctaId="availability_hero_call"
            >
              Call now: {site.phone}
            </ButtonLink>
            <ButtonLink
              href="#availability-enquiry"
              variant="secondary"
              icon={<ArrowRight aria-hidden size={18} />}
              className="text-base"
              ctaId="availability_hero_form"
            >
              Check availability
            </ButtonLink>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-6 text-white/72">
            You do not need to know the exact care type before you call. Start with location, timescale and what has changed.
          </p>
        </div>
        <div className="rounded-[1.3rem] border border-white/15 bg-white/10 p-5 shadow-lift backdrop-blur">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-holly-leaf">
            <ShieldCheck aria-hidden size={23} />
          </div>
          <h2 className="font-display text-2xl font-semibold">For families who need clarity</h2>
          <p className="mt-3 text-sm leading-7 text-white/74">
            A short conversation can help you understand whether a Hollyman home may suit your loved one, even if you are still comparing options.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-white/82">
            <p className="rounded-xl bg-white/10 p-3">Call directly from your phone.</p>
            <p className="rounded-xl bg-white/10 p-3">Ask about homes near Acle, Brundall, Martham and Great Yarmouth routes.</p>
            <p className="rounded-xl bg-white/10 p-3">Talk through residential, dementia, respite and palliative care.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
