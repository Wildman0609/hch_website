export type MetaEventName = "Lead" | "Contact" | "Schedule" | "ViewContent";

export type MarketingEventName =
  | "lead_form_submit"
  | "phone_click"
  | "email_click"
  | "brochure_request"
  | "brochure_cta_click"
  | "viewing_request"
  | "book_viewing_click"
  | "directions_click"
  | "enquiry_cta_click"
  | "home_page_view"
  | "contact_page_view"
  | "consent_update";

export type MarketingEventDefinition = {
  eventName: MarketingEventName;
  description: string;
  primaryPayload: string[];
  metaEventName?: MetaEventName;
};

export const marketingEventDefinitions: MarketingEventDefinition[] = [
  {
    eventName: "lead_form_submit",
    description: "A general, care, urgent-care or callback enquiry was submitted successfully.",
    primaryPayload: ["form_type", "care_home_name", "page_url", "event_id"],
    metaEventName: "Lead"
  },
  {
    eventName: "phone_click",
    description: "A visitor clicked a phone number link.",
    primaryPayload: ["cta_label", "care_home_name", "link_url", "page_url", "event_id"],
    metaEventName: "Contact"
  },
  {
    eventName: "email_click",
    description: "A visitor clicked an email link.",
    primaryPayload: ["cta_label", "link_url", "page_url", "event_id"],
    metaEventName: "Contact"
  },
  {
    eventName: "brochure_request",
    description: "A printed brochure request form was submitted successfully.",
    primaryPayload: ["form_type", "care_home_name", "page_url", "event_id"],
    metaEventName: "Lead"
  },
  {
    eventName: "brochure_cta_click",
    description: "A visitor clicked a brochure request or brochure-view CTA.",
    primaryPayload: ["cta_label", "care_home_name", "link_url", "page_url", "event_id"],
    metaEventName: "Lead"
  },
  {
    eventName: "viewing_request",
    description: "A book-a-viewing form was submitted successfully.",
    primaryPayload: ["form_type", "care_home_name", "page_url", "event_id"],
    metaEventName: "Schedule"
  },
  {
    eventName: "book_viewing_click",
    description: "A visitor clicked a book-a-viewing CTA.",
    primaryPayload: ["cta_label", "care_home_name", "link_url", "page_url", "event_id"],
    metaEventName: "Schedule"
  },
  {
    eventName: "directions_click",
    description: "A visitor clicked a directions or map link.",
    primaryPayload: ["cta_label", "care_home_name", "link_url", "page_url", "event_id"],
    metaEventName: "Contact"
  },
  {
    eventName: "enquiry_cta_click",
    description: "A visitor clicked an enquiry, callback, urgent-help or availability CTA.",
    primaryPayload: ["cta_label", "care_home_name", "link_url", "page_url", "event_id"],
    metaEventName: "Contact"
  },
  {
    eventName: "home_page_view",
    description: "A home-specific page was viewed.",
    primaryPayload: ["care_home_name", "page_url", "page_title", "event_id"],
    metaEventName: "ViewContent"
  },
  {
    eventName: "contact_page_view",
    description: "The contact page was viewed.",
    primaryPayload: ["page_url", "page_title", "event_id"],
    metaEventName: "Contact"
  },
  {
    eventName: "consent_update",
    description: "A visitor saved or changed cookie consent preferences.",
    primaryPayload: [
      "analytics_storage",
      "ad_storage",
      "ad_user_data",
      "ad_personalization",
      "event_id"
    ]
  }
];

export const conversionEventNames: MarketingEventName[] = [
  "lead_form_submit",
  "phone_click",
  "email_click",
  "brochure_request",
  "viewing_request",
  "book_viewing_click",
  "directions_click",
  "home_page_view",
  "contact_page_view"
];

