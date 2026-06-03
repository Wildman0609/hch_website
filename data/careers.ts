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
    id: "day-care-assistant",
    title: "Carer - Day",
    home: "Across Hollyman Care Homes",
    location: "Upton, Potter Heigham, Martham and Brundall",
    contract: "Full-time and part-time roles considered",
    shift: "Day shifts",
    pay: "From £13.75 per hour",
    status: "Recruiting",
    summary:
      "A practical, people-focused role supporting residents with everyday care, routines, companionship and dignity."
  },
  {
    id: "night-care-assistant",
    title: "Carer - Night",
    home: "Across Hollyman Care Homes",
    location: "Norfolk",
    contract: "Role dependent",
    shift: "Night shifts",
    pay: "Discussed at interview",
    status: "Register interest",
    summary:
      "For carers who can provide calm overnight support, complete observations and help residents feel safe through the night."
  },
  {
    id: "senior-care-assistant",
    title: "Senior Care Assistant",
    home: "Across Hollyman Care Homes",
    location: "Norfolk",
    contract: "Role dependent",
    shift: "Day shifts",
    pay: "Discussed at interview",
    status: "Register interest",
    summary:
      "For experienced carers who are ready to help lead shifts, support colleagues and keep care delivery organised."
  },
  {
    id: "deputy-manager",
    title: "Deputy / Head of Shift",
    home: "Across Hollyman Care Homes",
    location: "Norfolk",
    contract: "Role dependent",
    shift: "Home leadership",
    pay: "Discussed at interview",
    status: "Register interest",
    summary:
      "For experienced senior care leaders who can support managers with care quality, team leadership and daily operations."
  },
  {
    id: "manager",
    title: "Manager",
    home: "Across Hollyman Care Homes",
    location: "Norfolk",
    contract: "Role dependent",
    shift: "Home leadership",
    pay: "Discussed at interview",
    status: "Register interest",
    summary:
      "For experienced managers who can lead a home, support families and staff, and keep care quality and operations aligned."
  },
  {
    id: "housekeeper",
    title: "Housekeeper",
    home: "Across Hollyman Care Homes",
    location: "Norfolk",
    contract: "Role dependent",
    shift: "Housekeeping",
    pay: "Discussed at interview",
    status: "Register interest",
    summary:
      "For people who take pride in keeping residents' rooms and shared spaces clean, safe, comfortable and welcoming."
  },
  {
    id: "maintenance",
    title: "Maintenance",
    home: "Across Hollyman Care Homes",
    location: "Norfolk",
    contract: "Role dependent",
    shift: "Maintenance",
    pay: "Discussed at interview",
    status: "Register interest",
    summary:
      "For practical, safety-minded applicants who can support repairs, checks and the everyday upkeep of the home."
  },
  {
    id: "host",
    title: "Host",
    home: "Across Hollyman Care Homes",
    location: "Norfolk",
    contract: "Role dependent",
    shift: "Mealtime support",
    pay: "Discussed at interview",
    status: "Register interest",
    summary:
      "For applicants who enjoy helping residents have calm, well-presented mealtimes with safe food service and a welcoming dining room."
  }
];
