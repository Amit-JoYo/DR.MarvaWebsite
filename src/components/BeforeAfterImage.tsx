"use client";

import { useState, type PointerEvent } from "react";
import { ZoomIn } from "lucide-react";
import { MediaImage } from "./MediaImage";

export function resultImagePaths(id: string) {
  return {
    before: `/images/result-${id}-before.webp`,
    after: `/images/result-${id}-after.webp`,
  };
}

interface BeforeAfterImageProps {
  id: string;
  alt: string;
  badge: string;
  beforeLabel: string;
  afterLabel: string;
  enlargeLabel: string;
  onOpen: () => void;
}

/** Shows the "before" photo; hovering with a mouse cross-fades to "after". Click opens the enlarged view. */
export function BeforeAfterImage({
  id,
  alt,
  badge,
  beforeLabel,
  afterLabel,
  enlargeLabel,
  onOpen,
}: BeforeAfterImageProps) {
  const [showAfter, setShowAfter] = useState(false);
  const { before, after } = resultImagePaths(id);

  function handlePointerEnter(event: PointerEvent) {
    if (event.pointerType === "mouse") setShowAfter(true);
  }

  function handlePointerLeave(event: PointerEvent) {
    if (event.pointerType === "mouse") setShowAfter(false);
  }

  const layerClassName = (visible: boolean) =>
    `absolute inset-0 transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`;
  const zoomClassName = "transition-transform duration-500 group-hover:scale-105";

  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={() => setShowAfter(true)}
      onBlur={() => setShowAfter(false)}
      aria-label={`${enlargeLabel}: ${badge}`}
      className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-2xl border border-hairline bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-ink md:aspect-[4/3]"
    >
      <div className={layerClassName(!showAfter)} aria-hidden={showAfter}>
        <MediaImage src={before} alt={`${alt} — ${beforeLabel}`} label={`${badge} · ${beforeLabel}`} imgClassName={zoomClassName} />
      </div>
      <div className={layerClassName(showAfter)} aria-hidden={!showAfter}>
        <MediaImage src={after} alt={`${alt} — ${afterLabel}`} label={`${badge} · ${afterLabel}`} imgClassName={zoomClassName} />
      </div>

      <span className="pointer-events-none absolute start-3 top-3 rounded-full border border-hairline bg-white/90 px-3 py-1 text-xs font-medium text-sage-ink shadow-sm backdrop-blur-sm">
        {badge}
      </span>
      <span className="pointer-events-none absolute bottom-3 start-3 rounded-full bg-navy/85 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {showAfter ? afterLabel : beforeLabel}
      </span>
      <span className="pointer-events-none absolute bottom-3 end-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <ZoomIn className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
      </span>
    </button>
  );
}
