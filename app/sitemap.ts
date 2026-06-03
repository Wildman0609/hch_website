import type { MetadataRoute } from "next";
import { homes } from "@/data/homes";
import { services } from "@/data/services";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/find-your-home",
    "/events",
    "/care-services",
    "/fees-funding",
    "/family-guide",
    "/contact",
    "/careers",
    "/thank-you"
  ];

  const homeRoutes = homes.map((home) => `/homes/${home.slug}`);
  const serviceRoutes = services.map((service) => `/care-services/${service.slug}`);

  return [...staticRoutes, ...homeRoutes, ...serviceRoutes].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
