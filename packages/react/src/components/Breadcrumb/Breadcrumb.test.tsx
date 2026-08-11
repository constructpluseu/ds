import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "./Breadcrumb";

const items = [
  { label: "Obras", href: "/obras" },
  { label: "Obra Central", href: "/obras/central" },
  { label: "Orçamento" },
];

describe("Breadcrumb", () => {
  it("renderiza links para todos os itens exceto o último", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole("link", { name: "Obras" })).toHaveAttribute("href", "/obras");
    expect(screen.getByRole("link", { name: "Obra Central" })).toHaveAttribute("href", "/obras/central");
  });

  it("marca o último item com aria-current=page e sem link", () => {
    render(<Breadcrumb items={items} />);
    const current = screen.getByText("Orçamento");
    expect(current.tagName).toBe("SPAN");
    expect(current).toHaveAttribute("aria-current", "page");
  });
});
