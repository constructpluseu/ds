import type { ReactNode } from "react";

export interface HeaderProps {
  brand: string;
  brandHref?: string;
  navOpen?: boolean;
  onMenuToggle?: () => void;
  children?: ReactNode;
}

export function Header({ brand, brandHref = "#", navOpen = false, onMenuToggle, children }: HeaderProps) {
  return (
    <header className="cp-header">
      {onMenuToggle && (
        <button
          type="button"
          className="cp-header__menu-button"
          aria-label={navOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          aria-expanded={navOpen}
          onClick={onMenuToggle}
        >
          <span aria-hidden="true">{navOpen ? "✕" : "☰"}</span>
        </button>
      )}
      <a className="cp-header__brand" href={brandHref}>
        {brand}
      </a>
      <div className="cp-header__actions">{children}</div>
    </header>
  );
}
