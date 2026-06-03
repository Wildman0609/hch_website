import type { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";
import { AdmissionsCTA } from "@/components/AdmissionsCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { HomeCard } from "@/components/HomeCard";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionIntro } from "@/components/SectionIntro";
import { homes } from "@/data/homes";
import { homeSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Find Your Home",
  description:
    "Compare Hollyman Care Homes across Acle, Potter Heigham, Martham and Brundall in Norfolk."
};

export default function FindYourHomePage() {
  return (
    <>
      <JsonLd data={homeSchema()} />
      <PageHero
        eyebrow="Find your home"
        title="Quality care across the Norfolk Broads."
        text="Compare the four Hollyman homes by location, care type and setting, then speak to the team about what might suit your family."
        image="/images/norfolk-broads.jpg"
        imageAlt="The Norfolk Broads landscape near Hollyman Care Homes locations."
        ctaLabel="Make an enquiry"
        ctaHref="/contact"
        primaryCtaId="find_home_page_call"
        secondaryCtaId="find_home_page_enquiry"
      />

      <section className="bg-holly-cream py-14 md:py-20">
        <div className="section-shell">
          <SectionIntro
            eyebrow="Our homes"
            title="Choose by place, personality and care need."
            text="Each home has a different setting, but the same family-run approach: dignity, individual routines, family involvement and calm guidance."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {homes.map((home) => (
              <HomeCard key={home.slug} home={home} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro
            eyebrow="How to narrow it down"
            title="A few practical questions can make the choice clearer."
            text="Families often start with location, then care type, then the feel of the home. A viewing can help you understand whether the setting feels right."
          />
          <div className="grid gap-4">
            {[
              "Which location keeps family visits easiest?",
              "Does your loved one need residential, dementia, short-term or end-of-life support?",
              "Would a smaller setting, village location or quieter garden matter most?",
              "Is the need urgent, or are you planning ahead?"
            ].map((question) => (
              <div key={question} className="flex gap-4 rounded-[1.2rem] border border-holly-ink/10 bg-holly-sky p-5">
                <MapPin aria-hidden className="mt-1 flex-none text-holly-leaf" size={20} />
                <p className="font-semibold leading-7 text-holly-ink">{question}</p>
              </div>
            ))}
            <ButtonLink
              href="/family-guide"
              variant="outline"
              icon={<ArrowRight aria-hidden size={17} />}
              className="mt-2 w-fit"
              ctaId="find_home_family_guide"
            >
              Read the family guide
            </ButtonLink>
          </div>
        </div>
      </section>

      <AdmissionsCTA
        title="Want help narrowing the homes down?"
        text="Tell us the preferred area, care need and urgency. The team can help you compare homes and decide whether a viewing or brochure is the next step."
        ctaPrefix="find_home_page"
      />
    </>
  );
}
