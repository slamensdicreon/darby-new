/**
 * Renders both notification emails with sample data to the given directory (default:
 * the OS temp directory) so the templates can be checked in a browser without sending.
 *   node scripts/email/preview.cjs [outDir]
 */
const path = require("path");
const fs = require("fs");
const os = require("os");
const { execSync } = require("child_process");

const out = path.resolve(process.argv[2] || os.tmpdir());
fs.mkdirSync(out, { recursive: true });
// Transpile the TypeScript template on the fly so this script has no build step.
const src = fs.readFileSync(path.join(__dirname, "../../src/lib/email-templates.ts"), "utf8");
const js = require("typescript").transpileModule(src, { compilerOptions: { module: "commonjs", target: "es2020" } }).outputText;
const mod = { exports: {} };
new Function("module", "exports", "require", js)(mod, mod.exports, require);
const { renderNotification } = mod.exports;

const contact = renderNotification({
  context: "Contact form · darbyinc.com",
  title: "Ada Lovelace at Mill Co sent a message.",
  intro: "A new inquiry about Animal Nutrition, Personal Care, with a request for the product specifications. Reply to this email to answer Ada directly.",
  tags: ["Animal Nutrition", "Personal Care"],
  rows: [
    { label: "Name", value: "Ada Lovelace" },
    { label: "Company", value: "Mill Co" },
    { label: "Work email", value: "ada@millco.com" },
    { label: "Phone", value: "+1 555 010 2030" },
    { label: "Interested in", value: "Animal Nutrition, Personal Care" },
    { label: "Specifications", value: "Yes, asked for the product specifications" },
    { label: "Message", value: "We run two dairy feed mills in Wisconsin and are reviewing bypass fat suppliers for 2027.\n\nCould you send pricing for DT98 and Ultra Cal 60 ex-Houston, and let us know typical lead times?", multiline: true },
    { label: "Submitted", value: "November 9, 2026 at 10:42 AM (Eastern)" },
    { label: "From page", value: "/contact?interest=animal-nutrition" },
  ],
  cta: { label: "Reply to Ada", href: "mailto:ada@millco.com?subject=Re%3A%20your%20inquiry%20to%20Darby" },
  footnote: "Sent automatically by the darbyinc.com contact form. The sender's address is set as reply-to.",
});
const spec = renderNotification({
  context: "Specification request · darbyinc.com",
  title: "Grace Hopper requested specifications for Darby IPM (Personal Care).",
  intro: "Send the Personal Care specification documents to grace@formulate.co. The visitor was told they would arrive by email.",
  tags: ["Personal Care", "Darby IPM"],
  rows: [
    { label: "Name", value: "Grace Hopper" },
    { label: "Work email", value: "grace@formulate.co" },
    { label: "Division", value: "Personal Care" },
    { label: "Product", value: "Darby IPM" },
    { label: "Product updates", value: "Opted in to product updates" },
    { label: "Submitted", value: "November 9, 2026 at 10:47 AM (Eastern)" },
    { label: "From page", value: "/personal-care" },
  ],
  cta: { label: "Send specifications to Grace", href: "mailto:grace@formulate.co?subject=Darby%20Personal%20Care%20specifications%3A%20Darby%20IPM" },
  footnote: "Sent automatically by the specification request form on darbyinc.com. The requester's address is set as reply-to.",
});
fs.writeFileSync(path.join(out, "email-contact.html"), contact.html);
fs.writeFileSync(path.join(out, "email-spec.html"), spec.html);
fs.writeFileSync(path.join(out, "email-contact.txt"), contact.text);
console.log("wrote", path.join(out, "email-contact.html"), "and", path.join(out, "email-spec.html"));
