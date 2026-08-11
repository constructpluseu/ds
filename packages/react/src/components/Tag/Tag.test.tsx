import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tag } from "./Tag";

describe("Tag", () => {
  it("renderiza o conteúdo e a variante de estado", () => {
    render(<Tag status="success">Ativo</Tag>);
    const tag = screen.getByText("Ativo");
    expect(tag.className).toContain("cp-tag--success");
  });

  it("chama onRemove ao clicar no botão de remover", async () => {
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>Removível</Tag>);
    await userEvent.click(screen.getByRole("button", { name: "Remover" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("não mostra botão de remover quando onRemove não é passado", () => {
    render(<Tag>Fixo</Tag>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
