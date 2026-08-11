import type { HTMLAttributes, ReactNode } from "react";

export interface ListProps extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  ordered?: boolean;
  /** Remove marcadores e indentação — útil quando a lista tem a sua própria semântica visual (ex.: lista de ações). */
  unstyled?: boolean;
  items: ReactNode[];
}

export function List({ ordered = false, unstyled = false, items, className, ...rest }: ListProps) {
  const Tag = ordered ? "ol" : "ul";
  const classes = ["cp-list", unstyled && "cp-list--unstyled", className].filter(Boolean).join(" ");

  return (
    <Tag className={classes} {...rest}>
      {items.map((item, index) => (
        <li key={index} className="cp-list__item">
          {item}
        </li>
      ))}
    </Tag>
  );
}
