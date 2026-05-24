import type { Metadata } from "next";
import { GraduationCap, HeartHandshake, UsersRound } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionIntro } from "@/components/SectionIntro";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the caring team at Hollyman Care Homes across Norfolk."
};

const reasons = [
  {
    title: "Make a visible difference",
    text: "Care work is personal. You see the impact of patience, kindness and consistency every day.",
    icon: HeartHandshake
  },
  {
    title: "Learn and grow",
    text: "The current site highlights training, support and promotion opportunities for staff.",
    icon: GraduationCap
  },
  {
    title: "Work in close teams",
    text: "Hollyman homes are local settings where care teams, cooks, activity coordinators and support staff work together.",
    icon: UsersRound
  }
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Join a Norfolk care team where kindness matters."
        text="Hollyman Care Homes looks for people who want meaningful work, steady support and the chance to make daily life better for residents."
        image="/images/care-community.webp"
        imageAlt="Hollyman residents and team members spending time together."
        ctaLabel="Contact about careers"
        ctaHref="/contact?reason=careers"
      />

      <section className="bg-holly-cream py-14 md:py-20">
        <div className="section-shell">
          <SectionIntro
            eyebrow="Working in care"
            title="A fulfilling job that can grow with you."
            text="The existing Hollyman site describes investing in staff through training, support and promotion opportunities. This page keeps that message clear and human."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <article key={reason.title} className="rounded-[1.25rem] bg-white p-6 shadow-soft">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-holly-sky text-holly-leaf">
                    <Icon aria-hidden size={23} />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-holly-ink">
                    {reason.title}
                  </h2>
                  <p className="mt-3 leading-7 text-holly-ink/72">{reason.text}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-10 rounded-[1.5rem] bg-holly-ink p-6 text-white md:p-8">
            <h2 className="font-display text-3xl font-semibold">
              Interested in current roles?
            </h2>
            <p className="mt-3 max-w-3xl leading-8 text-white/74">
              This rebuild does not invent live vacancy numbers. Use the enquiry route to ask about current openings at Broadlands Park, Broadland House, Martham Lodge or Braydeston Court.
            </p>
            <ButtonLink href="/contact?reason=careers" variant="secondary" className="mt-6" ctaId="careers-contact">
              Ask about careers
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
