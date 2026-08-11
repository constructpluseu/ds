import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggletip } from "./Toggletip";

describe("Toggletip", () => {
  it("não mostra o conteúdo por predefinição", () => {
    render(<Toggletip>Explicação adicional</Toggletip>);
    expect(screen.queryByText("Explicação adicional")).not.toBeInTheDocument();
  });

  it("mostra o conteúdo ao clicar no gatilho", async () => {
    render(<Toggletip>Explicação adicional</Toggletip>);
    await userEvent.click(screen.getByRole("button", { name: "Mais informação" }));
    expect(screen.getByText("Explicação adicional")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mais informação" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  it("fecha ao premir Escape", async () => {
    render(<Toggletip>Explicação adicional</Toggletip>);
    await userEvent.click(screen.getByRole("button", { name: "Mais informação" }));
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByText("Explicação adicional")).not.toBeInTheDocument();
  });
});
