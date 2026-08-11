import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export type FieldSize = "sm" | "md" | "lg";

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  size?: FieldSize;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { label, helperText, errorText, size = "md", required, id, className, ...rest },
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
      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={invalid || undefined}
        aria-describedby={errorText || helperText ? helperId : undefined}
        className={["cp-input", `cp-input--${size}`, invalid && "cp-input--invalid", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      />
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
