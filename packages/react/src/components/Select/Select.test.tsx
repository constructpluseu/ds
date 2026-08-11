import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";

const options = [
  { value: "residencial", label: "Residencial" },
  { value: "comercial", label: "Comercial" },
];

describe("Select", () => {
  it("associa o label e lista as opções", () => {
    render(<Select label="Tipo de obra" options={options} />);
    const select = screen.getByLabelText("Tipo de obra");
    expect(select).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Residencial" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Comercial" })).toBeInTheDocument();
  });

  it("mostra o placeholder como opção desativada", () => {
    const { container } = render(
      <Select label="Tipo de obra" options={options} placeholder="Selecione…" />
    );
    const placeholderOption = container.querySelector('option[value=""]');
    expect(placeholderOption).toHaveTextContent("Selecione…");
    expect(placeholderOption).toBeDisabled();
  });

  it("permite escolher uma opção", async () => {
    render(<Select label="Tipo de obra" options={options} />);
    const select = screen.getByLabelText("Tipo de obra") as HTMLSelectElement;
    await userEvent.selectOptions(select, "comercial");
    expect(select.value).toBe("comercial");
  });
});
