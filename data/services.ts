export type ServiceSlug =
  | "dementia-care"
  | "residential-care"
  | "respite-care"
  | "palliative-care";

export type CareService = {
  slug: ServiceSlug;
  title: string;
  eyebrow: string;
  summary: string;
  headline: string;
  image: string;
  imageAlt: string;
  sections: { title: string; body: string }[];
  suitedTo: string[];
};

export const services: CareService[] = [
  {
    slug: "dementia-care",
    title: "Dementia Care",
    eyebrow: "Specialist support",
    summary:
      "Thoughtful dementia care that helps residents feel safe, respected and known.",
    headline:
      "Support for changing needs, familiar routines and dignity every day.",
    image: "/images/care-community.webp",
    imageAlt: "Residents and team members spending time together at a Hollyman care home.",
    sections: [
      {
        title: "A calm, personal approach",
        body: "No two dementia journeys are the same. The team builds care around each resident's routines, life history, preferences and abilities, with family input wherever helpful."
      },
      {
        title: "Safety without losing individuality",
        body: "Residents are encouraged to make choices where they can, with support arranged carefully when decisions need family or appointed representative involvement."
      },
      {
        title: "Meaningful days",
        body: "Activities, conversation, meals and familiar surroundings all contribute to comfort, stimulation and connection."
      }
    ],
    suitedTo: [
      "Families managing Alzheimer's or another form of dementia",
      "People who need more structure and supervision than home can safely provide",
      "Residents who benefit from familiar routines and patient reassurance"
    ]
  },
  {
    slug: "residential-care",
    title: "Residential Care",
    eyebrow: "Everyday support",
    summary:
      "Residential care for people who need day-to-day help in a warm, settled setting.",
    headline:
      "Kind, practical support that protects independence where possible.",
    image: "/images/home-broadlands.webp",
    imageAlt: "Broadlands Park care home in a peaceful Norfolk setting.",
    sections: [
      {
        title: "Care built around the person",
        body: "The team takes time to understand interests, routines and preferences so support feels personal rather than institutional."
      },
      {
        title: "A safe daily rhythm",
        body: "Meals, activities, personal care and companionship are arranged in ways that give families confidence and residents a sense of continuity."
      },
      {
        title: "Family involvement",
        body: "Relatives can stay close to care planning and help the team understand the details that matter."
      }
    ],
    suitedTo: [
      "People who are finding everyday tasks harder at home",
      "Families who need dependable care and companionship for a loved one",
      "Residents who value privacy, choice and a steady community"
    ]
  },
  {
    slug: "respite-care",
    title: "Respite Care",
    eyebrow: "Short stays",
    summary:
      "Short-term care for recovery, carer breaks, emergency support or trial stays.",
    headline:
      "A reassuring short stay when a family needs time, rest or practical support.",
    image: "/images/care-dining.webp",
    imageAlt: "A Hollyman dining and activity space prepared for residents.",
    sections: [
      {
        title: "Support for carers and families",
        body: "Respite care gives family carers time to rest, recover or manage commitments while their loved one is supported in a safe setting."
      },
      {
        title: "A gentle way to experience care",
        body: "Some families use respite as a short trial stay before making a longer-term decision."
      },
      {
        title: "The same attention as long-term residents",
        body: "During a short stay, residents can join activities, enjoy meals and receive support shaped around their needs."
      }
    ],
    suitedTo: [
      "Family carers who need a break",
      "People recovering after illness or a hospital stay",
      "Families exploring whether care home life could be right"
    ]
  },
  {
    slug: "palliative-care",
    title: "Palliative Care",
    eyebrow: "Sensitive support",
    summary:
      "Compassionate end-of-life care focused on comfort, dignity and family reassurance.",
    headline:
      "Kind, steady support at one of the most emotional times for a family.",
    image: "/images/family-care.jpg",
    imageAlt: "An older person holding a telephone as a symbol of family contact and reassurance.",
    sections: [
      {
        title: "Comfort and dignity",
        body: "Palliative and end-of-life care is approached with sensitivity, calm communication and respect for the resident's wishes."
      },
      {
        title: "Support for families too",
        body: "Families often need clear updates and a team who can listen. The aim is to reduce uncertainty and help everyone feel supported."
      },
      {
        title: "Individual choices",
        body: "Care is tailored to changing needs, comfort and personal preferences, with families involved where appropriate."
      }
    ],
    suitedTo: [
      "People living with advanced illness or advanced dementia",
      "Families seeking comfort-focused support",
      "Residents whose needs are changing and need careful day-to-day attention"
    ]
  }
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
