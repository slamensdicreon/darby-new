import "server-only";

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

/** Deliver a submission to the configured destination (open item #6: inbox or CRM). */
export async function deliver(kind: "contact" | "spec-request", payload: Record<string, unknown>) {
  const url = kind === "contact" ? process.env.CONTACT_WEBHOOK_URL : process.env.SPEC_WEBHOOK_URL;
  const body = { type: kind, submittedAt: new Date().toISOString(), ...payload };
  if (!url) {
    console.info(`[forms] ${kind} received (no webhook configured)`, JSON.stringify(body));
    return true;
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error(`[forms] ${kind} webhook responded ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error(`[forms] ${kind} webhook failed`, err);
    return false;
  }
}

export function str(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}
