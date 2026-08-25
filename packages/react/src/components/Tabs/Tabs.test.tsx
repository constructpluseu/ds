import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "./Tabs";
import { expectNoA11yViolations } from "../../test-utils/a11y";

const items = [
  { id: "orcamento", label: "Orçamento", content: "Conteúdo do orçamento" },
  { id: "materiais", label: "Materiais", content: "Conteúdo dos materiais" },
  { id: "equipa", label: "Equipa", content: "Conteúdo da equipa" },
];

describe("Tabs", () => {
  it("não tem violações de acessibilidade (axe-core)", async () => {
    const { container } = render(<Tabs items={items} aria-label="Detalhes da obra" />);
    await expectNoA11yViolations(container);
  });

  it("mostra o conteúdo do primeiro separador por predefinição", () => {
    render(<Tabs items={items} aria-label="Detalhes da obra" />);
    expect(screen.getByRole("tab", { name: "Orçamento" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Conteúdo do orçamento")).toBeInTheDocument();
  });

  it("troca de separador ao clicar", async () => {
    render(<Tabs items={items} aria-label="Detalhes da obra" />);
    await userEvent.click(screen.getByRole("tab", { name: "Materiais" }));
    expect(screen.getByText("Conteúdo dos materiais")).toBeInTheDocument();
  });

  it("navega entre separadores com as setas do teclado", async () => {
    render(<Tabs items={items} aria-label="Detalhes da obra" />);
    screen.getByRole("tab", { name: "Orçamento" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Materiais" })).toHaveFocus();
    expect(screen.getByText("Conteúdo dos materiais")).toBeInTheDocument();
  });

  it("End move para o último separador e Home para o primeiro", async () => {
    render(<Tabs items={items} aria-label="Detalhes da obra" />);
    screen.getByRole("tab", { name: "Orçamento" }).focus();
    await userEvent.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Equipa" })).toHaveFocus();
    await userEvent.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "Orçamento" })).toHaveFocus();
  });

  it("apenas o separador ativo tem tabIndex=0 (roving tabindex)", () => {
    render(<Tabs items={items} aria-label="Detalhes da obra" />);
    expect(screen.getByRole("tab", { name: "Orçamento" })).toHaveAttribute("tabIndex", "0");
    expect(screen.getByRole("tab", { name: "Materiais" })).toHaveAttribute("tabIndex", "-1");
  });
});
