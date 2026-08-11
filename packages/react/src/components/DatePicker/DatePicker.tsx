import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { useDismissable } from "../../utils/useDismissable";
import {
  WEEKDAY_LABELS,
  addDays,
  addMonths,
  formatDisplayDate,
  formatFullDate,
  formatMonthLabel,
  getMonthMatrix,
  isSameDay,
  parseISODate,
  toISODate,
} from "./dateUtils";

export interface DatePickerProps {
  label?: ReactNode;
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  helperText?: ReactNode;
  errorText?: ReactNode;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
}

export function DatePicker({
  label,
  value,
  onChange,
  placeholder = "dd/mm/aaaa",
  helperText,
  errorText,
  minDate,
  maxDate,
  disabled = false,
}: DatePickerProps) {
  const selectedDate = useMemo(() => parseISODate(value), [value]);
  const min = useMemo(() => parseISODate(minDate), [minDate]);
  const max = useMemo(() => parseISODate(maxDate), [maxDate]);

  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => selectedDate ?? new Date());
  const [activeDate, setActiveDate] = useState(() => selectedDate ?? new Date());
  const id = useId();
  const panelId = `${id}-panel`;
  const helperId = `${id}-helper`;
  const invalid = Boolean(errorText);
  const inputRef = useRef<HTMLInputElement>(null);
  const dayRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const ref = useDismissable<HTMLDivElement>(open, () => setOpen(false));

  useEffect(() => {
    if (!open) return;
    const base = selectedDate ?? new Date();
    setViewDate(base);
    setActiveDate(base);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    dayRefs.current.get(toISODate(activeDate))?.focus();
  }, [open, activeDate]);

  const weeks = useMemo(() => getMonthMatrix(viewDate), [viewDate]);

  function isDisabledDate(date: Date) {
    if (min && date < min) return true;
    if (max && date > max) return true;
    return false;
  }

  function selectDate(date: Date) {
    if (isDisabledDate(date)) return;
    onChange(toISODate(date));
    setOpen(false);
    inputRef.current?.focus();
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
    }
  }

  function onGridKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const deltas: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    if (event.key in deltas) {
      event.preventDefault();
      const next = addDays(activeDate, deltas[event.key]);
      setActiveDate(next);
      if (next.getMonth() !== viewDate.getMonth() || next.getFullYear() !== viewDate.getFullYear()) {
        setViewDate(next);
      }
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectDate(activeDate);
    } else if (event.key === "Escape") {
      setOpen(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="cp-field">
      {label && (
        <label htmlFor={id} className="cp-field__label">
          {label}
        </label>
      )}
      <div ref={ref} className="cp-date-picker">
        <input
          id={id}
          ref={inputRef}
          type="text"
          readOnly
          disabled={disabled}
          className={`cp-input cp-input--md cp-date-picker__input${invalid ? " cp-input--invalid" : ""}`}
          placeholder={placeholder}
          value={selectedDate ? formatDisplayDate(selectedDate) : ""}
          role="combobox"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={panelId}
          aria-describedby={errorText || helperText ? helperId : undefined}
          aria-invalid={invalid || undefined}
          onClick={() => !disabled && setOpen(true)}
          onKeyDown={onInputKeyDown}
        />
        {open && (
          <div id={panelId} role="dialog" aria-label="Escolher data" className="cp-date-picker__panel">
            <div className="cp-date-picker__header">
              <button
                type="button"
                className="cp-date-picker__nav"
                aria-label="Mês anterior"
                onClick={() => setViewDate((current) => addMonths(current, -1))}
              >
                ‹
              </button>
              <span className="cp-date-picker__month-label">{formatMonthLabel(viewDate)}</span>
              <button
                type="button"
                className="cp-date-picker__nav"
                aria-label="Mês seguinte"
                onClick={() => setViewDate((current) => addMonths(current, 1))}
              >
                ›
              </button>
            </div>
            <div className="cp-date-picker__grid">
              {WEEKDAY_LABELS.map((weekday) => (
                <span key={weekday} className="cp-date-picker__weekday">
                  {weekday}
                </span>
              ))}
              {weeks.map((date) => {
                const outside = date.getMonth() !== viewDate.getMonth();
                const selected = selectedDate ? isSameDay(date, selectedDate) : false;
                const today = isSameDay(date, new Date());
                const active = isSameDay(date, activeDate);
                const dayDisabled = isDisabledDate(date);
                const key = toISODate(date);
                return (
                  <button
                    key={key}
                    type="button"
                    ref={(el) => {
                      if (el) dayRefs.current.set(key, el);
                      else dayRefs.current.delete(key);
                    }}
                    disabled={dayDisabled}
                    tabIndex={active ? 0 : -1}
                    aria-pressed={selected}
                    aria-current={today ? "date" : undefined}
                    aria-label={formatFullDate(date)}
                    onKeyDown={onGridKeyDown}
                    className={[
                      "cp-date-picker__day",
                      outside ? "cp-date-picker__day--outside" : "",
                      today ? "cp-date-picker__day--today" : "",
                      selected ? "cp-date-picker__day--selected" : "",
                      active ? "cp-date-picker__day--active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => selectDate(date)}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {(errorText || helperText) && (
        <span id={helperId} className={`cp-field__helper${errorText ? " cp-field__helper--error" : ""}`}>
          {errorText || helperText}
        </span>
      )}
    </div>
  );
}
