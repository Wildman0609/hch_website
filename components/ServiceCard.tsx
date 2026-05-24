import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import type { CareService } from "@/data/services";

type ServiceCardProps = {
  service: CareService;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="grid overflow-hidden rounded-[1.4rem] border border-holly-ink/10 bg-white shadow-soft md:grid-cols-[0.9fr_1.1fr]">
      <div className="relative min-h-64">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
          {service.eyebrow}
        </p>
        <h3 className="mt-3 font-display text-3xl font-semibold text-holly-ink">
          {service.title}
        </h3>
        <p className="mt-4 leading-7 text-holly-ink/72">{service.summary}</p>
        <ButtonLink
          href={`/care-services/${service.slug}`}
          variant="outline"
          icon={<ArrowRight aria-hidden size={17} />}
          className="mt-6"
          ctaId={`service-card-${service.slug}`}
        >
          Learn about {service.title.toLowerCase()}
        </ButtonLink>
      </div>
    </article>
  );
}
