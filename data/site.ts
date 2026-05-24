import { HeartHandshake, Home, MapPin, Phone, ShieldCheck, Sprout } from "lucide-react";

export const site = {
  name: "Hollyman Care Homes",
  tagline: "Family-run care homes across the Norfolk Broads",
  phone: "01493 751521",
  phoneHref: "tel:01493751521",
  email: "enquiries@hollymancarehomes.co.uk",
  url: "https://www.hollymancarehomes.co.uk",
  facebook: "https://www.facebook.com/HollymanCareHomes",
  description:
    "Family-run Norfolk care homes offering residential, dementia, respite and palliative care across Acle, Potter Heigham, Martham and Brundall."
};

export const navItems = [
  { label: "Find Your Home", href: "/find-your-home" },
  { label: "Care Services", href: "/care-services" },
  { label: "Fees & Funding", href: "/fees-funding" },
  { label: "Family Guide", href: "/family-guide" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" }
];

export const trustBlocks = [
  {
    title: "Family-run care",
    text: "A local care group with long-standing homes and familiar teams who take time to understand each person.",
    icon: HeartHandshake
  },
  {
    title: "Norfolk places families know",
    text: "Homes in Upton near Acle, Potter Heigham, Martham and Brundall, close to the Norfolk Broads.",
    icon: MapPin
  },
  {
    title: "Person-centred support",
    text: "Care plans are shaped around routines, preferences, dignity, privacy and family involvement.",
    icon: Sprout
  },
  {
    title: "Calm guidance from first call",
    text: "Whether care is urgent or you are planning ahead, the team can talk through next steps without pressure.",
    icon: Phone
  }
];

export const reassurancePoints = [
  {
    title: "You can start with questions",
    text: "You do not need to know the exact care type before you call. We can listen, ask a few practical questions and guide you gently."
  },
  {
    title: "Families stay involved",
    text: "Relatives and friends are encouraged to contribute to care planning so residents remain known, seen and understood."
  },
  {
    title: "Dignity in everyday details",
    text: "Privacy, choice, independence and fulfilment are treated as part of quality of life, not extras."
  }
];

export const quickActions = [
  {
    title: "I need care urgently",
    text: "Tell us what has changed and which area of Norfolk you are looking in. We will help you understand the next practical step.",
    href: "/contact?urgency=urgent",
    icon: ShieldCheck
  },
  {
    title: "Book a viewing",
    text: "Visit a home, meet the team and ask the questions that matter to your family.",
    href: "/contact?reason=viewing",
    icon: Home
  }
];
