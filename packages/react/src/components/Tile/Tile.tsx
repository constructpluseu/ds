import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

interface TileBaseProps {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
}

export type TileProps =
  | (TileBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | (TileBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined });

export function Tile({ icon, title, description, className, ...rest }: TileProps) {
  const classes = ["cp-tile", className].filter(Boolean).join(" ");
  const content = (
    <>
      {icon && (
        <span className="cp-tile__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="cp-tile__title">{title}</span>
      {description && <span className="cp-tile__description">{description}</span>}
    </>
  );

  if ("href" in rest && rest.href) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
