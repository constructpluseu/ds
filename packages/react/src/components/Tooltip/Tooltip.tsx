import { cloneElement, isValidElement, useId, useState } from "react";
import type { ReactElement, ReactNode } from "react";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: ReactNode;
  placement?: TooltipPlacement;
  /** Elemento único que dispara o tooltip ao receber hover/foco. Deve aceitar onMouseEnter/onFocus etc. */
  children: ReactElement;
}

export function Tooltip({ content, placement = "top", children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  if (!isValidElement(children)) {
    return children;
  }

  const childProps = children.props as Record<string, ((event: unknown) => void) | undefined>;

  const trigger = cloneElement(children, {
    "aria-describedby": id,
    onMouseEnter: (event: React.MouseEvent) => {
      setVisible(true);
      childProps.onMouseEnter?.(event);
    },
    onMouseLeave: (event: React.MouseEvent) => {
      setVisible(false);
      childProps.onMouseLeave?.(event);
    },
    onFocus: (event: React.FocusEvent) => {
      setVisible(true);
      childProps.onFocus?.(event);
    },
    onBlur: (event: React.FocusEvent) => {
      setVisible(false);
      childProps.onBlur?.(event);
    },
  } as Record<string, unknown>);

  return (
    <span className="cp-tooltip-wrapper">
      {trigger}
      <span
        id={id}
        role="tooltip"
        className={["cp-tooltip", `cp-tooltip--${placement}`, visible && "cp-tooltip--visible"]
          .filter(Boolean)
          .join(" ")}
      >
        {content}
      </span>
    </span>
  );
}
