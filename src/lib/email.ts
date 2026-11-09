import "server-only";

/**
 * Email delivery through Resend (https://resend.com), by plain HTTPS so there is no SDK
 * to keep current. Configure with environment variables:
 *   RESEND_API_KEY  the key from the Resend dashboard (required to send)
 *   MAIL_TO         recipient inbox; defaults to info@darbyinc.com
 *   MAIL_FROM       verified sender; defaults to Resend's onboarding sender, which only
 *                   delivers to the Resend account's own address until darbyinc.com is
 *                   verified as a domain in Resend
 */
export const mailConfig = {
  apiKey: process.env.RESEND_API_KEY,
  to: (process.env.MAIL_TO || "info@darbyinc.com").split(",").map((s) => s.trim()).filter(Boolean),
  from: process.env.MAIL_FROM || "Darby Website <onboarding@resend.dev>",
};

export type Mail = { subject: string; html: string; text: string; replyTo?: string };

export async function sendMail(mail: Mail): Promise<{ ok: boolean; id?: string; error?: string }> {
  if (!mailConfig.apiKey) return { ok: false, error: "RESEND_API_KEY is not set" };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${mailConfig.apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: mailConfig.from,
        to: mailConfig.to,
        reply_to: mail.replyTo,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        tags: [{ name: "source", value: "darbyinc-website" }],
      }),
      signal: AbortSignal.timeout(10000),
    });
    const body = (await res.json().catch(() => ({}))) as { id?: string; message?: string; name?: string };
    if (!res.ok) return { ok: false, error: `Resend ${res.status}: ${body.message || body.name || "unknown error"}` };
    return { ok: true, id: body.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
