import { SpamTrapFields } from "@/components/SpamTrapFields";
import { homes } from "@/data/homes";
import { services } from "@/data/services";

type EnquiryFormProps = {
  action: (formData: FormData) => Promise<void>;
  preferredHome?: string;
  careType?: string;
  urgency?: string;
  reason?: string;
  compactIntro?: boolean;
  thankYouType?: "general-enquiry" | "viewing-request" | "urgent-help-request";
  submitLabel?: string;
  submitCtaId?: string;
};

export function EnquiryForm({
  action,
  preferredHome,
  careType,
  urgency,
  reason,
  compactIntro = false,
  thankYouType = "general-enquiry",
  submitLabel = "Send enquiry",
  submitCtaId = "general_enquiry_submit"
}: EnquiryFormProps) {
  return (
    <form
      action={action}
      className="rounded-[1.5rem] border border-holly-ink/10 bg-white p-5 shadow-soft sm:p-7"
      aria-label="Care enquiry form"
    >
      {!compactIntro ? (
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
            Ask us anything
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-holly-ink">
            Start a care enquiry
          </h2>
          <p className="mt-3 text-sm leading-7 text-holly-ink/70">
            You can use this form even if you are not sure what care you need. A member of the team can call you back.
          </p>
        </div>
      ) : null}
      <input type="hidden" name="source" value={reason ?? "website-enquiry"} />
      <input type="hidden" name="thankYouType" value={thankYouType} />
      <SpamTrapFields />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" autoComplete="name" required />
        <Field label="Phone number" name="phone" autoComplete="tel" type="tel" required />
        <Field label="Email address" name="email" autoComplete="email" type="email" />
        <label className="grid gap-2 text-sm font-semibold text-holly-ink">
          Preferred home
          <select
            name="preferredHome"
            defaultValue={preferredHome ?? ""}
            className="min-h-12 rounded-xl border border-holly-ink/15 bg-white px-4 py-3 text-base font-normal text-holly-ink shadow-inner outline-none transition focus:border-holly-leaf focus:ring-2 focus:ring-holly-leaf/20"
          >
            <option value="">Not sure yet</option>
            {homes.map((home) => (
              <option key={home.slug} value={home.name}>
                {home.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-holly-ink">
          Care type
          <select
            name="careType"
            defaultValue={careType ?? ""}
            className="min-h-12 rounded-xl border border-holly-ink/15 bg-white px-4 py-3 text-base font-normal text-holly-ink shadow-inner outline-none transition focus:border-holly-leaf focus:ring-2 focus:ring-holly-leaf/20"
          >
            <option value="">I am not sure</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-holly-ink">
          How soon do you need care?
          <select
            name="urgency"
            defaultValue={urgency ?? ""}
            className="min-h-12 rounded-xl border border-holly-ink/15 bg-white px-4 py-3 text-base font-normal text-holly-ink shadow-inner outline-none transition focus:border-holly-leaf focus:ring-2 focus:ring-holly-leaf/20"
          >
            <option value="">Planning ahead</option>
            <option value="urgent">I need care urgently</option>
            <option value="weeks">Within the next few weeks</option>
            <option value="viewing">I would like to book a viewing</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-holly-ink sm:col-span-2">
          What would you like help with?
          <textarea
            name="message"
            rows={5}
            className="rounded-xl border border-holly-ink/15 bg-white px-4 py-3 text-base font-normal text-holly-ink shadow-inner outline-none transition focus:border-holly-leaf focus:ring-2 focus:ring-holly-leaf/20"
            placeholder="Tell us about your loved one, location, timescale or any questions you have."
          />
        </label>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          data-cta={submitCtaId}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-holly-leaf px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-holly-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-holly-gold"
        >
          {submitLabel}
        </button>
        <p className="text-sm leading-6 text-holly-ink/65">
          We will use your details to respond to your enquiry. Please do not include sensitive medical information in this form.
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
};

function Field({ label, name, type = "text", autoComplete, required }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-holly-ink">
      {label}
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="min-h-12 rounded-xl border border-holly-ink/15 bg-white px-4 py-3 text-base font-normal text-holly-ink shadow-inner outline-none transition focus:border-holly-leaf focus:ring-2 focus:ring-holly-leaf/20"
      />
    </label>
  );
}
