import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("associa o tooltip ao gatilho via aria-describedby", () => {
    render(
      <Tooltip content="Guarda as alterações">
        <button>Guardar</button>
      </Tooltip>
    );
    const button = screen.getByRole("button", { name: "Guardar" });
    const tooltip = screen.getByRole("tooltip", { hidden: true });
    expect(button).toHaveAttribute("aria-describedby", tooltip.id);
  });

  it("fica visível no foco e some ao perder o foco", async () => {
    render(
      <Tooltip content="Guarda as alterações">
        <button>Guardar</button>
      </Tooltip>
    );
    const button = screen.getByRole("button", { name: "Guardar" });
    const tooltip = screen.getByRole("tooltip", { hidden: true });

    expect(tooltip.className).not.toContain("cp-tooltip--visible");
    await userEvent.tab();
    expect(button).toHaveFocus();
    expect(tooltip.className).toContain("cp-tooltip--visible");
    await userEvent.tab();
    expect(tooltip.className).not.toContain("cp-tooltip--visible");
  });
});
