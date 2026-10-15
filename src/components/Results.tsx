"use client";

import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from "react";
import { Pause, Play } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { ResultCard } from "@/lib/types";
import { BeforeAfterImage, resultImagePaths } from "./BeforeAfterImage";
import { MediaImage } from "./MediaImage";
import { Modal } from "./Modal";

const CARD_GAP_PX = 24; // matches the me-6 spacing on each card
const SPEED_PX_PER_SECOND = 35;
const EDGE_TOLERANCE_PX = 4;
const DRAG_THRESHOLD_PX = 6;

/** Native scrolling takes over when the visitor asked for less motion (OS setting or the accessibility menu). */
function motionDisabled() {
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.classList.contains("a11y-nomotion")
  );
}

export function Results() {
  const { t } = useLanguage();
  const items = t.results.items;
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [loop, setLoop] = useState({ active: false, setWidth: 0 });
  const [userPaused, setUserPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<ResultCard | null>(null);

  // The loop is driven from JS (not a CSS animation) so a drag can move the same position the autoplay uses.
  const positionRef = useRef(0);
  const pausedRef = useRef(false);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const dragRef = useRef<{ pointerId: number; startX: number; startPosition: number; moved: boolean } | null>(null);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    pausedRef.current = userPaused;
  }, [userPaused]);

  // Loop only when the cards don't all fit; otherwise show them as a static row.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(() => {
      const card = viewport.querySelector("li");
      if (!card) return;
      const setWidth = items.length * (card.getBoundingClientRect().width + CARD_GAP_PX);
      setLoop({
        active: setWidth - CARD_GAP_PX > viewport.clientWidth + EDGE_TOLERANCE_PX,
        setWidth,
      });
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [items.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (!loop.active) {
      track.style.transform = "";
      return;
    }

    // Distance travelled grows in the reading direction: leftwards in LTR, rightwards in RTL.
    const direction = getComputedStyle(track).direction === "rtl" ? 1 : -1;
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = Math.min(now - last, 100) / 1000;
      last = now;

      if (motionDisabled()) {
        positionRef.current = 0;
        track.style.transform = "";
      } else {
        const autoplay = !pausedRef.current && !hoveredRef.current && !focusedRef.current && !dragRef.current;
        if (autoplay) positionRef.current += SPEED_PX_PER_SECOND * elapsed;
        positionRef.current = ((positionRef.current % loop.setWidth) + loop.setWidth) % loop.setWidth;
        track.style.transform = `translate3d(${direction * positionRef.current}px, 0, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [loop.active, loop.setWidth]);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!loop.active || motionDisabled()) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startPosition: positionRef.current,
      moved: false,
    };
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || !track || drag.pointerId !== event.pointerId) return;
    const delta = event.clientX - drag.startX;
    if (!drag.moved) {
      if (Math.abs(delta) < DRAG_THRESHOLD_PX) return;
      drag.moved = true;
      // Capture only once it is a real drag, so a plain tap still reaches the card's button.
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
    }
    const direction = getComputedStyle(track).direction === "rtl" ? 1 : -1;
    positionRef.current = drag.startPosition + direction * delta;
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (drag.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
      setDragging(false);
    }
  }

  function handleFocus() {
    focusedRef.current = true;
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) focusedRef.current = false;
  }

  // Second copy makes the loop seamless; it is hidden from assistive tech and focus.
  const cards = loop.active ? [...items, ...items] : items;
  const viewerPaths = selected ? resultImagePaths(selected.id) : null;

  return (
    <section id="results" className="scroll-mt-24 border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="max-w-2xl text-start">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            {t.results.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{t.results.subtext}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-start text-sm text-muted">{t.results.compareHint}</p>
          {loop.active && (
            <button
              type="button"
              onClick={() => setUserPaused((value) => !value)}
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/70 px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-sage-ink hover:text-sage-ink"
            >
              {userPaused ? (
                <Play className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Pause className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              )}
              {userPaused ? t.results.playLabel : t.results.pauseLabel}
            </button>
          )}
        </div>

        <div
          ref={viewportRef}
          data-marquee
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") hoveredRef.current = true;
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") hoveredRef.current = false;
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onDragStart={(event) => event.preventDefault()}
          onClickCapture={(event) => {
            // A drag that ends over a card must not also open it.
            if (suppressClickRef.current) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          className={`mt-4 overflow-hidden [container-type:inline-size] motion-reduce:touch-auto motion-reduce:overflow-x-auto ${
            loop.active
              ? `touch-pan-y select-none [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] ${
                  dragging ? "[&_*]:!cursor-grabbing" : "cursor-grab"
                }`
              : ""
          }`}
        >
          <ul
                      ref={trackRef}
                      className={`flex w-max py-2 ${loop.active ? "will-change-transform" : ""}`}
          >
            {cards.map((item, index) => {
              const isCopy = index >= items.length;
              return (
                <li
                  key={`${item.id}-${isCopy ? "copy" : "main"}`}
                  aria-hidden={isCopy || undefined}
                  inert={isCopy}
                  className="me-6 w-[85cqw] shrink-0 sm:w-[calc((100cqw-1.5rem)/2)] lg:w-[calc((100cqw-4.5rem)/4)] motion-reduce:data-[copy]:hidden"
                  data-copy={isCopy || undefined}
                >
                  <article className="glass-card h-full rounded-2xl p-3 text-start">
                    <BeforeAfterImage
                      id={item.id}
                      alt={item.imageAlt}
                      badge={item.badge}
                      beforeLabel={t.results.beforeLabel}
                      afterLabel={t.results.afterLabel}
                      enlargeLabel={t.results.enlargeLabel}
                      onOpen={() => setSelected(item)}
                    />
                    <div className="px-2 pb-3 pt-4">
                      <h3 className="font-serif text-lg font-semibold text-navy">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ""}
        closeLabel={t.details.close}
        widthClassName="w-[min(94vw,1100px)]"
      >
        {selected && viewerPaths && (
          <div className="text-start">
            <h3 className="pe-14 font-serif text-2xl font-semibold text-navy">{selected.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{selected.description}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {(
                [
                  [viewerPaths.before, t.results.beforeLabel],
                  [viewerPaths.after, t.results.afterLabel],
                ] as const
              ).map(([src, label]) => (
                <figure key={src}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-hairline bg-slate-100">
                    <MediaImage
                      src={src}
                      alt={`${selected.imageAlt} — ${label}`}
                      label={`${selected.badge} · ${label}`}
                      fit="contain"
                    />
                  </div>
                  <figcaption className="mt-2 text-sm font-medium text-navy">{label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
