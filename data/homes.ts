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
  careAbout?: string;
  familiesCanAsk?: string;
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
  careAbout?: string;
  familiesCanAsk?: string;
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
  category:
    | "Exterior"
    | "Rooms"
    | "Daily Life"
    | "Dining"
    | "Gardens"
    | "Activities"
    | "Quiet Spaces";
  position?: string;
};

export type CareHomeFaq = {
  question: string;
  answer: string;
};

export type CareHomeVisiting = {
  summary: string;
  parking: string;
  firstViewing: string;
};

export type CareHomeRegulatoryInfo = {
  cqcLocationId: string;
  cqcRating: "Outstanding" | "Good" | "Requires improvement" | "Inadequate" | "Not rated";
  cqcUrl: string;
  pamms?: {
    rating: "Excellent" | "Good" | "Requires Improvement" | "Inadequate";
    assessmentDate: string;
    reportUrl: string;
  };
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
  imagePosition?: string;
  summary: string;
  intro: string;
  established?: string;
  capacity?: string;
  careTypes: string[];
  highlights: string[];
  roomHighlights: string[];
  gallery: CareHomeGalleryImage[];
  feelsLike: string[];
  maySuit: string[];
  localArea: string;
  visiting: CareHomeVisiting;
  familyFaqs: CareHomeFaq[];
  imagePlaceholders: string[];
  regulatory: CareHomeRegulatoryInfo;
  history?: CareHomeHistory;
  teamMembers: TeamMember[];
  deputies: DeputyProfile[];
  teamApproach: string[];
  mapQuery: string;
};

const noDeputyProfiles = (): DeputyProfile[] => [];

const standardImagePlaceholders = [
  "TODO: staged bedroom photo - use a bright room with personal belongings and a clear bed view.",
  "TODO: manager portrait - warm, natural portrait of the manager families are likely to meet.",
  "TODO: deputy portrait - add where a current deputy or senior team member is available.",
  "TODO: lounge photo - show seating, daylight and the feel of shared spaces.",
  "TODO: dining photo - show tables, meals or dining-room atmosphere.",
  "TODO: garden photo - show accessible outdoor space and seating.",
  "TODO: activity session photo - show real daily life without making residents feel staged.",
  "TODO: exterior photo - show the arrival view families will recognise.",
  "TODO: quiet spaces photo - show calm corners for rest, family visits or one-to-one conversation."
];

const standardFamilyFaqs = (homeName: string, shortName: string): CareHomeFaq[] => [
  {
    question: `Can we visit ${homeName} before deciding?`,
    answer:
      "Yes. A viewing is often the best way to understand the atmosphere, meet the team and ask questions about daily routines, rooms, safety and availability."
  },
  {
    question: "What happens if we are not sure which care type is right?",
    answer:
      "You can start with what has changed. The team can talk through residential care, dementia care, respite or other options without making the conversation feel clinical or rushed."
  },
  {
    question: "Will our loved one be able to bring familiar belongings?",
    answer:
      `${shortName} encourages familiar items where practical, because photographs, favourite blankets, ornaments and everyday objects can help a room feel more like their own.`
  },
  {
    question: "Can families stay involved after someone moves in?",
    answer:
      "Yes. Family knowledge is important, especially around routines, food preferences, communication, interests, worries and what helps someone feel settled."
  },
  {
    question: "How quickly can care start?",
    answer:
      "This depends on availability, assessment and the person's current needs. If the situation is urgent, call so the team can explain the practical next step."
  }
];

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
      "En-suite rooms available",
      "Accessible bathrooms in the extension",
      "Nurse call systems for reassurance",
      "Space for cherished belongings"
    ],
    gallery: [
      galleryImage("broadlands-park", "bedroom.webp", "Broadlands Park bedroom with a double bed, soft chair and large windows.", "Example bedroom", "Rooms"),
      galleryImage("broadlands-park", "garden-lawn.webp", "Broadlands Park garden lawn with mature trees and planting.", "Garden lawn", "Gardens"),
      galleryImage("broadlands-park", "lounge-seating.webp", "Broadlands Park lounge area with chairs, framed photographs and access through to shared spaces.", "Lounge seating", "Daily Life"),
      galleryImage("broadlands-park", "garden-planting.webp", "Broadlands Park garden planting and flower beds beside the red-brick building.", "Garden planting", "Gardens"),
      galleryImage("broadlands-park", "fresh-meal.webp", "A freshly served meal at Broadlands Park.", "Freshly served meal", "Dining"),
      galleryImage("broadlands-park", "bedroom-corner.webp", "Broadlands Park bedroom corner with a bed, chair, wardrobe and garden view.", "Bedroom corner", "Rooms"),
      galleryImage("broadlands-park", "lounge-area.webp", "Broadlands Park lounge area with armchairs and bunting.", "Lounge area", "Daily Life"),
      galleryImage("broadlands-park", "dining-area.webp", "Broadlands Park dining area with tables, chairs and a serving counter.", "Dining area", "Dining"),
      galleryImage("broadlands-park", "reading-corner.webp", "Broadlands Park reading corner with armchairs, framed photographs and magazines.", "Reading corner", "Quiet Spaces"),
      galleryImage("broadlands-park", "corridor.webp", "Broadlands Park corridor with handrails and bedroom doors.", "Accessible corridors", "Daily Life"),
      galleryImage("broadlands-park", "hallway.webp", "Broadlands Park hallway leading through to shared lounge areas.", "Hallway through the home", "Daily Life"),
      galleryImage("broadlands-park", "garden-border.webp", "Broadlands Park garden border with planting beside the lawn.", "Garden border", "Gardens"),
      galleryImage("broadlands-park", "garden-detail.webp", "Broadlands Park garden detail with planting and decorative features.", "Garden detail", "Gardens")
    ],
    feelsLike: [
      "Peaceful and settled, with a country-house feel and mature gardens around the home.",
      "Small enough for families to recognise familiar faces, with routines shaped around each resident.",
      "Warm and traditional without feeling formal, especially for families who value a quieter setting."
    ],
    maySuit: [
      "Families looking for residential care near Acle, Upton or the Norfolk Broads.",
      "Someone who would benefit from gardens, calm lounges and a peaceful village setting.",
      "Families who want a long-established home with a clear family-run history."
    ],
    localArea:
      "Broadlands Park is in Upton, close to Acle and the Norfolk Broads, making it practical for families travelling from nearby villages, Great Yarmouth, Norwich routes and the surrounding Broadland area.",
    visiting: {
      summary:
        "Families can arrange a viewing to see bedrooms, lounges, dining areas and the gardens, then talk through care needs and availability.",
      parking:
        "Ample on-site parking is available for visitors, and the home is served by local bus routes. Ask the team about the easiest arrival point when booking your visit.",
      firstViewing:
        "At a first viewing, bring any questions about routines, mobility, medication support, family involvement, fees and what would help your loved one settle."
    },
    familyFaqs: standardFamilyFaqs("Broadlands Park", "Broadlands Park"),
    imagePlaceholders: standardImagePlaceholders,
    regulatory: {
      cqcLocationId: "1-1879878247",
      cqcRating: "Requires improvement",
      cqcUrl: "https://www.cqc.org.uk/location/1-1879878247",
      pamms: {
        rating: "Good",
        assessmentDate: "21/03/2024",
        reportUrl: "https://www.hollymancarehomes.co.uk/hch/wp-content/uploads/2025/01/broadlands-park-report.pdf"
      }
    },
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
    teamMembers: [],
    deputies: noDeputyProfiles(),
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
    image: "/images/home-broadland-house-frontage.webp",
    imageAlt: "Broadland House care home exterior in Potter Heigham.",
    imagePosition: "50% 45%",
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
      "En-suite rooms available",
      "A calm and familiar feel",
      "Personal items encouraged",
      "Quiet spaces for rest"
    ],
    gallery: [
      galleryImage("broadland-house", "bedroom.webp", "Broadland House bedroom with a bed, armchair and window view.", "Example bedroom", "Rooms"),
      galleryImage("broadland-house", "garden-activity.webp", "Residents and team members taking part in an outdoor garden activity at Broadland House.", "Garden activity", "Activities"),
      galleryImage("broadland-house", "bedroom-sitting-area.webp", "Broadland House bedroom with a bed, armchairs, table and television.", "Bedroom sitting area", "Rooms"),
      galleryImage("broadland-house", "raised-garden-beds.webp", "Broadland House garden with raised beds, benches and winter planting.", "Raised garden beds", "Gardens"),
      galleryImage("broadland-house", "garden-pergola.webp", "Broadland House garden pergola with outdoor table, chairs and bunting.", "Garden pergola", "Gardens"),
      galleryImage("broadland-house", "conservatory-lounge.webp", "Broadland House conservatory lounge with armchairs and a jukebox.", "Conservatory lounge", "Daily Life")
    ],
    feelsLike: [
      "Small, homely and village-based, with a calm pace and familiar faces.",
      "Practical and reassuring for families considering dementia care in Potter Heigham.",
      "A place where gardens, shared spaces and everyday conversation help the home feel lived-in."
    ],
    maySuit: [
      "Families looking for care near Potter Heigham, the Norfolk Broads or Great Yarmouth routes.",
      "Someone living with dementia who may benefit from a smaller, familiar environment.",
      "Families who want a home where questions can be talked through without pressure."
    ],
    localArea:
      "Broadland House sits in Potter Heigham, close to the Norfolk Broads and surrounding villages, making it a practical option for families near Potter Heigham, Ludham, Martham and Great Yarmouth routes.",
    visiting: {
      summary:
        "A viewing can include bedrooms, garden areas, shared lounges and a conversation about how the team supports daily routines.",
      parking:
        "Ample on-site parking is available for visitors, and the home is served by local bus routes. Ask the team about the simplest arrival arrangements when you book, especially if you are visiting with someone who has mobility needs.",
      firstViewing:
        "Families often ask about dementia support, settling in, safety, meals, activities and how relatives remain involved."
    },
    familyFaqs: standardFamilyFaqs("Broadland House", "Broadland House"),
    imagePlaceholders: standardImagePlaceholders,
    regulatory: {
      cqcLocationId: "1-1879878336",
      cqcRating: "Requires improvement",
      cqcUrl: "https://www.cqc.org.uk/location/1-1879878336",
      pamms: {
        rating: "Good",
        assessmentDate: "18/01/2024",
        reportUrl: "https://www.hollymancarehomes.co.uk/hch/wp-content/uploads/2025/01/HollymanCareHomesLimited-Summary.pdf"
      }
    },
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
        careAbout:
          "Helping Broadland House feel safe, responsive and full of everyday warmth for residents, relatives and staff.",
        familiesCanAsk:
          "Dementia support, care planning, assessments, daily routines, staffing and what happens after a first enquiry.",
        focusAreas: [
          "Maintaining safety and good governance",
          "Leading and supporting the team",
          "Keeping care responsive to residents' needs"
        ],
        personal:
          "Diane is motivated by the small day-to-day differences that matter to residents and staff: a smile, a settled routine, or a team pulling together at the right moment."
      }
    ],
    deputies: noDeputyProfiles(),
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
      "En-suite rooms available",
      "Warm and familiar surroundings",
      "Personal touches welcomed",
      "Peaceful outlooks from many rooms"
    ],
    gallery: [
      galleryImage("martham-lodge", "garden-planters.webp", "Martham Lodge garden with colourful planters, lawn and hanging decorations.", "Garden planters", "Gardens"),
      galleryImage("martham-lodge", "main-lounge.webp", "Martham Lodge lounge with armchairs beside large bay windows.", "Main lounge seating", "Daily Life"),
      galleryImage("martham-lodge", "bedroom.webp", "Martham Lodge bedroom with a single bed, bedside cabinet and personal touches.", "Example bedroom", "Rooms"),
      galleryImage("martham-lodge", "garden-activity.webp", "Residents taking part in a flower potting activity outside at Martham Lodge.", "Garden activity", "Activities"),
      galleryImage("martham-lodge", "library-lounge.webp", "Martham Lodge lounge corner with armchairs, bookshelves, television and framed photographs.", "Library lounge", "Quiet Spaces"),
      galleryImage("martham-lodge", "garden-path.webp", "Martham Lodge garden path with mature planting and hanging decorations.", "Garden path", "Gardens"),
      galleryImage("martham-lodge", "garden-pots.webp", "Martham Lodge patio area with flower pots, bunting and garden ornaments.", "Garden pots and flowers", "Gardens"),
      galleryImage("martham-lodge", "salon-corner.webp", "Martham Lodge salon corner with lighted mirror, chair and hairdryer.", "Salon corner", "Daily Life"),
      galleryImage("martham-lodge", "home-cat-chair.webp", "A Martham Lodge cat resting on a leather chair.", "Home cat", "Daily Life"),
      galleryImage("martham-lodge", "animal-therapy-rabbits.webp", "Rabbits being held during an animal therapy visit at Martham Lodge.", "Animal therapy visit", "Activities"),
      galleryImage("martham-lodge", "flower-power-resident.webp", "A resident smiling in flower-themed accessories during an activity at Martham Lodge.", "Flower power fun", "Activities"),
      galleryImage("martham-lodge", "flower-power-team.webp", "Martham Lodge team members dressed in colourful themed outfits for an activity day.", "Themed activity day", "Activities")
    ],
    feelsLike: [
      "Characterful, familiar and village-rooted, with the green close by and garden spaces around the home.",
      "Specialist dementia care with a focus on calm reassurance, activities and meaningful daily moments.",
      "Warm and personal, especially for families who want a smaller setting where people are known."
    ],
    maySuit: [
      "Families looking for dementia care near Martham, Potter Heigham, Hemsby or the east Norfolk villages.",
      "Someone who benefits from a familiar daily rhythm, patient reassurance and meaningful activities.",
      "Families who want a specialist dementia setting that still feels homely and village-based."
    ],
    localArea:
      "Martham Lodge is on Martham village green, close to the Norfolk Broads and east Norfolk coastal routes, giving families a recognisable local setting for visits.",
    visiting: {
      summary:
        "A visit can help families see the village-green setting, shared spaces, bedrooms and how dementia care is supported day to day.",
      parking:
        "Ample on-site parking is available for visitors, and the home is served by local bus routes. Arrival arrangements can be confirmed when you book, so the team can make the visit as easy as possible.",
      firstViewing:
        "For dementia enquiries, families may want to bring notes on routines, triggers, communication, personal history, mobility and what helps the person feel safe."
    },
    familyFaqs: standardFamilyFaqs("Martham Lodge", "Martham Lodge"),
    imagePlaceholders: standardImagePlaceholders,
    regulatory: {
      cqcLocationId: "1-1879878280",
      cqcRating: "Good",
      cqcUrl: "https://www.cqc.org.uk/location/1-1879878280"
    },
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
        careAbout:
          "Helping people living with dementia enjoy meaningful, warm and fulfilling days while families feel listened to and reassured.",
        familiesCanAsk:
          "Dementia routines, activities, therapies, settling in, family involvement and what information helps the team get to know someone.",
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
      "En-suite rooms available",
      "Rooms with individual character",
      "Personal belongings encouraged",
      "Cosy, restful spaces"
    ],
    gallery: [
      galleryImage("braydeston-court", "bedroom.webp", "Braydeston Court bedroom with a bed, chair and large window.", "Example bedroom", "Rooms"),
      galleryImage("braydeston-court", "cafe-menu.webp", "Braydeston Court cafe menu board set into a brick feature wall.", "Cafe menu board", "Dining"),
      galleryImage("braydeston-court", "staircase-seating.webp", "Braydeston Court staircase seating area with wood panelling and armchairs.", "Staircase seating", "Quiet Spaces"),
      galleryImage("braydeston-court", "front-exterior.webp", "Braydeston Court red-brick exterior with bay windows and a tower.", "Edwardian frontage", "Exterior"),
      galleryImage("braydeston-court", "bay-window-seating.webp", "Braydeston Court bay-window seating area with a small table and chairs.", "Bay-window seating", "Quiet Spaces"),
      galleryImage("braydeston-court", "cafe-counter.webp", "Braydeston Court cafe counter with tea cups, shelves and wall decoration.", "Cafe counter", "Dining"),
      galleryImage("braydeston-court", "tea-station.webp", "Braydeston Court tea and coffee station with teapots and cafe signage.", "Tea and coffee corner", "Dining"),
      galleryImage("braydeston-court", "tea-service.webp", "Braydeston Court tea service detail with cups and a teapot.", "Tea service detail", "Dining"),
      galleryImage("braydeston-court", "cafe-wall-display.webp", "Braydeston Court cafe wall display with hats, signs and decorative features.", "Cafe wall display", "Daily Life"),
      galleryImage("braydeston-court", "window-table.webp", "Braydeston Court quiet table beside a tall window.", "Quiet table by the window", "Quiet Spaces"),
      galleryImage("braydeston-court", "hallway.webp", "Braydeston Court hallway with seating, artwork and light green wall panels.", "Hallway seating", "Daily Life"),
      galleryImage("braydeston-court", "corridor.webp", "Braydeston Court corridor with blue door and arched opening.", "Bright corridors", "Daily Life")
    ],
    feelsLike: [
      "Characterful and welcoming, with Edwardian details, cosy corners and a cafe-style shared space.",
      "Sociable without losing quiet places to sit, talk or spend time with family.",
      "Close to Brundall and Norwich routes, while still feeling residential and settled."
    ],
    maySuit: [
      "Families looking for care near Brundall, Norwich, Blofield or the Broadland villages.",
      "Someone who may enjoy characterful shared spaces, a cafe feel and a smaller residential setting.",
      "Families exploring residential, dementia, respite or palliative support in the Brundall area."
    ],
    localArea:
      "Braydeston Court is in Brundall, close to Norwich and surrounding Broadland villages, making it practical for families who want a home near Brundall with accessible visiting routes.",
    visiting: {
      summary:
        "A viewing can include the Edwardian frontage, cafe-style area, bedrooms, quiet corners and a conversation about current care needs.",
      parking:
        "Ample on-site parking is available for visitors, and the home is served by local bus routes. Ask about the easiest arrival point when booking, particularly if you are visiting with a relative or need step-free guidance.",
      firstViewing:
        "Families often ask about care types, respite options, dementia support, activities, visiting routines and what availability looks like."
    },
    familyFaqs: standardFamilyFaqs("Braydeston Court", "Braydeston Court"),
    imagePlaceholders: standardImagePlaceholders,
    regulatory: {
      cqcLocationId: "1-11890777495",
      cqcRating: "Requires improvement",
      cqcUrl: "https://www.cqc.org.uk/location/1-11890777495"
    },
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
        careAbout:
          "Making sure residents feel valued, families feel reassured and staff feel proud of the care they give.",
        familiesCanAsk:
          "Residential care, dementia support, respite enquiries, daily life, moving in and how the team supports changing needs.",
        focusAreas: [
          "Supporting compassionate, person-centred care",
          "Building confident and valued teams",
          "Keeping quality and compliance grounded in a homely environment"
        ],
        personal:
          "Away from work, Maria is a proud mum of five and grandmother to one. She enjoys family time, swimming when she gets the chance, and writing rhyming poetry."
      }
    ],
    deputies: noDeputyProfiles(),
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
