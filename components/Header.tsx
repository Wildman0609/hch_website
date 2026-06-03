import Image from "next/image";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { navItems, site } from "@/data/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-holly-ink/10 bg-white/95 shadow-[0_8px_24px_rgba(23,37,42,0.06)] backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-holly-ink"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Hollyman Care Homes home">
          <Image src="/images/logo.png" alt="" width={62} height={62} className="h-14 w-14" />
          <div className="leading-tight">
            <span className="block font-display text-xl font-semibold text-holly-ink">
              Hollyman
            </span>
            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-holly-leaf">
              Care Homes
            </span>
          </div>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-holly-ink/78 transition hover:bg-holly-sky hover:text-holly-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-holly-leaf"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <ButtonLink
            href={site.phoneHref}
            variant="outline"
            icon={<Phone aria-hidden size={17} />}
            ctaId="header-call"
          >
            {site.phone}
          </ButtonLink>
          <ButtonLink href="/contact?reason=viewing" ctaId="header-viewing">
            Book a viewing
          </ButtonLink>
        </div>

        <details className="group relative xl:hidden">
          <summary className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-full border border-holly-ink/10 bg-holly-sky text-holly-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-holly-leaf">
            <Menu aria-hidden size={22} />
            <span className="sr-only">Open menu</span>
          </summary>
          <div className="absolute right-0 mt-3 w-[min(88vw,340px)] rounded-[1.4rem] border border-holly-ink/10 bg-white p-4 shadow-soft">
            <nav aria-label="Mobile navigation" className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-base font-semibold text-holly-ink hover:bg-holly-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-holly-leaf"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 grid gap-2">
              <ButtonLink href={site.phoneHref} icon={<Phone aria-hidden size={17} />} ctaId="mobile-menu-call">
                Call now
              </ButtonLink>
              <ButtonLink href="/contact?reason=viewing" variant="secondary" ctaId="mobile-menu-viewing">
                Book a viewing
              </ButtonLink>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
