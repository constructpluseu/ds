import { cloneElement, isValidElement, useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactElement, ReactNode } from "react";
import { useDismissable } from "../../utils/useDismissable";

export interface MenuItemDef {
  id: string;
  label: ReactNode;
  onSelect: () => void;
  disabled?: boolean;
  danger?: boolean;
}

export interface MenuProps {
  /** Elemento único que abre/fecha o menu ao ser clicado (ex.: um Button). */
  trigger: ReactElement;
  items: MenuItemDef[];
  "aria-label"?: string;
}

export function Menu({ trigger, items, "aria-label": ariaLabel = "Menu de ações" }: MenuProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const triggerRef = useRef<HTMLElement | null>(null);

  const ref = useDismissable(open, () => setOpen(false));

  function close(focusTrigger = true) {
    setOpen(false);
    if (focusTrigger) {
      (triggerRef.current as HTMLElement | null)?.focus?.();
    }
  }

  function onMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    const enabled = items.filter((item) => !item.disabled);
    const focusedIndex = enabled.findIndex(
      (item) => itemRefs.current[item.id] === document.activeElement
    );
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown") nextIndex = (focusedIndex + 1) % enabled.length;
    else if (event.key === "ArrowUp") nextIndex = (focusedIndex - 1 + enabled.length) % enabled.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = enabled.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      itemRefs.current[enabled[nextIndex].id]?.focus();
    }
  }

  if (!isValidElement(trigger)) {
    return null;
  }

  const triggerProps = trigger.props as Record<string, ((event: unknown) => void) | undefined>;

  const clonedTrigger = cloneElement(trigger, {
    ref: triggerRef,
    "aria-haspopup": "menu",
    "aria-expanded": open,
    "aria-controls": id,
    onClick: (event: React.MouseEvent) => {
      setOpen((current) => !current);
      triggerProps.onClick?.(event);
    },
  } as Record<string, unknown>);

  return (
    <div className="cp-menu-wrapper" ref={ref}>
      {clonedTrigger}
      {open && (
        // eslint-disable-next-line jsx-a11y/interactive-supports-focus -- por padrão WAI-ARIA APG, o foco vive nos `menuitem` via roving tabindex, nunca no `menu` em si.
        <div
          id={id}
          role="menu"
          aria-label={ariaLabel}
          className="cp-menu__panel"
          onKeyDown={onMenuKeyDown}
        >
          {items.map((item) => (
            <button
              key={item.id}
              ref={(el) => {
                itemRefs.current[item.id] = el;
              }}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              className={["cp-menu__item", item.danger && "cp-menu__item--danger"]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                item.onSelect();
                close();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
