import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "plain";
  className?: string;
  ctaId?: string;
};

const variants = {
  primary:
    "bg-holly-leaf text-white shadow-soft hover:bg-holly-moss focus-visible:outline-holly-gold",
  secondary:
    "bg-holly-gold text-holly-ink shadow-soft hover:bg-[#b77824] focus-visible:outline-holly-leaf",
  outline:
    "border border-holly-leaf/35 bg-white text-holly-ink hover:border-holly-leaf hover:bg-holly-sky focus-visible:outline-holly-leaf",
  plain:
    "bg-transparent text-holly-ink underline-offset-4 hover:underline focus-visible:outline-holly-leaf"
};

export function ButtonLink({
  href,
  children,
  icon,
  variant = "primary",
  className = "",
  ctaId
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      data-cta={ctaId}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
