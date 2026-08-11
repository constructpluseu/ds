"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { componentCategories, componentRegistry } from "@/lib/component-registry";

const fundamentos = [
  ["cor", "Cor"],
  ["tipografia", "Tipografia"],
  ["espacamento", "Espaçamento"],
  ["grid-e-layout", "Grid e layout"],
  ["icones", "Ícones"],
  ["motion", "Motion"],
  ["elevacao-e-sombra", "Elevação e sombra"],
  ["temas", "Temas"],
  ["breakpoints", "Breakpoints"],
] as const;

const padroes = [
  ["formularios", "Formulários"],
  ["estados-vazios", "Estados vazios"],
  ["estados-de-erro", "Estados de erro"],
  ["notificacoes", "Notificações"],
  ["busca-e-filtragem", "Busca e filtragem"],
  ["dialogos", "Diálogos"],
  ["carregamento", "Carregamento"],
] as const;

const diretrizes = [
  ["acessibilidade", "Acessibilidade"],
  ["conteudo-e-tom-de-voz", "Conteúdo e tom de voz"],
  ["temas-e-modo-escuro", "Temas e modo escuro"],
  ["responsividade-e-grid", "Responsividade e grid"],
  ["internacionalizacao", "Internacionalização"],
] as const;

function normalize(path: string): string {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = normalize(pathname) === normalize(href);
  return (
    <Link
      href={href}
      className={`cp-docs-sidebar__link${active ? " cp-docs-sidebar__link--active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export function Sidebar() {
  return (
    <nav className="cp-docs-sidebar" aria-label="Navegação da documentação">
      <Link href="/" style={{ textDecoration: "none" }}>
        <span className="cp-docs-sidebar__brand">Construct+ Design System</span>
        <span className="cp-docs-sidebar__tagline">Build Smart. Live Green.</span>
      </Link>

      <div className="cp-docs-sidebar__group">
        <p className="cp-docs-sidebar__group-title">Fundamentos</p>
        {fundamentos.map(([slug, label]) => (
          <NavLink key={slug} href={`/fundamentos/${slug}`}>
            {label}
          </NavLink>
        ))}
      </div>

      <div className="cp-docs-sidebar__group">
        <p className="cp-docs-sidebar__group-title">Componentes</p>
        <NavLink href="/componentes">Visão geral</NavLink>
        {componentCategories.map((categoria) => (
          <div key={categoria} style={{ marginTop: "var(--cp-space-2)" }}>
            <p
              style={{
                fontSize: "var(--cp-font-size-xs)",
                color: "var(--cp-color-semantic-text-placeholder)",
                padding: "0 var(--cp-space-3)",
                marginBottom: "var(--cp-space-1)",
              }}
            >
              {categoria}
            </p>
            {componentRegistry
              .filter((c) => c.categoria === categoria)
              .map((c) => (
                <NavLink key={c.slug} href={`/componentes/${c.slug}`}>
                  <span>{c.nome}</span>
                  {c.status === "planeado" && (
                    <span
                      aria-hidden="true"
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: "var(--cp-color-semantic-text-placeholder)",
                      }}
                    />
                  )}
                </NavLink>
              ))}
          </div>
        ))}
      </div>

      <div className="cp-docs-sidebar__group">
        <p className="cp-docs-sidebar__group-title">Padrões</p>
        <NavLink href="/padroes">Visão geral</NavLink>
        {padroes.map(([slug, label]) => (
          <NavLink key={slug} href={`/padroes/${slug}`}>
            {label}
          </NavLink>
        ))}
      </div>

      <div className="cp-docs-sidebar__group">
        <p className="cp-docs-sidebar__group-title">Diretrizes</p>
        {diretrizes.map(([slug, label]) => (
          <NavLink key={slug} href={`/diretrizes/${slug}`}>
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
