import type { HomeSlug } from "@/data/homes";

export type HomeEventPhoto = {
  src: string;
  alt: string;
  position?: string;
};

export type HomeEvent = {
  id: string;
  homeSlug: HomeSlug;
  homeInitials: string;
  title: string;
  summary: string;
  sortDate: string;
  dateLabel: string;
  photos: HomeEventPhoto[];
};

export const homeEvents: HomeEvent[] = [
  {
    id: "braydeston-court-pony-visit",
    homeSlug: "braydeston-court",
    homeInitials: "BC",
    title: "Pony visit",
    summary:
      "A gentle animal visit brought residents together in the lounge for conversation, smiles and a change of routine.",
    sortDate: "2026-06-03T08:55:00",
    dateLabel: "Recently added",
    photos: [
      {
        src: "/images/events/braydeston-court-pony-visit.webp",
        alt: "Residents sitting together in a lounge during a pony visit at Braydeston Court.",
        position: "50% 45%"
      }
    ]
  },
  {
    id: "braydeston-court-snack-trolley",
    homeSlug: "braydeston-court",
    homeInitials: "BC",
    title: "Snack trolley",
    summary:
      "The snack trolley gives the home a colourful, familiar point in the day and makes refreshments feel social and inviting.",
    sortDate: "2026-06-03T08:54:00",
    dateLabel: "Recently added",
    photos: [
      {
        src: "/images/events/braydeston-court-snack-trolley.webp",
        alt: "A team member standing beside a colourful snack trolley at Braydeston Court.",
        position: "50% 42%"
      }
    ]
  },
  {
    id: "martham-lodge-owl-visit",
    homeSlug: "martham-lodge",
    homeInitials: "ML",
    title: "Evie Owls visit",
    summary:
      "Residents met visiting owls up close, with calm one-to-one moments and plenty to talk about afterwards.",
    sortDate: "2026-05-29T15:29:00",
    dateLabel: "29 May 2026",
    photos: [
      {
        src: "/images/events/martham-lodge-owl-resident-cream-jumper.webp",
        alt: "A resident smiling while meeting a visiting owl at Martham Lodge.",
        position: "50% 44%"
      },
      {
        src: "/images/events/martham-lodge-owl-resident-patterned-top.webp",
        alt: "A resident reaching out towards a visiting owl during an animal visit at Martham Lodge.",
        position: "50% 45%"
      },
      {
        src: "/images/events/martham-lodge-owl-visit-gentleman.webp",
        alt: "A resident looking closely at a visiting owl during the Martham Lodge owl visit.",
        position: "48% 38%"
      },
      {
        src: "/images/events/martham-lodge-owl-close-up.webp",
        alt: "Close-up of a visiting owl at Martham Lodge.",
        position: "50% 32%"
      }
    ]
  },
  {
    id: "braydeston-court-seated-sosa",
    homeSlug: "braydeston-court",
    homeInitials: "BC",
    title: "Seated SOSA activity",
    summary:
      "A seated movement session gave residents a shared activity in a bright communal space.",
    sortDate: "2026-05-06T14:41:00",
    dateLabel: "6 May 2026",
    photos: [
      {
        src: "/images/events/braydeston-court-seated-sosa.webp",
        alt: "Residents gathered in a lounge for a seated movement activity at Braydeston Court.",
        position: "50% 44%"
      }
    ]
  },
  {
    id: "martham-lodge-gardening",
    homeSlug: "martham-lodge",
    homeInitials: "ML",
    title: "Gardening afternoon",
    summary:
      "Residents spent time outside planting pots, chatting and enjoying a hands-on afternoon in the garden.",
    sortDate: "2026-05-05T14:37:00",
    dateLabel: "5 May 2026",
    photos: [
      {
        src: "/images/events/martham-lodge-gardening.webp",
        alt: "Two residents gardening together outside at Martham Lodge.",
        position: "50% 45%"
      }
    ]
  },
  {
    id: "broadland-house-spring-day",
    homeSlug: "broadland-house",
    homeInitials: "BH",
    title: "Spring day",
    summary:
      "Spring colours, table decorations and small seasonal touches helped the home feel bright and welcoming.",
    sortDate: "2026-03-20T12:20:00",
    dateLabel: "20 March 2026",
    photos: [
      {
        src: "/images/events/broadland-house-spring-table.webp",
        alt: "A spring-themed table setting at Broadland House.",
        position: "50% 47%"
      },
      {
        src: "/images/events/broadland-house-spring-display-cart.webp",
        alt: "A decorated spring display cart inside Broadland House.",
        position: "50% 44%"
      },
      {
        src: "/images/events/broadland-house-spring-shelf.webp",
        alt: "Spring decorations and bunting on shelves at Broadland House.",
        position: "50% 50%"
      }
    ]
  },
  {
    id: "broadland-house-valentines-day",
    homeSlug: "broadland-house",
    homeInitials: "BH",
    title: "Valentine's Day",
    summary:
      "Tables, decorations and homemade treats brought a warm Valentine's Day feel into the home.",
    sortDate: "2026-02-14T12:07:00",
    dateLabel: "14 February 2026",
    photos: [
      {
        src: "/images/events/broadland-house-valentines-table.webp",
        alt: "Valentine's Day table decorations at Broadland House.",
        position: "50% 48%"
      },
      {
        src: "/images/events/broadland-house-valentines-treats.webp",
        alt: "Valentine's Day cakes and treats prepared at Broadland House.",
        position: "50% 50%"
      }
    ]
  },
  {
    id: "broadland-house-pet-therapy-rabbit",
    homeSlug: "broadland-house",
    homeInitials: "BH",
    title: "Pet therapy visit",
    summary:
      "A relaxed pet therapy visit created a calm moment of companionship and conversation.",
    sortDate: "2026-02-12T15:18:00",
    dateLabel: "12 February 2026",
    photos: [
      {
        src: "/images/events/broadland-house-pet-therapy-rabbit.webp",
        alt: "A resident holding a rabbit during a pet therapy visit at Broadland House.",
        position: "50% 35%"
      }
    ]
  }
];

export const sortedHomeEvents = [...homeEvents].sort(
  (a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime()
);
