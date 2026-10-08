"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  closeLabel: string;
  /** Tailwind width classes for the panel. */
  widthClassName?: string;
  children: ReactNode;
}

/** Accessible modal on the native <dialog>: focus trap, Esc to close and inert background come built in. */
export function Modal({
  open,
  onClose,
  title,
  closeLabel,
  widthClassName = "w-[min(92vw,640px)]",
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      onClose={onClose}
      // A click on the dialog element itself (not its content) is a click on the backdrop.
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className={`m-auto max-h-[92dvh] ${widthClassName} overflow-y-auto rounded-3xl border border-hairline bg-porcelain p-0 text-navy shadow-2xl backdrop:bg-navy/50 backdrop:backdrop-blur-sm`}
    >
      {open && (
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute end-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-white/80 text-navy transition-colors hover:border-sage-ink hover:text-sage-ink"
          >
            <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </button>
          {children}
        </div>
      )}
    </dialog>
  );
}
