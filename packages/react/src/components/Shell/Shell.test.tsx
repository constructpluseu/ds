import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";
import { SideNav } from "./SideNav";
import type { SideNavItem } from "./SideNav";

describe("Header", () => {
  it("mostra a marca e as ações", () => {
    render(
      <Header brand="Construct+">
        <button type="button">Perfil</button>
      </Header>
    );
    expect(screen.getByText("Construct+")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Perfil" })).toBeInTheDocument();
  });

  it("mostra o botão de menu e chama onMenuToggle", async () => {
    const user = userEvent.setup();
    const handleToggle = vi.fn();
    render(<Header brand="Construct+" navOpen={false} onMenuToggle={handleToggle} />);
    await user.click(screen.getByRole("button", { name: "Abrir menu de navegação" }));
    expect(handleToggle).toHaveBeenCalled();
  });
});

const items: SideNavItem[] = [
  { id: "obras", label: "Obras", href: "/obras" },
  {
    id: "financeiro",
    label: "Financeiro",
    href: "/financeiro",
    children: [
      { id: "orcamentos", label: "Orçamentos", href: "/financeiro/orcamentos" },
      { id: "faturas", label: "Faturas", href: "/financeiro/faturas" },
    ],
  },
];

describe("SideNav", () => {
  it("mostra os itens de topo e marca o item ativo", () => {
    render(<SideNav items={items} activeId="obras" expandedIds={[]} onExpandedChange={vi.fn()} />);
    expect(screen.getByRole("link", { name: "Obras" })).toHaveAttribute("aria-current", "page");
  });

  it("não mostra sub-itens quando o grupo está fechado", () => {
    render(<SideNav items={items} expandedIds={[]} onExpandedChange={vi.fn()} />);
    expect(screen.queryByText("Orçamentos")).not.toBeInTheDocument();
  });

  it("expande um grupo ao clicar e chama onExpandedChange", async () => {
    const user = userEvent.setup();
    const handleExpandedChange = vi.fn();
    render(<SideNav items={items} expandedIds={[]} onExpandedChange={handleExpandedChange} />);
    await user.click(screen.getByRole("button", { name: "Financeiro" }));
    expect(handleExpandedChange).toHaveBeenCalledWith(["financeiro"]);
  });

  it("mostra os sub-itens quando o grupo está expandido", () => {
    render(<SideNav items={items} expandedIds={["financeiro"]} onExpandedChange={vi.fn()} />);
    expect(screen.getByRole("link", { name: "Orçamentos" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Faturas" })).toBeInTheDocument();
  });
});
