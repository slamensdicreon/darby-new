import { NextResponse } from "next/server";
import { clientIp, deliver, pageFrom, rateLimited, str } from "@/lib/server";
import { EMAIL_RE, HONEYPOT, LIMITS, SPEC_EMAIL_ERROR } from "@/lib/validation";

const DIVISIONS = ["Animal Nutrition", "Food Ingredients"];

/** Spec sheet request (build spec 4.4). Marketing opt-in is stored only when ticked. */
export async function POST(req: Request) {
  if (rateLimited(`specs:${clientIp(req)}`)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (str(body[HONEYPOT], LIMITS.short)) return NextResponse.json({ ok: true });

  const email = str(body.email, LIMITS.short);
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: SPEC_EMAIL_ERROR }, { status: 422 });

  const division = DIVISIONS.includes(String(body.division)) ? String(body.division) : "Unknown";
  const ok = await deliver(
    "spec-request",
    {
      first: str(body.first, LIMITS.short),
      last: str(body.last, LIMITS.short),
      email,
      division,
      product: str(body.product, LIMITS.short) || null,
      marketingOptIn: body.optIn === true,
    },
    pageFrom(req),
  );
  if (!ok) return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
