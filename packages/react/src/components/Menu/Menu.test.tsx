import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu } from "./Menu";

const items = [
  { id: "editar", label: "Editar", onSelect: vi.fn() },
  { id: "eliminar", label: "Eliminar", onSelect: vi.fn(), danger: true },
];

describe("Menu", () => {
  it("não mostra o painel por predefinição", () => {
    render(<Menu trigger={<button>Ações</button>} items={items} />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("abre ao clicar no gatilho e mostra os itens", async () => {
    render(<Menu trigger={<button>Ações</button>} items={items} />);
    await userEvent.click(screen.getByRole("button", { name: "Ações" }));
    expect(screen.getByRole("menuitem", { name: "Editar" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Eliminar" })).toBeInTheDocument();
  });

  it("chama onSelect e fecha ao clicar num item", async () => {
    const onSelect = vi.fn();
    render(
      <Menu
        trigger={<button>Ações</button>}
        items={[{ id: "editar", label: "Editar", onSelect }]}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Ações" }));
    await userEvent.click(screen.getByRole("menuitem", { name: "Editar" }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("fecha ao premir Escape", async () => {
    render(<Menu trigger={<button>Ações</button>} items={items} />);
    await userEvent.click(screen.getByRole("button", { name: "Ações" }));
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
