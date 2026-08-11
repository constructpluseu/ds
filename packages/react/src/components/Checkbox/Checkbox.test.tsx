import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("associa o label e alterna ao clicar", async () => {
    render(<Checkbox label="Aceito os termos" />);
    const checkbox = screen.getByLabelText("Aceito os termos");
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("aplica o estado indeterminate no elemento nativo", () => {
    render(<Checkbox label="Selecionar todos" indeterminate />);
    const checkbox = screen.getByLabelText("Selecionar todos") as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it("não dispara onChange quando disabled", async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Indisponível" disabled onChange={onChange} />);
    await userEvent.click(screen.getByLabelText("Indisponível"));
    expect(onChange).not.toHaveBeenCalled();
  });
});
