import { forwardRef, useId } from "react";
import type { ReactNode, TextareaHTMLAttributes } from "react";
import type { FieldSize } from "../TextInput";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  size?: FieldSize;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
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
      <textarea
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
