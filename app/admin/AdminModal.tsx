"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type Props = {
  titleId: string;
  onClose: () => void;
  children: React.ReactNode;
  pending?: boolean;
  closeOnBackdrop?: boolean;
  maxWidthClassName?: string;
};

export default function AdminModal({
  titleId,
  onClose,
  children,
  pending = false,
  closeOnBackdrop = true,
  maxWidthClassName = "max-w-xl",
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (!dialog.open) dialog.showModal();
    const firstFocusable = dialog.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-modal="true"
      className={`m-auto max-h-[90vh] w-[95vw] overflow-y-auto rounded-2xl border border-white/15 bg-[#171717] p-6 text-white backdrop:bg-black/75 ${maxWidthClassName}`}
      onCancel={(event) => {
        event.preventDefault();
        if (!pending) onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        if (pending || !closeOnBackdrop) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const clickedInsideDialog =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;
        if (!clickedInsideDialog) onClose();
      }}
    >
      {children}
    </dialog>
  );
}
