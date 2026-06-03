import {
  Building2,
  ClipboardCheck,
  HeartHandshake,
  Hammer,
  Moon,
  ShieldCheck,
  Sparkles,
  Utensils,
  type LucideIcon
} from "lucide-react";

export type CareerRole = {
  title: string;
  summary: string;
  responsibilities: string[];
  icon: LucideIcon;
};

export type LiveVacancy = {
  id: string;
  title: string;
  home: string;
  location: string;
  contract: string;
  shift: string;
  pay: string;
  perks?: string[];
  status: "Recruiting" | "Register interest";
  summary: string;
};

export const careerPositionOptions = [
  "Carer - Day",
  "Carer - Night",
  "Senior Care Assistant",
  "Deputy / Head of Shift",
  "Manager",
  "Housekeeper",
  "Maintenance",
  "Host"
];

export const careerRoles: CareerRole[] = [
  {
    title: "Carer - Day",
    summary:
      "Day carers support residents with personal care, daily routines, nutrition, hydration, social engagement and accurate care records.",
    responsibilities: [
      "Promoting dignity, choice and independence",
      "Following care plans and escalating changes promptly",
      "Working closely with seniors, deputies and families"
    ],
    icon: HeartHandshake
  },
  {
    title: "Carer - Night",
    summary:
      "Night carers help residents feel safe and settled overnight, responding to call bells, comfort needs, observations and handover priorities.",
    responsibilities: [
      "Supporting calm night-time routines and reassurance",
      "Completing checks, records and overnight observations",
      "Escalating risks, incidents or changes in need"
    ],
    icon: Moon
  },
  {
    title: "Senior Care Assistant",
    summary:
      "Seniors provide experienced on-floor guidance, model good practice and help care assistants deliver consistent person-centred care.",
    responsibilities: [
      "Supporting care delivery during busy periods",
      "Helping colleagues with records, handovers and standards",
      "Escalating concerns while staying within role authority"
    ],
    icon: ClipboardCheck
  },
  {
    title: "Deputy / Head of Shift",
    summary:
      "Deputies lead the safe running of the shift, supporting care quality, staff allocation, medicines safety and day-to-day risk management.",
    responsibilities: [
      "Providing visible shift leadership",
      "Supporting medicines, compliance and handovers",
      "Acting as the first point of escalation on shift"
    ],
    icon: ShieldCheck
  },
  {
    title: "Manager",
    summary:
      "Managers lead the home overall, supporting residents, families and staff while maintaining care quality, standards and a positive team culture.",
    responsibilities: [
      "Leading safe, person-centred care across the home",
      "Supporting families, staff development and communication",
      "Keeping quality, compliance and daily operations aligned"
    ],
    icon: Building2
  },
  {
    title: "Housekeeper",
    summary:
      "Housekeepers help keep the home clean, comfortable and well presented, supporting infection prevention and residents' day-to-day environment.",
    responsibilities: [
      "Maintaining clean bedrooms and shared spaces",
      "Following hygiene and infection prevention routines",
      "Helping the home feel welcoming and well cared for"
    ],
    icon: Sparkles
  },
  {
    title: "Maintenance",
    summary:
      "Maintenance colleagues help keep the home safe, practical and well maintained through repairs, checks and prompt attention to the environment.",
    responsibilities: [
      "Responding to repairs and maintenance issues",
      "Supporting environmental safety checks",
      "Working with managers and contractors where needed"
    ],
    icon: Hammer
  },
  {
    title: "Host",
    summary:
      "Hosts support residents' mealtime experience by preparing service areas, serving meals and drinks, and keeping dining spaces calm and welcoming.",
    responsibilities: [
      "Preparing dining rooms, drinks trolleys and service areas",
      "Supporting food safety, hygiene and records",
      "Working with care staff around resident mealtime needs"
    ],
    icon: Utensils
  }
];

export const liveVacancies: LiveVacancy[] = [
  {
    id: "night-care-assistant",
    title: "Carer - Night",
    home: "Braydeston Court",
    location: "Brundall",
    contract: "Role dependent",
    shift: "12 hour shifts, 8pm to 8am",
    pay: "£14.10 per hour",
    perks: ["1 hour paid breaks"],
    status: "Recruiting",
    summary:
      "A calm overnight role supporting residents with comfort, safety, call bells, observations, care records and handover to the day team."
  }
];
