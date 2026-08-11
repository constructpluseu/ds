import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renderiza o conteúdo", () => {
    render(<Button>Guardar</Button>);
    expect(screen.getByRole("button", { name: "Guardar" })).toBeInTheDocument();
  });

  it("aplica as classes de variante e tamanho", () => {
    render(
      <Button variant="accent" size="lg">
        Avançar
      </Button>
    );
    const btn = screen.getByRole("button", { name: "Avançar" });
    expect(btn.className).toContain("cp-button--accent");
    expect(btn.className).toContain("cp-button--lg");
  });

  it("não dispara onClick quando disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Guardar
      </Button>
    );
    await userEvent.click(screen.getByRole("button", { name: "Guardar" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("fica desativado e com aria-busy quando loading", () => {
    render(<Button loading>Guardar</Button>);
    const btn = screen.getByRole("button", { name: "Guardar" });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
  });

  it("usa type=button por padrão para não submeter formulários por acidente", () => {
    render(<Button>Guardar</Button>);
    expect(screen.getByRole("button", { name: "Guardar" })).toHaveAttribute("type", "button");
  });
});
