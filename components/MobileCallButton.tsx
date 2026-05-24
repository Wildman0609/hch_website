import { Phone } from "lucide-react";
import { site } from "@/data/site";

export function MobileCallButton() {
  return (
    <a
      href={site.phoneHref}
      data-cta="sticky-mobile-call"
      className="fixed inset-x-4 bottom-4 z-50 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-holly-leaf px-5 py-3 text-base font-semibold text-white shadow-lift transition hover:bg-holly-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-holly-gold md:hidden"
    >
      <Phone aria-hidden size={19} />
      Call Hollyman Care Homes
    </a>
  );
}
