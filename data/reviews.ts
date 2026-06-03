import type { HomeSlug } from "@/data/homes";

export type CarehomeReviewSource = {
  platform: "carehome";
  profileUrl: string;
  // Paste only the official widget HTML generated in the carehome.co.uk control panel.
  widgetHtml?: string;
};

export const carehomeReviewSources: Record<HomeSlug, CarehomeReviewSource> = {
  "broadlands-park": {
    platform: "carehome",
    profileUrl: "https://www.carehome.co.uk/carehome.cfm/searchazref/10001510BROB"
  },
  "broadland-house": {
    platform: "carehome",
    profileUrl: "https://www.carehome.co.uk/carehome.cfm/searchazref/10001510BROA"
  },
  "martham-lodge": {
    platform: "carehome",
    profileUrl: "https://www.carehome.co.uk/carehome.cfm/searchazref/10001510MARC"
  },
  "braydeston-court": {
    platform: "carehome",
    profileUrl: "https://www.carehome.co.uk/carehome.cfm/searchazref/10001510SHIA"
  }
};

export function getCarehomeReviewSource(slug: HomeSlug) {
  return carehomeReviewSources[slug];
}
