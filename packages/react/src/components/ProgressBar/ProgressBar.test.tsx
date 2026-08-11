import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("expõe role=progressbar com os valores corretos", () => {
    render(<ProgressBar label="Aprovisionamento" value={40} max={100} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("mostra a percentagem quando showValue=true", () => {
    render(<ProgressBar label="Progresso" value={25} showValue />);
    expect(screen.getByText("25%")).toBeInTheDocument();
  });

  it("não expõe aria-valuenow quando indeterminate", () => {
    render(<ProgressBar label="A carregar" indeterminate />);
    expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow");
  });
});
