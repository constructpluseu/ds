import type { MouseEvent } from "react";

export interface SideNavLeafItem {
  id: string;
  label: string;
  href: string;
}

export interface SideNavItem extends SideNavLeafItem {
  children?: SideNavLeafItem[];
}

export interface SideNavProps {
  label?: string;
  items: SideNavItem[];
  activeId?: string | null;
  expandedIds: string[];
  onExpandedChange: (ids: string[]) => void;
  open?: boolean;
  /**
   * Chamado ao clicar num item folha, antes da navegação do browser. Chamar
   * `event.preventDefault()` cancela o `href` (ex.: router client-side,
   * verificação de permissão antes de navegar).
   */
  onNavigate?: (item: SideNavLeafItem, event: MouseEvent<HTMLAnchorElement>) => void;
}

export function SideNav({
  label = "Navegação principal",
  items,
  activeId = null,
  expandedIds,
  onExpandedChange,
  open = true,
  onNavigate,
}: SideNavProps) {
  function toggleExpand(id: string) {
    const next = new Set(expandedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onExpandedChange(Array.from(next));
  }

  return (
    <nav className={`cp-side-nav${open ? "" : " cp-side-nav--closed"}`} aria-label={label}>
      <ul className="cp-side-nav__list">
        {items.map((item) => {
          const hasChildren = Boolean(item.children && item.children.length > 0);
          if (!hasChildren) {
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="cp-side-nav__link"
                  aria-current={activeId === item.id ? "page" : undefined}
                  onClick={(event) => onNavigate?.(item, event)}
                >
                  {item.label}
                </a>
              </li>
            );
          }
          const expanded = expandedIds.includes(item.id);
          return (
            <li key={item.id}>
              <button
                type="button"
                className="cp-side-nav__toggle"
                aria-expanded={expanded}
                onClick={() => toggleExpand(item.id)}
              >
                <span className="cp-side-nav__toggle-label">{item.label}</span>
                <span className="cp-side-nav__toggle-icon" aria-hidden="true">
                  {expanded ? "▾" : "▸"}
                </span>
              </button>
              {expanded && (
                <ul className="cp-side-nav__sublist">
                  {item.children!.map((child) => (
                    <li key={child.id}>
                      <a
                        href={child.href}
                        className="cp-side-nav__link"
                        aria-current={activeId === child.id ? "page" : undefined}
                        onClick={(event) => onNavigate?.(child, event)}
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
