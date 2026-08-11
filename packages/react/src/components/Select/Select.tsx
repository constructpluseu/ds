import { forwardRef, useId } from "react";
import type { ReactNode, SelectHTMLAttributes } from "react";
import type { FieldSize } from "../TextInput";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  size?: FieldSize;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    helperText,
    errorText,
    size = "md",
    required,
    id,
    className,
    options,
    placeholder,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const invalid = Boolean(errorText);

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
      <select
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={invalid || undefined}
        aria-describedby={errorText || helperText ? helperId : undefined}
        className={["cp-input", `cp-input--${size}`, invalid && "cp-input--invalid", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
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
