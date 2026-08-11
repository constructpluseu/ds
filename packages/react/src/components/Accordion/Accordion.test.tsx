import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "./Accordion";

const items = [
  { id: "a", title: "Garantias", content: "Conteúdo de garantias" },
  { id: "b", title: "Faturação", content: "Conteúdo de faturação" },
  { id: "c", title: "Contactos", content: "Conteúdo de contactos" },
];

describe("Accordion", () => {
  it("começa fechado por predefinição e expande ao clicar", async () => {
    render(<Accordion items={items} />);
    expect(screen.queryByText("Conteúdo de garantias")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Garantias" }));
    expect(screen.getByText("Conteúdo de garantias")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Garantias" })).toHaveAttribute("aria-expanded", "true");
  });

  it("fecha o painel anterior ao abrir outro quando allowMultiple=false", async () => {
    render(<Accordion items={items} />);
    await userEvent.click(screen.getByRole("button", { name: "Garantias" }));
    await userEvent.click(screen.getByRole("button", { name: "Faturação" }));
    expect(screen.queryByText("Conteúdo de garantias")).not.toBeInTheDocument();
    expect(screen.getByText("Conteúdo de faturação")).toBeInTheDocument();
  });

  it("mantém vários painéis abertos quando allowMultiple=true", async () => {
    render(<Accordion items={items} allowMultiple />);
    await userEvent.click(screen.getByRole("button", { name: "Garantias" }));
    await userEvent.click(screen.getByRole("button", { name: "Faturação" }));
    expect(screen.getByText("Conteúdo de garantias")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo de faturação")).toBeInTheDocument();
  });

  it("navega entre cabeçalhos com as setas do teclado", async () => {
    render(<Accordion items={items} />);
    screen.getByRole("button", { name: "Garantias" }).focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("button", { name: "Faturação" })).toHaveFocus();
  });
});
