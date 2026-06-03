import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileCallButton } from "@/components/MobileCallButton";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Hollyman Care Homes | Family-run care homes in Norfolk",
    template: "%s | Hollyman Care Homes"
  },
  description: site.description,
  keywords: [
    "care homes in Norfolk",
    "dementia care Norfolk",
    "residential care Norfolk",
    "respite care Norfolk",
    "care homes near Acle",
    "care homes near Brundall",
    "care homes near Martham",
    "care homes near Potter Heigham",
    "family-run care homes Norfolk"
  ],
  openGraph: {
    title: "Hollyman Care Homes",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/images/hero-care.webp",
        width: 1710,
        height: 962,
        alt: "A Hollyman team member supporting a resident during an activity."
      }
    ]
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCallButton />
      </body>
    </html>
  );
}
