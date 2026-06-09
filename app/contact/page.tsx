import type { Metadata } from "next";
import { MapPin, Phone, UserRound } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHero } from "@/components/PageHero";
import { homes } from "@/data/homes";
import { submitCareEnquiry } from "@/app/contact/actions";

export const metadata: Metadata = {
  title: "Contact Hollyman Care Homes",
  description:
    "Contact Hollyman Care Homes for care enquiries, viewing requests and guidance across Norfolk."
};

type ContactPageProps = {
  searchParams: Promise<{
    home?: string;
    care?: string;
    urgency?: string;
    reason?: string;
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const thankYouType =
    params.reason === "viewing"
      ? "viewing-request"
      : params.urgency === "urgent" || params.reason === "urgent"
        ? "urgent-help-request"
        : "general-enquiry";
  const submitLabel =
    params.reason === "viewing"
      ? "Request viewing"
      : params.urgency === "urgent" || params.reason === "urgent"
        ? "Request urgent callback"
        : "Send enquiry";

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Speak to someone who can help."
        text="Whether you need care urgently, want to book a viewing or simply have questions, start here."
        image="/images/hero-care.webp"
        imageAlt="A Hollyman team member supporting a resident during an activity."
        ctaLabel="Find a home"
        ctaHref="/find-your-home"
        primaryCtaId="contact_page_call"
        secondaryCtaId="contact_page_find_home"
      />

      <section className="bg-holly-cream py-14 md:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <EnquiryForm
            action={submitCareEnquiry}
            preferredHome={params.home}
            careType={params.care}
            urgency={params.urgency ?? params.reason}
            reason={params.reason ?? "contact"}
            thankYouType={thankYouType}
            submitLabel={submitLabel}
            submitCtaId={
              params.reason === "viewing"
                ? "viewing_request_submit"
                : params.urgency === "urgent" || params.reason === "urgent"
                  ? "urgent_help_request_submit"
                  : "general_enquiry_submit"
            }
          />
          <div className="grid gap-4">
            {homes.map((home) => (
              <article key={home.slug} className="rounded-[1.25rem] bg-white p-5 shadow-soft">
                <h2 className="font-display text-2xl font-semibold text-holly-ink">
                  {home.name}
                </h2>
                <dl className="mt-4 grid gap-3 text-sm text-holly-ink/72">
                  <div className="flex gap-3">
                    <MapPin aria-hidden className="mt-0.5 flex-none text-holly-leaf" size={18} />
                    <div>
                      <dt className="sr-only">Address</dt>
                      <dd>{home.address.join(", ")}</dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone aria-hidden className="mt-0.5 flex-none text-holly-leaf" size={18} />
                    <div>
                      <dt className="sr-only">Phone</dt>
                      <dd>
                        <a className="font-semibold text-holly-ink hover:underline" href={home.phoneHref}>
                          {home.phone}
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <UserRound aria-hidden className="mt-0.5 flex-none text-holly-leaf" size={18} />
                    <div>
                      <dt className="sr-only">Manager</dt>
                      <dd>Manager: {home.manager}</dd>
                    </div>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
