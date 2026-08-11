export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  "aria-label"?: string;
}

export function Breadcrumb({ items, "aria-label": ariaLabel = "Navegação estrutural" }: BreadcrumbProps) {
  return (
    <nav aria-label={ariaLabel}>
      <ol className="cp-breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="cp-breadcrumb__item">
              {isLast || !item.href ? (
                <span className="cp-breadcrumb__current" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <a className="cp-breadcrumb__link" href={item.href}>
                  {item.label}
                </a>
              )}
              {!isLast && (
                <span className="cp-breadcrumb__separator" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
