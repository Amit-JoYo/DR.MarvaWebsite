"use client";

import { withBase } from "@/lib/site";
import { useImageFallback } from "./ImagePlaceholder";

interface MediaImageProps {
  /** Logical path, e.g. /images/result-lips-before.webp (the base path is added automatically). */
  src: string;
  alt: string;
  label: string;
  fit?: "cover" | "contain";
  imgClassName?: string;
}

/** Fills its (positioned) parent with the photo, or a dashed placeholder showing the expected path. */
export function MediaImage({ src, alt, label, fit = "cover", imgClassName = "" }: MediaImageProps) {
  const { failed, imgRef, onError } = useImageFallback(src);

  if (failed) {
    return (
      <div className="absolute inset-2 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-sage/40 bg-mist/60 p-3 text-center text-slate-500">
        <span dir="ltr" className="break-all font-mono text-[11px] sm:text-xs">
          {src}
        </span>
        <span className="text-xs">{label}</span>
      </div>
    );
  }

  return (
    // Literal <img> (not next/image) so dropping a file at the exact path activates it.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={withBase(src)}
      alt={alt}
      onError={onError}
      className={`h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"} ${imgClassName}`}
    />
  );
}
