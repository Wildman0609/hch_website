import Image from "next/image";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import type { CareHome } from "@/data/homes";

type HomeCardProps = {
  home: CareHome;
  compact?: boolean;
};

export function HomeCard({ home, compact = false }: HomeCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.4rem] border border-holly-ink/10 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={home.image}
          alt={home.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-holly-ink/55 via-transparent to-transparent" />
        <p className="absolute bottom-4 left-4 rounded-full bg-white/92 px-3 py-1 text-sm font-semibold text-holly-ink">
          {home.area}
        </p>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-semibold text-holly-ink">
              {home.name}
            </h3>
            <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-holly-leaf">
              <MapPin aria-hidden size={16} />
              {home.location}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-holly-ink/70">{home.summary}</p>
        {!compact ? (
          <ul className="mt-5 grid gap-2 text-sm text-holly-ink/72">
            {home.careTypes.slice(0, 3).map((type) => (
              <li key={type} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-holly-leaf" />
                {type}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <ButtonLink
            href={`/homes/${home.slug}`}
            variant="outline"
            icon={<ArrowRight aria-hidden size={17} />}
            ctaId={`home-card-${home.slug}`}
          >
            View home
          </ButtonLink>
          <ButtonLink
            href={home.phoneHref}
            icon={<Phone aria-hidden size={17} />}
            ctaId={`home-card-call-${home.slug}`}
          >
            Call
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
