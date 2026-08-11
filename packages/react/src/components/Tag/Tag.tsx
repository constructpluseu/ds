import type { HTMLAttributes, ReactNode } from "react";

export type TagStatus = "neutral" | "info" | "success" | "warning" | "danger";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  status?: TagStatus;
  onRemove?: () => void;
  children: ReactNode;
}

export function Tag({ status = "neutral", onRemove, className, children, ...rest }: TagProps) {
  return (
    <span className={["cp-tag", `cp-tag--${status}`, className].filter(Boolean).join(" ")} {...rest}>
      {children}
      {onRemove && (
        <button
          type="button"
          className="cp-tag__remove"
          aria-label="Remover"
          onClick={onRemove}
        >
          ×
        </button>
      )}
    </span>
  );
}

/** Alias semântico de Tag — mesmo componente, nome alternativo para uso como indicador de estado. */
export const Badge = Tag;
