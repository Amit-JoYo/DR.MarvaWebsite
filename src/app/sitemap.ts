import type { MetadataRoute } from "next";
import { LANGS, pageUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "accessibility/"];

  return paths.flatMap((path) =>
    LANGS.map((lang) => ({
      url: pageUrl(lang, path),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.3,
      alternates: {
        languages: Object.fromEntries(LANGS.map((alt) => [alt, pageUrl(alt, path)])),
      },
    })),
  );
}
