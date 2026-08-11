import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CpTag from "./CpTag.vue";

describe("CpTag", () => {
  it("renderiza o conteúdo e a variante de estado", () => {
    const wrapper = mount(CpTag, { props: { status: "success" }, slots: { default: "Ativo" } });
    expect(wrapper.classes()).toContain("cp-tag--success");
    expect(wrapper.text()).toBe("Ativo");
  });

  it("emite remove ao clicar no botão de remover", async () => {
    const wrapper = mount(CpTag, { props: { removable: true }, slots: { default: "Removível" } });
    await wrapper.find(".cp-tag__remove").trigger("click");
    expect(wrapper.emitted("remove")).toHaveLength(1);
  });
});
