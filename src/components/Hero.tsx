"use client";

import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { MediaImage } from "./MediaImage";
import { Modal } from "./Modal";

const PORTRAIT_SRC = "/images/dr-marva-portrait.webp";

export function Hero() {
  const { t } = useLanguage();
  const [portraitOpen, setPortraitOpen] = useState(false);

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-sage-wash/70 to-sage-soft/30">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 end-[-6rem] h-80 w-80 rounded-full bg-sage/20 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-12 md:items-center md:gap-16 md:py-24">
        <div className="text-start md:col-span-7">
          <span className="inline-flex rounded-full border border-hairline bg-mist px-4 py-1.5 text-xs font-medium tracking-wide text-sage-ink">
            {t.hero.eyebrow}
          </span>
          <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight tracking-tight text-navy sm:text-5xl lg:text-6xl">
            {t.hero.headline}
          </h1>
          <div className="mt-8 border-s-2 border-sage/50 ps-6">
            <p className="font-serif text-lg text-sage-ink">{t.hero.philosophyTitle}</p>
            <div className="mt-3 space-y-4">
              {t.hero.philosophy.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md pb-8 md:col-span-5 md:max-w-none">
          <button
            type="button"
            onClick={() => setPortraitOpen(true)}
            aria-label={`${t.results.enlargeLabel}: ${t.hero.portraitAlt}`}
            className="group relative block w-full cursor-zoom-in rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-ink"
          >
            <ImagePlaceholder
              src={PORTRAIT_SRC}
              alt={t.hero.portraitAlt}
              label={t.hero.portraitAlt}
              aspectClassName="aspect-[4/5] w-full"
              roundedClassName="rounded-3xl"
              className="shadow-lg"
            />
            <span className="pointer-events-none absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <ZoomIn className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </span>
          </button>
          <div className="glass-card pointer-events-none absolute bottom-0 start-6 rounded-2xl px-7 py-2.5">
            <span
              dir="ltr"
              aria-label={t.hero.signature}
              className="font-script text-4xl leading-none text-navy"
            >
              {t.hero.signature}
            </span>
          </div>
        </div>
      </div>

      <Modal
        open={portraitOpen}
        onClose={() => setPortraitOpen(false)}
        title={t.hero.portraitAlt}
        closeLabel={t.details.close}
        widthClassName="w-[min(94vw,560px)]"
      >
        <div className="relative mx-auto aspect-[4/5] max-h-[76dvh] overflow-hidden rounded-2xl border border-hairline bg-slate-100">
          <MediaImage src={PORTRAIT_SRC} alt={t.hero.portraitAlt} label={t.hero.portraitAlt} fit="contain" />
        </div>
      </Modal>
    </section>
  );
}
