import { useEffect, useRef } from "react";

/**
 * Fecha um painel flutuante (Popover, Dropdown Menu, Toggletip) ao clicar fora dele
 * ou ao premir Escape. O ref retornado deve envolver o gatilho + o painel juntos.
 */
export function useDismissable<T extends HTMLElement = HTMLDivElement>(
  open: boolean,
  onDismiss: () => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onDismiss();
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onDismiss();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onDismiss]);

  return ref;
}
