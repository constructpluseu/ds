import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NumberInput } from "./NumberInput";

describe("NumberInput", () => {
  it("incrementa ao clicar em Aumentar", async () => {
    const onChange = vi.fn();
    render(<NumberInput label="Quantidade" value={5} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Aumentar" }));
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it("decrementa ao clicar em Diminuir", async () => {
    const onChange = vi.fn();
    render(<NumberInput label="Quantidade" value={5} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Diminuir" }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("não ultrapassa o limite máximo", async () => {
    const onChange = vi.fn();
    render(<NumberInput label="Quantidade" value={10} max={10} onChange={onChange} />);
    expect(screen.getByRole("button", { name: "Aumentar" })).toBeDisabled();
  });

  it("não desce abaixo do limite mínimo", () => {
    render(<NumberInput label="Quantidade" value={0} min={0} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Diminuir" })).toBeDisabled();
  });
});
