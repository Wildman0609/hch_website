type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
};

export function SectionIntro({
  eyebrow,
  title,
  text,
  align = "left"
}: SectionIntroProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold leading-tight text-holly-ink md:text-5xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-5 text-lg leading-8 text-holly-ink/75">{text}</p>
      ) : null}
    </div>
  );
}
