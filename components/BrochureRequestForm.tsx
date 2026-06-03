import { Mail, MapPin, Phone, Send } from "lucide-react";
import { homes } from "@/data/homes";
import { services } from "@/data/services";

type BrochureRequestFormProps = {
  action: (formData: FormData) => Promise<void>;
  preferredHome?: string;
  preferredCare?: string;
};

export function BrochureRequestForm({ action, preferredHome, preferredCare }: BrochureRequestFormProps) {
  return (
    <form
      action={action}
      className="rounded-[1.5rem] border border-holly-ink/10 bg-white p-5 shadow-soft sm:p-7"
      aria-label="Request a printed brochure"
    >
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
          Printed brochure
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-holly-ink">
          Request a brochure by post
        </h2>
        <p className="mt-3 text-sm leading-7 text-holly-ink/70">
          Share where to send it and which home you are interested in. The current website queues this for manual follow-up and is ready for a future print-and-post provider.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" autoComplete="name" required />
        <Field label="Phone number" name="phone" autoComplete="tel" type="tel" required icon="phone" />
        <Field label="Email address" name="email" autoComplete="email" type="email" icon="email" />
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
            defaultValue={preferredCare ?? ""}
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
          Urgency
          <select
            name="urgency"
            className="min-h-12 rounded-xl border border-holly-ink/15 bg-white px-4 py-3 text-base font-normal text-holly-ink shadow-inner outline-none transition focus:border-holly-leaf focus:ring-2 focus:ring-holly-leaf/20"
          >
            <option value="">Planning ahead</option>
            <option value="urgent">I need help urgently</option>
            <option value="weeks">Within the next few weeks</option>
            <option value="viewing">I would like to book a viewing too</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-holly-ink sm:col-span-2">
          Postal address
          <textarea
            name="postalAddress"
            rows={4}
            required
            autoComplete="street-address"
            className="rounded-xl border border-holly-ink/15 bg-white px-4 py-3 text-base font-normal text-holly-ink shadow-inner outline-none transition focus:border-holly-leaf focus:ring-2 focus:ring-holly-leaf/20"
            placeholder="House number, street, town and postcode"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-holly-ink sm:col-span-2">
          Message
          <textarea
            name="message"
            rows={5}
            className="rounded-xl border border-holly-ink/15 bg-white px-4 py-3 text-base font-normal text-holly-ink shadow-inner outline-none transition focus:border-holly-leaf focus:ring-2 focus:ring-holly-leaf/20"
            placeholder="Tell us anything useful, such as whether you are also hoping to arrange a viewing."
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          data-cta="request_brochure_form_submit"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-holly-leaf px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-holly-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-holly-gold"
        >
          <Send aria-hidden size={17} />
          Request printed brochure
        </button>
        <p className="text-sm leading-6 text-holly-ink/65">
          Please do not include sensitive medical information in this form.
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
  icon?: "phone" | "email" | "address";
};

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required
}: FieldProps) {
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

export function BrochureContactNotes() {
  return (
    <div className="grid gap-4">
      {[
        {
          icon: Mail,
          title: "By post",
          text: "Use the form to request printed information for a specific home or for the group."
        },
        {
          icon: Phone,
          title: "By phone",
          text: "Call if you need availability, viewing or urgent-care guidance before a brochure arrives."
        },
        {
          icon: MapPin,
          title: "By home",
          text: "If you already know the preferred location, choose the home so the follow-up can be more useful."
        }
      ].map((item) => {
        const Icon = item.icon;
        return (
          <article key={item.title} className="rounded-[1.2rem] bg-white p-5 shadow-soft">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-holly-sky text-holly-leaf">
              <Icon aria-hidden size={20} />
            </div>
            <h3 className="font-display text-2xl font-semibold text-holly-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-holly-ink/70">{item.text}</p>
          </article>
        );
      })}
    </div>
  );
}
