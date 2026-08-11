import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Link } from "./Link";

describe("Link", () => {
  it("renderiza um <a> com o href fornecido", () => {
    render(<Link href="/obras">Ver obras</Link>);
    expect(screen.getByRole("link", { name: "Ver obras" })).toHaveAttribute("href", "/obras");
  });

  it("marca aria-disabled quando disabled", () => {
    render(<Link href="/obras" disabled>Ver obras</Link>);
    expect(screen.getByRole("link", { name: "Ver obras" })).toHaveAttribute("aria-disabled", "true");
  });

  it("adiciona target=_blank e rel seguro quando external", () => {
    render(<Link href="https://exemplo.pt" external>Site externo</Link>);
    const link = screen.getByRole("link", { name: /Site externo/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
