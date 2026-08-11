import { forwardRef } from "react";
import type { AnchorHTMLAttributes } from "react";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Estilo visual menos proeminente, para links secundários dentro de texto de apoio. */
  muted?: boolean;
  disabled?: boolean;
  /** Marca o link como externo: adiciona indicador visual e target="_blank" com rel seguro. */
  external?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { muted = false, disabled = false, external = false, className, children, target, rel, ...rest },
  ref
) {
  return (
    <a
      ref={ref}
      className={["cp-link", muted && "cp-link--muted", className].filter(Boolean).join(" ")}
      aria-disabled={disabled || undefined}
      target={external ? "_blank" : target}
      rel={external ? "noopener noreferrer" : rel}
      {...rest}
    >
      {children}
      {external && <span className="cp-link__external-icon" aria-hidden="true" />}
    </a>
  );
});
