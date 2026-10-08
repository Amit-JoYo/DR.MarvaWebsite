"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function Header() {
  const { t, lang, otherLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const brand = lang === "he" ? "ד״ר מרווה" : "Dr. Marva";
  const linkClassName = "text-sm font-medium text-navy/80 transition-colors hover:text-sage-ink";

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-porcelain/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href={`/${lang}/`} prefetch={false} className="flex shrink-0 items-center gap-3">
          <ImagePlaceholder
            src="/images/logo.svg"
            alt=""
            label={lang === "he" ? "לוגו" : "Logo"}
            aspectClassName="aspect-square h-10 w-10"
            roundedClassName="rounded-full"
            compact
          />
          <span className="font-serif text-lg font-semibold tracking-tight text-navy">{brand}</span>
        </Link>

        <nav aria-label={t.a11y.mainNavLabel} className="hidden items-center gap-8 md:flex">
          {t.nav.map((link) => (
            <Link key={link.href} href={`/${lang}/${link.href}`} prefetch={false} className={linkClassName}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href={`/${otherLang}/`}
            prefetch={false}
            hrefLang={otherLang}
            lang={otherLang}
            aria-label={t.header.langSwitchAria}
            className="rounded-full border border-hairline bg-white/60 px-3 py-1.5 text-sm font-medium text-navy transition-colors hover:border-sage-ink hover:text-sage-ink"
          >
            {t.header.langToggleLabel}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={t.header.menuLabel}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="inline-flex items-center justify-center rounded-full border border-hairline bg-white/60 p-2 text-navy md:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label={t.a11y.mainNavLabel}
          className="border-t border-hairline bg-porcelain/95 px-6 py-4 md:hidden"
        >
          <div className="flex flex-col items-start gap-4">
            {t.nav.map((link) => (
              <Link
                key={link.href}
                href={`/${lang}/${link.href}`}
                prefetch={false}
                onClick={() => setMenuOpen(false)}
                className={linkClassName}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
