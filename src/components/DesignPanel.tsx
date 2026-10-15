"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Check, Copy, Palette, RotateCcw, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import {
  COLOR_TOKENS,
  DEFAULT_COLORS,
  DEFAULT_DESIGN,
  DEFAULT_FONT_LABEL,
  DESIGN_STORAGE_KEY,
  FONT_OPTIONS,
  PALETTE_PRESETS,
  applyDesignSettings,
  contrastRatio,
  exportDesign,
  parseDesignSettings,
  type ColorKey,
  type DesignSettings,
  type FontOption,
} from "@/lib/design-settings";

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
    return window.localStorage.getItem(DESIGN_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function getServerSnapshot() {
  return "";
}

function ContrastBadge({ label, fg, bg, min = 4.5 }: { label: string; fg: string; bg: string; min?: number }) {
  const ratio = contrastRatio(fg, bg);
  const pass = ratio >= min;
  return (
    <li className="flex items-center justify-between gap-2 text-xs">
      <span className="text-slate-600">{label}</span>
      <span className={`font-mono font-medium ${pass ? "text-emerald-700" : "text-red-700"}`}>
        {ratio.toFixed(1)}:1 {pass ? "AA ✓" : `< ${min}`}
      </span>
    </li>
  );
}

function FontSelect({
  label,
  value,
  defaultName,
  options,
  onChange,
}: {
  label: string;
  value: string;
  defaultName: string;
  options: FontOption[];
  onChange: (name: string) => void;
}) {
  return (
    <label className="block text-xs font-medium text-slate-700">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900"
      >
        <option value="">{defaultName} (default)</option>
        {options
          .filter((option) => option.name !== defaultName)
          .map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
      </select>
    </label>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block text-xs font-medium text-slate-700">
      <span className="flex justify-between">
        {label}
        <span className="font-mono">{Math.round(value * 100)}%</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1 w-full accent-slate-700"
      />
    </label>
  );
}

/** Design-phase only: tweak colors, text sizes and fonts live, then copy the values to lock them in. */
export function DesignPanel() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const settings = useMemo(() => parseDesignSettings(stored), [stored]);

  useEffect(() => {
    applyDesignSettings(settings, lang);
  }, [settings, lang]);

  const save = useCallback((next: DesignSettings) => {
    try {
      window.localStorage.setItem(DESIGN_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage can be blocked; the change still applies for this page view.
      applyDesignSettings(next, lang);
    }
    listeners.forEach((listener) => listener());
  }, [lang]);

  const colors = { ...DEFAULT_COLORS, ...settings.colors };
  const headingOptions = FONT_OPTIONS.filter((font) => lang === "en" || font.hebrew);
  const bodyOptions = FONT_OPTIONS.filter((font) => (lang === "en" || font.hebrew) && font.kind === "sans");
  const langFonts = settings.fonts[lang];
  const defaults = DEFAULT_FONT_LABEL[lang];

  const setColor =  (key: ColorKey, value: string) =>
    save({ ...settings, colors: { ...settings.colors, [key]: value } });

  const setFont = (slot: "heading" | "body", name: string) =>
    save({ ...settings, fonts: { ...settings.fonts, [lang]: { ...langFonts, [slot]: name } } });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(exportDesign(settings));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy these design settings:", exportDesign(settings));
    }
  };

  return (
    <div dir="ltr" lang="en" className="font-sans text-slate-900">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="design-panel"
        aria-label="Design controls"
        className="fixed bottom-40 start-4 z-[45] inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-colors hover:bg-slate-700 md:bottom-24"
      >
        <Palette className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
      </button>

      {open && (
        <div
          id="design-panel"
          role="region"
          aria-label="Design controls"
          className="fixed start-4 top-20 z-[46] max-h-[calc(100dvh-6rem)] w-[min(23rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-300 bg-white p-4 text-start shadow-2xl"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold">Design controls</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close design controls"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 hover:bg-slate-100"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Live preview, saved in this browser. Copy the settings when you&apos;re happy so they can be locked in.
          </p>

          <section className="mt-4">
            <h3 className="text-sm font-semibold">Palette</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {PALETTE_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => save({ ...settings, colors: preset.colors })}
                  className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium hover:bg-slate-100"
                >
                  {preset.name}
                </button>
              ))}
            </div>
            <ul className="mt-3 grid gap-1.5">
              {COLOR_TOKENS.map((token) => (
                <li key={token.key} className="flex items-center justify-between gap-3">
                  <label htmlFor={`design-color-${token.key}`} className="text-xs text-slate-700">
                    {token.label}
                  </label>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-500">{colors[token.key]}</span>
                    <input
                      id={`design-color-${token.key}`}
                      type="color"
                      value={colors[token.key]}
                      onChange={(event) => setColor(token.key, event.target.value)}
                      className="h-7 w-9 cursor-pointer rounded border border-slate-300 bg-white p-0.5"
                    />
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-semibold text-slate-700">Contrast (WCAG AA = 4.5:1)</p>
              <ul className="mt-1.5 grid gap-1">
                <ContrastBadge label="Body text on section tint" fg={colors.muted} bg={colors.sageSoft} />
                <ContrastBadge label="Body text on hero/footer tint" fg={colors.muted} bg={colors.sageWash} />
                <ContrastBadge label="Headings on hero/footer tint" fg={colors.navy} bg={colors.sageWash} />
                <ContrastBadge label="Sage text on badges" fg={colors.sageInk} bg={colors.mist} />
                <ContrastBadge label="Sage text on section tint" fg={colors.sageInk} bg={colors.sageSoft} />
                <ContrastBadge label="White text on sage buttons" fg="#ffffff" bg={colors.sageInk} />
              </ul>
            </div>
          </section>

          <section className="mt-5 grid gap-3">
            <h3 className="text-sm font-semibold">Sizes</h3>
            <RangeControl
              label="Text size (everything)"
              value={settings.baseScale}
              min={0.8}
              max={1.4}
              step={0.05}
              onChange={(baseScale) => save({ ...settings, baseScale })}
            />
            <RangeControl
              label="Heading size"
              value={settings.headingScale}
              min={0.6}
              max={1.5}
              step={0.05}
              onChange={(headingScale) => save({ ...settings, headingScale })}
            />
          </section>

          <section className="mt-5 grid gap-3">
            <h3 className="text-sm font-semibold">
              Fonts — {lang === "he" ? "Hebrew page" : "English page"}
            </h3>
            <FontSelect
              label="Headings"
              value={langFonts.heading}
              defaultName={defaults.heading}
              options={headingOptions}
              onChange={(name) => setFont("heading", name)}
            />
            <FontSelect
              label="Body text"
              value={langFonts.body}
              defaultName={defaults.body}
              options={bodyOptions}
              onChange={(name) => setFont("body", name)}
            />
            <p className="text-xs text-slate-500">
              Fonts are set per language. Switch the language (עב | EN) to choose for the other one. Only fonts with
              Hebrew letters are listed on the Hebrew page.
            </p>
          </section>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => save(DEFAULT_DESIGN)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-medium hover:bg-slate-100"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset all
            </button>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-700"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {copied ? "Copied" : "Copy settings"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
