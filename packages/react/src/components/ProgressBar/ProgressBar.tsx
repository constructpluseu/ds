import { useId } from "react";
import type { ReactNode } from "react";

export interface ProgressBarProps {
  /** Valor atual entre 0 e max. Omitir junto de indeterminate=true para progresso sem duração previsível. */
  value?: number;
  max?: number;
  label?: ReactNode;
  /** Mostra a percentagem calculada junto ao label. */
  showValue?: boolean;
  indeterminate?: boolean;
  status?: "default" | "danger";
  className?: string;
}

export function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = false,
  indeterminate = false,
  status = "default",
  className,
}: ProgressBarProps) {
  const id = useId();
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={["cp-progress-bar", className].filter(Boolean).join(" ")}>
      {(label || showValue) && (
        <div className="cp-progress-bar__header">
          {label && (
            <span className="cp-progress-bar__label" id={id}>
              {label}
            </span>
          )}
          {showValue && !indeterminate && <span>{Math.round(percent)}%</span>}
        </div>
      )}
      <div
        className={[
          "cp-progress-bar__track",
          status === "danger" && "cp-progress-bar--danger",
          indeterminate && "cp-progress-bar--indeterminate",
        ]
          .filter(Boolean)
          .join(" ")}
        role="progressbar"
        aria-labelledby={label ? id : undefined}
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div className="cp-progress-bar__fill" style={indeterminate ? undefined : { width: `${percent}%` }} />
      </div>
    </div>
  );
}
