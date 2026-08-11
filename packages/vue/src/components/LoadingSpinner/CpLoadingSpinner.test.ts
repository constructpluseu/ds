import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpLoadingSpinner from "./CpLoadingSpinner.vue";

describe("CpLoadingSpinner", () => {
  it("expõe role=status com o label predefinido", () => {
    const wrapper = mount(CpLoadingSpinner);
    expect(wrapper.attributes("role")).toBe("status");
    expect(wrapper.attributes("aria-label")).toBe("A carregar…");
  });

  it("aplica a classe de tamanho", () => {
    const wrapper = mount(CpLoadingSpinner, { props: { size: "lg" } });
    expect(wrapper.classes()).toContain("cp-spinner--lg");
  });
});
