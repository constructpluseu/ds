"use client";

import { useState } from "react";
import { Header, SideNav } from "@constructpluseu/react";
import type { SideNavItem } from "@constructpluseu/react";

const items: SideNavItem[] = [
  { id: "obras", label: "Obras", href: "#" },
  {
    id: "financeiro",
    label: "Financeiro",
    href: "#",
    children: [
      { id: "orcamentos", label: "Orçamentos", href: "#" },
      { id: "faturas", label: "Faturas", href: "#" },
    ],
  },
  { id: "relatorios", label: "Relatórios", href: "#" },
];

export function ShellDemo() {
  const [navOpen, setNavOpen] = useState(true);
  const [expandedIds, setExpandedIds] = useState<string[]>(["financeiro"]);

  return (
    <div style={{ border: "1px solid var(--cp-color-semantic-border-default)", borderRadius: "var(--cp-radius-lg)", overflow: "hidden" }}>
      <Header brand="Construct+" navOpen={navOpen} onMenuToggle={() => setNavOpen((open) => !open)}>
        <span style={{ fontSize: "var(--cp-font-size-sm)" }}>Guilherme Oliveira</span>
      </Header>
      <div style={{ display: "flex", minHeight: "16rem" }}>
        <SideNav
          items={items}
          activeId="obras"
          expandedIds={expandedIds}
          onExpandedChange={setExpandedIds}
          open={navOpen}
        />
        <div style={{ flex: 1, padding: "var(--cp-space-4)", fontSize: "var(--cp-font-size-sm)", color: "var(--cp-color-semantic-text-secondary)" }}>
          Conteúdo da aplicação
        </div>
      </div>
    </div>
  );
}
