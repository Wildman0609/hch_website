import Image from "next/image";
import { Phone } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/data/site";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt,
  ctaLabel = "Speak to our team",
  ctaHref = "/contact"
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-holly-ink text-white">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        loading="eager"
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-holly-ink via-holly-ink/80 to-holly-ink/25" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-holly-leafLight">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/86">{text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.phoneHref} icon={<Phone aria-hidden size={18} />} ctaId="page-hero-call">
              Call {site.phone}
            </ButtonLink>
            <ButtonLink href={ctaHref} variant="secondary" ctaId="page-hero-secondary">
              {ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
