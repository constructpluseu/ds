import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpDataTable from "./CpDataTable.vue";
import type { DataTableColumn, DataTableRow } from "./types";

const columns: DataTableColumn[] = [
  { key: "nome", header: "Obra", sortable: true },
  { key: "orcamento", header: "Orçamento", sortable: true, align: "end" },
];

const rows: DataTableRow[] = [
  { id: "1", nome: "Reabilitação Rua Nova", orcamento: "120 000 €" },
  { id: "2", nome: "Moradia Cascais", orcamento: "340 000 €" },
];

describe("CpDataTable", () => {
  it("mostra os cabeçalhos e as linhas de dados", () => {
    const wrapper = mount(CpDataTable, { props: { columns, rows } });
    expect(wrapper.text()).toContain("Obra");
    expect(wrapper.text()).toContain("Reabilitação Rua Nova");
    expect(wrapper.text()).toContain("340 000 €");
  });

  it("mostra a mensagem vazia quando não há linhas", () => {
    const wrapper = mount(CpDataTable, { props: { columns, rows: [], emptyMessage: "Sem obras registadas." } });
    expect(wrapper.text()).toContain("Sem obras registadas.");
  });

  it("emite sortChange com a direção seguinte ao clicar num cabeçalho ordenável", async () => {
    const wrapper = mount(CpDataTable, { props: { columns, rows } });
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("sortChange")?.[0]).toEqual(["nome", "asc"]);
  });

  it("marca aria-sort na coluna atualmente ordenada", () => {
    const wrapper = mount(CpDataTable, { props: { columns, rows, sortKey: "nome", sortDirection: "asc" } });
    expect(wrapper.find("th").attributes("aria-sort")).toBe("ascending");
  });

  it("seleciona uma linha e emite selectionChange", async () => {
    const wrapper = mount(CpDataTable, { props: { columns, rows, selectable: true, selectedKeys: [] } });
    await wrapper.find('[aria-label="Selecionar linha 1"]').setValue(true);
    expect(wrapper.emitted("selectionChange")?.[0]).toEqual([["1"]]);
  });

  it("seleciona todas as linhas ao ativar o checkbox de cabeçalho", async () => {
    const wrapper = mount(CpDataTable, { props: { columns, rows, selectable: true, selectedKeys: [] } });
    await wrapper.find('[aria-label="Selecionar todas as linhas"]').setValue(true);
    expect(wrapper.emitted("selectionChange")?.[0]).toEqual([["1", "2"]]);
  });
});
