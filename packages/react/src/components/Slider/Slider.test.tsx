import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("associa o label ao campo e mostra o valor", () => {
    render(<Slider label="Progresso" value={40} onChange={() => {}} />);
    expect(screen.getByLabelText("Progresso")).toBeInTheDocument();
    expect(screen.getByText("40")).toBeInTheDocument();
  });

  it("é um input type=range com min/max", () => {
    render(<Slider label="Progresso" value={40} min={0} max={100} onChange={() => {}} />);
    const input = screen.getByLabelText("Progresso") as HTMLInputElement;
    expect(input.type).toBe("range");
    expect(input.min).toBe("0");
    expect(input.max).toBe("100");
  });

  it("dispara onChange ao alterar o valor", () => {
    const onChange = vi.fn();
    render(<Slider label="Progresso" value={40} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("Progresso"), { target: { value: "60" } });
    expect(onChange).toHaveBeenCalled();
  });
});
