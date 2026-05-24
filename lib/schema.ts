import { homes } from "@/data/homes";
import { services } from "@/data/services";
import { site } from "@/data/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/images/logo.png`,
    sameAs: [site.facebook],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "Care enquiries",
      areaServed: "Norfolk",
      availableLanguage: "English"
    }
  };
}

export function homeSchema(slug?: string) {
  const selectedHomes = slug ? homes.filter((home) => home.slug === slug) : homes;

  return selectedHomes.map((home) => ({
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "NursingHome"],
    "@id": `${site.url}/homes/${home.slug}#carehome`,
    name: `${home.name} - ${site.name}`,
    url: `${site.url}/homes/${home.slug}`,
    image: `${site.url}${home.image}`,
    telephone: home.phone,
    parentOrganization: { "@id": `${site.url}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: home.address.slice(0, -1).join(", "),
      postalCode: home.address[home.address.length - 1],
      addressRegion: "Norfolk",
      addressCountry: "GB"
    },
    areaServed: home.area,
    makesOffer: home.careTypes.map((careType) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: careType
      }
    }))
  }));
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": `${site.url}/#organization` }
  };
}

export function servicesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Care services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${site.url}/care-services/${service.slug}`,
      name: service.title
    }))
  };
}
