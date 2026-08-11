import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover } from "./Popover";

describe("Popover", () => {
  it("não mostra o painel por predefinição", () => {
    render(
      <Popover trigger={<button>Abrir</button>}>Conteúdo do popover</Popover>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("abre ao clicar no gatilho", async () => {
    render(
      <Popover trigger={<button>Abrir</button>}>Conteúdo do popover</Popover>
    );
    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));
    expect(screen.getByRole("dialog")).toHaveTextContent("Conteúdo do popover");
  });

  it("fecha ao clicar fora", async () => {
    render(
      <div>
        <Popover trigger={<button>Abrir</button>}>Conteúdo do popover</Popover>
        <button>Fora</button>
      </div>
    );
    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Fora" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("fecha ao premir Escape", async () => {
    render(
      <Popover trigger={<button>Abrir</button>}>Conteúdo do popover</Popover>
    );
    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
