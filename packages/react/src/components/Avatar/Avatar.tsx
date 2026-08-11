import type { HTMLAttributes } from "react";

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarStatus = "online" | "busy" | "away" | "none";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  src?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase();
}

export function Avatar({
  name,
  src,
  size = "md",
  status = "none",
  className,
  ...rest
}: AvatarProps) {
  return (
    <span
      className={["cp-avatar", `cp-avatar--${size}`, className].filter(Boolean).join(" ")}
      role="img"
      aria-label={name}
      {...rest}
    >
      {src ? (
        <img className="cp-avatar__image" src={src} alt="" />
      ) : (
        <span aria-hidden="true">{getInitials(name)}</span>
      )}
      {status !== "none" && (
        <span className={["cp-avatar__status", `cp-avatar__status--${status}`].join(" ")} aria-hidden="true" />
      )}
    </span>
  );
}
