import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { StructuredList } from "./StructuredList";

describe("StructuredList", () => {
  it("renderiza cabeçalhos e linhas", () => {
    render(
      <StructuredList
        headers={["Material", "Quantidade"]}
        rows={[
          ["Cimento", "50 sacos"],
          ["Areia", "3 m³"],
        ]}
      />
    );
    expect(screen.getByRole("columnheader", { name: "Material" })).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3); // 1 cabeçalho + 2 linhas
    expect(screen.getByText("50 sacos")).toBeInTheDocument();
  });
});
