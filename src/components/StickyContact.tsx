"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { CLINIC_PHONE_TEL, getWhatsAppLink } from "@/lib/whatsapp";

/**
 * The one persistent contact action: a bottom bar on phones and a floating pair of buttons on
 * larger screens. It tucks away while the contact section is on screen.
 */
export function StickyContact() {
  const { t } = useLanguage();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const whatsappHref = getWhatsAppLink(t.contact.whatsappMessage);
  const visibility = hidden
    ? "pointer-events-none translate-y-4 opacity-0"
    : "translate-y-0 opacity-100";
  const baseButton =
    "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors";

  return (
    <div
      role="group"
      aria-label={t.stickyBar.label}
      aria-hidden={hidden || undefined}
      inert={hidden}
      className={`fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-hairline bg-porcelain/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-all duration-300 md:inset-x-auto md:bottom-6 md:end-6 md:flex-col md:items-end md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none ${visibility}`}
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseButton} flex-1 bg-navy px-6 py-3 text-white hover:bg-sage-ink md:flex-none md:py-3.5 md:shadow-lg`}
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        {t.stickyBar.whatsapp}
      </a>
      <a
        href={`tel:${CLINIC_PHONE_TEL}`}
        className={`${baseButton} flex-1 border border-navy bg-white/80 px-6 py-3 text-navy hover:border-sage-ink hover:text-sage-ink md:flex-none md:py-3.5 md:shadow-lg`}
      >
        <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        {t.stickyBar.call}
      </a>
    </div>
  );
}
