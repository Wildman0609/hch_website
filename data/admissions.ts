export type ThankYouType =
  | "general-enquiry"
  | "viewing-request"
  | "brochure-request"
  | "urgent-help-request"
  | "find-care-result";

export const urgentScenarios = [
  "Mum or Dad can no longer cope safely at home",
  "Hospital discharge is approaching and the next step is unclear",
  "Dementia symptoms have worsened or routines are breaking down",
  "Falls, night-time wandering or safety concerns are increasing",
  "A family carer is exhausted or close to burnout",
  "Short-term respite is needed quickly",
  "The family does not know what type of care is needed"
];

export const familyReassurance = [
  {
    question: "Will Mum or Dad settle?",
    answer:
      "Settling is a process, not a single moment. Families can share routines, favourite foods, interests, worries and small details that help the team make the first days feel more familiar."
  },
  {
    question: "What if we feel guilty?",
    answer:
      "Many families do. Asking about care usually means you are trying to keep someone safe, supported and less isolated. You can talk that through without being pushed into a decision."
  },
  {
    question: "Can we just ask questions?",
    answer:
      "Yes. You do not need to know the right care type, funding route or timescale before you call. Start with what has changed and what you are worried about."
  },
  {
    question: "How quickly can care start?",
    answer:
      "That depends on availability, assessment, current needs and the home that may suit best. If the situation is urgent, call so the team can explain the practical next step."
  },
  {
    question: "What happens at the first viewing?",
    answer:
      "You can look around, meet people, ask about daily routines, talk through care needs and get a feel for whether the home could suit your loved one."
  },
  {
    question: "What should we bring when visiting?",
    answer:
      "Bring the questions on your mind. If helpful, also bring notes about routines, medication support, mobility, memory changes, food preferences and who is involved in decisions."
  }
];

export const guidedCareQuestions = [
  {
    id: "relationship",
    label: "Who are you looking for care for?",
    options: ["Mum", "Dad", "Partner", "Another relative", "Myself", "Someone else"]
  },
  {
    id: "urgent",
    label: "Is the need urgent?",
    options: ["Yes, help is needed now", "Soon, within weeks", "No, we are planning ahead", "Not sure"]
  },
  {
    id: "preferredHome",
    label: "Which area or home is preferred?",
    options: ["Acle / Upton", "Potter Heigham", "Martham", "Brundall", "Not sure"]
  },
  {
    id: "dementia",
    label: "Is dementia involved?",
    options: ["Yes", "Possibly", "No", "Not sure"]
  },
  {
    id: "stayType",
    label: "Is this for permanent care, respite, or unsure?",
    options: ["Permanent care", "Respite or short stay", "A trial stay", "Unsure"]
  },
  {
    id: "currentSetting",
    label: "Where is the person currently?",
    options: ["At home", "In hospital", "Another care setting", "Staying with family", "Somewhere else"]
  },
  {
    id: "safety",
    label: "Are there mobility or safety concerns?",
    options: ["Falls or mobility worries", "Night-time safety worries", "Personal care is becoming difficult", "No major concerns", "Not sure"]
  }
];

export const thankYouContent: Record<
  ThankYouType,
  {
    title: string;
    text: string;
    nextSteps: string[];
    secondaryHref: string;
    secondaryLabel: string;
    ctaId: string;
  }
> = {
  "general-enquiry": {
    title: "Thank you. We have received your enquiry.",
    text:
      "A member of the Hollyman team can follow up with you. If your situation changes or feels urgent, please call now.",
    nextSteps: [
      "We will review the home, care type and timescale you shared.",
      "Someone can contact you to talk through the next practical step.",
      "You can still call directly if you need a quicker answer."
    ],
    secondaryHref: "/find-your-home",
    secondaryLabel: "View homes",
    ctaId: "thank_you_general_call"
  },
  "viewing-request": {
    title: "Thank you. We have received your viewing request.",
    text:
      "The next step is to agree which home you would like to visit and a time that works for your family.",
    nextSteps: [
      "We can check the preferred home and current availability.",
      "You can bring questions about routines, safety, settling in and fees.",
      "If you need to view quickly, please call the home or main number."
    ],
    secondaryHref: "/family-guide",
    secondaryLabel: "Viewing questions",
    ctaId: "thank_you_viewing_call"
  },
  "brochure-request": {
    title: "Thank you. We have received your brochure request.",
    text:
      "A printed brochure request can be prepared for manual follow-up. If you also want to speak to someone, calling is still the quickest route.",
    nextSteps: [
      "We will check the preferred home and postal details.",
      "A member of the team can follow up if any detail is unclear.",
      "The brochure system is prepared for a future print-and-post provider connection."
    ],
    secondaryHref: "/find-your-home",
    secondaryLabel: "Compare homes",
    ctaId: "thank_you_brochure_call"
  },
  "urgent-help-request": {
    title: "Thank you. We have received your urgent help request.",
    text:
      "If the situation is time-sensitive, please call as well. A phone conversation is the safest way to understand what has changed today.",
    nextSteps: [
      "Call now if discharge, safety or carer burnout is immediate.",
      "Have the current location, care concerns and preferred area ready if you can.",
      "The team can explain what information is needed before care can start."
    ],
    secondaryHref: "/urgent-care-help",
    secondaryLabel: "Urgent help guidance",
    ctaId: "thank_you_urgent_call"
  },
  "find-care-result": {
    title: "Thank you. We have received your care guidance request.",
    text:
      "The guided journey is not a clinical assessment, but it can help the team understand where the conversation should start.",
    nextSteps: [
      "We can talk through the answers and suggest which home or care type may be worth discussing.",
      "If dementia, falls, discharge or respite came up, mention that early in the call.",
      "A viewing can help you understand whether a home feels right."
    ],
    secondaryHref: "/request-brochure",
    secondaryLabel: "Request a brochure",
    ctaId: "thank_you_find_care_call"
  }
};
