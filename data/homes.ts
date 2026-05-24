export type HomeSlug =
  | "broadlands-park"
  | "broadland-house"
  | "martham-lodge"
  | "braydeston-court";

export type TeamMember = {
  name: string;
  role: string;
  quote?: string;
  bio: string[];
  details?: string[];
  focusAreas?: string[];
  personal?: string;
};

export type CareHome = {
  slug: HomeSlug;
  name: string;
  shortName: string;
  location: string;
  area: string;
  address: string[];
  phone: string;
  phoneHref: string;
  manager: string;
  image: string;
  imageAlt: string;
  summary: string;
  intro: string;
  established?: string;
  capacity?: string;
  careTypes: string[];
  highlights: string[];
  roomHighlights: string[];
  teamMembers: TeamMember[];
  teamApproach: string[];
  mapQuery: string;
};

// Replace or add real home photography in public/images, then update these paths.
export const homes: CareHome[] = [
  {
    slug: "broadlands-park",
    name: "Broadlands Park",
    shortName: "Broadlands Park",
    location: "Upton, near Acle",
    area: "Acle / Upton",
    address: ["27 The Green", "Upton", "NR13 6BA"],
    phone: "01493 751521",
    phoneHref: "tel:01493751521",
    manager: "Beverley Brown",
    image: "/images/home-broadlands.webp",
    imageAlt: "Broadlands Park care home in Upton with lawns and mature trees.",
    summary:
      "A peaceful country manor in Upton, close to Acle and the Norfolk Broads.",
    intro:
      "Broadlands Park first opened its doors in 1985 and has been family-run ever since. Set within a country manor with landscaped lawns and flowerbeds, it offers a calm setting where residents can keep familiar routines while receiving personalised care.",
    established: "Family-run since 1985",
    capacity: "Care for up to 34 residents",
    careTypes: ["Residential care", "Respite enquiries", "Palliative care guidance"],
    highlights: [
      "Tranquil countryside setting close to the Norfolk Broads",
      "Purpose-built extension with en-suite rooms",
      "Care plans shaped around preferences, dignity and independence"
    ],
    roomHighlights: [
      "Bright, comfortable bedrooms",
      "Accessible en-suite bathrooms in the extension",
      "Nurse call systems for reassurance",
      "Space for cherished belongings"
    ],
    teamMembers: [
      {
        name: "Beverley Brown",
        role: "Home Manager",
        quote:
          "Every smile and every shared moment helps Broadlands Park feel like one big family.",
        bio: [
          "Beverley is the experienced and compassionate manager at Broadlands Park. She has spent more than 23 years in care, beginning as a care assistant before progressing into leadership.",
          "Her approach is warm, steady and community-focused. She wants residents, relatives and staff to feel part of a home where dignity, respect and personalised care are part of everyday life."
        ],
        details: ["23+ years in care", "Started as a care assistant", "Family-led culture"],
        focusAreas: [
          "Creating a strong sense of community",
          "Supporting dignity, respect and individual choice",
          "Helping families feel confident and reassured"
        ]
      }
    ],
    teamApproach: [
      "A country home where residents are known as individuals, not room numbers.",
      "A team culture built around kindness, familiarity and small moments of connection.",
      "Care planning that balances independence, safety and family involvement."
    ],
    mapQuery: "Broadlands Park Care Home, 27 The Green, Upton NR13 6BA"
  },
  {
    slug: "broadland-house",
    name: "Broadland House",
    shortName: "Broadland House",
    location: "Potter Heigham",
    area: "Potter Heigham",
    address: ["Bridge Road", "Potter Heigham", "NR29 5JB"],
    phone: "01692 670632",
    phoneHref: "tel:01692670632",
    manager: "Diane Batch",
    image: "/images/home-broadland-house.webp",
    imageAlt: "Broadland House care home exterior in Potter Heigham.",
    summary:
      "A warm village care home near the Norfolk Broads, offering residential and dementia care.",
    intro:
      "Broadland House has been family-run for over 20 years in the village of Potter Heigham. The home offers a peaceful, supportive setting with gardens, activities and a team focused on individual routines and preferences.",
    established: "Family-run for over 20 years",
    capacity: "Care for up to 20 residents",
    careTypes: ["Residential care", "Dementia care", "Palliative care guidance"],
    highlights: [
      "Village location near Great Yarmouth and the Norfolk Broads",
      "Small, welcoming setting with landscaped gardens",
      "Support for independence, privacy and daily engagement"
    ],
    roomHighlights: [
      "Bright, spacious bedrooms",
      "A calm and familiar feel",
      "Personal items encouraged",
      "Quiet spaces for rest"
    ],
    teamMembers: [
      {
        name: "Diane Batch",
        role: "Home Manager",
        quote:
          "A good day is when the team works together and the home is full of laughter.",
        bio: [
          "Diane has spent more than 25 years in care, beginning in domiciliary care before working through senior roles, care planning, assessments, deputy management and care facilitation.",
          "At Broadland House, Diane leads the daily running of the home with a focus on safe staffing, strong governance and responsive, person-centred care. She enjoys the moments that show the home is working well: residents feeling happy, staff feeling supported and the atmosphere feeling light, warm and settled."
        ],
        details: ["25+ years in care", "Care planning and assessments", "Joined Broadland House in 2025"],
        focusAreas: [
          "Maintaining safety and good governance",
          "Leading and supporting the team",
          "Keeping care responsive to residents' needs"
        ],
        personal:
          "Diane is motivated by the small day-to-day differences that matter to residents and staff: a smile, a settled routine, or a team pulling together at the right moment."
      }
    ],
    teamApproach: [
      "A small village home where safe routines and good morale matter.",
      "A team that values laughter, responsiveness and practical support.",
      "Care shaped around residents' preferences, comfort and independence."
    ],
    mapQuery: "Broadland House Care Home, Bridge Road, Potter Heigham NR29 5JB"
  },
  {
    slug: "martham-lodge",
    name: "Martham Lodge",
    shortName: "Martham Lodge",
    location: "Martham",
    area: "Martham",
    address: ["34 The Green", "Martham", "NR29 4PA"],
    phone: "01493 748740",
    phoneHref: "tel:01493748740",
    manager: "Carol Preston",
    image: "/images/home-martham-house.webp",
    imageAlt: "Martham Lodge care home in a village setting.",
    summary:
      "A Victorian country house on Martham village green, providing specialist dementia care.",
    intro:
      "Martham Lodge has been family-run since 2001. Set on the village green in Martham, the home provides specialist dementia care in a characterful house with a modern extension and access to peaceful garden spaces.",
    established: "Family-run since 2001",
    capacity: "Care for up to 20 residents",
    careTypes: ["Dementia care", "Residential care guidance", "Palliative care guidance"],
    highlights: [
      "Specialist dementia care in a small village setting",
      "Victorian country house with modern extension",
      "Views towards gardens or the village green"
    ],
    roomHighlights: [
      "Modern, comfortable rooms",
      "Warm and familiar surroundings",
      "Personal touches welcomed",
      "Peaceful outlooks from many rooms"
    ],
    teamMembers: [
      {
        name: "Carol Preston",
        role: "Registered Homes Manager",
        quote:
          "Life should be fun, and a home filled with love, warmth and laughter is incredibly important.",
        bio: [
          "Carol has worked in Health and Social Care for more than 46 years. Her first role was as a Healthcare Assistant in a busy Accident and Emergency department, and she went on to build a career across care management, operations, compliance and quality assurance.",
          "Martham Lodge has taken Carol back to her grassroots in care: leading, encouraging and developing a team close to residents every day. She is happiest when she sees team members grow in confidence, embrace change and progress towards senior, deputy or management roles.",
          "One of Carol's proudest achievements was becoming a finalist in the 2023 Great British Care Awards after being nominated by families, residents and staff for Best Registered Care Home Manager of the Year."
        ],
        details: ["46+ years in care", "Great British Care Awards finalist", "At Martham Lodge since March 2025"],
        focusAreas: [
          "Helping residents, especially those living with dementia, enjoy meaningful and fulfilling lives",
          "Building a happy, confident team supported by experienced deputies",
          "Creating activities, therapies and experiences that bring joy, stimulation and wellbeing"
        ],
        personal:
          "Carol is a holistic therapist trained in Sound Therapy, Reiki and Mindfulness Coaching, and has also qualified as a Yoga Teacher. She loves music and dancing, especially Ballroom and Salsa, and brings her love of animals into the home through regular animal therapy sessions."
      }
    ],
    teamApproach: [
      "A specialist dementia setting where residents are encouraged to stay active, engaged and fulfilled.",
      "A team Carol describes as kind, compassionate and dedicated to residents' individual needs.",
      "A home where warmth, laughter, meaningful activities and family reassurance all matter."
    ],
    mapQuery: "Martham Lodge Care Home, 34 The Green, Martham NR29 4PA"
  },
  {
    slug: "braydeston-court",
    name: "Braydeston Court",
    shortName: "Braydeston Court",
    location: "Brundall",
    area: "Brundall",
    address: ["4 Braydeston Avenue", "Brundall", "NR13 5JX"],
    phone: "01603 712029",
    phoneHref: "tel:01603712029",
    manager: "Maria Barber",
    image: "/images/home-braydeston.webp",
    imageAlt: "Braydeston Court care home in Brundall.",
    summary:
      "A characterful Edwardian house in Brundall offering residential, dementia and respite care.",
    intro:
      "Braydeston Court joined the Hollyman family-run group in 2021. Set in a peaceful Brundall location, it combines Edwardian character with comfortable communal spaces, gardens and a newly created cafe area.",
    established: "Part of the group since 2021",
    capacity: "Small-scale residential setting",
    careTypes: ["Residential care", "Dementia care", "Respite care", "Palliative care guidance"],
    highlights: [
      "Peaceful Brundall location close to Norwich",
      "Edwardian character with comfortable shared spaces",
      "Residential, dementia and respite support"
    ],
    roomHighlights: [
      "Light-filled bedrooms",
      "Rooms with individual character",
      "Personal belongings encouraged",
      "Cosy, restful spaces"
    ],
    teamMembers: [
      {
        name: "Maria Barber",
        role: "Home Manager",
        quote:
          "Good care starts with treating people as you would want your own loved ones to be treated.",
        bio: [
          "Maria brings more than 30 years of health and social care experience to Braydeston Court, with a background spanning care homes, domiciliary care, day services and hospital settings.",
          "She has built and improved care services, supported teams through change, worked as a care consultant and is qualified to teach Health and Social Care. Maria is hands-on and visible around the home, with a leadership style that is fair, approachable, energetic and supportive.",
          "Her focus is simple: residents should feel valued, families should feel reassured and staff should feel proud of the care they give."
        ],
        details: ["30+ years in care", "Qualified to teach Health and Social Care", "Hands-on leadership"],
        focusAreas: [
          "Supporting compassionate, person-centred care",
          "Building confident and valued teams",
          "Keeping quality and compliance grounded in a homely environment"
        ],
        personal:
          "Away from work, Maria is a proud mum of five and grandmother to one. She enjoys family time, swimming when she gets the chance, and writing rhyming poetry."
      }
    ],
    teamApproach: [
      "A welcoming home culture shaped by warmth, humour and high standards.",
      "A team supported to grow in confidence and deliver consistent care.",
      "A balance of Edwardian character, practical leadership and everyday companionship."
    ],
    mapQuery: "Braydeston Court Care Home, 4 Braydeston Avenue, Brundall NR13 5JX"
  }
];

export function getHome(slug: string) {
  return homes.find((home) => home.slug === slug);
}
