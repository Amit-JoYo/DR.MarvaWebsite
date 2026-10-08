"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { ImagePlaceholder } from "./ImagePlaceholder";

// Static to keep SSR/CSR output identical and avoid non-deterministic values
// during prerendering; bump alongside yearly content updates.
const COPYRIGHT_YEAR = 2026;

export function Footer() {
  const { t, lang } = useLanguage();
  const footer = t.footer;
  const brand = lang === "he" ? "ד״ר מרווה" : "Dr. Marva";

  return (
    <footer className="border-t border-hairline bg-mist/50">
      {/* Extra bottom padding on small screens keeps the sticky contact bar from covering the footer. */}
      <div className="mx-auto max-w-6xl px-6 pb-28 pt-12 md:pb-12">
        <div className="grid gap-10 text-start sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href={`/${lang}/`} prefetch={false} className="flex items-center gap-3">
              <ImagePlaceholder
                src="/images/logo.svg"
                alt=""
                label={lang === "he" ? "לוגו" : "Logo"}
                aspectClassName="aspect-square h-10 w-10"
                roundedClassName="rounded-full"
                compact
              />
              <span className="font-serif text-base font-semibold text-navy">{brand}</span>
            </Link>
            <p className="mt-4 text-sm text-muted">{footer.license}</p>
          </div>

          <div>
            <h3 className="font-serif text-base font-semibold text-navy">{footer.hoursTitle}</h3>
            <ul className="mt-3 space-y-1">
              {footer.hours.map((line) => (
                <li key={line} className="text-sm text-muted">
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-base font-semibold text-navy">{footer.locationTitle}</h3>
            <p className="mt-3 text-sm text-muted">{footer.location}</p>
          </div>

          <div>
            <h3 className="font-serif text-base font-semibold text-navy">{footer.disclaimerTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{footer.disclaimer}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-6 text-sm text-muted">
          <span>
            © {COPYRIGHT_YEAR} {brand} — {footer.rights}
          </span>
          <Link
            href={`/${lang}/accessibility/`}
            prefetch={false}
            className="underline underline-offset-4 transition-colors hover:text-sage-ink"
          >
            {footer.accessibilityLink}
          </Link>
        </div>
      </div>
    </footer>
  );
}
