"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { EMAIL_RE, HONEYPOT, SPEC_EMAIL_ERROR } from "@/lib/validation";
import { SPEC_PRODUCT_EVENT } from "./ProductCatalog";

type Status = { kind: "idle" } | { kind: "error"; text: string } | { kind: "sent"; text: string };

/** Spec request form (build spec 4.4), with an explicit marketing opt-in (open item #8). */
export function SpecForm({ division }: { division: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [busy, setBusy] = useState(false);
  const [product, setProduct] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  // "Request spec sheet" on a product card prefills which product the request is for.
  useEffect(() => {
    const onPick = (e: Event) => setProduct(String((e as CustomEvent).detail ?? ""));
    window.addEventListener(SPEC_PRODUCT_EVENT, onPick);
    return () => window.removeEventListener(SPEC_PRODUCT_EVENT, onPick);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    if (!EMAIL_RE.test(email)) {
      setStatus({ kind: "error", text: SPEC_EMAIL_ERROR });
      emailRef.current?.focus();
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/specs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          first: data.get("first"),
          last: data.get("last"),
          email,
          division,
          product: product || undefined,
          optIn: data.get("optIn") === "on",
          [HONEYPOT]: data.get(HONEYPOT),
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus({ kind: "error", text: body.error || "Something went wrong. Please try again." });
        if (res.status === 422) emailRef.current?.focus();
        return;
      }
      setStatus({ kind: "sent", text: `Thank you. The specifications will be sent to ${email}.` });
    } catch {
      setStatus({ kind: "error", text: "We couldn’t send that. Check your connection and try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="specs__form" noValidate onSubmit={onSubmit} aria-label={`${division} specifications request`}>
      <div className="specs__row">
        <label className="dfield">
          First name
          <input type="text" name="first" autoComplete="given-name" maxLength={200} />
        </label>
        <label className="dfield">
          Last name
          <input type="text" name="last" autoComplete="family-name" maxLength={200} />
        </label>
      </div>
      <div className="specs__row specs__row--end">
        <label className="dfield dfield--wide">
          Work email
          <input
            ref={emailRef}
            type="email"
            name="email"
            autoComplete="email"
            maxLength={200}
            aria-invalid={status.kind === "error"}
            aria-describedby="spec-note"
          />
        </label>
        <button type="submit" className="specs__submit" disabled={busy}>
          {busy ? "Sending…" : "Send me the specifications"}
        </button>
      </div>
      <label className="check check--dark">
        <input type="checkbox" name="optIn" />
        Also send me {division} product updates
      </label>
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <span id="spec-note" role="status" className="specs__note">
        {status.kind === "idle" ? (
          <>
            {product ? `Requesting ${product}. ` : ""}We use these details only to send the specifications
            {" "}and, if you opt in, updates. See our <Link href="/privacy-policy">privacy policy</Link>.
          </>
        ) : (
          status.text
        )}
      </span>
    </form>
  );
}
