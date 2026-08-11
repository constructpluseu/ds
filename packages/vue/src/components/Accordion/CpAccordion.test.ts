import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpAccordion from "./CpAccordion.vue";

const items = [
  { id: "a", title: "Garantias" },
  { id: "b", title: "Faturação" },
];

describe("CpAccordion", () => {
  it("começa fechado e expande ao clicar", async () => {
    const wrapper = mount(CpAccordion, {
      props: { items },
      slots: { a: "Conteúdo de garantias", b: "Conteúdo de faturação" },
    });
    expect(wrapper.text()).not.toContain("Conteúdo de garantias");
    await wrapper.find("button").trigger("click");
    expect(wrapper.text()).toContain("Conteúdo de garantias");
    expect(wrapper.find("button").attributes("aria-expanded")).toBe("true");
  });

  it("fecha o painel anterior quando allowMultiple=false", async () => {
    const wrapper = mount(CpAccordion, {
      props: { items },
      slots: { a: "Conteúdo de garantias", b: "Conteúdo de faturação" },
    });
    const buttons = wrapper.findAll("button");
    await buttons[0].trigger("click");
    await buttons[1].trigger("click");
    expect(wrapper.text()).not.toContain("Conteúdo de garantias");
    expect(wrapper.text()).toContain("Conteúdo de faturação");
  });
});
