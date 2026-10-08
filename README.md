# Dr. Marva — Aesthetic Medicine Website

A bilingual (Hebrew RTL / English LTR) website for the "Dr. Marva" aesthetic medicine clinic, built with Next.js (App Router, static export), TypeScript and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000); it redirects to the Hebrew site (`/he/`). English lives at `/en/`.

## Project structure

- `src/app/[lang]/layout.tsx` — root layout per language: `<html lang dir>`, fonts, SEO metadata, structured data, header/footer, sticky contact.
- `src/app/[lang]/page.tsx` — the home page (Hero, Results, Treatments, Materials, Contact).
- `src/app/[lang]/accessibility/page.tsx` — accessibility statement (contains `[placeholders]` to fill in).
- `src/app/sitemap.ts`, `src/app/robots.ts` — generated at build time.
- `src/components/` — page sections and shared pieces (`Modal`, `DetailDialog`, `BeforeAfterImage`, ...).
- `src/lib/translations.he.ts`, `src/lib/translations.en.ts` — all copy, including treatment/material detail text. Types are in `src/lib/types.ts`.
- `src/lib/whatsapp.ts` — WhatsApp number / click-to-call helpers.
- `src/lib/site.ts` — language list, base path and site URL helpers.

## Images

See [docs/IMAGES.md](./docs/IMAGES.md) for the exact asset paths. Until a real file is dropped into `public/images/`, a dashed placeholder shows the expected path.

## Deploying the preview to GitHub Pages

The site is a static export (`npm run build` writes `out/`). The workflow in `.github/workflows/deploy.yml` builds and publishes it on every push to `main`.

1. Push this repository to GitHub.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The preview is served at `https://amit-joyo.github.io/DR.MarvaWebsite/`.

The workflow sets these build-time variables (see `src/lib/site.ts`):

| Variable                 | Purpose                                                        |
| ------------------------ | -------------------------------------------------------------- |
| `NEXT_PUBLIC_BASE_PATH`  | Sub-path the site is served from (`/DR.MarvaWebsite`).         |
| `NEXT_PUBLIC_SITE_URL`   | Absolute origin + base path for canonical URLs and the sitemap. |
| `NEXT_PUBLIC_NOINDEX`    | `true` keeps the preview out of search engines.                |

For a real domain, build without `NEXT_PUBLIC_BASE_PATH`/`NEXT_PUBLIC_NOINDEX` and set `NEXT_PUBLIC_SITE_URL` to the final address.

## i18n / RTL

Hebrew (`dir="rtl"`) and English (`dir="ltr"`) are separate routes, so each is crawlable with its own `lang`, `dir` and `hreflang` alternates. Layout spacing uses Tailwind logical properties (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`) so it mirrors cleanly in both directions.

## Contact form

The booking form was removed for now: visitors contact the clinic via WhatsApp or phone (sticky bar + Contact section). A static host has no server to receive form posts, so a form would need an external service or backend.
