import { CalendarDays, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { quickActions } from "@/data/site";

export function UrgentPathways() {
  const icons = [ShieldCheck, CalendarDays];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {quickActions.map((action, index) => {
        const Icon = icons[index] ?? ShieldCheck;
        return (
          <div
            key={action.title}
            className="rounded-[1.3rem] border border-holly-ink/10 bg-holly-ink p-6 text-white shadow-soft"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-holly-leafLight">
              <Icon aria-hidden size={23} />
            </div>
            <h3 className="font-display text-2xl font-semibold">{action.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/72">{action.text}</p>
            <ButtonLink
              href={action.href}
              variant={index === 0 ? "secondary" : "outline"}
              className={`mt-6 ${index === 1 ? "border-white/30 bg-white text-holly-ink" : ""}`}
              ctaId={`pathway-${index === 0 ? "urgent" : "viewing"}`}
            >
              Continue
            </ButtonLink>
          </div>
        );
      })}
    </div>
  );
}
