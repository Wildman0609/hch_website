import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionIntro } from "@/components/SectionIntro";
import { familyReassurance } from "@/data/admissions";

export const metadata: Metadata = {
  title: "Family Guide to Choosing a Care Home",
  description:
    "A practical guide for families choosing a care home in Norfolk for a parent or loved one."
};

const steps = [
  {
    title: "Start with safety and current need",
    text: "Write down what has changed: falls, memory, medication, meals, personal care, loneliness, carer strain or hospital discharge."
  },
  {
    title: "Choose a location that keeps family close",
    text: "Regular visiting can matter as much as facilities. Think about who will visit most and which journeys are realistic."
  },
  {
    title: "Ask how care plans are built",
    text: "A good conversation should cover routines, preferences, risks, family involvement, dignity and how changes are reviewed."
  },
  {
    title: "Visit and watch the small details",
    text: "Notice how staff speak with residents, how calm the environment feels and whether questions are answered plainly."
  }
];

export default function FamilyGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Family guide"
        title="Choosing care for a parent is emotional. It can still be practical."
        text="This guide is written for adult children and relatives who need a clear, calmer way to compare care homes."
        image="/images/care-dining.webp"
        imageAlt="A dining and activity area inside a Hollyman care home."
        ctaLabel="Book a viewing"
        ctaHref="/contact?reason=viewing"
        primaryCtaId="family_guide_page_call"
        secondaryCtaId="family_guide_page_viewing"
      />

      <section className="bg-holly-cream py-14 md:py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionIntro
            eyebrow="A calmer process"
            title="Make the decision smaller."
            text="You do not have to solve everything in one call. Use these steps to prepare for conversations and viewings."
          />
          <div className="grid gap-4">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-[1.25rem] bg-white p-6 shadow-soft">
                <p className="text-sm font-semibold text-holly-leaf">Step {index + 1}</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-holly-ink">
                  {step.title}
                </h2>
                <p className="mt-3 leading-7 text-holly-ink/72">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-2">
          <div className="rounded-[1.5rem] bg-holly-sky p-6 md:p-8">
            <h2 className="font-display text-3xl font-semibold text-holly-ink">
              Questions to take to a viewing
            </h2>
            <ul className="mt-6 grid gap-3">
              {[
                "How will you get to know my parent?",
                "How are routines, food preferences and interests recorded?",
                "How do families contribute to care plans?",
                "What happens if needs increase?",
                "Who should we call if we are worried?"
              ].map((item) => (
                <li key={item} className="flex gap-3 text-holly-ink/78">
                  <CheckCircle2 aria-hidden className="mt-0.5 flex-none text-holly-leaf" size={20} />
                  <span className="font-semibold leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.5rem] bg-holly-ink p-6 text-white md:p-8">
            <h2 className="font-display text-3xl font-semibold">
              Worried about saying the wrong thing?
            </h2>
            <p className="mt-4 leading-8 text-white/74">
              Families often call before they have the language for what is happening. Start with the practical details: where your loved one lives, what has changed, and how soon you need advice.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/urgent-care-help" variant="secondary" ctaId="guide_urgent_help">
                I need care urgently
              </ButtonLink>
              <ButtonLink href="/contact?reason=viewing" className="bg-white text-holly-ink hover:bg-holly-sky" ctaId="guide_viewing">
                Book a viewing
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-holly-cream py-14 md:py-20">
        <div className="section-shell">
          <SectionIntro
            align="center"
            eyebrow="What families worry about"
            title="The emotional questions are part of the decision."
            text="You can ask about practical care and still talk honestly about guilt, settling in and safety."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {familyReassurance.map((item) => (
              <article key={item.question} className="rounded-[1.25rem] bg-white p-5 shadow-soft">
                <h2 className="font-display text-2xl font-semibold text-holly-ink">
                  {item.question}
                </h2>
                <p className="mt-3 text-sm leading-7 text-holly-ink/72">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
