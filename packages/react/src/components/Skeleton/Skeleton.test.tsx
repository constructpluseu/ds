import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("é oculto de leitores de ecrã (aria-hidden)", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("aplica a classe da variante", () => {
    const { container } = render(<Skeleton variant="circle" />);
    expect(container.firstChild).toHaveClass("cp-skeleton--circle");
  });

  it("aplica largura e altura customizadas", () => {
    const { container } = render(<Skeleton width={40} height="2rem" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("40px");
    expect(el.style.height).toBe("2rem");
  });
});
