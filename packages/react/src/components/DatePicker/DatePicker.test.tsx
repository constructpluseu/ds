import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("mostra a data selecionada formatada no campo", () => {
    render(<DatePicker label="Data de início" value="2026-08-10" onChange={vi.fn()} />);
    expect(screen.getByLabelText("Data de início")).toHaveValue("10/08/2026");
  });

  it("abre o calendário ao clicar no campo", async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Data de início" value={null} onChange={vi.fn()} />);
    await user.click(screen.getByLabelText("Data de início"));
    expect(screen.getByRole("dialog", { name: "Escolher data" })).toBeInTheDocument();
  });

  it("seleciona uma data e chama onChange com o valor ISO", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<DatePicker label="Data de início" value="2026-08-01" onChange={handleChange} />);
    await user.click(screen.getByLabelText("Data de início"));
    await user.click(screen.getByRole("button", { name: "15 de agosto de 2026" }));
    expect(handleChange).toHaveBeenCalledWith("2026-08-15");
  });

  it("fecha o calendário ao premir Escape", async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Data de início" value="2026-08-01" onChange={vi.fn()} />);
    await user.click(screen.getByLabelText("Data de início"));
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("desativa dias fora do intervalo minDate/maxDate", async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        label="Data de início"
        value="2026-08-10"
        onChange={vi.fn()}
        minDate="2026-08-05"
        maxDate="2026-08-20"
      />
    );
    await user.click(screen.getByLabelText("Data de início"));
    expect(screen.getByRole("button", { name: "1 de agosto de 2026" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "10 de agosto de 2026" })).toBeEnabled();
  });

  it("navega para o mês seguinte ao clicar no botão de navegação", async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Data de início" value="2026-08-10" onChange={vi.fn()} />);
    await user.click(screen.getByLabelText("Data de início"));
    await user.click(screen.getByRole("button", { name: "Mês seguinte" }));
    expect(screen.getByText(/setembro de 2026/i)).toBeInTheDocument();
  });
});
