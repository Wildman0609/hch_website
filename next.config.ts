import type { NextConfig } from "next";

const redirectsByDestination: Record<string, string[]> = {
  "/": [
    "/blog",
    "/category/news",
    "/cookie-policy",
    "/hello-world",
    "/hollyman-care-homes",
    "/how-to-wear-a-hat",
    "/our-blog",
    "/privacy-policy",
    "/relaxing-by-the-broads",
    "/remembrance-sunday",
    "/were-on-instagram"
  ],
  "/find-your-home": [
    "/christmas-cakes-yummy",
    "/find-hollyman-care-homes-norfolk",
    "/fun-on-the-river",
    "/happy-shrove-tuesday",
    "/positive-feedback-from-cqc",
    "/time-to-reminisce",
    "/trip-to-great-yarmouth-sealife-centre"
  ],
  "/care-services": [
    "/calling-all-crafters",
    "/celebrating-a-mask-free-environment-at-hollyman-care-homes-a-milestone-for-our-residents-and-staff",
    "/celebrating-the-coronation-of-king-charles-iii-a-royal-affair-at-hollyman-care-homes",
    "/exploring-the-benefits-of-interactive-tablet-technology-for-residents-at-hollyman-care-homes",
    "/melissa-the-film-star",
    "/our-care",
    "/our-care-nutrition",
    "/pretty-muddy-with-hch-team",
    "/training-update"
  ],
  "/care-services/dementia-care": [
    "/dementia-care",
    "/dementia-care-in-norwich-and-great-yarmouth",
    "/dementia-friends"
  ],
  "/care-services/residential-care": ["/residential-care"],
  "/care-services/respite-care": ["/respite-care"],
  "/care-services/palliative-care": ["/palliative-care"],
  "/homes/broadlands-park": [
    "/1940s-day-at-broadlands-park",
    "/5-stars-at-broadlands-park",
    "/boosting-wellness-and-preventing-falls-broadlands-park-residents-embrace-exercise-class-with-your-health-norfolk",
    "/broadlands-park-care-home",
    "/broadlands-park-rated-good",
    "/broadlands-park-snow-day",
    "/broadlands-park-wild-encounter",
    "/elf-day-at-broadlands-park",
    "/film-day-at-bp",
    "/painting-at-broadlands-park",
    "/pd-stanley-pays-a-visit-to-broadlands-park-care-home-in-upton-and-brings-joy-to-residents",
    "/remembering-val-james-a-timeless-tribute-at-broadlands-park",
    "/rockin-rollin-at-broadlands-park",
    "/wedding-day-at-broadlands-park"
  ],
  "/homes/broadland-house": [
    "/1940s-day-at-broadland-house",
    "/1950s-day-at-broadland-house",
    "/1960s-at-broadland-house",
    "/broadland-house-care-home",
    "/broadland-house-on-the-broads",
    "/celebrating-christmas-at-broadlands-house",
    "/celebrating-world-turtle-day-at-broadland-house",
    "/dementia-friends-at-broadland-house-potter-heigham",
    "/hydration-and-snack-station-the-new-favorite-spot-at-broadland-house",
    "/well-done-broadland-house"
  ],
  "/homes/martham-lodge": [
    "/cakes-at-martham-lodge",
    "/celebrating-martham-under-16s-girls-football-club-with-hollyman-care-homes",
    "/celebrating-national-biscuit-day-at-martham-lodge",
    "/christmas-in-martham",
    "/forget-me-not-with-martham-lodge",
    "/martham-lodge-care-home",
    "/preparing-for-the-scarecrow-festival-at-martham-lodge",
    "/wear-it-pink-day-at-martham-lodge",
    "/wear-it-pink-day-martham-lodge",
    "/well-done-martham-lodge"
  ],
  "/homes/braydeston-court": [
    "/a-fun-filled-day-of-arts-and-crafts-with-local-nursery-children-at-braydeston-court-care-home-in-brundall",
    "/braydeston-court-care-home"
  ],
  "/contact": [
    "/1130-2",
    "/contact-hollyman-care-homes",
    "/contact-hollyman-care-homes/feedback",
    "/room-enquiries"
  ],
  "/careers": ["/contact-hollyman-care-homes/job-vacancies", "/employment"],
  "/thank-you": ["/thankyou"]
};

function legacyRedirects() {
  return Object.entries(redirectsByDestination).flatMap(([destination, sources]) =>
    sources.map((source) => ({
      source,
      destination,
      permanent: true
    }))
  );
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: process.cwd()
  },
  async redirects() {
    return legacyRedirects();
  }
};

export default nextConfig;
