import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renderiza título, subtítulo e conteúdo", () => {
    render(
      <Card title="Obra Central" subtitle="Residencial">
        Detalhes da obra
      </Card>
    );
    expect(screen.getByText("Obra Central")).toBeInTheDocument();
    expect(screen.getByText("Residencial")).toBeInTheDocument();
    expect(screen.getByText("Detalhes da obra")).toBeInTheDocument();
  });

  it("renderiza o rodapé quando fornecido", () => {
    render(<Card footer={<span>Rodapé</span>}>Corpo</Card>);
    expect(screen.getByText("Rodapé")).toBeInTheDocument();
  });

  it("aplica a classe interactive quando interactive=true", () => {
    render(<Card interactive>Corpo</Card>);
    expect(screen.getByText("Corpo").parentElement?.className).toContain("cp-card--interactive");
  });
});
