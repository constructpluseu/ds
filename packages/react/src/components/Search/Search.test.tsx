import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from "./Search";

describe("Search", () => {
  it("usa role=searchbox e o label como placeholder", () => {
    render(<Search label="Procurar obras" onChange={() => {}} />);
    expect(screen.getByRole("searchbox")).toHaveAttribute("placeholder", "Procurar obras");
  });

  it("mostra o botão de limpar apenas quando há valor e onClear", () => {
    const { rerender } = render(<Search value="" onChange={() => {}} onClear={() => {}} />);
    expect(screen.queryByRole("button", { name: "Limpar pesquisa" })).not.toBeInTheDocument();
    rerender(<Search value="obra" onChange={() => {}} onClear={() => {}} />);
    expect(screen.getByRole("button", { name: "Limpar pesquisa" })).toBeInTheDocument();
  });

  it("chama onClear ao clicar no botão de limpar", async () => {
    const onClear = vi.fn();
    render(<Search value="obra" onChange={() => {}} onClear={onClear} />);
    await userEvent.click(screen.getByRole("button", { name: "Limpar pesquisa" }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
