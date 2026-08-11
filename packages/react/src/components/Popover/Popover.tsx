import { cloneElement, isValidElement, useId, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { useDismissable } from "../../utils/useDismissable";

export interface PopoverProps {
  /** Elemento único que abre/fecha o popover ao ser clicado (ex.: um Button). */
  trigger: ReactElement;
  children: ReactNode;
  placement?: "left" | "right";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Popover({ trigger, children, placement = "left", open, onOpenChange }: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const id = useId();

  function setOpen(next: boolean) {
    setInternalOpen(next);
    onOpenChange?.(next);
  }

  const ref = useDismissable(isOpen, () => setOpen(false));

  if (!isValidElement(trigger)) {
    return null;
  }

  const triggerProps = trigger.props as Record<string, ((event: unknown) => void) | undefined>;

  const clonedTrigger = cloneElement(trigger, {
    "aria-expanded": isOpen,
    "aria-haspopup": "dialog",
    "aria-controls": id,
    onClick: (event: React.MouseEvent) => {
      setOpen(!isOpen);
      triggerProps.onClick?.(event);
    },
  } as Record<string, unknown>);

  return (
    <div className="cp-popover-wrapper" ref={ref}>
      {clonedTrigger}
      {isOpen && (
        <div
          id={id}
          role="dialog"
          className={["cp-popover__panel", placement === "right" && "cp-popover__panel--right"]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </div>
      )}
    </div>
  );
}
