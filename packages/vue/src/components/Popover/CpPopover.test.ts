import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpPopover from "./CpPopover.vue";

describe("CpPopover", () => {
  it("não mostra o painel por predefinição", () => {
    const wrapper = mount(CpPopover, {
      slots: {
        trigger: `<template #trigger="{ toggle }"><button @click="toggle">Abrir</button></template>`,
        default: "Conteúdo do popover",
      },
    });
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });

  it("abre ao clicar no gatilho", async () => {
    const wrapper = mount(CpPopover, {
      slots: {
        trigger: `<template #trigger="{ toggle }"><button @click="toggle">Abrir</button></template>`,
        default: "Conteúdo do popover",
      },
    });
    await wrapper.find("button").trigger("click");
    expect(wrapper.find('[role="dialog"]').text()).toBe("Conteúdo do popover");
  });
});
