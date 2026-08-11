import type { HTMLAttributes } from "react";

export type SkeletonVariant = "text" | "circle" | "rect";

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ variant = "text", width, height, className, style, ...rest }: SkeletonProps) {
  return (
    <span
      className={["cp-skeleton", `cp-skeleton--${variant}`, className].filter(Boolean).join(" ")}
      style={{ width, height, ...style }}
      role="presentation"
      aria-hidden="true"
      {...rest}
    />
  );
}
