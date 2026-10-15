import type { Lang } from "./types";

/**
 * Live design controls. This is a design-phase tool: the panel is only mounted in development
 * (or when NEXT_PUBLIC_DESIGN_PANEL=1), and the chosen values are meant to be copied out and baked
 * into globals.css / the font setup once the look is locked in.
 */
export const DESIGN_PANEL_ENABLED =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_DESIGN_PANEL === "1";

export const DESIGN_STORAGE_KEY = "design-settings";

export const COLOR_TOKENS = [
  { key: "navy", label: "Headings & strong text", cssVar: "--color-navy", fallback: "#152238" },
  { key: "muted", label: "Body text", cssVar: "--color-muted", fallback: "#4f5d70" },
  { key: "sage", label: "Sage accent (lines, glow)", cssVar: "--color-sage", fallback: "#8a9a86" },
  { key: "sageInk", label: "Sage text & buttons", cssVar: "--color-sage-ink", fallback: "#5a6b56" },
  { key: "sageSoft", label: "Section tint", cssVar: "--color-sage-soft", fallback: "#e6ece3" },
  { key: "sageWash", label: "Hero & footer tint", cssVar: "--color-sage-wash", fallback: "#d9e2d5" },
  { key: "mist", label: "Badges & icon circles", cssVar: "--color-mist", fallback: "#f1f4f0" },
  { key: "porcelain", label: "Header & dialogs", cssVar: "--color-porcelain", fallback: "#fbf9f6" },
  { key: "hairline", label: "Borders", cssVar: "--color-hairline", fallback: "#cfd9cb" },
  { key: "pageTop", label: "Page glow (top)", cssVar: "--color-page-top", fallback: "#e9efe6" },
  { key: "page", label: "Page background", cssVar: "--color-page", fallback: "#f7f9f5" },
] as const;

export type ColorKey = (typeof COLOR_TOKENS)[number]["key"];
export type ColorOverrides = Partial<Record<ColorKey, string>>;

export const DEFAULT_COLORS = Object.fromEntries(COLOR_TOKENS.map((token) => [token.key, token.fallback])) as Record<
  ColorKey,
  string
>;

export const PALETTE_PRESETS: { name: string; colors: ColorOverrides }[] = [
  { name: "Sage (current)", colors: {} },
  {
    name: "Airy sage",
    colors: {
      sageSoft: "#f0f4ee",
      sageWash: "#e6ede3",
      mist: "#f4f7f2",
      pageTop: "#f3f7f1",
      page: "#fafcf8",
      hairline: "#d6dfd2",
    },
  },
  {
    name: "Deep sage",
    colors: {
      navy: "#1f2d24",
      muted: "#445447",
      sage: "#6f8a6a",
      sageInk: "#3f5a3b",
      sageSoft: "#dce6d8",
      sageWash: "#c9d8c4",
      mist: "#e8efe4",
      porcelain: "#f6f8f3",
      hairline: "#b9c9b4",
      pageTop: "#d5e2d0",
      page: "#eef3ea",
    },
  },
  {
    name: "Eucalyptus",
    colors: {
      navy: "#143036",
      muted: "#3f5560",
      sage: "#7fa39b",
      sageInk: "#3f6b64",
      sageSoft: "#e0ece9",
      sageWash: "#cfe1dd",
      mist: "#e9f2f0",
      porcelain: "#f7faf9",
      hairline: "#c3d6d2",
      pageTop: "#dcebe7",
      page: "#f3f8f7",
    },
  },
  {
    name: "Sage & blush",
    colors: {
      navy: "#2a2530",
      muted: "#5b5560",
      sageSoft: "#f1e9e4",
      sageWash: "#ead9d2",
      mist: "#f3ede8",
      porcelain: "#fcf8f5",
      hairline: "#e0d3cb",
      pageTop: "#f3e6df",
      page: "#fbf6f2",
    },
  },
  {
    name: "Olive & sand",
    colors: {
      navy: "#2b2a1a",
      muted: "#58573f",
      sage: "#9a9a6a",
      sageInk: "#5f6035",
      sageSoft: "#eeeddc",
      sageWash: "#e2e0c6",
      mist: "#f1f0de",
      porcelain: "#fbf9f0",
      hairline: "#d6d4b8",
      pageTop: "#e8e6cf",
      page: "#f8f6ea",
    },
  },
];

export interface FontOption {
  name: string;
  /** Google Fonts weight spec; empty for single-weight families. */
  weights: string;
  /** Has Hebrew glyphs, so it is a real choice for the Hebrew page. */
  hebrew: boolean;
  kind: "serif" | "sans";
}

export const FONT_OPTIONS: FontOption[] = [
  { name: "Source Serif 4", weights: "400;500;600;700", hebrew: false, kind: "serif" },
  { name: "Cormorant Garamond", weights: "400;500;600;700", hebrew: false, kind: "serif" },
  { name: "Playfair Display", weights: "400;500;600;700", hebrew: false, kind: "serif" },
  { name: "Lora", weights: "400;500;600;700", hebrew: false, kind: "serif" },
  { name: "Libre Baskerville", weights: "400;700", hebrew: false, kind: "serif" },
  { name: "Fraunces", weights: "400;500;600;700", hebrew: false, kind: "serif" },
  { name: "DM Serif Display", weights: "", hebrew: false, kind: "serif" },
  { name: "Marcellus", weights: "", hebrew: false, kind: "serif" },
  { name: "Frank Ruhl Libre", weights: "400;500;600;700", hebrew: true, kind: "serif" },
  { name: "David Libre", weights: "400;500;700", hebrew: true, kind: "serif" },
  { name: "Miriam Libre", weights: "400;500;600;700", hebrew: true, kind: "serif" },
  { name: "Noto Serif Hebrew", weights: "400;500;600;700", hebrew: true, kind: "serif" },
  { name: "Suez One", weights: "", hebrew: true, kind: "serif" },
  { name: "Assistant", weights: "400;500;600;700", hebrew: true, kind: "sans" },
  { name: "Heebo", weights: "400;500;600;700", hebrew: true, kind: "sans" },
  { name: "Rubik", weights: "400;500;600;700", hebrew: true, kind: "sans" },
  { name: "Open Sans", weights: "400;500;600;700", hebrew: true, kind: "sans" },
  { name: "Noto Sans Hebrew", weights: "400;500;600;700", hebrew: true, kind: "sans" },
  { name: "Alef", weights: "400;700", hebrew: true, kind: "sans" },
  { name: "Varela Round", weights: "", hebrew: true, kind: "sans" },
  { name: "Secular One", weights: "", hebrew: true, kind: "sans" },
  { name: "Inter", weights: "400;500;600;700", hebrew: false, kind: "sans" },
  { name: "DM Sans", weights: "400;500;600;700", hebrew: false, kind: "sans" },
  { name: "Manrope", weights: "400;500;600;700", hebrew: false, kind: "sans" },
  { name: "Nunito Sans", weights: "400;500;600;700", hebrew: false, kind: "sans" },
  { name: "Source Sans 3", weights: "400;500;600;700", hebrew: false, kind: "sans" },
  { name: "Lato", weights: "400;700", hebrew: false, kind: "sans" },
  { name: "Jost", weights: "400;500;600;700", hebrew: false, kind: "sans" },
  { name: "Montserrat", weights: "400;500;600;700", hebrew: false, kind: "sans" },
];

export interface LangFonts {
  /** Font family name, or "" to keep the site default. */
  heading: string;
  body: string;
}

export interface DesignSettings {
  colors: ColorOverrides;
  /** Multiplies the root font size, so every rem-based size scales. */
  baseScale: number;
  headingScale: number;
  fonts: Record<Lang, LangFonts>;
}

export const DEFAULT_DESIGN: DesignSettings = {
  colors: {},
  baseScale: 1,
  headingScale: 1,
  fonts: { he: { heading: "", body: "" }, en: { heading: "", body: "" } },
};

export const DEFAULT_FONT_LABEL: Record<Lang, LangFonts> = {
  he: { heading: "Frank Ruhl Libre", body: "Assistant" },
  en: { heading: "Source Serif 4", body: "Assistant" },
};

function clampNumber(value: unknown, min: number, max: number) {
  return typeof value === "number" && Number.isFinite(value) ? Math.min(Math.max(value, min), max) : 1;
}

const HEX = /^#[0-9a-f]{6}$/i;

export function parseDesignSettings(raw: string): DesignSettings {
  if (!raw) return DEFAULT_DESIGN;
  try {
    const data = JSON.parse(raw) as Partial<DesignSettings>;
    const colors: ColorOverrides = {};
    for (const token of COLOR_TOKENS) {
      const value = data.colors?.[token.key];
      if (typeof value === "string" && HEX.test(value)) colors[token.key] = value.toLowerCase();
    }
    const fontOf = (lang: Lang): LangFonts => ({
      heading: typeof data.fonts?.[lang]?.heading === "string" ? data.fonts[lang].heading : "",
      body: typeof data.fonts?.[lang]?.body === "string" ? data.fonts[lang].body : "",
    });
    return {
      colors,
      baseScale: clampNumber(data.baseScale, 0.8, 1.4),
      headingScale: clampNumber(data.headingScale, 0.6, 1.5),
      fonts: { he: fontOf("he"), en: fontOf("en") },
    };
  } catch {
    return DEFAULT_DESIGN;
  }
}

function fontHref(font: FontOption) {
  const family = font.name.replace(/ /g, "+");
  const weights = font.weights ? `:wght@${font.weights}` : "";
  return `https://fonts.googleapis.com/css2?family=${family}${weights}&display=swap`;
}

/** Pulls a family from Google Fonts on demand so any option can be previewed live. */
export function loadFont(name: string) {
  const font = FONT_OPTIONS.find((option) => option.name === name);
  if (!font) return;
  const id = `design-font-${font.name.replace(/ /g, "-")}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = fontHref(font);
  document.head.appendChild(link);
}

export function applyDesignSettings(settings: DesignSettings, lang: Lang) {
  const style = document.documentElement.style;

  for (const token of COLOR_TOKENS) {
    const value = settings.colors[token.key];
    if (value) style.setProperty(token.cssVar, value);
    else style.removeProperty(token.cssVar);
  }

  style.setProperty("--dm-base", String(settings.baseScale));
  style.setProperty("--dm-heading-scale", String(settings.headingScale));

  const { heading, body } = settings.fonts[lang];
  if (heading) {
    loadFont(heading);
    // The site's own fonts stay in the stack so glyphs the choice lacks (e.g. Hebrew) still render.
    style.setProperty(
      "--dm-heading",
      `"${heading}", var(--font-frank-ruhl), var(--font-source-serif), Georgia, serif`,
    );
  } else {
    style.removeProperty("--dm-heading");
  }
  if (body) {
    loadFont(body);
    style.setProperty("--dm-body", `"${body}", var(--font-assistant), Arial, sans-serif`);
  } else {
    style.removeProperty("--dm-body");
  }
}

function channel(value: number) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const n = Number.parseInt(hex.slice(1), 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}

export function contrastRatio(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export function exportDesign(settings: DesignSettings) {
  const colors = { ...DEFAULT_COLORS, ...settings.colors };
  const lines = [
    "/* Colors (globals.css @theme) */",
    ...COLOR_TOKENS.map((token) => `${token.cssVar}: ${colors[token.key]};`),
    "",
    `Base text scale: ${Math.round(settings.baseScale * 100)}%`,
    `Heading scale: ${Math.round(settings.headingScale * 100)}%`,
    "",
    `Hebrew  - headings: ${settings.fonts.he.heading || `${DEFAULT_FONT_LABEL.he.heading} (default)`}, body: ${settings.fonts.he.body || `${DEFAULT_FONT_LABEL.he.body} (default)`}`,
    `English - headings: ${settings.fonts.en.heading || `${DEFAULT_FONT_LABEL.en.heading} (default)`}, body: ${settings.fonts.en.body || `${DEFAULT_FONT_LABEL.en.body} (default)`}`,
    "",
    JSON.stringify(settings),
  ];
  return lines.join("\n");
}
