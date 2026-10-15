"use client";

import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { CLINIC_PHONE_DISPLAY, CLINIC_PHONE_TEL, getWhatsAppLink } from "@/lib/whatsapp";
import { IconBadge } from "./IconBadge";

export function Contact() {
  const { t } = useLanguage();
  const contact = t.contact;
  const footer = t.footer;

  return (
    <section id="contact" className="scroll-mt-24 border-t border-hairline bg-sage-soft/70">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="max-w-2xl text-start">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            {contact.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{contact.subtext}</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-stretch">
          <div className="glass-card rounded-2xl p-8 text-start">
            <IconBadge icon={MessageCircle} />
            <h3 className="mt-5 font-serif text-xl font-semibold text-navy">{contact.whatsappTitle}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">{contact.whatsappText}</p>
            <a
              href={getWhatsAppLink(contact.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-sage-ink"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              {contact.whatsappCta}
            </a>
          </div>

          <div className="glass-card rounded-2xl p-8 text-start">
            <h3 className="font-serif text-xl font-semibold text-navy">{contact.detailsTitle}</h3>
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-4">
                <IconBadge icon={Phone} />
                <div>
                  <p className="text-xs text-muted">{contact.phoneLabel}</p>
                  <a
                    href={`tel:${CLINIC_PHONE_TEL}`}
                    dir="ltr"
                    className="text-base font-medium text-navy transition-colors hover:text-sage-ink"
                  >
                    {CLINIC_PHONE_DISPLAY}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <IconBadge icon={MapPin} />
                <div>
                  <p className="text-xs text-muted">{footer.locationTitle}</p>
                  <p className="text-base font-medium text-navy">{footer.location}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <IconBadge icon={Clock} />
                <div>
                  <p className="text-xs text-muted">{footer.hoursTitle}</p>
                  {footer.hours.map((line) => (
                    <p key={line} className="text-base font-medium text-navy">
                      {line}
                    </p>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
