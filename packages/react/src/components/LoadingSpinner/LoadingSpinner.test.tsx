import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  it("expõe role=status com o label predefinido", () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole("status", { name: "A carregar…" })).toBeInTheDocument();
  });

  it("aceita um label customizado", () => {
    render(<LoadingSpinner label="A sincronizar stock…" />);
    expect(screen.getByRole("status", { name: "A sincronizar stock…" })).toBeInTheDocument();
  });

  it("aplica a classe de tamanho", () => {
    render(<LoadingSpinner size="lg" />);
    expect(screen.getByRole("status")).toHaveClass("cp-spinner--lg");
  });
});
