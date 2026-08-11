import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpTreeView from "./CpTreeView.vue";
import type { TreeNode } from "./types";

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

describe("CpTreeView", () => {
  it("mostra apenas os nós de topo quando nada está expandido", () => {
    const wrapper = mount(CpTreeView, { props: { label: "Categorias", nodes, expandedIds: [] } });
    expect(wrapper.text()).toContain("Obras");
    expect(wrapper.text()).toContain("Arquivo");
    expect(wrapper.text()).not.toContain("Residencial");
  });

  it("emite expandedChange ao clicar no botão de expandir", async () => {
    const wrapper = mount(CpTreeView, { props: { label: "Categorias", nodes, expandedIds: [] } });
    await wrapper.find('[aria-label="Expandir"]').trigger("click");
    expect(wrapper.emitted("expandedChange")?.[0]).toEqual([["obras"]]);
  });

  it("emite select ao clicar num nó", async () => {
    const wrapper = mount(CpTreeView, { props: { label: "Categorias", nodes, expandedIds: [] } });
    await wrapper.find('[role="treeitem"]').trigger("click");
    expect(wrapper.emitted("select")?.[0]).toEqual(["obras"]);
  });

  it("não emite select para nós desativados", async () => {
    const wrapper = mount(CpTreeView, { props: { label: "Categorias", nodes, expandedIds: [] } });
    const items = wrapper.findAll('[role="treeitem"]');
    await items[items.length - 1].trigger("click");
    expect(wrapper.emitted("select")).toBeUndefined();
  });

  it("expande com a seta direita quando o nó está fechado", async () => {
    const wrapper = mount(CpTreeView, { props: { label: "Categorias", nodes, expandedIds: [] } });
    await wrapper.find('[role="treeitem"]').trigger("keydown", { key: "ArrowRight" });
    expect(wrapper.emitted("expandedChange")?.[0]).toEqual([["obras"]]);
  });

  it("colapsa com a seta esquerda quando o nó está aberto", async () => {
    const wrapper = mount(CpTreeView, { props: { label: "Categorias", nodes, expandedIds: ["obras"] } });
    await wrapper.find('[role="treeitem"]').trigger("keydown", { key: "ArrowLeft" });
    expect(wrapper.emitted("expandedChange")?.[0]).toEqual([[]]);
  });
});
