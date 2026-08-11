import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  /** Fecha o modal ao clicar fora da caixa de diálogo. Predefinido: true. */
  dismissOnBackdropClick?: boolean;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  dismissOnBackdropClick = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const initialFocusable = dialog?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    initialFocusable?.[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;

      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- backdrop de dismiss por clique; o fecho por teclado é tratado globalmente via Escape, não depende deste elemento.
    <div
      className="cp-modal-overlay"
      onMouseDown={(event) => {
        if (dismissOnBackdropClick && event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className={["cp-modal", `cp-modal--${size}`].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="cp-modal__header">
          <h2 className="cp-modal__title" id={titleId}>
            {title}
          </h2>
          <button type="button" className="cp-modal__close" aria-label="Fechar" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="cp-modal__body">{children}</div>
        {footer && <div className="cp-modal__footer">{footer}</div>}
      </div>
    </div>
  );
}
