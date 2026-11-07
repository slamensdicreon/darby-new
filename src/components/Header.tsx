"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { nav, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const menuId = useId();

  // Shadow once the page has scrolled past the top, so the sticky bar reads as floating.
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the phone menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (section: string | null) => section !== null && pathname === section;

  return (
    <header className={`site-header${stuck ? " is-stuck" : ""}`}>
      <div className="container site-header__bar">
        <Link href="/" aria-label="Darby home" className="site-header__logo">
          <Wordmark height={26} ground="frond" />
        </Link>
        <nav aria-label="Main" className="site-header__nav">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              aria-current={isCurrent(item.section) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a href={site.contacts[0].href} className="nav-phone">
            <span className="nav-phone__role">Sales</span> {site.contacts[0].display}
          </a>
          <Link href="/contact" className="btn btn--gold site-header__contact" aria-current={pathname === "/contact" ? "page" : undefined}>
            Contact
          </Link>
          <button
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Menu"}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              {open ? (
                <>
                  <path d="M5 5L15 15" />
                  <path d="M15 5L5 15" />
                </>
              ) : (
                <>
                  <path d="M3 5.5H17" />
                  <path d="M3 10H17" />
                  <path d="M3 14.5H17" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </div>
      <div id={menuId} className="mobile-menu" hidden={!open}>
        <nav aria-label="Main, phone" className="container">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.section) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mobile-menu__contact">
              <Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>
                Contact
              </Link>
            </li>
          </ul>
          <div className="mobile-menu__direct">
            <a href={site.contacts[0].href}>{site.contacts[0].display}</a>
            <a href={site.email.href}>{site.email.display}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
