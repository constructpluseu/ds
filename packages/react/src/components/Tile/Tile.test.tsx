import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tile } from "./Tile";

describe("Tile", () => {
  it("renderiza como <a> quando href é fornecido", () => {
    render(<Tile href="/modulos/aprovisionamento" title="Aprovisionamento" description="Materiais e stock" />);
    const link = screen.getByRole("link", { name: /Aprovisionamento/ });
    expect(link).toHaveAttribute("href", "/modulos/aprovisionamento");
  });

  it("renderiza como <button> quando não há href", async () => {
    const onClick = vi.fn();
    render(<Tile title="Aprovisionamento" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Aprovisionamento" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
