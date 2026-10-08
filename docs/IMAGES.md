# Required Image Assets

Drop real files at these exact paths and they activate automatically (no code changes needed) — each placeholder's `<img>` tag already points here.

| Path                                       | Usage                                  | Aspect ratio         |
| ------------------------------------------ | -------------------------------------- | -------------------- |
| `/public/images/logo.svg`                  | Brand emblem (header & footer)         | Square               |
| `/public/images/dr-marva-portrait.webp`    | Hero physician portrait                | `4:5`                |
| `/public/images/result-{id}-before.webp`   | Results gallery — "before" photo       | Square / `4:3` (md+) |
| `/public/images/result-{id}-after.webp`    | Results gallery — "after" photo        | Square / `4:3` (md+) |

Current result ids: `jawline`, `lips`, `wrinkles`, `prp`, `tear-troughs`, `rhinoplasty`, `skin-texture` (e.g. `result-jawline-before.webp` and `result-jawline-after.webp`).

Until a file exists at a given path, the site shows a dashed placeholder with the expected path and a localized label instead of a broken image.

## Adding another result to the gallery

1. Add the two photos: `result-{id}-before.webp` and `result-{id}-after.webp` (pick a new short `id`, e.g. `nose`).
2. In `src/lib/translations.he.ts` **and** `src/lib/translations.en.ts`, add one entry to `results.items` with the same `id` plus its `badge`, `title`, `description` and `imageAlt`.

The gallery shows all results side by side when they fit. With more than four (fewer on smaller screens) it becomes a slow, endless loop that pauses on hover, focus, touch or the on-page pause button (and stays still for visitors who prefer reduced motion). Clicking a result opens an enlarged before/after view; clicking the hero portrait enlarges it too.
