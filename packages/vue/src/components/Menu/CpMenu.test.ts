import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import CpMenu from "./CpMenu.vue";

describe("CpMenu", () => {
  it("abre ao clicar no gatilho e mostra os itens", async () => {
    const wrapper = mount(CpMenu, {
      props: {
        items: [
          { id: "editar", label: "Editar", onSelect: vi.fn() },
          { id: "eliminar", label: "Eliminar", onSelect: vi.fn(), danger: true },
        ],
      },
      slots: {
        trigger: `<template #trigger="{ toggle }"><button @click="toggle">Ações</button></template>`,
      },
    });
    await wrapper.find("button").trigger("click");
    expect(wrapper.findAll('[role="menuitem"]')).toHaveLength(2);
  });

  it("chama onSelect e fecha ao clicar num item", async () => {
    const onSelect = vi.fn();
    const wrapper = mount(CpMenu, {
      props: { items: [{ id: "editar", label: "Editar", onSelect }] },
      slots: {
        trigger: `<template #trigger="{ toggle }"><button @click="toggle">Ações</button></template>`,
      },
    });
    await wrapper.find("button").trigger("click");
    await wrapper.find('[role="menuitem"]').trigger("click");
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(wrapper.find('[role="menu"]').exists()).toBe(false);
  });
});
