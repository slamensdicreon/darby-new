"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import {
  CONTACT_FIELDS,
  HONEYPOT,
  INTERESTS,
  type ContactField,
  type Interest,
  validateContact,
} from "@/lib/validation";

type Errors = Partial<Record<ContactField, string>>;

/** Contact inquiry form (build spec 5.2). */
export function ContactForm() {
  const [interest, setInterest] = useState<Interest>("Animal Nutrition");
  const [errors, setErrors] = useState<Errors>({});
  const [alert, setAlert] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<{ first: string; email: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const sentHeading = useRef<HTMLHeadingElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(CONTACT_FIELDS.map((f) => [f, String(data.get(f) ?? "")])) as Record<
      ContactField,
      string
    >;
    const found = validateContact(values);
    setErrors(found);
    const firstBad = CONTACT_FIELDS.find((f) => found[f]);
    if (firstBad) {
      setAlert("Check the highlighted fields.");
      (form.elements.namedItem(firstBad) as HTMLElement | null)?.focus();
      return;
    }
    setAlert("");
    setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          interest,
          phone: data.get("phone"),
          specs: data.get("specs") === "on",
          [HONEYPOT]: data.get(HONEYPOT),
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; errors?: Errors };
      if (!res.ok) {
        if (body.errors && Object.keys(body.errors).length) {
          setErrors(body.errors);
          setAlert("Check the highlighted fields.");
          const bad = CONTACT_FIELDS.find((f) => body.errors?.[f]);
          if (bad) (form.elements.namedItem(bad) as HTMLElement | null)?.focus();
        } else {
          setAlert(body.error || "Your message could not be sent. Please try again, or email info@darbyinc.com.");
        }
        return;
      }
      setSent({ first: values.first.trim(), email: values.email.trim() });
      requestAnimationFrame(() => sentHeading.current?.focus());
    } catch {
      setAlert("Your message could not be sent. Check your connection, or email info@darbyinc.com.");
    } finally {
      setBusy(false);
    }
  }

  function again() {
    formRef.current?.reset();
    setInterest("Animal Nutrition");
    setErrors({});
    setAlert("");
    setSent(null);
    requestAnimationFrame(() => (formRef.current?.elements.namedItem("first") as HTMLElement | null)?.focus());
  }

  const field = (name: ContactField) => ({
    name,
    id: `f-${name}`,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `e-${name}` : undefined,
  });
  const error = (name: ContactField) =>
    errors[name] ? (
      <span id={`e-${name}`} className="field__error">
        {errors[name]}
      </span>
    ) : null;

  return (
    <div className="form-card">
      <div hidden={!sent}>
        <div role="status" className="sent">
          <span className="sent__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12.5L10 17.5L19 7.5" />
            </svg>
          </span>
          <h2 className="sent__title" tabIndex={-1} ref={sentHeading}>
            Thank you, {sent?.first}.
          </h2>
          <p className="body-lg sent__text">
            Your message is with the Darby team in Armonk. A specialist will reply to {sent?.email}.
          </p>
          <div>
            <button type="button" className="btn btn--frond-outline" onClick={again}>
              Send another message
            </button>
          </div>
        </div>
      </div>
      <div hidden={Boolean(sent)}>
        <form ref={formRef} noValidate className="cform" aria-labelledby="form-h" onSubmit={onSubmit}>
          <div className="cform__head">
            <h2 id="form-h" className="cform__title">
              Send us a message
            </h2>
            <span className="cform__hint">All fields are required unless marked optional.</span>
          </div>

          <div role="group" aria-labelledby="int-l" className="cform__group">
            <span id="int-l" className="cform__group-label">
              I’m interested in
            </span>
            <div className="filters">
              {INTERESTS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className="pill pill--on-white"
                  aria-pressed={interest === opt}
                  onClick={() => setInterest(opt)}
                >
                  {opt}
                </button>
              ))}
              <input type="hidden" name="interest" value={interest} />
            </div>
          </div>

          <div className="cform__row">
            <label className="field">
              <span>First name</span>
              <input type="text" autoComplete="given-name" maxLength={200} {...field("first")} />
              {error("first")}
            </label>
            <label className="field">
              <span>Last name</span>
              <input type="text" autoComplete="family-name" maxLength={200} {...field("last")} />
              {error("last")}
            </label>
          </div>
          <div className="cform__row">
            <label className="field">
              <span>Company</span>
              <input type="text" autoComplete="organization" maxLength={200} {...field("company")} />
              {error("company")}
            </label>
            <label className="field">
              <span>
                Phone<span className="field__optional"> (optional)</span>
              </span>
              <input type="tel" name="phone" id="f-phone" autoComplete="tel" maxLength={200} />
            </label>
          </div>
          <label className="field field--full">
            <span>Work email</span>
            <input type="email" autoComplete="email" maxLength={200} {...field("email")} />
            {error("email")}
          </label>
          <label className="field field--full">
            <span>How can we help?</span>
            <textarea rows={5} maxLength={5000} {...field("message")} />
            {error("message")}
          </label>
          <label className="check">
            <input type="checkbox" name="specs" />
            Send me the product specifications
          </label>
          <div className="hp" aria-hidden="true">
            <label>
              Website
              <input type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="cform__actions">
            <button type="submit" className="cform__submit" disabled={busy}>
              {busy ? "Sending…" : "Send message"}
            </button>
            <span role="alert" className="cform__alert">
              {alert}
            </span>
          </div>
          <p className="cform__privacy">
            We use your details only to answer your inquiry. See our <Link href="/privacy-policy">privacy policy</Link>.
          </p>
        </form>
      </div>
    </div>
  );
}
