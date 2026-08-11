import { useId, useMemo, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { useDismissable } from "../../utils/useDismissable";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  label?: ReactNode;
  options: ComboboxOption[];
  /** Sempre um array — no modo de seleção única terá no máximo 1 item. */
  value: string[];
  onChange: (value: string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  helperText?: ReactNode;
  errorText?: ReactNode;
}

export function Combobox({
  label,
  options,
  value,
  onChange,
  multiple = false,
  placeholder = "Selecione…",
  helperText,
  errorText,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const id = useId();
  const listboxId = `${id}-listbox`;
  const helperId = `${id}-helper`;
  const invalid = Boolean(errorText);

  const filtered = useMemo(
    () => options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())),
    [options, query]
  );

  const ref = useDismissable(open, () => {
    setOpen(false);
    setQuery("");
  });

  const selectedOptions = options.filter((option) => value.includes(option.value));

  function toggleValue(optionValue: string) {
    if (multiple) {
      const next = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange(next);
      setQuery("");
    } else {
      onChange([optionValue]);
      setOpen(false);
      setQuery("");
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((current) => Math.min(current + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const option = filtered[activeIndex];
      if (option && !option.disabled) toggleValue(option.value);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const displayValue = open || multiple ? query : selectedOptions[0]?.label ?? "";

  return (
    <div className="cp-field">
      {label && (
        <label htmlFor={id} className="cp-field__label">
          {label}
        </label>
      )}
      <div className="cp-combobox" ref={ref}>
        {multiple && selectedOptions.length > 0 && (
          <div className="cp-combobox__tags">
            {selectedOptions.map((option) => (
              <span key={option.value} className="cp-tag cp-tag--info">
                {option.label}
                <button
                  type="button"
                  className="cp-tag__remove"
                  aria-label={`Remover ${option.label}`}
                  onClick={() => toggleValue(option.value)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        <input
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-invalid={invalid || undefined}
          aria-describedby={errorText || helperText ? helperId : undefined}
          className={["cp-input", "cp-input--md", "cp-combobox__input", invalid && "cp-input--invalid"]
            .filter(Boolean)
            .join(" ")}
          placeholder={placeholder}
          value={displayValue}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setActiveIndex(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          autoComplete="off"
        />
        {open && (
          <ul
            id={listboxId}
            role="listbox"
            className="cp-combobox__listbox"
            aria-multiselectable={multiple || undefined}
          >
            {filtered.length === 0 && <li className="cp-combobox__empty">Sem resultados</li>}
            {filtered.map((option, index) => (
              <li
                key={option.value}
                role="option"
                aria-selected={value.includes(option.value)}
                aria-disabled={option.disabled}
                className={[
                  "cp-combobox__option",
                  index === activeIndex && "cp-combobox__option--active",
                  value.includes(option.value) && "cp-combobox__option--selected",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onMouseDown={(event) => {
                  event.preventDefault();
                  if (!option.disabled) toggleValue(option.value);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {(errorText || helperText) && (
        <span
          id={helperId}
          className={["cp-field__helper", errorText && "cp-field__helper--error"]
            .filter(Boolean)
            .join(" ")}
        >
          {errorText || helperText}
        </span>
      )}
    </div>
  );
}
