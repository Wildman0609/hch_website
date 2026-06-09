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

function requiredServerEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing ${name}.`);
  }
  return value;
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

export async function submitWebsiteSubmission(payload: WebsiteSubmissionPayload) {
  const endpoint = requiredServerEnv("CRM_WEBSITE_INTAKE_URL");
  const secret = requiredServerEnv("CRM_WEBSITE_INTAKE_SECRET");

  const response = await fetch(endpoint, {
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

  if (!response.ok) {
    const detail = await readResponseDetail(response);
    console.error("CRM website intake failed", {
      status: response.status,
      detail
    });
    throw new Error("Unable to submit website form to CRM.");
  }
}
