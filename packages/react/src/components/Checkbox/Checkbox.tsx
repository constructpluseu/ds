import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  /** Estado visual "parcialmente selecionado", usado em checkboxes-pai de uma lista. */
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, indeterminate = false, disabled, className, id, ...rest },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const innerRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      htmlFor={inputId}
      className={["cp-checkbox", disabled && "cp-checkbox--disabled", className]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        ref={innerRef}
        type="checkbox"
        id={inputId}
        disabled={disabled}
        className="cp-checkbox__input"
        {...rest}
      />
      <span className="cp-checkbox__box" aria-hidden="true" />
      <span className="cp-checkbox__label">{label}</span>
    </label>
  );
});
