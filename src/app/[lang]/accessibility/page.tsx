import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NOINDEX, isLang, pageUrl } from "@/lib/site";
import { translations } from "@/lib/translations";

type RouteParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = translations[lang];
  const brand = lang === "he" ? "ד״ר מרווה" : "Dr. Marva";

  return {
    title: `${t.accessibility.title} | ${brand}`,
    alternates: {
      canonical: pageUrl(lang, "accessibility/"),
      languages: { he: pageUrl("he", "accessibility/"), en: pageUrl("en", "accessibility/") },
    },
    robots: NOINDEX ? { index: false, follow: false } : undefined,
  };
}

export default async function AccessibilityPage({ params }: RouteParams) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const { accessibility } = translations[lang];

  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <div className="mx-auto max-w-3xl px-6 py-16 text-start md:py-24">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-navy">{accessibility.title}</h1>
        <p className="mt-3 text-sm text-muted">{accessibility.updated}</p>
        <p className="mt-8 text-base leading-relaxed text-muted">{accessibility.intro}</p>

        {accessibility.sections.map((section) => (
          <section key={section.title} className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-navy">{section.title}</h2>
            <ul className="mt-4 list-disc space-y-2 ps-6 text-base leading-relaxed text-muted marker:text-sage">
              {section.body.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        ))}

        <Link
          href={`/${lang}/`}
          prefetch={false}
          className="mt-12 inline-flex rounded-full border border-navy px-6 py-3 text-sm font-medium text-navy transition-colors hover:border-sage-ink hover:text-sage-ink"
        >
          {accessibility.backHome}
        </Link>
      </div>
    </main>
  );
}
