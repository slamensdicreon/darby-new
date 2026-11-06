import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "gold" | "outline" | "frond" | "frond-outline";

/** Text link styled as a button. Internal hrefs use next/link. */
export function ButtonLink({
  href,
  variant,
  children,
  className = "",
}: {
  href: string;
  variant: Variant;
  children: ReactNode;
  className?: string;
}) {
  const cls = `btn btn--${variant} ${className}`.trim();
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}

export function Label({
  tone,
  children,
  as: Tag = "span",
  id,
}: {
  tone: "gold" | "olein" | "kernel" | "muted";
  children: ReactNode;
  as?: "span" | "p" | "dt";
  id?: string;
}) {
  return (
    <Tag id={id} className={`label label--${tone}`} style={Tag === "p" ? { margin: 0 } : undefined}>
      {children}
    </Tag>
  );
}

/** The gold equator rule: "0°", a line, and an optional right-hand label. */
export function Equator({ end, className = "" }: { end?: string; className?: string }) {
  return (
    <div className={`equator ${className}`.trim()} aria-hidden={end ? undefined : true}>
      <span className="equator__deg">0°</span>
      <span className="equator__line" />
      {end ? <span className="label equator__end">{end}</span> : null}
    </div>
  );
}

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <span aria-current="page">{current}</span>
        </li>
      </ol>
    </nav>
  );
}

const SUBSCRIPTS: Record<string, string> = {
  "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9",
};

/**
 * Renders a product display name, turning Unicode subscript digits (K₂CO₃) into <sub>
 * so they are set in Hanken Grotesk, which has no subscript glyphs of its own.
 */
export function DisplayName({ value }: { value: string }) {
  const parts = value.split(/([₀-₉]+)/u).filter(Boolean);
  if (parts.length === 1) return <>{value}</>;
  return (
    <>
      {parts.map((part, i) =>
        /^[₀-₉]+$/u.test(part) ? (
          <sub key={i}>{Array.from(part, (c) => SUBSCRIPTS[c]).join("")}</sub>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8H13" />
      <path d="M9 4L13 8L9 12" />
    </svg>
  );
}
