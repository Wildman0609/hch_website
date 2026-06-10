import {
  assessSubmissionForSpam,
  shouldBlockSpam,
  type SpamProtectionInput
} from "@/lib/spamProtection";

export type WebsiteSubmissionKind =
  | "care_enquiry"
  | "care_guidance"
  | "brochure_request"
  | "careers_application";

export type WebsiteSubmissionPayload = {
  kind: WebsiteSubmissionKind;
  source?: string;
  name: string;
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

export type WebsiteSubmissionResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: string;
    };

export type WebsiteSubmissionOptions = {
  spamProtection?: SpamProtectionInput;
};

function serverEnv(name: string) {
  const value = process.env[name]?.trim();
  return value || "";
}

async function readResponseDetail(response: Response) {
  try {
    const data = await response.json();
    if (typeof data?.error === "string") return data.error;
    if (typeof data?.message === "string") return data.message;
  } catch {
    // Fall back to plain text below.
  }

  try {
    return await response.text();
  } catch {
    return "";
  }
}

export async function submitWebsiteSubmission(
  payload: WebsiteSubmissionPayload,
  options: WebsiteSubmissionOptions = {}
): Promise<WebsiteSubmissionResult> {
  const spamAssessment = assessSubmissionForSpam(payload, options.spamProtection);
  if (spamAssessment.isSpam) {
    const shouldBlock = shouldBlockSpam(spamAssessment);
    console.warn(
      shouldBlock
        ? "Website submission blocked as suspected spam"
        : "Website submission matched spam filter but was allowed",
      {
        kind: payload.kind,
        source: payload.source,
        score: spamAssessment.score,
        reasons: spamAssessment.reasons
      }
    );

    if (shouldBlock) {
      return { ok: false, error: "Blocked as suspected spam." };
    }
  }

  const endpoint = serverEnv("CRM_WEBSITE_INTAKE_URL");
  const secret = serverEnv("CRM_WEBSITE_INTAKE_SECRET");

  if (!endpoint || !secret) {
    const missing = [
      !endpoint ? "CRM_WEBSITE_INTAKE_URL" : "",
      !secret ? "CRM_WEBSITE_INTAKE_SECRET" : ""
    ].filter(Boolean);
    const error = `Missing website CRM intake configuration: ${missing.join(", ")}.`;
    console.error(error, {
      kind: payload.kind,
      source: payload.source
    });
    return { ok: false, error };
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...payload,
        source: payload.source || "website",
        submittedAt: new Date().toISOString()
      })
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("CRM website intake request failed", {
      message,
      kind: payload.kind,
      source: payload.source
    });
    return { ok: false, error: message };
  }

  if (!response.ok) {
    const detail = await readResponseDetail(response);
    console.error("CRM website intake failed", {
      status: response.status,
      detail
    });
    return {
      ok: false,
      error: detail || `CRM website intake failed with status ${response.status}.`
    };
  }

  return { ok: true };
}
