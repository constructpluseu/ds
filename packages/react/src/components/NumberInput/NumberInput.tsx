import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import type { FieldSize } from "../TextInput";

export interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange"> {
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  size?: FieldSize;
  value?: number;
  step?: number;
  onChange?: (value: number) => void;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    label,
    helperText,
    errorText,
    size = "md",
    required,
    id,
    className,
    value = 0,
    min,
    max,
    step = 1,
    onChange,
    disabled,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const invalid = Boolean(errorText);

  function clamp(next: number): number {
    let result = next;
    if (min !== undefined) result = Math.max(Number(min), result);
    if (max !== undefined) result = Math.min(Number(max), result);
    return result;
  }

  const canDecrement = min === undefined || value > Number(min);
  const canIncrement = max === undefined || value < Number(max);

  return (
    <div className="cp-field">
      {label && (
        <label
          htmlFor={inputId}
          className={["cp-field__label", required && "cp-field__label--required"]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
        </label>
      )}
      <div
        className={["cp-number-input", invalid && "cp-number-input--invalid"]
          .filter(Boolean)
          .join(" ")}
      >
        <button
          type="button"
          className="cp-number-input__step"
          aria-label="Diminuir"
          disabled={disabled || !canDecrement}
          onClick={() => onChange?.(clamp(value - step))}
        >
          −
        </button>
        <input
          ref={ref}
          id={inputId}
          type="number"
          required={required}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          value={value}
          aria-invalid={invalid || undefined}
          aria-describedby={errorText || helperText ? helperId : undefined}
          className={["cp-input", "cp-number-input__field", `cp-input--${size}`, className]
            .filter(Boolean)
            .join(" ")}
          onChange={(event) => onChange?.(clamp(Number(event.target.value)))}
          {...rest}
        />
        <button
          type="button"
          className="cp-number-input__step"
          aria-label="Aumentar"
          disabled={disabled || !canIncrement}
          onClick={() => onChange?.(clamp(value + step))}
        >
          +
        </button>
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
});
