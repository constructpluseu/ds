import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("associa o label ao campo", () => {
    render(<Textarea label="Descrição da obra" />);
    expect(screen.getByLabelText("Descrição da obra")).toBeInTheDocument();
  });

  it("aceita texto multilinha", async () => {
    render(<Textarea label="Notas" />);
    const textarea = screen.getByLabelText("Notas");
    await userEvent.type(textarea, "Linha 1{enter}Linha 2");
    expect(textarea).toHaveValue("Linha 1\nLinha 2");
  });

  it("marca aria-invalid quando há errorText", () => {
    render(<Textarea label="Notas" errorText="Campo obrigatório" />);
    expect(screen.getByLabelText("Notas")).toHaveAttribute("aria-invalid", "true");
  });
});
