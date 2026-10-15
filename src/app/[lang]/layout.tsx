import type { Metadata } from "next";
import { Assistant, Frank_Ruhl_Libre, Great_Vibes, Source_Serif_4 } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AccessibilityMenu } from "@/components/AccessibilityMenu";
import { DesignPanel } from "@/components/DesignPanel";
import { DESIGN_PANEL_ENABLED } from "@/lib/design-settings";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyContact } from "@/components/StickyContact";
import { LanguageProvider } from "@/lib/language-context";
import { LANGS, NOINDEX, SITE_URL, isLang, pageUrl } from "@/lib/site";
import { A11Y_BOOT_SCRIPT } from "@/lib/a11y-settings";
import { translations } from "@/lib/translations";
import { CLINIC_PHONE_TEL } from "@/lib/whatsapp";
import "../globals.css";

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["latin", "hebrew"],
});

// Source Serif 4 has no Hebrew glyphs, so Frank Ruhl Libre covers Hebrew headings.
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank-ruhl",
  subsets: ["hebrew", "latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

type RouteParams = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const { meta } = translations[lang];

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: pageUrl(lang),
      languages: { he: pageUrl("he"), en: pageUrl("en"), "x-default": pageUrl("he") },
    },
    openGraph: {
      type: "website",
      title: meta.title,
      description: meta.description,
      url: pageUrl(lang),
      siteName: lang === "he" ? "ד״ר מרווה" : "Dr. Marva",
      locale: meta.locale,
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: meta.title }],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
    robots: NOINDEX ? { index: false, follow: false } : undefined,
  };
}

export default async function RootLayout({ children, params }: RouteParams & { children: ReactNode }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const t = translations[lang];
  const brand = lang === "he" ? "ד״ר מרווה" : "Dr. Marva";

  // Address and license number are still placeholders, so they are intentionally left out.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: brand,
    url: pageUrl(lang),
    description: t.meta.description,
    image: `${SITE_URL}/og-image.png`,
    telephone: CLINIC_PHONE_TEL,
    availableLanguage: ["he", "en"],
    inLanguage: lang,
  };

  return (
    <html
      lang={lang}
      dir={t.dir}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${assistant.variable} ${sourceSerif.variable} ${frankRuhl.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body id="top" className="flex min-h-full flex-col text-navy">
        <script dangerouslySetInnerHTML={{ __html: A11Y_BOOT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <LanguageProvider lang={lang}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
          >
            {t.a11y.skipToContent}
          </a>
          <Header />
          {children}
          <Footer />
          <StickyContact />
          <AccessibilityMenu />
          {DESIGN_PANEL_ENABLED && <DesignPanel />}
        </LanguageProvider>
      </body>
    </html>
  );
}
