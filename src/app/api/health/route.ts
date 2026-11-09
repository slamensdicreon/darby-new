import { NextResponse } from "next/server";
import { mailConfig } from "@/lib/email";
import { clientIp, deliveryStatus, rateLimited } from "@/lib/server";

export const dynamic = "force-dynamic";

/**
 * Operational check for form email delivery. Reports configuration state and Resend's
 * view of the account (key accepted, verified domains) without exposing the key itself.
 */
export async function GET(req: Request) {
  if (rateLimited(`health:${clientIp(req)}`, 20)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  let resend: Record<string, unknown> = { keyConfigured: Boolean(mailConfig.apiKey) };
  if (mailConfig.apiKey) {
    try {
      const res = await fetch("https://api.resend.com/domains", {
        headers: { authorization: `Bearer ${mailConfig.apiKey}` },
        signal: AbortSignal.timeout(8000),
      });
      const body = (await res.json().catch(() => ({}))) as { data?: { name: string; status: string; region?: string }[]; message?: string };
      resend = {
        ...resend,
        keyAccepted: res.ok,
        ...(res.ok
          ? { domains: (body.data ?? []).map((d) => ({ name: d.name, status: d.status })) }
          : { error: `${res.status}: ${body.message ?? "unknown"}` }),
      };
    } catch (err) {
      resend = { ...resend, keyAccepted: false, error: err instanceof Error ? err.message : String(err) };
    }
  }

  return NextResponse.json({
    ok: Boolean(mailConfig.apiKey) && resend.keyAccepted === true,
    mail: { to: mailConfig.to, from: mailConfig.from },
    resend,
    delivery: deliveryStatus,
    env: process.env.VERCEL_ENV ?? "local",
    checkedAt: new Date().toISOString(),
  });
}
