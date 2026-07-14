import {
  SPAM_FORM_INTERACTED_AT_FIELD,
  SPAM_FORM_STARTED_AT_FIELD,
  SPAM_HONEYPOT_FIELD_NAMES,
  SPAM_PAGE_URL_FIELD
} from "@/lib/spamProtectionFields";

type SubmissionLike = {
  kind?: string;
  source?: string;
  name?: string;
  email?: string;
  phone?: string;
  preferredHome?: string;
  careType?: string;
  urgency?: string;
  message?: string;
  postalAddress?: string;
  role?: string;
  availability?: string;
  pageUrl?: string;
};

export type SpamProtectionInput = {
  formStartedAt?: string;
  formInteractedAt?: string;
  pageUrl?: string;
  honeypotValues: Record<string, string>;
};

export type SpamAssessment = {
  isSpam: boolean;
  score: number;
  reasons: string[];
};

const SPAM_SCORE_THRESHOLD = 5;
const MIN_HUMAN_SUBMIT_MS = 5000;
const MAX_REASONABLE_FORM_AGE_MS = 12 * 60 * 60 * 1000;

const urlPattern =
  /\b(?:https?:\/\/|www\.|[a-z0-9][a-z0-9-]{1,63}\.(?:ru|cn|xyz|top|click|cam|porn|sex|adult|icu|buzz|online|site|loan|casino|vip|work|shop|info)\b)/gi;

const suspiciousPatterns: Array<{ pattern: RegExp; score: number; reason: string }> = [
  {
    pattern:
      /\b(?:escort(?:s|ing)?|porn(?:ography)?|xxx|nudes?|only\s*fans|onlyfans|erotic|hookups?|adult\s+(?:dating|chat|video|content|service)|sex\s+(?:chat|dating|service|worker|workers|video|cam|cams|offer|offers|tonight|near)|cam\s*(?:girl|girls|sex|site))\b/i,
    score: 6,
    reason: "adult spam terms"
  },
  {
    pattern: /\b(?:viagra|cialis|levitra|kamagra|casino|blackjack|roulette|crypto|bitcoin|forex|payday\s+loan)\b/i,
    score: 5,
    reason: "commercial spam terms"
  },
  {
    pattern: /\b(?:seo|backlink|guest\s+post|link\s+building|rank\s+(?:higher|on google)|increase\s+traffic)\b/i,
    score: 4,
    reason: "SEO spam terms"
  },
  {
    pattern: /\b(?:telegram|whatsapp|snapchat|kik)\s*(?:[:@]|\+?\d{6,})/i,
    score: 3,
    reason: "off-platform contact bait"
  }
];

const careContextPattern =
  /\b(?:admission|admit|alzheim|assess(?:ment)?|available|availability|bed|blofield|braydeston|broadland|broadlands|brochure|call|callback|care|carer|caring|contact|dad|days?|dementia|details|discharge|email|enquir(?:e|y)|fees?|father|funding|get\s+back|grand(?:ad|father|ma|mother)|help|home|hospital|husband|inquir(?:e|y)|information|loved\s+one|mam|martham|mother|mum|nan|norfolk|nursing|older|palliative|parent|partner|phone|placement|relative|residential|respite|ring|room|sister|social\s+worker|soon|speak|stokesby|support|talk|urgent|viewing|visit|weeks?|wife)\b/i;

function readFormString(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function countMatches(value: string, pattern: RegExp) {
  return value.match(pattern)?.length ?? 0;
}

function hasHtml(value: string) {
  return /<a\s+href|<\/?[a-z][^>]*>/i.test(value);
}

function isUrlLike(value: string) {
  return /\b(?:https?:\/\/|www\.|[a-z0-9-]+\.[a-z]{2,})(?:\/|\b)/i.test(value);
}

function phoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

function isLikelyNonUkPhone(value: string) {
  const compact = value.replace(/[^\d+]/g, "");
  if (compact.startsWith("+")) return !compact.startsWith("+44");
  if (compact.startsWith("00")) return !compact.startsWith("0044");
  return false;
}

function isImplausiblePhone(value: string) {
  const digits = phoneDigits(value);
  if (!digits) return false;
  return digits.length < 10 || digits.length > 15 || /^(\d)\1{7,}$/.test(digits);
}

function emailNameMismatch(name: string, email: string) {
  const localPart = email.split("@")[0]?.replace(/[^a-z]+/g, " ") ?? "";
  const nameTokens = name
    .split(" ")
    .map((token) => token.replace(/[^a-z]/g, ""))
    .filter((token) => token.length >= 3);

  if (nameTokens.length < 2 || localPart.length < 5) return false;
  return !nameTokens.some((token) => localPart.includes(token));
}

function spamFilterMode() {
  return (process.env.HCH_SPAM_FILTER_MODE || "block").trim().toLowerCase();
}

export function spamProtectionFromFormData(formData: FormData): SpamProtectionInput {
  const honeypotValues = Object.fromEntries(
    SPAM_HONEYPOT_FIELD_NAMES.map((fieldName) => [
      fieldName,
      readFormString(formData, fieldName)
    ])
  );

  return {
    formStartedAt: readFormString(formData, SPAM_FORM_STARTED_AT_FIELD),
    formInteractedAt: readFormString(formData, SPAM_FORM_INTERACTED_AT_FIELD),
    pageUrl: readFormString(formData, SPAM_PAGE_URL_FIELD),
    honeypotValues
  };
}

export function assessSubmissionForSpam(
  payload: SubmissionLike,
  spamProtection?: SpamProtectionInput
): SpamAssessment {
  const reasons: string[] = [];
  let score = 0;

  function addSignal(signalScore: number, reason: string) {
    score += signalScore;
    reasons.push(reason);
  }

  const completedHoneypots = Object.entries(spamProtection?.honeypotValues ?? {})
    .filter(([, value]) => value.trim().length > 0)
    .map(([fieldName]) => fieldName);

  if (completedHoneypots.length > 0) {
    addSignal(100, `hidden fields completed: ${completedHoneypots.join(", ")}`);
  }

  if (!spamProtection?.formStartedAt) {
    addSignal(3, "missing form timestamp");
  } else {
    const formStartedAt = Number(spamProtection.formStartedAt);
    if (!Number.isFinite(formStartedAt)) {
      addSignal(3, "invalid form timestamp");
    } else {
      const elapsedMs = Date.now() - formStartedAt;
      if (elapsedMs >= 0 && elapsedMs < MIN_HUMAN_SUBMIT_MS) {
        addSignal(4, "submitted too quickly");
      }
      if (elapsedMs < -60_000) {
        addSignal(2, "form timestamp is in the future");
      }
      if (elapsedMs > MAX_REASONABLE_FORM_AGE_MS) {
        addSignal(1, "stale form timestamp");
      }
    }
  }

  if (!spamProtection?.formInteractedAt) {
    addSignal(2, "missing browser interaction marker");
  } else {
    const formInteractedAt = Number(spamProtection.formInteractedAt);
    if (!Number.isFinite(formInteractedAt)) {
      addSignal(2, "invalid browser interaction marker");
    } else if (formInteractedAt > Date.now() + 60_000) {
      addSignal(2, "browser interaction marker is in the future");
    }
  }

  if (!spamProtection?.pageUrl) {
    addSignal(1, "missing page URL");
  }

  const name = normalize(payload.name ?? "");
  const email = normalize(payload.email ?? "");
  const phone = normalize(payload.phone ?? "");
  const message = normalize(payload.message ?? "");
  const allText = normalize(
    [
      payload.name,
      payload.email,
      payload.phone,
      payload.preferredHome,
      payload.careType,
      payload.urgency,
      payload.message,
      payload.postalAddress,
      payload.role,
      payload.availability
    ]
      .filter(Boolean)
      .join(" ")
  );

  if (!name) {
    addSignal(2, "missing name");
  }

  if (!email && !phone) {
    addSignal(4, "missing contact details");
  }

  if (isUrlLike(name)) {
    addSignal(4, "name looks like a URL");
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    addSignal(2, "email field looks malformed");
  }

  if (phone && isImplausiblePhone(phone)) {
    addSignal(4, "phone number looks implausible");
  } else if (phone && isLikelyNonUkPhone(phone)) {
    addSignal(3, "non-UK phone number");
  }

  if (name && email && emailNameMismatch(name, email)) {
    addSignal(1, "name and email appear mismatched");
  }

  if (payload.kind !== "careers_application" && message.length >= 20 && !careContextPattern.test(message)) {
    addSignal(2, "message lacks care context");
  }

  const linkCount = countMatches(allText, urlPattern);
  if (linkCount >= 3) {
    addSignal(5, "multiple suspicious links");
  } else if (linkCount > 0) {
    addSignal(2, "suspicious link");
  }

  if (hasHtml(allText)) {
    addSignal(4, "HTML submitted in text fields");
  }

  for (const { pattern, score: patternScore, reason } of suspiciousPatterns) {
    if (pattern.test(allText)) {
      addSignal(patternScore, reason);
    }
  }

  if (allText.length > 2500) {
    addSignal(3, "excessively long submission");
  }

  return {
    isSpam: score >= SPAM_SCORE_THRESHOLD,
    score,
    reasons
  };
}

export function shouldBlockSpam(assessment: SpamAssessment) {
  const mode = spamFilterMode();
  if (mode === "off" || mode === "disabled" || mode === "log") return false;
  return assessment.isSpam;
}
