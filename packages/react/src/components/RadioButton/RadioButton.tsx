import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(function RadioButton(
  { label, disabled, className, id, ...rest },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={["cp-radio", disabled && "cp-radio--disabled", className]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        ref={ref}
        type="radio"
        id={inputId}
        disabled={disabled}
        className="cp-radio__input"
        {...rest}
      />
      <span className="cp-radio__circle" aria-hidden="true" />
      <span className="cp-radio__label">{label}</span>
    </label>
  );
});
