"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Accessibility, Contrast, Droplet, Link2, Pause, RotateCcw, Type, X, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import {
  A11Y_STORAGE_KEY,
  DEFAULT_A11Y_SETTINGS,
  applyA11ySettings,
  parseA11ySettings,
  type A11ySettings,
} from "@/lib/a11y-settings";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(A11Y_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function getServerSnapshot() {
  return "";
}

type ToggleKey = Exclude<keyof A11ySettings, "textSize">;

export function AccessibilityMenu() {
  const { t, lang } = useLanguage();
  const labels = t.a11y.toolbar;
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const settings = useMemo(() => parseA11ySettings(stored), [stored]);

  useEffect(() => {
    applyA11ySettings(settings);
  }, [settings]);

  const save = useCallback((next: A11ySettings) => {
    try {
      window.localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage can be blocked (private mode); the setting still applies for this page view.
      applyA11ySettings(next);
    }
    listeners.forEach((listener) => listener());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const toggles: { key: ToggleKey; label: string; Icon: LucideIcon }[] = [
    { key: "contrast", label: labels.contrast, Icon: Contrast },
    { key: "grayscale", label: labels.grayscale, Icon: Droplet },
    { key: "links", label: labels.links, Icon: Link2 },
    { key: "readableFont", label: labels.readableFont, Icon: Type },
    { key: "pauseMotion", label: labels.pauseMotion, Icon: Pause },
  ];

  const isDefault = JSON.stringify(settings) === JSON.stringify(DEFAULT_A11Y_SETTINGS);
  const optionBase =
    "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-start text-sm font-medium transition-colors";
  const optionOff = "border-hairline bg-white text-navy hover:border-sage-ink";
  const optionOn = "border-sage-ink bg-sage-ink text-white";

  return (
    <div className="fixed bottom-24 start-4 z-[45] md:bottom-6 md:start-6">
      {open && (
        <div
          ref={panelRef}
          id="a11y-panel"
          role="region"
          aria-label={labels.title}
          className="absolute bottom-full start-0 mb-3 w-[min(20rem,calc(100vw-2rem))] rounded-3xl border border-hairline bg-porcelain p-4 text-start shadow-2xl"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-serif text-lg font-semibold text-navy">{labels.title}</h2>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              aria-label={labels.close}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-white text-navy transition-colors hover:border-sage-ink"
            >
              <X className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <div role="group" aria-label={labels.textSize} className="mt-4">
            <p className="text-sm font-medium text-navy">{labels.textSize}</p>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {labels.textSizeLevels.map((level, index) => (
                <button
                  key={level}
                  type="button"
                  aria-pressed={settings.textSize === index}
                  onClick={() => save({ ...settings, textSize: index })}
                  className={`rounded-xl border px-1 py-2 text-xs font-medium transition-colors ${
                    settings.textSize === index ? optionOn : optionOff
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-2">
            {toggles.map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                aria-pressed={settings[key]}
                onClick={() => save({ ...settings, [key]: !settings[key] })}
                className={`${optionBase} ${settings[key] ? optionOn : optionOff}`}
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => save(DEFAULT_A11Y_SETTINGS)}
              disabled={isDefault}
              className="inline-flex items-center gap-2 rounded-full border border-navy px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-sage-ink hover:text-sage-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              {labels.reset}
            </button>
            <Link
              href={`/${lang}/accessibility/`}
              prefetch={false}
              className="text-sm font-medium text-navy underline underline-offset-4 transition-colors hover:text-sage-ink"
            >
              {labels.statement}
            </Link>
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label={labels.open}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sage-ink text-white shadow-lg transition-colors hover:bg-navy"
      >
        <Accessibility className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
      </button>
    </div>
  );
}
