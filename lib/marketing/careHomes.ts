export type MarketingCareHome = {
  slug: string;
  trackingSlug: string;
  name: string;
  phoneHref: string;
  mapQuery: string;
};

export const marketingCareHomes: MarketingCareHome[] = [
  {
    slug: "braydeston-court",
    trackingSlug: "braydeston_court",
    name: "Braydeston Court",
    phoneHref: "tel:01603712029",
    mapQuery: "Braydeston Court Care Home, Brundall"
  },
  {
    slug: "broadlands-park",
    trackingSlug: "broadlands_park",
    name: "Broadlands Park",
    phoneHref: "tel:01493751521",
    mapQuery: "Broadlands Park Care Home, 27 The Green, Upton NR13 6BA"
  },
  {
    slug: "broadland-house",
    trackingSlug: "broadland_house",
    name: "Broadland House",
    phoneHref: "tel:01692670632",
    mapQuery: "Broadland House Care Home, Bridge Road, Potter Heigham NR29 5JB"
  },
  {
    slug: "martham-lodge",
    trackingSlug: "martham_lodge",
    name: "Martham Lodge",
    phoneHref: "tel:01493748740",
    mapQuery: "Martham Lodge Care Home, Martham"
  }
];

export function findCareHomeBySlug(slug: string) {
  return marketingCareHomes.find((home) => home.slug === slug);
}

export function findCareHomeByName(name: string) {
  const normalized = normalizeName(name);
  return marketingCareHomes.find((home) => normalizeName(home.name) === normalized);
}

export function findCareHomeByPhoneHref(phoneHref: string) {
  const normalized = normalizePhoneHref(phoneHref);
  return marketingCareHomes.find((home) => normalizePhoneHref(home.phoneHref) === normalized);
}

export function careHomeFromPathname(pathname: string) {
  const match = pathname.match(/^\/homes\/([^/?#]+)/);
  return match ? findCareHomeBySlug(decodeURIComponent(match[1])) : undefined;
}

export function careHomeFromTrackingSlug(value: string) {
  return marketingCareHomes.find((home) => value.includes(home.trackingSlug));
}

export function buildDirectionsUrl(mapQuery: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
}

function normalizeName(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function normalizePhoneHref(value: string) {
  return value.replace(/[^\d+]/g, "");
}

