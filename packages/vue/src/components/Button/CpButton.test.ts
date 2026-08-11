import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpButton from "./CpButton.vue";

describe("CpButton", () => {
  it("renderiza o conteúdo", () => {
    const wrapper = mount(CpButton, { slots: { default: "Guardar" } });
    expect(wrapper.text()).toBe("Guardar");
    expect(wrapper.attributes("type")).toBe("button");
  });

  it("aplica as classes de variante e tamanho", () => {
    const wrapper = mount(CpButton, {
      props: { variant: "accent", size: "lg" },
      slots: { default: "Avançar" },
    });
    expect(wrapper.classes()).toContain("cp-button--accent");
    expect(wrapper.classes()).toContain("cp-button--lg");
  });

  it("não fica clicável quando disabled", () => {
    const wrapper = mount(CpButton, {
      props: { disabled: true },
      slots: { default: "Guardar" },
    });
    expect(wrapper.attributes("disabled")).toBeDefined();
  });

  it("fica desativado e com aria-busy quando loading", () => {
    const wrapper = mount(CpButton, {
      props: { loading: true },
      slots: { default: "Guardar" },
    });
    expect(wrapper.attributes("disabled")).toBeDefined();
    expect(wrapper.attributes("aria-busy")).toBe("true");
    expect(wrapper.find(".cp-button__spinner").exists()).toBe(true);
  });
});
