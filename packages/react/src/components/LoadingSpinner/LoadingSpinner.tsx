import type { HTMLAttributes } from "react";

export type LoadingSpinnerSize = "sm" | "md" | "lg";

export interface LoadingSpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: LoadingSpinnerSize;
  /** Texto anunciado a leitores de ecrã enquanto o carregamento decorre. */
  label?: string;
}

export function LoadingSpinner({
  size = "md",
  label = "A carregar…",
  className,
  ...rest
}: LoadingSpinnerProps) {
  return (
    <span
      className={["cp-spinner", `cp-spinner--${size}`, className].filter(Boolean).join(" ")}
      role="status"
      aria-label={label}
      {...rest}
    />
  );
}
