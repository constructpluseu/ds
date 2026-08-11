import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  subtitle?: ReactNode;
  headerAction?: ReactNode;
  footer?: ReactNode;
  /** Aplica hover/foco visual e cursor de pointer, para cartões clicáveis. */
  interactive?: boolean;
}

export function Card({
  title,
  subtitle,
  headerAction,
  footer,
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={["cp-card", interactive && "cp-card--interactive", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {(title || subtitle || headerAction) && (
        <div className="cp-card__header">
          <div>
            {title && <h3 className="cp-card__title">{title}</h3>}
            {subtitle && <p className="cp-card__subtitle">{subtitle}</p>}
          </div>
          {headerAction}
        </div>
      )}
      <div className="cp-card__body">{children}</div>
      {footer && <div className="cp-card__footer">{footer}</div>}
    </div>
  );
}
