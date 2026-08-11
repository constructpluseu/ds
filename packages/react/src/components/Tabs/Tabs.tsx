import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (id: string) => void;
  "aria-label"?: string;
}

export function Tabs({
  items,
  defaultValue,
  value,
  onValueChange,
  "aria-label": ariaLabel,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? items.find((item) => !item.disabled)?.id ?? items[0]?.id
  );
  const activeValue = value ?? internalValue;
  const idBase = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function selectTab(id: string) {
    setInternalValue(id);
    onValueChange?.(id);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const enabled = items.filter((item) => !item.disabled);
    const currentIndex = enabled.findIndex((item) => item.id === activeValue);
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % enabled.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + enabled.length) % enabled.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = enabled.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      const next = enabled[nextIndex];
      selectTab(next.id);
      tabRefs.current[next.id]?.focus();
    }
  }

  const activeItem = items.find((item) => item.id === activeValue);

  return (
    <div className="cp-tabs">
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus -- por padrão WAI-ARIA APG, o foco vive nos elementos `tab` via roving tabindex, nunca no `tablist` em si. */}
      <div role="tablist" aria-label={ariaLabel} className="cp-tabs__list" onKeyDown={onKeyDown}>
        {items.map((item) => {
          const selected = item.id === activeValue;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[item.id] = el;
              }}
              type="button"
              role="tab"
              id={`${idBase}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${idBase}-panel-${item.id}`}
              disabled={item.disabled}
              tabIndex={selected ? 0 : -1}
              className={["cp-tabs__tab", selected && "cp-tabs__tab--selected"]
                .filter(Boolean)
                .join(" ")}
              onClick={() => selectTab(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {activeItem && (
        <div
          role="tabpanel"
          id={`${idBase}-panel-${activeItem.id}`}
          aria-labelledby={`${idBase}-tab-${activeItem.id}`}
          className="cp-tabs__panel"
          tabIndex={0}
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}
