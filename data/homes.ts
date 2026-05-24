export type HomeSlug =
  | "broadlands-park"
  | "broadland-house"
  | "martham-lodge"
  | "braydeston-court";

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
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
        role: "Home Manager"
      }
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
        bio:
          "Diane has spent more than 25 years in care, beginning in domiciliary care before moving through senior roles, care planning, assessments, deputy management and care facilitation. At Broadland House she focuses on safe staffing, strong governance and responsive, person-centred care. What motivates Diane is the difference small moments can make: residents feeling happy, staff feeling supported and the home being full of laughter when the team works well together."
      }
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
        role: "Home Manager",
        bio:
          "Carol leads Martham Lodge, a small specialist dementia care setting on Martham village green. Her role is centred on helping residents feel safe, known and settled in a characterful home with garden spaces, familiar routines and a calm daily rhythm. Families can speak to Carol and the Martham Lodge team about dementia support, residential care guidance and planning the next step with confidence."
      }
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
        bio:
          "Maria brings more than 30 years of health and social care experience to Braydeston Court, with a background spanning care homes, domiciliary care, day services and hospital settings. She has built and improved care services, supported teams through change and is qualified to teach Health and Social Care. Maria is hands-on, approachable and focused on creating a warm home where residents feel valued, families feel reassured and staff feel proud of the care they give."
      }
    ],
    mapQuery: "Braydeston Court Care Home, 4 Braydeston Avenue, Brundall NR13 5JX"
  }
];

export function getHome(slug: string) {
  return homes.find((home) => home.slug === slug);
}
