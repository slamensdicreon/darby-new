/** Shared by the browser forms and the API routes, so client and server agree. */
export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export const INTERESTS = ["Animal Nutrition", "Food Ingredients", "Personal Care"] as const;
export type Interest = (typeof INTERESTS)[number];
export const INTERESTS_ERROR = "Choose at least one division.";

/** Keeps only valid division names, in catalog order, without duplicates. */
export function parseInterests(value: unknown): Interest[] {
  const list = Array.isArray(value) ? value : [];
  return INTERESTS.filter((i) => list.includes(i));
}

/** Slug used in /contact?interest=… links from the division pages. */
export const interestSlug = (i: Interest) => i.toLowerCase().replace(/\s+/g, "-");

export type ContactInput = {
  interests: Interest[];
  first: string;
  last: string;
  company: string;
  phone: string;
  email: string;
  message: string;
  specs: boolean;
};

export type ContactField = "first" | "last" | "company" | "email" | "message";
export const CONTACT_FIELDS: ContactField[] = ["first", "last", "company", "email", "message"];

export function validateContactField(field: ContactField, raw: string): string {
  const v = raw.trim();
  switch (field) {
    case "first":
      return v ? "" : "Enter your first name.";
    case "last":
      return v ? "" : "Enter your last name.";
    case "company":
      return v ? "" : "Enter your company.";
    case "email":
      return !v ? "Enter your work email." : EMAIL_RE.test(v) ? "" : "Enter an email address like name@company.com.";
    case "message":
      return v ? "" : "Tell us what you need.";
  }
}

export function validateContact(input: Partial<Record<ContactField, string>>) {
  const errors: Partial<Record<ContactField, string>> = {};
  for (const f of CONTACT_FIELDS) {
    const msg = validateContactField(f, input[f] ?? "");
    if (msg) errors[f] = msg;
  }
  return errors;
}

export const SPEC_EMAIL_ERROR = "Enter a work email like name@company.com.";

/** Hidden field name for the spam honeypot. Real people never fill it in. */
export const HONEYPOT = "website";

export const LIMITS = { short: 200, message: 5000 } as const;
