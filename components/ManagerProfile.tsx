import Image from "next/image";
import { HeartHandshake, MessageCircleQuestion, Sparkles, UserRound } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";

export type FamiliarProfile = {
  name?: string;
  role: string;
  photo?: string;
  photoAlt?: string;
  bio: string | string[];
  quote?: string;
  careAbout?: string;
  familiesCanAsk?: string;
  details?: string[];
  focusAreas?: string[];
  personal?: string;
};

type ManagerProfileProps = {
  person: FamiliarProfile;
  ctaHref?: string;
  ctaLabel?: string;
  ctaId?: string;
  variant?: "feature" | "card";
};

export function ManagerProfile({
  person,
  ctaHref,
  ctaLabel = "Book a viewing",
  ctaId,
  variant = "feature"
}: ManagerProfileProps) {
  const name = person.name ?? person.role;
  const paragraphs = Array.isArray(person.bio) ? person.bio : [person.bio];

  if (variant === "card") {
    return (
      <article className="grid gap-5 rounded-[1.25rem] border border-holly-ink/10 bg-holly-cream p-4 shadow-soft sm:grid-cols-[8.5rem_1fr] sm:items-start">
        <ProfileImage person={person} name={name} size="small" />
        <div className="py-1">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-holly-leaf">
            {person.role}
          </p>
          <h4 className="mt-2 font-display text-2xl font-semibold text-holly-ink">
            {name}
          </h4>
          <div className="mt-3 grid gap-3">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-7 text-holly-ink/70">
                {paragraph}
              </p>
            ))}
          </div>
          <ProfileFamiliarity person={person} compact />
        </div>
      </article>
    );
  }

  return (
    <article className="grid gap-8 lg:grid-cols-[minmax(16rem,22rem)_1fr] lg:items-start">
      <ProfileImage person={person} name={name} />

      <div>
        <div className="flex flex-col gap-4 border-b border-holly-ink/10 pb-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
              {person.role}
            </p>
            <h3 className="mt-3 font-display text-4xl font-semibold leading-tight text-holly-ink md:text-5xl">
              {name}
            </h3>
          </div>
          {ctaHref ? (
            <ButtonLink href={ctaHref} variant="outline" className="w-fit" ctaId={ctaId}>
              {ctaLabel}
            </ButtonLink>
          ) : null}
        </div>

        {person.quote ? (
          <blockquote className="mt-6 border-l-4 border-holly-gold pl-5 font-display text-2xl font-semibold leading-snug text-holly-ink md:text-3xl">
            "{person.quote}"
          </blockquote>
        ) : null}

        {person.details ? (
          <dl className="mt-6 flex flex-wrap gap-3">
            {person.details.map((detail) => (
              <div key={detail} className="rounded-full bg-holly-sky px-4 py-2">
                <dt className="sr-only">Profile detail</dt>
                <dd className="text-sm font-semibold text-holly-ink/76">{detail}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-6 grid gap-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-4xl text-base leading-8 text-holly-ink/76">
              {paragraph}
            </p>
          ))}
        </div>

        <ProfileFamiliarity person={person} />

        {person.focusAreas ? (
          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
              What {getFirstName(name)} focuses on
            </p>
            <ul className="mt-4 grid gap-4 md:grid-cols-3">
              {person.focusAreas.map((focus) => (
                <li key={focus} className="border-t border-holly-ink/12 pt-4 text-sm font-semibold leading-7 text-holly-ink/76">
                  <Sparkles aria-hidden className="mb-3 text-holly-gold" size={18} />
                  {focus}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {person.personal ? (
          <div className="mt-8 rounded-[1.2rem] bg-holly-cream p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-rust">
              A little more about {getFirstName(name)}
            </p>
            <p className="mt-3 text-sm leading-7 text-holly-ink/72">{person.personal}</p>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function ProfileImage({
  person,
  name,
  size = "large"
}: {
  person: FamiliarProfile;
  name: string;
  size?: "large" | "small";
}) {
  const small = size === "small";
  const imageContent = person.photo ? (
    <Image
      src={person.photo}
      alt={person.photoAlt ?? `${name}, ${person.role}`}
      fill
      sizes={small ? "(min-width: 640px) 8.5rem, 9rem" : "(min-width: 1024px) 22rem, 100vw"}
      className="object-cover"
    />
  ) : (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center text-holly-ink/68">
      <div className={`flex items-center justify-center rounded-full bg-white text-holly-leaf shadow-soft ${small ? "h-14 w-14" : "h-20 w-20"}`}>
        <UserRound aria-hidden size={small ? 32 : 44} />
      </div>
      <div>
        <p className="font-semibold text-holly-ink">{person.role}</p>
        <p className="mt-2 text-sm leading-6">{name}</p>
      </div>
    </div>
  );

  if (small) {
    return (
      <div className="w-36 self-start overflow-hidden rounded-[1rem] border border-holly-ink/10 bg-white p-1 shadow-soft sm:w-full">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[0.8rem] bg-holly-cream">
          {imageContent}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-holly-ink p-4 shadow-soft">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.15rem] bg-holly-cream">
        {imageContent}
      </div>
      <div className="flex items-center justify-between gap-4 px-2 pt-4 text-white">
        <div>
          <p className="text-sm font-semibold">{name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-holly-leafLight">
            {person.role}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProfileFamiliarity({
  person,
  compact = false
}: {
  person: FamiliarProfile;
  compact?: boolean;
}) {
  if (!person.careAbout && !person.familiesCanAsk) {
    return null;
  }

  return (
    <div className={`mt-6 grid gap-3 ${compact ? "" : "md:grid-cols-2"}`}>
      {person.careAbout ? (
        <div className="rounded-[1rem] border border-holly-ink/10 bg-white p-4">
          <div className="flex gap-3">
            <HeartHandshake aria-hidden className="mt-0.5 flex-none text-holly-leaf" size={19} />
            <div>
              <p className="text-sm font-semibold text-holly-ink">What I care about</p>
              <p className="mt-2 text-sm leading-7 text-holly-ink/70">{person.careAbout}</p>
            </div>
          </div>
        </div>
      ) : null}
      {person.familiesCanAsk ? (
        <div className="rounded-[1rem] border border-holly-ink/10 bg-white p-4">
          <div className="flex gap-3">
            <MessageCircleQuestion aria-hidden className="mt-0.5 flex-none text-holly-leaf" size={19} />
            <div>
              <p className="text-sm font-semibold text-holly-ink">Families can ask me about</p>
              <p className="mt-2 text-sm leading-7 text-holly-ink/70">{person.familiesCanAsk}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function getFirstName(name: string) {
  return name.split(" ").filter(Boolean)[0] ?? name;
}
