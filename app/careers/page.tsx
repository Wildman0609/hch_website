import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  Building2,
  Clock,
  Home,
  MapPin,
  Send,
  UsersRound
} from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionIntro } from "@/components/SectionIntro";
import { SpamTrapFields } from "@/components/SpamTrapFields";
import { careerPositionOptions, careerRoles, liveVacancies } from "@/data/careers";
import { homes } from "@/data/homes";

export const metadata: Metadata = {
  title: "Careers at HCH",
  description:
    "Apply for care, leadership, housekeeping, maintenance and host roles at Hollyman Care Homes across Norfolk."
};

const reasons = [
  {
    value: "4",
    label: "Norfolk homes",
    text: "Work in Upton, Potter Heigham, Martham or Brundall.",
    icon: Home
  },
  {
    value: "£13.75",
    label: "day carers from",
    text: "Day Care Assistant pay starts from £13.75 per hour.",
    icon: Banknote
  },
  {
    value: "Local",
    label: "family-run teams",
    text: "Small care settings where residents, families and staff are known.",
    icon: UsersRound
  }
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers at HCH"
        title="Build a caring career in a Hollyman home."
        text="Join a family-run Norfolk care group where care, leadership, housekeeping, maintenance and host teams help residents feel safe, known and supported every day."
        image="/images/care-community.webp"
        imageAlt="Hollyman residents and team members spending time together."
        ctaLabel="Apply for a role"
        ctaHref="#apply"
        primaryCtaId="careers_page_call"
        secondaryCtaId="careers_page_apply"
      />

      <section className="bg-holly-cream py-14 md:py-20">
        <div className="section-shell">
          <SectionIntro
            eyebrow="Why join HCH"
            title="Care work with close teams, familiar homes and room to grow."
            text="Hollyman Care Homes supports older people across Norfolk in homely, local settings. We look for people who are kind, dependable and ready to make everyday care feel personal."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <article key={reason.label} className="rounded-[1.25rem] bg-white p-6 shadow-soft">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-holly-sky text-holly-leaf">
                    <Icon aria-hidden size={23} />
                  </div>
                  <p className="font-display text-4xl font-semibold text-holly-ink">
                    {reason.value}
                  </p>
                  <h2 className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
                    {reason.label}
                  </h2>
                  <p className="mt-3 leading-7 text-holly-ink/72">{reason.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="section-shell">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionIntro
              eyebrow="Our homes"
              title="Four homes with different settings and the same caring standards."
              text="Each home has its own character, but all rely on steady care teams who know residents as individuals and support families with clear communication."
            />
            <ButtonLink
              href="/find-your-home"
              variant="outline"
              icon={<ArrowRight aria-hidden size={17} />}
              ctaId="careers_view_homes"
              className="md:mb-2"
            >
              Compare homes
            </ButtonLink>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {homes.map((home) => (
              <article
                key={home.slug}
                className="overflow-hidden rounded-[1.25rem] border border-holly-ink/10 bg-holly-cream shadow-soft"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={home.image}
                    alt={home.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-display text-2xl font-semibold text-holly-ink">
                    {home.name}
                  </h2>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-holly-leaf">
                    <MapPin aria-hidden size={16} />
                    {home.location}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-holly-ink/72">{home.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="soft-band py-14 md:py-20">
        <div className="section-shell">
          <SectionIntro
            eyebrow="Job roles"
            title="Care, leadership and support roles all shape the home."
            text="Whether you are starting in care, bringing leadership experience or supporting the home through hospitality, housekeeping or maintenance, these are the roles we recruit for across HCH."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {careerRoles.map((role) => {
              const Icon = role.icon;
              return (
                <article key={role.title} className="rounded-[1.25rem] bg-white p-6 shadow-soft">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-holly-cream text-holly-leaf">
                    <Icon aria-hidden size={23} />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-holly-ink">
                    {role.title}
                  </h2>
                  <p className="mt-3 leading-7 text-holly-ink/72">{role.summary}</p>
                  <ul className="mt-5 grid gap-2 text-sm text-holly-ink/72">
                    {role.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-holly-leaf" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-holly-cream py-14 md:py-20">
        <div className="section-shell">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionIntro
              eyebrow="Live roles"
              title="Current opening at HCH."
              text="Our current vacancy is for a night carer at Braydeston Court. You can also use the form to register interest in future roles."
            />
            <ButtonLink
              href="#apply"
              icon={<BriefcaseBusiness aria-hidden size={17} />}
              ctaId="careers_apply_top"
              className="md:mb-2"
            >
              Apply now
            </ButtonLink>
          </div>
          {liveVacancies.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {liveVacancies.map((vacancy) => (
                <article
                  key={vacancy.id}
                  className="flex h-full flex-col rounded-[1.25rem] border border-holly-ink/10 bg-white p-6 shadow-soft"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-holly-sky px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-holly-leaf">
                      {vacancy.status}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-semibold text-holly-ink">
                    {vacancy.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-holly-ink/72">{vacancy.summary}</p>
                  <dl className="mt-5 grid gap-3 text-sm text-holly-ink/72">
                    <div className="flex gap-3">
                      <Building2 aria-hidden className="mt-0.5 flex-none text-holly-leaf" size={17} />
                      <div>
                        <dt className="sr-only">Home</dt>
                        <dd>{vacancy.home}</dd>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <MapPin aria-hidden className="mt-0.5 flex-none text-holly-leaf" size={17} />
                      <div>
                        <dt className="sr-only">Location</dt>
                        <dd>{vacancy.location}</dd>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Clock aria-hidden className="mt-0.5 flex-none text-holly-leaf" size={17} />
                      <div>
                        <dt className="sr-only">Shift</dt>
                        <dd>{vacancy.shift}</dd>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Banknote aria-hidden className="mt-0.5 flex-none text-holly-leaf" size={17} />
                      <div>
                        <dt className="sr-only">Pay</dt>
                        <dd>{vacancy.pay}</dd>
                      </div>
                    </div>
                  </dl>
                  {vacancy.perks?.length ? (
                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-holly-leaf">
                        Perks
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {vacancy.perks.map((perk) => (
                          <li
                            key={perk}
                            className="rounded-full bg-holly-sky px-3 py-1 text-xs font-semibold text-holly-ink/75"
                          >
                            {perk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <ButtonLink
                    href="#apply"
                    variant="outline"
                    icon={<ArrowRight aria-hidden size={17} />}
                    ctaId={`careers_apply_${vacancy.id.replaceAll("-", "_")}`}
                    className="mt-6"
                  >
                    Apply for this role
                  </ButtonLink>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] bg-white p-6 shadow-soft md:p-8">
              <h2 className="font-display text-3xl font-semibold text-holly-ink">
                No live vacancies are listed today.
              </h2>
              <p className="mt-3 max-w-3xl leading-8 text-holly-ink/72">
                You can still register your interest using the form below and the team can keep your details in mind when a suitable role opens.
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="apply" className="bg-white py-14 md:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <SectionIntro
              eyebrow="Apply"
              title="Tell us about the role you want."
              text="Send your details and the team can follow up about current vacancies, suitable homes and next steps."
            />
            <div className="mt-8 rounded-[1.25rem] bg-holly-ink p-6 text-white shadow-soft">
              <h2 className="font-display text-2xl font-semibold">Before you apply</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-white/76">
                <li>Day carer pay starts from £13.75 per hour.</li>
                <li>Tell us which home or location works best for you.</li>
                <li>Include care experience if you have it, but attitude and reliability matter too.</li>
              </ul>
            </div>
          </div>
          <ApplicationForm />
        </div>
      </section>
    </>
  );
}

function ApplicationForm() {
  return (
    <form
      action="/careers/apply"
      method="post"
      className="rounded-[1.5rem] border border-holly-ink/10 bg-holly-cream p-5 shadow-soft sm:p-7"
      aria-label="Careers application form"
    >
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
          Applicant form
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-holly-ink">
          Apply to work with HCH
        </h2>
      </div>
      <input type="hidden" name="source" value="careers-application" />
      <SpamTrapFields />
      <div className="grid gap-4 sm:grid-cols-2">
        <ApplicationField label="Your name" name="name" autoComplete="name" required />
        <ApplicationField label="Phone number" name="phone" type="tel" autoComplete="tel" required />
        <ApplicationField label="Email address" name="email" type="email" autoComplete="email" required />
        <label className="grid gap-2 text-sm font-semibold text-holly-ink">
          Position you are applying for
          <select
            name="role"
            required
            defaultValue=""
            className={fieldClassName}
          >
            <option value="" disabled>
              Select a position
            </option>
            {careerPositionOptions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
            <option value="General careers interest">General careers interest</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-holly-ink">
          Preferred home
          <select name="preferredHome" defaultValue="" className={fieldClassName}>
            <option value="">No preference yet</option>
            {homes.map((home) => (
              <option key={home.slug} value={home.name}>
                {home.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-holly-ink">
          Availability
          <select name="availability" defaultValue="" className={fieldClassName}>
            <option value="">Select availability</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Flexible">Flexible</option>
            <option value="Weekends">Weekends</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-holly-ink sm:col-span-2">
          Care experience or message
          <textarea
            name="message"
            rows={5}
            className={`${fieldClassName} min-h-32`}
            placeholder="Tell us about your experience, qualifications, notice period, preferred hours or why you would like to work with HCH."
          />
        </label>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          data-cta="careers_application_submit"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-holly-leaf px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-holly-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-holly-gold"
        >
          <Send aria-hidden size={17} />
          Send application
        </button>
        <p className="text-sm leading-6 text-holly-ink/65">
          We will use your details to respond to your application. Please do not include sensitive medical information.
        </p>
      </div>
    </form>
  );
}

type ApplicationFieldProps = {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
};

const fieldClassName =
  "min-h-12 rounded-xl border border-holly-ink/15 bg-white px-4 py-3 text-base font-normal text-holly-ink shadow-inner outline-none transition focus:border-holly-leaf focus:ring-2 focus:ring-holly-leaf/20";

function ApplicationField({
  label,
  name,
  type = "text",
  autoComplete,
  required
}: ApplicationFieldProps) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-holly-ink">
      {label}
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className={fieldClassName}
      />
    </label>
  );
}
