import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "accent" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Estilo visual do botão. `primary` para a ação principal do contexto, `accent` para chamadas de destaque. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Mostra um spinner e desativa o botão, mantendo o texto para leitores de ecrã via aria-busy. */
  loading?: boolean;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = false,
    leadingIcon,
    trailingIcon,
    disabled,
    className,
    children,
    type = "button",
    ...rest
  },
  ref
) {
  const classes = [
    "cp-button",
    `cp-button--${variant}`,
    `cp-button--${size}`,
    loading && "cp-button--loading",
    fullWidth && "cp-button--full-width",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="cp-button__spinner" aria-hidden="true" />}
      {!loading && leadingIcon}
      <span>{children}</span>
      {!loading && trailingIcon}
    </button>
  );
});
