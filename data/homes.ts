export type HomeSlug =
  | "broadlands-park"
  | "broadland-house"
  | "martham-lodge"
  | "braydeston-court";

export type TeamMember = {
  name: string;
  role: string;
  photo?: string;
  photoAlt?: string;
  quote?: string;
  bio: string[];
  details?: string[];
  focusAreas?: string[];
  personal?: string;
};

export type DeputyProfile = {
  name?: string;
  role: string;
  photo?: string;
  photoAlt?: string;
  bio: string;
};

export type CareHomeHistoryImage = {
  src: string;
  alt: string;
  caption: string;
  shape: "wide" | "standard";
};

export type CareHomeHistory = {
  title: string;
  intro: string;
  paragraphs: string[];
  brochureDetails: string[];
  images: CareHomeHistoryImage[];
};

export type CareHomeGalleryImage = {
  src: string;
  alt: string;
  caption: string;
  category: "Exterior" | "Gardens" | "Communal areas" | "Rooms";
  position?: string;
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
  gallery: CareHomeGalleryImage[];
  history?: CareHomeHistory;
  teamMembers: TeamMember[];
  deputies: DeputyProfile[];
  teamApproach: string[];
  mapQuery: string;
};

const noDeputyProfiles = (): DeputyProfile[] => [];

const galleryImage = (
  slug: HomeSlug,
  fileName: string,
  alt: string,
  caption: string,
  category: CareHomeGalleryImage["category"],
  position?: string
): CareHomeGalleryImage => ({
  src: `/images/homes/${slug}/${fileName}`,
  alt,
  caption,
  category,
  ...(position ? { position } : {})
});

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
    gallery: [
      galleryImage("broadlands-park", "bedroom.webp", "Broadlands Park bedroom with a double bed, soft chair and large windows.", "Example bedroom", "Rooms"),
      galleryImage("broadlands-park", "garden-lawn.webp", "Broadlands Park garden lawn with mature trees and planting.", "Garden lawn", "Gardens"),
      galleryImage("broadlands-park", "lounge-seating.webp", "Broadlands Park lounge area with chairs, framed photographs and access through to shared spaces.", "Lounge seating", "Communal areas"),
      galleryImage("broadlands-park", "garden-planting.webp", "Broadlands Park garden planting and flower beds beside the red-brick building.", "Garden planting", "Gardens"),
      galleryImage("broadlands-park", "fresh-meal.webp", "A freshly served meal at Broadlands Park.", "Freshly served meal", "Communal areas"),
      galleryImage("broadlands-park", "bedroom-corner.webp", "Broadlands Park bedroom corner with a bed, chair, wardrobe and garden view.", "Bedroom corner", "Rooms"),
      galleryImage("broadlands-park", "lounge-area.webp", "Broadlands Park lounge area with armchairs and bunting.", "Lounge area", "Communal areas"),
      galleryImage("broadlands-park", "dining-area.webp", "Broadlands Park dining area with tables, chairs and a serving counter.", "Dining area", "Communal areas"),
      galleryImage("broadlands-park", "reading-corner.webp", "Broadlands Park reading corner with armchairs, framed photographs and magazines.", "Reading corner", "Communal areas"),
      galleryImage("broadlands-park", "corridor.webp", "Broadlands Park corridor with handrails and bedroom doors.", "Accessible corridors", "Communal areas"),
      galleryImage("broadlands-park", "hallway.webp", "Broadlands Park hallway leading through to shared lounge areas.", "Hallway through the home", "Communal areas"),
      galleryImage("broadlands-park", "garden-border.webp", "Broadlands Park garden border with planting beside the lawn.", "Garden border", "Gardens"),
      galleryImage("broadlands-park", "garden-detail.webp", "Broadlands Park garden detail with planting and decorative features.", "Garden detail", "Gardens")
    ],
    history: {
      title: "The home that started Hollyman Care Homes.",
      intro:
        "Sue and Ray Hollyman bought Broadlands Park from administration in 1985. From this country manor in Upton, they built the foundations of the family-run group that became Hollyman Care Homes.",
      paragraphs: [
        "An original Broadlands Park brochure described the home as a country manor house in three acres of lovely grounds in the heart of the Norfolk Broads, offering privacy, independence and peace and quiet.",
        "The same brochure captured the way Sue and Ray wanted the home to feel. They were resident proprietors at Broadlands Park, Sue was a qualified nurse, and the home was run with a homely, large family atmosphere.",
        "That first home became the starting point for a wider group, but the values remain familiar: care that feels personal, surroundings that feel settled and families who know who is looking after their loved one."
      ],
      brochureDetails: [
        "Staff available 24 hours a day",
        "Nurse call bell and intercom system",
        "Most rooms with en-suite facilities",
        "Home-cooked meals, morning coffee and afternoon tea",
        "Outings, games, sing-alongs and visiting local professionals"
      ],
      images: [
        {
          src: "/images/broadlands-park-archive-brochure.jpg",
          alt: "Original Broadlands Park brochure showing interior rooms, gardens and an exterior photograph.",
          caption: "An original Broadlands Park brochure kept from the early Hollyman years.",
          shape: "wide"
        },
        {
          src: "/images/broadlands-park-archive-garden.jpg",
          alt: "Scanned old brochure photograph of the Broadlands Park gardens.",
          caption: "The brochure highlighted the home's gardens and mature grounds.",
          shape: "standard"
        },
        {
          src: "/images/broadlands-park-archive-brochure-info.jpg",
          alt: "Written panel from an original Broadlands Park brochure listing facilities and a location map.",
          caption: "Page 2 described the family atmosphere, facilities and local location.",
          shape: "wide"
        }
      ]
    },
    teamMembers: [
      {
        name: "Beverley Brown",
        role: "Home Manager",
        photo: "/images/team/beverley-brown.jpg",
        photoAlt: "Beverley Brown, Home Manager at Broadlands Park.",
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
    deputies: [
      {
        name: "Diana Waterman",
        role: "Deputy",
        photo: "/images/team/diana-waterman.jpg",
        photoAlt: "Diana Waterman, Deputy at Broadlands Park.",
        bio: "Deputy at Broadlands Park."
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
    gallery: [
      galleryImage("broadland-house", "bedroom.webp", "Broadland House bedroom with a bed, armchair and window view.", "Example bedroom", "Rooms"),
      galleryImage("broadland-house", "garden-activity.webp", "Residents and team members taking part in an outdoor garden activity at Broadland House.", "Garden activity", "Gardens"),
      galleryImage("broadland-house", "bedroom-sitting-area.webp", "Broadland House bedroom with a bed, armchairs, table and television.", "Bedroom sitting area", "Rooms"),
      galleryImage("broadland-house", "raised-garden-beds.webp", "Broadland House garden with raised beds, benches and winter planting.", "Raised garden beds", "Gardens"),
      galleryImage("broadland-house", "garden-pergola.webp", "Broadland House garden pergola with outdoor table, chairs and bunting.", "Garden pergola", "Gardens"),
      galleryImage("broadland-house", "conservatory-lounge.webp", "Broadland House conservatory lounge with armchairs and a jukebox.", "Conservatory lounge", "Communal areas")
    ],
    teamMembers: [
      {
        name: "Diane Batch",
        role: "Home Manager",
        photo: "/images/team/diane-batch.jpg",
        photoAlt: "Diane Batch, Home Manager at Broadland House.",
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
    deputies: [
      {
        name: "Susan Saint",
        role: "Deputy",
        photo: "/images/team/susan-saint.jpg",
        photoAlt: "Susan Saint, Deputy at Broadland House.",
        bio: "Deputy at Broadland House."
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
    gallery: [
      galleryImage("martham-lodge", "patio-seating.webp", "Martham Lodge patio seating beside a blue exterior wall and garden gate.", "Patio seating", "Gardens"),
      galleryImage("martham-lodge", "bedroom.webp", "Martham Lodge bedroom with a bed, armchair, sink and window view.", "Example bedroom", "Rooms"),
      galleryImage("martham-lodge", "garden-seating.webp", "Martham Lodge garden seating with planting, trees and a garden room.", "Garden seating", "Gardens"),
      galleryImage("martham-lodge", "home-cat.webp", "A cat standing in a Martham Lodge communal area.", "A familiar face", "Communal areas"),
      galleryImage("martham-lodge", "activity-table.webp", "Martham Lodge activity table with games, craft materials and colourful cones.", "Activity table", "Communal areas"),
      galleryImage("martham-lodge", "conservatory-lounge.webp", "Martham Lodge conservatory lounge with armchairs, plants and garden light.", "Conservatory lounge", "Communal areas")
    ],
    teamMembers: [
      {
        name: "Carol Preston",
        role: "Registered Homes Manager",
        photo: "/images/carol-preston.jpg",
        photoAlt: "Carol Preston, Registered Homes Manager at Martham Lodge.",
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
    deputies: noDeputyProfiles(),
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
    gallery: [
      galleryImage("braydeston-court", "bedroom.webp", "Braydeston Court bedroom with a bed, chair and large window.", "Example bedroom", "Rooms"),
      galleryImage("braydeston-court", "cafe-menu.webp", "Braydeston Court cafe menu board set into a brick feature wall.", "Cafe menu board", "Communal areas"),
      galleryImage("braydeston-court", "staircase-seating.webp", "Braydeston Court staircase seating area with wood panelling and armchairs.", "Staircase seating", "Communal areas"),
      galleryImage("braydeston-court", "front-exterior.webp", "Braydeston Court red-brick exterior with bay windows and a tower.", "Edwardian frontage", "Exterior"),
      galleryImage("braydeston-court", "bay-window-seating.webp", "Braydeston Court bay-window seating area with a small table and chairs.", "Bay-window seating", "Communal areas"),
      galleryImage("braydeston-court", "cafe-counter.webp", "Braydeston Court cafe counter with tea cups, shelves and wall decoration.", "Cafe counter", "Communal areas"),
      galleryImage("braydeston-court", "tea-station.webp", "Braydeston Court tea and coffee station with teapots and cafe signage.", "Tea and coffee corner", "Communal areas"),
      galleryImage("braydeston-court", "tea-service.webp", "Braydeston Court tea service detail with cups and a teapot.", "Tea service detail", "Communal areas"),
      galleryImage("braydeston-court", "cafe-wall-display.webp", "Braydeston Court cafe wall display with hats, signs and decorative features.", "Cafe wall display", "Communal areas"),
      galleryImage("braydeston-court", "window-table.webp", "Braydeston Court quiet table beside a tall window.", "Quiet table by the window", "Communal areas"),
      galleryImage("braydeston-court", "hallway.webp", "Braydeston Court hallway with seating, artwork and light green wall panels.", "Hallway seating", "Communal areas"),
      galleryImage("braydeston-court", "corridor.webp", "Braydeston Court corridor with blue door and arched opening.", "Bright corridors", "Communal areas")
    ],
    teamMembers: [
      {
        name: "Maria Barber",
        role: "Home Manager",
        photo: "/images/maria-barber.jpg",
        photoAlt: "Maria Barber, Home Manager at Braydeston Court.",
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
    deputies: [
      {
        name: "Ellis Abel",
        role: "Deputy",
        photo: "/images/team/ellis-abel.jpg",
        photoAlt: "Ellis Abel, Deputy at Braydeston Court.",
        bio: "Deputy at Braydeston Court."
      },
      {
        name: "Rachel Nicols",
        role: "Deputy",
        photo: "/images/team/rachel-nicols.jpg",
        photoAlt: "Rachel Nicols, Deputy at Braydeston Court.",
        bio: "Deputy at Braydeston Court."
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
