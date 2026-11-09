import "server-only";
import { mailConfig, sendMail } from "./email";
import { renderNotification, type Row } from "./email-templates";

/**
 * Simple fixed-window rate limiter, per IP and route. In-memory, so on Vercel it applies
 * per function instance (instances are reused while warm). It stops casual repeat
 * submissions; for a hard limit, back it with a shared store such as Upstash Redis
 * from the Vercel Marketplace.
 */
const hits = new Map<string, { count: number; reset: number }>();

export function rateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}

export function clientIp(req: Request) {
  // Vercel sets x-forwarded-for to the real client IP.
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : req.headers.get("x-real-ip"))?.trim() || "unknown";
}

export function str(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

const when = () =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/New_York",
  }).format(new Date()) + " (Eastern)";

export type ContactPayload = {
  first: string;
  last: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  interests: string[];
  wantsSpecifications: boolean;
};

export type SpecPayload = {
  first: string;
  last: string;
  email: string;
  division: string;
  product: string | null;
  marketingOptIn: boolean;
};

function contactMail(p: ContactPayload, page: string) {
  const name = `${p.first} ${p.last}`.trim();
  const divisions = p.interests.join(", ") || "Not specified";
  const rows: Row[] = [
    { label: "Name", value: name },
    { label: "Company", value: p.company },
    { label: "Work email", value: p.email },
    ...(p.phone ? [{ label: "Phone", value: p.phone }] : []),
    { label: "Interested in", value: divisions },
    { label: "Specifications", value: p.wantsSpecifications ? "Yes, asked for the product specifications" : "Not requested" },
    { label: "Message", value: p.message, multiline: true },
    { label: "Submitted", value: when() },
    { label: "From page", value: page },
  ];
  const { html, text } = renderNotification({
    context: "Contact form · darbyinc.com",
    title: `${name} at ${p.company} sent a message.`,
    intro: `A new inquiry about ${divisions}${p.wantsSpecifications ? ", with a request for the product specifications" : ""}. Reply to this email to answer ${p.first} directly.`,
    tags: p.interests,
    rows,
    cta: { label: `Reply to ${p.first}`, href: `mailto:${p.email}?subject=${encodeURIComponent("Re: your inquiry to Darby")}` },
    footnote: "Sent automatically by the darbyinc.com contact form. The sender's address is set as reply-to.",
  });
  return {
    subject: `Contact inquiry from ${name} (${p.company}) · ${divisions}`,
    html,
    text,
    replyTo: p.email,
  };
}

function specMail(p: SpecPayload, page: string) {
  const name = `${p.first} ${p.last}`.trim() || "A visitor";
  const what = p.product ? `${p.product} (${p.division})` : `the ${p.division} range`;
  const rows: Row[] = [
    { label: "Name", value: name },
    { label: "Work email", value: p.email },
    { label: "Division", value: p.division },
    { label: "Product", value: p.product || `All ${p.division} products` },
    { label: "Product updates", value: p.marketingOptIn ? "Opted in to product updates" : "Did not opt in" },
    { label: "Submitted", value: when() },
    { label: "From page", value: page },
  ];
  const { html, text } = renderNotification({
    context: "Specification request · darbyinc.com",
    title: `${name} requested specifications for ${what}.`,
    intro: `Send the ${p.division} specification documents to ${p.email}. The visitor was told they would arrive by email.`,
    tags: [p.division, ...(p.product ? [p.product] : [])],
    rows,
    cta: {
      label: `Send specifications to ${p.first || "the visitor"}`,
      href: `mailto:${p.email}?subject=${encodeURIComponent(`Darby ${p.division} specifications${p.product ? `: ${p.product}` : ""}`)}`,
    },
    footnote: "Sent automatically by the specification request form on darbyinc.com. The requester's address is set as reply-to.",
  });
  return {
    subject: `Spec request: ${what} · ${p.email}`,
    html,
    text,
    replyTo: p.email,
  };
}

/**
 * Deliver a submission: by email through Resend when RESEND_API_KEY is set, and to a
 * webhook when CONTACT_WEBHOOK_URL / SPEC_WEBHOOK_URL is set. Succeeds when every
 * configured route succeeds. With nothing configured it logs the submission and succeeds,
 * so the site works before the inbox is wired up; the log line makes that visible.
 */
export async function deliver(
  kind: "contact" | "spec-request",
  payload: ContactPayload | SpecPayload,
  page = "unknown",
): Promise<boolean> {
  const results: boolean[] = [];

  if (mailConfig.apiKey) {
    const mail = kind === "contact" ? contactMail(payload as ContactPayload, page) : specMail(payload as SpecPayload, page);
    const sent = await sendMail(mail);
    if (!sent.ok) console.error(`[forms] ${kind} email failed: ${sent.error}`);
    else console.info(`[forms] ${kind} email sent to ${mailConfig.to.join(", ")} (${sent.id})`);
    results.push(sent.ok);
  }

  const webhook = kind === "contact" ? process.env.CONTACT_WEBHOOK_URL : process.env.SPEC_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: kind, submittedAt: new Date().toISOString(), page, ...payload }),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) console.error(`[forms] ${kind} webhook responded ${res.status}`);
      results.push(res.ok);
    } catch (err) {
      console.error(`[forms] ${kind} webhook failed`, err);
      results.push(false);
    }
  }

  if (results.length === 0) {
    console.warn(`[forms] ${kind} received but no delivery is configured (set RESEND_API_KEY)`, JSON.stringify(payload));
    return true;
  }
  return results.every(Boolean);
}

/** Path of the page the form was on, from the Referer header. */
export function pageFrom(req: Request) {
  try {
    const ref = req.headers.get("referer");
    return ref ? new URL(ref).pathname + new URL(ref).search : "unknown";
  } catch {
    return "unknown";
  }
}
