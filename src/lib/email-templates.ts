/**
 * Branded transactional emails. Inline styles and tables only, because email clients
 * ignore stylesheets and most strip SVG, so the wordmark is set as letter-spaced text
 * with the gold equator rule beneath it.
 */
const FROND = "#1E3B2F";
const DEEP = "#132A22";
const OLEIN = "#D9A13B";
const KERNEL = "#F3EDE2";
const INK = "#14161A";
const MUTED = "#4A5249";
const LINE = "#E3DDD1";
const FONT = "'Hanken Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif";

export type Row = { label: string; value: string; multiline?: boolean };

export type NotificationInput = {
  /** Small context line above the title, e.g. "Contact form · darbyinc.com". */
  context: string;
  title: string;
  intro: string;
  /** Highlighted chips, e.g. divisions or the requested product. */
  tags?: string[];
  rows: Row[];
  cta?: { label: string; href: string };
  footnote: string;
};

export function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

const nl2br = (s: string) => escapeHtml(s).replace(/\r?\n/g, "<br>");

export function renderNotification(n: NotificationInput): { html: string; text: string } {
  const tags = (n.tags ?? [])
    .map(
      (t) =>
        `<span style="display:inline-block;margin:0 8px 8px 0;padding:6px 12px;border:1px solid ${OLEIN};border-radius:2px;font:600 12px/16px ${FONT};letter-spacing:0.12em;text-transform:uppercase;color:#8A5F10;">${escapeHtml(t)}</span>`,
    )
    .join("");

  const rows = n.rows
    .map(
      (r, i) => `
      <tr>
        <td style="padding:14px 0;border-top:1px solid ${i === 0 ? INK : LINE};vertical-align:top;width:150px;font:600 12px/18px ${FONT};letter-spacing:0.16em;text-transform:uppercase;color:#8A5F10;">${escapeHtml(r.label)}</td>
        <td style="padding:14px 0 14px 16px;border-top:1px solid ${i === 0 ? INK : LINE};vertical-align:top;font:400 16px/24px ${FONT};color:${INK};">${r.multiline ? nl2br(r.value) : escapeHtml(r.value)}</td>
      </tr>`,
    )
    .join("");

  const cta = n.cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 0;"><tr><td style="background:${FROND};border-radius:2px;"><a href="${escapeHtml(n.cta.href)}" style="display:inline-block;padding:14px 22px;font:600 15px/20px ${FONT};color:${KERNEL};text-decoration:none;">${escapeHtml(n.cta.label)}</a></td></tr></table>`
    : "";

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(n.title)}</title>
</head>
<body style="margin:0;padding:0;background:${KERNEL};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${KERNEL};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
      <tr><td style="background:${FROND};padding:26px 36px 0;border-radius:2px 2px 0 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="font:500 22px/26px ${FONT};letter-spacing:0.3em;color:${KERNEL};padding-bottom:16px;">DARBY</td>
              <td align="right" style="font:600 11px/16px ${FONT};letter-spacing:0.2em;text-transform:uppercase;color:#C9C2B3;padding-bottom:16px;">${escapeHtml(n.context)}</td></tr>
          <tr><td colspan="2" style="height:2px;background:${OLEIN};font-size:0;line-height:0;">&nbsp;</td></tr>
        </table>
      </td></tr>
      <tr><td style="background:${FROND};padding:28px 36px 36px;">
        <h1 style="margin:0 0 12px;font:500 30px/34px ${FONT};letter-spacing:-0.02em;color:${KERNEL};">${escapeHtml(n.title)}</h1>
        <p style="margin:0;font:400 16px/25px ${FONT};color:#C9C2B3;">${escapeHtml(n.intro)}</p>
      </td></tr>
      <tr><td style="background:#FFFFFF;padding:32px 36px 36px;">
        ${tags ? `<div style="margin:0 0 20px;">${tags}</div>` : ""}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid ${LINE};">${rows}</table>
        ${cta}
      </td></tr>
      <tr><td style="background:${DEEP};padding:22px 36px;border-radius:0 0 2px 2px;">
        <p style="margin:0 0 6px;font:400 13px/19px ${FONT};color:#C9C2B3;">${escapeHtml(n.footnote)}</p>
        <p style="margin:0;font:400 12px/18px ${FONT};color:#8E887B;">Darby Trading Inc. · 6 Maple Ave, Armonk, NY 10504 · RSPO Member 2-1713-26-000-00</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;

  const text = [
    `DARBY · ${n.context}`,
    "",
    n.title,
    n.intro,
    "",
    ...(n.tags?.length ? [n.tags.join(" · "), ""] : []),
    ...n.rows.map((r) => `${r.label}: ${r.value}`),
    "",
    ...(n.cta ? [`${n.cta.label}: ${n.cta.href}`, ""] : []),
    n.footnote,
    "Darby Trading Inc. · 6 Maple Ave, Armonk, NY 10504",
  ].join("\n");

  return { html, text };
}
