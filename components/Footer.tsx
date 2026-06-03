import Image from "next/image";
import Link from "next/link";
import { Facebook, Phone } from "lucide-react";
import { homes } from "@/data/homes";
import { services } from "@/data/services";
import { footerNavItems, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-holly-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/images/logo.png" alt="" width={70} height={70} className="h-16 w-16 rounded-full bg-white" />
            <div>
              <p className="font-display text-2xl font-semibold">{site.name}</p>
              <p className="text-sm text-white/70">{site.tagline}</p>
            </div>
          </Link>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/72">
            Family-run care homes in Norfolk, supporting residents and families with calm, person-centred care.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-holly-ink transition hover:bg-holly-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-holly-leafLight"
              data-cta="footer-call"
            >
              <Phone aria-hidden size={17} />
              {site.phone}
            </Link>
            <Link
              href={site.facebook}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-holly-leafLight"
              aria-label="Hollyman Care Homes on Facebook"
            >
              <Facebook aria-hidden size={20} />
            </Link>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-holly-leafLight">
              Explore
            </h2>
            <ul className="mt-4 grid gap-3 text-sm text-white/72">
              {footerNavItems.map((item) => (
                <li key={item.href}>
                  <Link className="hover:text-white" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-holly-leafLight">
              Homes
            </h2>
            <ul className="mt-4 grid gap-3 text-sm text-white/72">
              {homes.map((home) => (
                <li key={home.slug}>
                  <Link className="hover:text-white" href={`/homes/${home.slug}`}>
                    {home.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-holly-leafLight">
              Care
            </h2>
            <ul className="mt-4 grid gap-3 text-sm text-white/72">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link className="hover:text-white" href={`/care-services/${service.slug}`}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/55">
        Copyright {new Date().getFullYear()} Hollyman Care Homes. Content should be reviewed before launch for current regulatory wording, fees and vacancies.
      </div>
    </footer>
  );
}
