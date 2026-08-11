import { useId, useState } from "react";
import type { ReactNode } from "react";
import { useDismissable } from "../../utils/useDismissable";

export interface ToggletipProps {
  children: ReactNode;
  /** Rótulo acessível do botão de gatilho (ícone "?"). */
  "aria-label"?: string;
}

export function Toggletip({ children, "aria-label": ariaLabel = "Mais informação" }: ToggletipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useDismissable<HTMLSpanElement>(open, () => setOpen(false));

  return (
    <span className="cp-toggletip-wrapper" ref={ref}>
      <button
        type="button"
        className="cp-toggletip__trigger"
        aria-expanded={open}
        aria-controls={id}
        aria-label={ariaLabel}
        onClick={() => setOpen((current) => !current)}
      >
        ?
      </button>
      {open && (
        <span id={id} role="status" className="cp-toggletip__panel">
          {children}
        </span>
      )}
    </span>
  );
}
