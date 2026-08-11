import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { List } from "./List";

describe("List", () => {
  it("renderiza um <ul> por predefinição", () => {
    render(<List items={["Materiais", "Equipa"]} />);
    expect(screen.getByRole("list").tagName).toBe("UL");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("renderiza um <ol> quando ordered=true", () => {
    render(<List ordered items={["Primeiro", "Segundo"]} />);
    expect(screen.getByRole("list").tagName).toBe("OL");
  });
});
