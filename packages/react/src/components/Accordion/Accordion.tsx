import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Permite vários painéis abertos simultaneamente. Predefinição: false (apenas um por vez). */
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
}

export function Accordion({ items, allowMultiple = false, defaultOpenIds = [] }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);
  const idBase = useId();
  const headerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function toggle(id: string) {
    setOpenIds((current) => {
      const isOpen = current.includes(id);
      if (allowMultiple) {
        return isOpen ? current.filter((openId) => openId !== id) : [...current, id];
      }
      return isOpen ? [] : [id];
    });
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowDown") nextIndex = (index + 1) % items.length;
    else if (event.key === "ArrowUp") nextIndex = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = items.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      headerRefs.current[items[nextIndex].id]?.focus();
    }
  }

  return (
    <div className="cp-accordion">
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="cp-accordion__item">
            <h3 className="cp-accordion__header">
              <button
                ref={(el) => {
                  headerRefs.current[item.id] = el;
                }}
                type="button"
                className={["cp-accordion__trigger", isOpen && "cp-accordion__trigger--open"]
                  .filter(Boolean)
                  .join(" ")}
                aria-expanded={isOpen}
                aria-controls={`${idBase}-panel-${item.id}`}
                id={`${idBase}-header-${item.id}`}
                disabled={item.disabled}
                onClick={() => toggle(item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span className="cp-accordion__icon" aria-hidden="true" />
                {item.title}
              </button>
            </h3>
            {isOpen && (
              <div
                role="region"
                id={`${idBase}-panel-${item.id}`}
                aria-labelledby={`${idBase}-header-${item.id}`}
                className="cp-accordion__panel"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
