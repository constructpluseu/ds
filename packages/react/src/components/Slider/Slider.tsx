import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  showValue?: boolean;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { label, showValue = true, id, className, value, min = 0, max = 100, ...rest },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="cp-field">
      {(label || showValue) && (
        <div className="cp-progress-bar__header">
          {label && (
            <label htmlFor={inputId} className="cp-field__label">
              {label}
            </label>
          )}
          {showValue && <span className="cp-slider-field__value">{value}</span>}
        </div>
      )}
      <input
        ref={ref}
        id={inputId}
        type="range"
        min={min}
        max={max}
        value={value}
        className={["cp-slider", className].filter(Boolean).join(" ")}
        {...rest}
      />
    </div>
  );
});
