import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Combobox } from "./Combobox";
import { expectNoA11yViolations } from "../../test-utils/a11y";

const options = [
  { value: "residencial", label: "Residencial" },
  { value: "comercial", label: "Comercial" },
  { value: "infraestrutura", label: "Infraestrutura" },
];

describe("Combobox (seleção única)", () => {
  it("não tem violações de acessibilidade (axe-core) com a lista aberta", async () => {
    const { container } = render(
      <Combobox label="Tipo de obra" options={options} value={[]} onChange={() => {}} />
    );
    await userEvent.click(screen.getByRole("combobox"));
    await expectNoA11yViolations(container);
  });

  it("mostra as opções ao focar e filtra ao digitar", async () => {
    render(<Combobox label="Tipo de obra" options={options} value={[]} onChange={() => {}} />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("option", { name: "Residencial" })).toBeInTheDocument();
    await userEvent.type(screen.getByRole("combobox"), "com");
    expect(screen.queryByRole("option", { name: "Residencial" })).not.toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Comercial" })).toBeInTheDocument();
  });

  it("seleciona uma opção e fecha a lista", async () => {
    const onChange = vi.fn();
    render(<Combobox label="Tipo de obra" options={options} value={[]} onChange={onChange} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: "Comercial" }));
    expect(onChange).toHaveBeenCalledWith(["comercial"]);
  });

  it("mostra o rótulo selecionado quando fechado", () => {
    render(
      <Combobox label="Tipo de obra" options={options} value={["comercial"]} onChange={() => {}} />
    );
    expect(screen.getByRole("combobox")).toHaveValue("Comercial");
  });
});

describe("Combobox (multiple)", () => {
  it("mostra tags para cada seleção e permite remover", async () => {
    const onChange = vi.fn();
    render(
      <Combobox
        label="Especialidades"
        options={options}
        value={["residencial", "comercial"]}
        onChange={onChange}
        multiple
      />
    );
    expect(screen.getByText("Residencial")).toBeInTheDocument();
    expect(screen.getByText("Comercial")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Remover Residencial" }));
    expect(onChange).toHaveBeenCalledWith(["comercial"]);
  });
});
