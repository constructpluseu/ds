import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
  it("associa o label ao campo", () => {
    render(<TextInput label="Nome da obra" />);
    expect(screen.getByLabelText("Nome da obra")).toBeInTheDocument();
  });

  it("mostra o texto de ajuda e liga via aria-describedby", () => {
    render(<TextInput label="NIF" helperText="9 dígitos" />);
    const input = screen.getByLabelText("NIF");
    expect(screen.getByText("9 dígitos")).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-describedby");
  });

  it("marca aria-invalid quando há errorText", () => {
    render(<TextInput label="Email" errorText="Email inválido" />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Email inválido")).toBeInTheDocument();
  });

  it("aceita digitação e dispara onChange", async () => {
    const onChange = vi.fn();
    render(<TextInput label="Nome" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText("Nome"), "Obra Central");
    expect(onChange).toHaveBeenCalled();
  });
});
