import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";
import { SideNav } from "./SideNav";
import type { SideNavItem } from "./SideNav";
import { expectNoA11yViolations } from "../../test-utils/a11y";

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

  it("não tem violações de acessibilidade (axe-core)", async () => {
    const { container } = render(
      <Header brand="Construct+" navOpen onMenuToggle={vi.fn()}>
        <button type="button">Perfil</button>
      </Header>
    );
    await expectNoA11yViolations(container);
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

  it("chama onNavigate com o item ao clicar num link de topo", async () => {
    const user = userEvent.setup();
    const handleNavigate = vi.fn();
    render(
      <SideNav items={items} expandedIds={[]} onExpandedChange={vi.fn()} onNavigate={handleNavigate} />
    );
    await user.click(screen.getByRole("link", { name: "Obras" }));
    expect(handleNavigate).toHaveBeenCalledWith(items[0], expect.anything());
  });

  it("permite cancelar a navegação nativa a partir de onNavigate", () => {
    const handleNavigate = vi.fn((_item, event) => event.preventDefault());
    render(
      <SideNav items={items} expandedIds={[]} onExpandedChange={vi.fn()} onNavigate={handleNavigate} />
    );
    const link = screen.getByRole("link", { name: "Obras" }) as HTMLAnchorElement;
    const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
    link.dispatchEvent(clickEvent);
    expect(clickEvent.defaultPrevented).toBe(true);
  });

  it("não tem violações de acessibilidade (axe-core)", async () => {
    const { container } = render(
      <SideNav items={items} activeId="obras" expandedIds={["financeiro"]} onExpandedChange={vi.fn()} />
    );
    await expectNoA11yViolations(container);
  });
});
