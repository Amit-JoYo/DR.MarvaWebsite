"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import type { TreatmentCard } from "@/lib/types";
import { DetailDialog, InfoCard } from "./DetailDialog";
import {
  ExpressionLinesIcon,
  JawlineIcon,
  LipsIcon,
  NoseProfileIcon,
  PlasmaIcon,
  SkinRadianceIcon,
  UnderEyeIcon,
  type IconComponent,
} from "./icons/TreatmentIcons";

// Single-line anatomical drawings of each treated area (no faces or emoji-like glyphs).
const treatmentIcons: Record<TreatmentCard["icon"], IconComponent> = {
  prp: PlasmaIcon,
  lips: LipsIcon,
  jawline: JawlineIcon,
  texture: SkinRadianceIcon,
  lines: ExpressionLinesIcon,
  tearTroughs: UnderEyeIcon,
  rhinoplasty: NoseProfileIcon,
};

export function Treatments() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<TreatmentCard | null>(null);

  return (
    <section id="treatments" className="scroll-mt-24 border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="max-w-2xl text-start">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            {t.treatments.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{t.treatments.subtext}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.treatments.items.map((item) => (
            <InfoCard
              key={item.title}
              icon={treatmentIcons[item.icon]}
              title={item.title}
              description={item.description}
              onOpen={() => setSelected(item)}
            />
          ))}
        </div>
      </div>

      <DetailDialog
        item={
          selected && {
            title: selected.title,
            icon: treatmentIcons[selected.icon],
            details: selected.details,
          }
        }
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
