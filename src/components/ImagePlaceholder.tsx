"use client";

import { useEffect, useRef, useState } from "react";
import { withBase } from "@/lib/site";

/**
 * Tracks whether an <img> failed to load. A missing asset's 404 often fails
 * before hydration attaches onError, so the native error event can be missed;
 * the effect catches that already-failed state.
 */
export function useImageFallback(src: string) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, [src]);

  return { failed, imgRef, onError: () => setFailed(true) };
}

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  label: string;
  aspectClassName: string;
  roundedClassName?: string;
  className?: string;
  /** Tiny slots (logo) can't fit a path label, so show a monogram and expose the path via title. */
  compact?: boolean;
}

/**
 * Renders a real <img> pointing at the expected asset path so dropping a real
 * file into /public/images activates it instantly. Until then (or if the file
 * fails to load), a dashed placeholder shows the expected path and a localized
 * label so content editors know exactly what to supply.
 */
export function ImagePlaceholder({
  src,
  alt,
  label,
  aspectClassName,
  roundedClassName = "rounded-2xl",
  className = "",
  compact = false,
}: ImagePlaceholderProps) {
  const { failed, imgRef, onError } = useImageFallback(src);

  return (
    <div
      title={failed ? src : undefined}
      className={`relative ${aspectClassName} ${roundedClassName} overflow-hidden border ${
        failed
          ? "border-dashed border-sage/40 bg-mist/60"
          : "border-hairline bg-slate-100"
      } ${className}`}
    >
      {!failed && (
        // Intentionally a literal <img src="/images/..."> (not next/image) per
        // the asset spec, so dropping a real file activates the exact path
        // with no optimizer-rewritten URL.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={withBase(src)}
          alt={alt}
          onError={onError}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      )}
      {failed && compact && (
        <div className="absolute inset-0 flex items-center justify-center font-serif text-sm font-semibold text-sage-ink">
          DM
        </div>
      )}
      {failed && !compact && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center text-slate-500">
          <span dir="ltr" className="break-all px-2 font-mono text-[11px] sm:text-xs">{src}</span>
          <span className="text-xs">{label}</span>
        </div>
      )}
    </div>
  );
}
