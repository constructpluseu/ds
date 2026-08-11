import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TreeView } from "./TreeView";
import type { TreeNode } from "./TreeView";

const nodes: TreeNode[] = [
  {
    id: "obras",
    label: "Obras",
    children: [
      {
        id: "residencial",
        label: "Residencial",
        children: [{ id: "moradia-cascais", label: "Moradia Cascais" }],
      },
      { id: "comercial", label: "Comercial" },
    ],
  },
  { id: "arquivo", label: "Arquivo", disabled: true },
];

describe("TreeView", () => {
  it("mostra apenas os nós de topo quando nada está expandido", () => {
    render(<TreeView label="Categorias" nodes={nodes} expandedIds={[]} onExpandedChange={vi.fn()} />);
    expect(screen.getByText("Obras")).toBeInTheDocument();
    expect(screen.getByText("Arquivo")).toBeInTheDocument();
    expect(screen.queryByText("Residencial")).not.toBeInTheDocument();
  });

  it("expande um nó ao clicar no botão de expandir", async () => {
    const user = userEvent.setup();
    const handleExpandedChange = vi.fn();
    render(<TreeView label="Categorias" nodes={nodes} expandedIds={[]} onExpandedChange={handleExpandedChange} />);
    await user.click(screen.getByRole("button", { name: "Expandir" }));
    expect(handleExpandedChange).toHaveBeenCalledWith(["obras"]);
  });

  it("seleciona um nó ao clicar", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    render(
      <TreeView label="Categorias" nodes={nodes} expandedIds={[]} onExpandedChange={vi.fn()} onSelect={handleSelect} />
    );
    await user.click(screen.getByText("Obras"));
    expect(handleSelect).toHaveBeenCalledWith("obras");
  });

  it("não seleciona nós desativados", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    render(
      <TreeView label="Categorias" nodes={nodes} expandedIds={[]} onExpandedChange={vi.fn()} onSelect={handleSelect} />
    );
    await user.click(screen.getByText("Arquivo"));
    expect(handleSelect).not.toHaveBeenCalled();
  });

  it("expande com a seta direita quando o nó está fechado", () => {
    const handleExpandedChange = vi.fn();
    render(<TreeView label="Categorias" nodes={nodes} expandedIds={[]} onExpandedChange={handleExpandedChange} />);
    const obrasItem = screen.getByText("Obras").closest('[role="treeitem"]') as HTMLElement;
    obrasItem.focus();
    fireEvent.keyDown(obrasItem, { key: "ArrowRight" });
    expect(handleExpandedChange).toHaveBeenCalledWith(["obras"]);
  });

  it("colapsa com a seta esquerda quando o nó está aberto", () => {
    const handleExpandedChange = vi.fn();
    render(<TreeView label="Categorias" nodes={nodes} expandedIds={["obras"]} onExpandedChange={handleExpandedChange} />);
    const obrasItem = screen.getByText("Obras").closest('[role="treeitem"]') as HTMLElement;
    obrasItem.focus();
    fireEvent.keyDown(obrasItem, { key: "ArrowLeft" });
    expect(handleExpandedChange).toHaveBeenCalledWith([]);
  });

  it("move o foco para o próximo nó visível com a seta para baixo", () => {
    render(<TreeView label="Categorias" nodes={nodes} expandedIds={["obras"]} onExpandedChange={vi.fn()} />);
    const obrasItem = screen.getByText("Obras").closest('[role="treeitem"]') as HTMLElement;
    obrasItem.focus();
    fireEvent.keyDown(obrasItem, { key: "ArrowDown" });
    const residencialItem = screen.getByText("Residencial").closest('[role="treeitem"]') as HTMLElement;
    expect(residencialItem).toHaveFocus();
  });
});
