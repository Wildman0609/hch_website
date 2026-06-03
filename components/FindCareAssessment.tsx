"use client";

import type { ReactNode, RefObject } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, FileText, Phone, Send } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { guidedCareQuestions } from "@/data/admissions";
import { homes } from "@/data/homes";
import { site } from "@/data/site";

type FindCareAssessmentProps = {
  action: (formData: FormData) => Promise<void>;
};

type Answers = Record<string, string>;

const contactStepIndex = guidedCareQuestions.length;

export function FindCareAssessment({ action }: FindCareAssessmentProps) {
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const isResult = step > contactStepIndex;
  const progress = Math.min(((step + 1) / (guidedCareQuestions.length + 2)) * 100, 100);
  const recommendation = useMemo(() => buildRecommendation(answers), [answers]);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [step]);

  if (isResult) {
    const preferredHome = mapAreaToHome(answers.preferredHome);

    return (
      <div ref={containerRef} className="scroll-mt-28 rounded-[1.5rem] bg-white p-5 shadow-soft sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
          Your next step
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-holly-ink">
          It may be worth speaking to us about {recommendation.label}.
        </h2>
        <p className="mt-4 text-base leading-8 text-holly-ink/72">
          Based on what you have told us, this is a starting point for a conversation, not a clinical decision or care assessment. The team can listen, ask practical questions and explain what may happen next.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {recommendation.points.map((point) => (
            <div key={point} className="rounded-[1rem] bg-holly-sky p-4 text-sm font-semibold leading-7 text-holly-ink/76">
              {point}
            </div>
          ))}
        </div>

        <form action={action} className="mt-7 rounded-[1.25rem] border border-holly-ink/10 bg-holly-cream p-5">
          <input type="hidden" name="preferredHome" value={preferredHome} />
          <input type="hidden" name="careType" value={recommendation.careType} />
          <input type="hidden" name="urgency" value={answers.urgent ?? ""} />
          <input
            type="hidden"
            name="message"
            value={[
              `Looking for: ${answers.relationship ?? "Not answered"}`,
              `Urgency: ${answers.urgent ?? "Not answered"}`,
              `Area: ${answers.preferredHome ?? "Not answered"}`,
              `Dementia: ${answers.dementia ?? "Not answered"}`,
              `Stay type: ${answers.stayType ?? "Not answered"}`,
              `Current setting: ${answers.currentSetting ?? "Not answered"}`,
              `Safety: ${answers.safety ?? "Not answered"}`,
              contact.message ? `Message: ${contact.message}` : ""
            ]
              .filter(Boolean)
              .join("\n")}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field
              label="Name"
              name="name"
              value={contact.name}
              onChange={(value) => setContact((current) => ({ ...current, name: value }))}
              required
            />
            <Field
              label="Phone"
              name="phone"
              type="tel"
              value={contact.phone}
              onChange={(value) => setContact((current) => ({ ...current, phone: value }))}
              required
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={contact.email}
              onChange={(value) => setContact((current) => ({ ...current, email: value }))}
            />
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              data-cta="find_care_result_callback"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-holly-leaf px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-holly-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-holly-gold"
            >
              <Send aria-hidden size={17} />
              Request callback
            </button>
            <ButtonLink
              href={site.phoneHref}
              icon={<Phone aria-hidden size={17} />}
              ctaId="find_care_result_call"
            >
              Call now
            </ButtonLink>
          </div>
        </form>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ButtonLink
            href={`/contact?reason=viewing${preferredHome ? `&home=${encodeURIComponent(preferredHome)}` : ""}`}
            variant="secondary"
            icon={<CalendarDays aria-hidden size={17} />}
            ctaId="find_care_result_book_viewing"
          >
            Book a viewing
          </ButtonLink>
          <ButtonLink
            href={`/request-brochure${preferredHome ? `?home=${encodeURIComponent(preferredHome)}` : ""}`}
            variant="outline"
            icon={<FileText aria-hidden size={17} />}
            ctaId="find_care_result_brochure"
          >
            Request a brochure
          </ButtonLink>
          <button
            type="button"
            onClick={() => setStep(0)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-holly-leaf/35 bg-white px-5 py-3 text-sm font-semibold text-holly-ink transition hover:border-holly-leaf hover:bg-holly-sky"
          >
            Start again
          </button>
        </div>
      </div>
    );
  }

  if (step === contactStepIndex) {
    return (
      <AssessmentShell progress={progress} containerRef={containerRef}>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
          Best contact details
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-holly-ink">
          Who should we speak to?
        </h2>
        <p className="mt-3 text-sm leading-7 text-holly-ink/70">
          These details are used only if you choose to request a callback at the end. Please avoid sensitive medical detail.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field
            label="Your name"
            value={contact.name}
            onChange={(value) => setContact((current) => ({ ...current, name: value }))}
          />
          <Field
            label="Phone"
            type="tel"
            value={contact.phone}
            onChange={(value) => setContact((current) => ({ ...current, phone: value }))}
          />
          <Field
            label="Email"
            type="email"
            value={contact.email}
            onChange={(value) => setContact((current) => ({ ...current, email: value }))}
          />
          <label className="grid gap-2 text-sm font-semibold text-holly-ink sm:col-span-2">
            Anything else you want the team to know?
            <textarea
              value={contact.message}
              onChange={(event) => setContact((current) => ({ ...current, message: event.target.value }))}
              rows={4}
              className="rounded-xl border border-holly-ink/15 bg-white px-4 py-3 text-base font-normal text-holly-ink shadow-inner outline-none transition focus:border-holly-leaf focus:ring-2 focus:ring-holly-leaf/20"
              placeholder="For example, hospital discharge is being discussed, or you are worried about falls."
            />
          </label>
        </div>
        <AssessmentControls
          canGoBack
          onBack={() => setStep((current) => current - 1)}
          onNext={() => setStep((current) => current + 1)}
          nextLabel="See suggested next step"
        />
      </AssessmentShell>
    );
  }

  const question = guidedCareQuestions[step];
  const selected = answers[question.id] ?? "";

  return (
    <AssessmentShell progress={progress} containerRef={containerRef}>
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-holly-leaf">
        Question {step + 1} of {guidedCareQuestions.length}
      </p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-holly-ink">
        {question.label}
      </h2>
      <div className="mt-6 grid gap-3">
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
            className={`rounded-[1rem] border px-4 py-4 text-left text-sm font-semibold leading-6 transition ${
              selected === option
                ? "border-holly-leaf bg-holly-leaf text-white shadow-soft"
                : "border-holly-ink/10 bg-white text-holly-ink hover:bg-holly-sky"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <AssessmentControls
        canGoBack={step > 0}
        canGoNext={Boolean(selected)}
        onBack={() => setStep((current) => Math.max(current - 1, 0))}
        onNext={() => setStep((current) => current + 1)}
      />
    </AssessmentShell>
  );
}

function AssessmentShell({
  progress,
  containerRef,
  children
}: {
  progress: number;
  containerRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  return (
    <div ref={containerRef} className="scroll-mt-28 rounded-[1.5rem] bg-white p-5 shadow-soft sm:p-7">
      <div className="mb-7 h-2 overflow-hidden rounded-full bg-holly-sky">
        <div className="h-full rounded-full bg-holly-leaf" style={{ width: `${progress}%` }} />
      </div>
      {children}
    </div>
  );
}

function AssessmentControls({
  canGoBack,
  canGoNext = true,
  onBack,
  onNext,
  nextLabel = "Continue"
}: {
  canGoBack: boolean;
  canGoNext?: boolean;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
}) {
  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-between">
      <button
        type="button"
        onClick={onBack}
        disabled={!canGoBack}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-holly-leaf/35 bg-white px-5 py-3 text-sm font-semibold text-holly-ink transition hover:border-holly-leaf hover:bg-holly-sky disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowLeft aria-hidden size={17} />
        Back
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-holly-leaf px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-holly-moss disabled:cursor-not-allowed disabled:opacity-50"
      >
        {nextLabel}
        <ArrowRight aria-hidden size={17} />
      </button>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required
}: {
  label: string;
  name?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-holly-ink">
      {label}
      <input
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="min-h-12 rounded-xl border border-holly-ink/15 bg-white px-4 py-3 text-base font-normal text-holly-ink shadow-inner outline-none transition focus:border-holly-leaf focus:ring-2 focus:ring-holly-leaf/20"
      />
    </label>
  );
}

function buildRecommendation(answers: Answers) {
  const points = [
    "A phone conversation can confirm availability, suitability and the safest next step.",
    "A viewing can help your family understand whether a home feels right before deciding."
  ];

  if (answers.urgent?.includes("now") || answers.currentSetting === "In hospital") {
    points.unshift("Because the need sounds time-sensitive, call as well as requesting a callback.");
  }

  if (answers.dementia === "Yes" || answers.dementia === "Possibly") {
    return {
      label: "dementia care and the most suitable home setting",
      careType: "Dementia Care",
      points
    };
  }

  if (answers.stayType?.includes("Respite") || answers.stayType?.includes("trial")) {
    return {
      label: "respite care or a short stay",
      careType: "Respite Care",
      points
    };
  }

  if (answers.safety && answers.safety !== "No major concerns") {
    return {
      label: "residential care with support around safety and daily routines",
      careType: "Residential Care",
      points
    };
  }

  return {
    label: "residential care, respite or a viewing to compare options",
    careType: "Care guidance",
    points
  };
}

function mapAreaToHome(area?: string) {
  if (!area || area === "Not sure") {
    return "";
  }

  const match = homes.find((home) => area.includes(home.area.split(" / ")[0]) || area.includes(home.location));
  return match?.name ?? "";
}
