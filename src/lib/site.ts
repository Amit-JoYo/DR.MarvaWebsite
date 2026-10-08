import type { Lang } from "./types";

export const LANGS: readonly Lang[] = ["he", "en"];
export const DEFAULT_LANG: Lang = "he";

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

/** Sub-path the site is served from (e.g. "/DR.MarvaWebsite" on GitHub Pages); empty locally. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Absolute origin + base path, used for canonical URLs, sitemap and share images. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

/** Preview deployments should not be indexed by search engines. */
export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "true";

/** Prefixes public-folder asset paths (plain <img> tags are not rewritten by Next). */
export function withBase(path: string): string {
  return `${BASE_PATH}${path}`;
}

export function pageUrl(lang: Lang, path = ""): string {
  return `${SITE_URL}/${lang}/${path}`;
}
