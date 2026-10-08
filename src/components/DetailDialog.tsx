"use client";

import { Check, ChevronRight, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { DetailInfo } from "@/lib/types";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { IconBadge } from "./IconBadge";
import type { IconComponent } from "./icons/TreatmentIcons";
import { Modal } from "./Modal";

export interface DetailItem {
  title: string;
  icon: IconComponent;
  brands?: string[];
  details: DetailInfo;
}

interface DetailDialogProps {
  item: DetailItem | null;
  onClose: () => void;
}

export function DetailDialog({ item, onClose }: DetailDialogProps) {
  const { t } = useLanguage();

  return (
    <Modal open={item !== null} onClose={onClose} title={item?.title ?? ""} closeLabel={t.details.close}>
      {item && (
        <div className="text-start">
          <div className="flex items-center gap-4 pe-14">
            <IconBadge icon={item.icon} />
            <h3 className="font-serif text-2xl font-semibold text-navy">{item.title}</h3>
          </div>

          {item.brands && item.brands.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={t.details.brandsTitle}>
              {item.brands.map((brand) => (
                <li
                  key={brand}
                  className="rounded-full border border-hairline bg-mist px-3 py-1 text-xs font-medium text-sage-ink"
                >
                  {brand}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-5 text-base leading-relaxed text-muted">{item.details.overview}</p>

          <h4 className="mt-6 font-serif text-lg font-semibold text-navy">{t.details.goodForTitle}</h4>
          <ul className="mt-3 space-y-2">
            {item.details.goodFor.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-navy">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-dark" strokeWidth={1.75} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>

          <h4 className="mt-6 font-serif text-lg font-semibold text-navy">{t.details.expectTitle}</h4>
          <dl className="mt-3 divide-y divide-hairline rounded-2xl border border-hairline bg-white/70">
            {item.details.facts.map((fact) => (
              <div key={fact.label} className="grid gap-1 px-4 py-3 text-sm sm:grid-cols-[9rem_1fr] sm:gap-4">
                <dt className="font-medium text-navy">{fact.label}</dt>
                <dd className="text-muted">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-xs leading-relaxed text-muted">{t.details.note}</p>

          <a
            href={getWhatsAppLink(`${t.details.bookMessage}${item.title}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-sage-ink"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            {t.details.bookCta}
          </a>
        </div>
      )}
    </Modal>
  );
}

interface InfoCardProps {
  icon: IconComponent;
  title: string;
  description: string;
  brands?: string[];
  onOpen: () => void;
  className?: string;
}

/** A glass card that opens its detail panel. */
export function InfoCard({ icon, title, description, brands = [], onOpen, className = "" }: InfoCardProps) {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className={`glass-card group flex h-full w-full flex-col rounded-2xl p-6 text-start hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-ink ${className}`}
    >
      <IconBadge icon={icon} />
      <span className="mt-5 text-base font-semibold text-navy">{title}</span>
      <span className="mt-2 text-sm leading-relaxed text-muted">{description}</span>
      {brands.length > 0 && (
        <span className="mt-4 flex flex-wrap gap-2">
          {brands.map((brand) => (
            <span
              key={brand}
              className="rounded-full border border-hairline bg-mist px-3 py-1 text-xs font-medium text-sage-ink"
            >
              {brand}
            </span>
          ))}
        </span>
      )}
      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-sage-ink">
        {t.details.learnMore}
        <ChevronRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
