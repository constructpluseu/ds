import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "./DataTable";
import type { DataTableColumn, DataTableRow } from "./DataTable";

const columns: DataTableColumn[] = [
  { key: "nome", header: "Obra", sortable: true },
  { key: "orcamento", header: "Orçamento", sortable: true, align: "end" },
];

const rows: DataTableRow[] = [
  { id: "1", nome: "Reabilitação Rua Nova", orcamento: "120 000 €" },
  { id: "2", nome: "Moradia Cascais", orcamento: "340 000 €" },
];

describe("DataTable", () => {
  it("mostra os cabeçalhos e as linhas de dados", () => {
    render(<DataTable columns={columns} rows={rows} />);
    expect(screen.getByText("Obra")).toBeInTheDocument();
    expect(screen.getByText("Reabilitação Rua Nova")).toBeInTheDocument();
    expect(screen.getByText("340 000 €")).toBeInTheDocument();
  });

  it("mostra a mensagem vazia quando não há linhas", () => {
    render(<DataTable columns={columns} rows={[]} emptyMessage="Sem obras registadas." />);
    expect(screen.getByText("Sem obras registadas.")).toBeInTheDocument();
  });

  it("chama onSortChange com a direção seguinte ao clicar num cabeçalho ordenável", async () => {
    const user = userEvent.setup();
    const handleSortChange = vi.fn();
    render(<DataTable columns={columns} rows={rows} onSortChange={handleSortChange} />);
    await user.click(screen.getByRole("button", { name: "Obra" }));
    expect(handleSortChange).toHaveBeenCalledWith("nome", "asc");
  });

  it("marca aria-sort na coluna atualmente ordenada", () => {
    render(<DataTable columns={columns} rows={rows} sortKey="nome" sortDirection="asc" />);
    expect(screen.getByRole("columnheader", { name: "Obra" })).toHaveAttribute("aria-sort", "ascending");
  });

  it("seleciona uma linha e chama onSelectionChange", async () => {
    const user = userEvent.setup();
    const handleSelectionChange = vi.fn();
    render(
      <DataTable columns={columns} rows={rows} selectable selectedKeys={[]} onSelectionChange={handleSelectionChange} />
    );
    await user.click(screen.getByRole("checkbox", { name: "Selecionar linha 1" }));
    expect(handleSelectionChange).toHaveBeenCalledWith(["1"]);
  });

  it("seleciona todas as linhas ao clicar no checkbox de cabeçalho", async () => {
    const user = userEvent.setup();
    const handleSelectionChange = vi.fn();
    render(
      <DataTable columns={columns} rows={rows} selectable selectedKeys={[]} onSelectionChange={handleSelectionChange} />
    );
    await user.click(screen.getByRole("checkbox", { name: "Selecionar todas as linhas" }));
    expect(handleSelectionChange).toHaveBeenCalledWith(["1", "2"]);
  });
});
