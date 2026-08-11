import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { label, disabled, className, id, ...rest },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={["cp-toggle", disabled && "cp-toggle--disabled", className]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        id={inputId}
        disabled={disabled}
        className="cp-toggle__input"
        {...rest}
      />
      <span className="cp-toggle__track" aria-hidden="true">
        <span className="cp-toggle__thumb" />
      </span>
      <span>{label}</span>
    </label>
  );
});
