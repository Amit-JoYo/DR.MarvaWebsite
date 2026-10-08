"use client";

import { useState } from "react";
import { Droplets, FlaskConical, Layers, Syringe, Waves } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { MaterialCard } from "@/lib/types";
import { DetailDialog, InfoCard } from "./DetailDialog";
import type { IconComponent } from "./icons/TreatmentIcons";

const materialIcons: Record<MaterialCard["icon"], IconComponent> = {
  toxin: Syringe,
  ha: Droplets,
  booster: Waves,
  biostimulator: FlaskConical,
  peel: Layers,
};

// Five cards on a 6-column grid: three across, then two wider cards.
const cardSpan = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "lg:col-span-3"];

export function Materials() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<MaterialCard | null>(null);

  return (
    <section id="materials" className="scroll-mt-24 border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="max-w-2xl text-start">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            {t.materials.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{t.materials.subtext}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {t.materials.items.map((item, index) => (
            <div key={item.title} className={cardSpan[index] ?? "lg:col-span-2"}>
              <InfoCard
                icon={materialIcons[item.icon]}
                title={item.title}
                description={item.description}
                brands={item.brands}
                onOpen={() => setSelected(item)}
              />
            </div>
          ))}
        </div>
      </div>

      <DetailDialog
        item={
          selected && {
            title: selected.title,
            icon: materialIcons[selected.icon],
            brands: selected.brands,
            details: selected.details,
          }
        }
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
