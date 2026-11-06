import { NextResponse } from "next/server";
import { clientIp, deliver, rateLimited, str } from "@/lib/server";
import { HONEYPOT, INTERESTS, LIMITS, validateContact, type Interest } from "@/lib/validation";

/** Contact inquiry (build spec 5.2): validated again on the server, honeypot + rate limit. */
export async function POST(req: Request) {
  if (rateLimited(`contact:${clientIp(req)}`)) {
    return NextResponse.json(
      { error: "Too many messages from this connection. Please try again later, or email info@darbyinc.com." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill every field. Pretend success so they learn nothing.
  if (str(body[HONEYPOT], LIMITS.short)) return NextResponse.json({ ok: true });

  const input = {
    first: str(body.first, LIMITS.short),
    last: str(body.last, LIMITS.short),
    company: str(body.company, LIMITS.short),
    email: str(body.email, LIMITS.short),
    message: str(body.message, LIMITS.message),
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  const interest: Interest = INTERESTS.includes(body.interest as Interest)
    ? (body.interest as Interest)
    : "Animal Nutrition";

  const ok = await deliver("contact", {
    ...input,
    interest,
    phone: str(body.phone, LIMITS.short),
    wantsSpecifications: body.specs === true,
  });
  if (!ok) {
    return NextResponse.json(
      { error: "Your message could not be sent. Please try again, or email info@darbyinc.com." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
