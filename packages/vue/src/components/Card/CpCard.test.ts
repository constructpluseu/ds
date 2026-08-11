import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpCard from "./CpCard.vue";

describe("CpCard", () => {
  it("renderiza título, subtítulo e conteúdo", () => {
    const wrapper = mount(CpCard, {
      props: { title: "Obra Central", subtitle: "Residencial" },
      slots: { default: "Detalhes da obra" },
    });
    expect(wrapper.text()).toContain("Obra Central");
    expect(wrapper.text()).toContain("Residencial");
    expect(wrapper.text()).toContain("Detalhes da obra");
  });

  it("aplica a classe interactive quando interactive=true", () => {
    const wrapper = mount(CpCard, { props: { interactive: true } });
    expect(wrapper.classes()).toContain("cp-card--interactive");
  });
});
